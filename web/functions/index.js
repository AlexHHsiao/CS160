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
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

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
  const username = name.substr(0, name.length - 4);
  const sessionId = 'video-org';
  const framePath = 'frame-org';

  const sourceBucketName = 'sjsu-cs-160.appspot.com';
  const sourceBucket = gcs.bucket(sourceBucketName);
  const temDir = os.tmpdir();

  return sourceBucket.file(sessionId + '/' + name).download({
      destination: temDir + '/' + name
    }
  ).then(() => {
    console.log('extract frames');

    return spawn(ffmpegPath, ['-i', temDir + '/' + name, temDir + '/' + username + '%d.png']);
  }).then(() => {
    const frames = fs.readdirSync(temDir);
    console.log(frames);

    for (let index in frames) {
      if (index != 0) {
        console.log('uploading');
        sourceBucket.upload(temDir + '/' + frames[index], {destination: framePath + '/' + frames[index]});
      }

      if (index == frames.length) {
        res.send('I am done');
        return;
      }
    }
  });


});
