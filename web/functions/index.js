const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ffmpeg = require('ffmpeg');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const gcs = require('@google-cloud/storage')({keyFilename: '../sjsu-cs-160-firebase-adminsdk-qc6zo-9ffaf3cefd.json'});
const os = require('os');
const spawn = require('child-process-promise').spawn;
const exec = require('child-process-promise').exec;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

admin.initializeApp(functions.config().firebase);

exports.addMessage = functions.https.onRequest(function (req, res) {
  const original = req.query.name;

  admin.database().ref('/messages').push({original: original}).then(function (snapshot) {
    res.redirect(303, snapshot.ref);
  });
});

exports.extractFrame = functions.https.onRequest(function (req, res) {

  const name = req.query.fileName;
  const username = name.substr(0, name.length - 4);
  const sessionId = 'video-org';
  const framePath = 'frame-org';

  const sourceBucketName = 'sjsu-cs-160.appspot.com';
  const sourceBucket = gcs.bucket(sourceBucketName);
  const temDir = os.tmpdir();

  // res to frontend
  let fps;
  let total_frame;

  return sourceBucket.file(sessionId + '/' + name).download({
      destination: temDir + '/' + name
    }
  ).then(() => {
    console.log('read metadata of video');

    const promise = spawn(ffprobePath, ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
       'stream=avg_frame_rate', '-of', 'default=noprint_wrappers=1:nokey=1', temDir + '/' + name]);
    const childProcess = promise.childProcess;

    childProcess.stdout.on('data', function (data) {
      console.log('[spawn] stdout: ', data.toString());
      const fpsArray = data.toString().split('/');
      fps = fpsArray[0] / fpsArray[1];
    });
    childProcess.stderr.on('data', function (data) {
      console.log('[spawn] stderr: ', data.toString());
    });
  }).then(() => {
    console.log('extract frames');
    //ffmpeg -i input.mp4 -vf fps=30 out%d.png
    return spawn(ffmpegPath, ['-i', temDir + '/' + name, '-vf', 'fps=' + fps,
      temDir + '/' + username + '%d.png']);
  }).then(() => {
    const frames = fs.readdirSync(temDir);
    total_frame = frames.length - 1;
    const promiseArray = [];
    console.log(frames);

    for (let index in frames) {
      if (index != 0) {
        console.log('uploading');
        const p = sourceBucket.upload(temDir + '/' + frames[index], {destination: framePath + '/' + frames[index]});
        promiseArray.push(p);
      }
    }

    return Promise.all(promiseArray);
  }).then(() => {
    console.log('sending res');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      fps: fps,
      total_frame: total_frame,
      email: name
    }));
  });
});


// local version due to limited cloud cpu and rom
exports.extractFrameLocal = functions.https.onRequest(function (req, res) {

  const name = req.query.fileName;
  const username = name.substr(0, name.length - 4);
  const sessionId = 'video-org';
  const framePath = '/home/yizhou/CS160/dlib-19.1/python_examples/frame';
  const eyePath = '/home/yizhou/CS160/dlib-19.1/python_examples/frame_eye';
  const cloudResultPath = 'video-edit';

  const sourceBucketName = 'sjsu-cs-160.appspot.com';
  const sourceBucket = gcs.bucket(sourceBucketName);
  //const faceFrame = '/home/yizhou/CS160/dlib-19.1/python_examples/frame_finished';
  const temDir = '/home/yizhou/CS160/dlib-19.1/python_examples/video';
  const finalDir = '/home/yizhou/CS160/dlib-19.1/python_examples/video-edit';
  const videoEdit = username + '.mp4';

  // res to frontend
  let fps;
  let total_frame;
  let url;

  //remove everything in image folder and video folder
  fs.readdir(framePath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(framePath, file), err => {
        if (err) throw err;
      });
    }
  });

  // fs.readdir(finalDir, (err, files) => {
  //   if (err) throw err;
  //
  //   for (const file of files) {
  //     fs.unlink(path.join(finalDir, file), err => {
  //       if (err) throw err;
  //     });
  //   }
  // });

  // fs.readdir(temDir, (err, files) => {
  //   if (err) throw err;
  //
  //   for (const file of files) {
  //     fs.unlink(path.join(temDir, file), err => {
  //       if (err) throw err;
  //     });
  //   }
  // });

  fs.readdir(eyePath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(eyePath, file), err => {
        if (err) throw err;
      });
    }
  });

  // fs.readdir(faceFrame, (err, files) => {
  //   if (err) throw err;
  //
  //   for (const file of files) {
  //     fs.unlink(path.join(faceFrame, file), err => {
  //       if (err) throw err;
  //     });
  //   }
  // });

  return sourceBucket.file(sessionId + '/' + name).download({
      destination: temDir + '/' + name
    }
  ).then(() => {
    console.log('read metadata of video');

    const promise = spawn(ffprobePath, ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
      'stream=avg_frame_rate', '-of', 'default=noprint_wrappers=1:nokey=1', temDir + '/' + name]);
    const childProcess = promise.childProcess;

    childProcess.stdout.on('data', function (data) {
      console.log('[spawn] stdout: ', data.toString());
      const fpsArray = data.toString().split('/');
      fps = fpsArray[0] / fpsArray[1];
    });
    childProcess.stderr.on('data', function (data) {
      console.log('[spawn] stderr: ', data.toString());
    });
  }).then(() => {
    console.log('extract frames');
    return spawn(ffmpegPath, ['-i', temDir + '/' + name, framePath + '/' + username + '%d.jpg']);
  }).then(() => {
    // detect eye
    res.send('HAHAHAH');
    console.log('eye track');
    return exec('/home/yizhou/CS160/modified_eyeLike/build/bin/./eyeLike');

  }).then(() => {
    console.log('draw face');
    const frames = fs.readdirSync(framePath);
    total_frame = frames.length;

    return spawn('python', ['/home/yizhou/CS160/dlib-19.1/python_examples/drawFace.py',
      '/home/yizhou/CS160/dlib-19.1/python_examples/shape_predictor_68_face_landmarks.dat',
      '/home/yizhou/CS160/dlib-19.1/python_examples/frame_eye/']);

  }).then(() => {
    console.log('generate video');

    return spawn(ffmpegPath, ['-r', fps.toString(), '-start_number', '1', '-f', 'image2', '-i',
      eyePath + '/' + username + '%d_finished.jpg', '-c:v', 'libx264', finalDir + '/' + videoEdit]);
  }).then(() => {
    // upload video to cloud storage
    console.log('uploading video');
    return sourceBucket.upload(finalDir + '/' + videoEdit, {destination: cloudResultPath + '/' + videoEdit});
  }).then(() => {
    let file = sourceBucket.file(cloudResultPath + '/' + videoEdit);

    return file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(signedUrls => {
      console.log(signedUrls[0]);
      url = signedUrls[0];
    });
  }).then(() => {

    console.log('sending res');

    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify({
    //   fps: fps,
    //   total_frame: total_frame,
    //   fileName: name,
    //   url: url
    // }));
  });
});
