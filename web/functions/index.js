const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ffmpeg = require('ffmpeg');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const gcs = require('@google-cloud/storage')();
const os = require('os');
const spawn = require('child-process-promise').spawn;

admin.initializeApp(functions.config().firebase);

exports.addMessage = functions.https.onRequest(function (req, res) {
  const original = req.query.name;

  admin.database().ref('/messages').push({original: original}).then(function (snapshot) {
    res.redirect(303, snapshot.ref);
  })
  ;
});

exports.extractFrame = functions.https.onRequest(function (req, res) {

  const name = req.query.fileName;
  const sessionId = 'video-org';

  const sourceBucketName = 'sjsu-cs-160.appspot.com';
  const sourceBucket = gcs.bucket(sourceBucketName);
  const tempDir = os.tmpdir();

  sourceBucket.file(sessionId + '/' + name).download({
      destination: tempDir + '/' + name
    }
  ).then(() => {
    res.send('extract frames');
    console.log(tempDir + '/' + name);

    const process = new ffmpeg(tempDir + '/' + name);
    process.then(function (video) {
      // Callback mode

      const fps = Math.floor(video.metadata.video.fps);
      console.log(fps);
      video.fnExtractFrameToJPG(tempDir, {
        frame_rate: fps,
        file_name: 'my_frame_%d'
      }, function (error, files) {
        if (!error)
          console.log('Frames: ' + files);
      });
    }, function (err) {
      console.log('Error: ' + err);
    });









    // spawn('ffmpeg', ['-i', tempDir + '/' + name, tempDir + '/' + 'frame%04d.png']);
    // const a = spawn('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=avg_frame_rate'
    //   , '-of', 'default=noprint_wrappers=1:nokey=1', tempDir + '/' + name]);




      //tempDir + '/' + name, tempDir + '/' + 'frame%04d.png']);
  });
});
