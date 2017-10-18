const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ffmpeg = require('ffmpeg');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const gcs = require('@google-cloud/storage')();
const os = require('os');

admin.initializeApp(functions.config().firebase);


exports.helloWorld = functions.https.onRequest(function (request, response) {
  response.send("Hello this is http");
});

exports.addMessage = functions.https.onRequest(function (req, res) {
  const original = req.query.name;

  admin.database().ref('/messages').push({original: original}).then(function(snapshot) {
    res.redirect(303, snapshot.ref);
})
  ;
});

exports.test = functions.https.onRequest(function (req, res) {
  //const fileUrl = 'https://firebasestorage.googleapis.' +
    //'com/v0/b/sjsu-cs-160.appspot.com/o/video-org%2Fyizhou.yan92%40gmail.com.avi?alt=media&token=9f77b7b1-1a96-4cf4-8009-3485db2185ea';

  const ff = new ffmpeg('C:/Users/alexh/Desktop/alex/yizhou.yan92@gmail.com.avi');

  var process = new ffmpeg('C:/Users/alexh/Desktop/alex/yizhou.yan92@gmail.com.avi');
  //var process = new ffmpeg(fileUrl);
  process.then(function (video) {
    // Callback mode
    console.log(video);
    video.fnExtractFrameToJPG('C:/Users/alexh/Desktop/alexx', {
      frame_rate: 1,
      number: 5,
      file_name: 'my_frame_%t_%s'
    }, function (error, files) {
      if (!error)
        console.log('Frames: ' + files);
    });
  }, function (err) {
    console.log('Error: ' + err);
  });

  res.send("Hello");
});

exports.generateFrame = functions.storage.object().onChange(
  function (event) {
    const object = event.data;
    const filePath = object.name;
    const fileName = filePath.split('/').pop();
    const fileBucket = object.bucket;
    const bucket = gcs.bucket(fileBucket);
    const tmpFilePath = `/tmp/${fileName}`;

    return bucket.file(filePath).download({
      destination: tmpFilePath
    }).then(() => {
      console.log(tmpFilePath);
      var process = new ffmpeg('C:/Users/alexh/Desktop/alex/yizhou.yan92@gmail.com.avi');
      //var process = new ffmpeg(fileUrl);
      process.then(function (video) {
        // Callback mode
        console.log(video);
        video.fnExtractFrameToJPG('C:/Users/alexh/Desktop/alexx', {
          frame_rate: 1,
          number: 5,
          file_name: 'my_frame_%t_%s'
        }, function (error, files) {
          if (!error)
            console.log('Frames: ' + files);
        });
      }, function (err) {
        console.log('Error: ' + err);
      });
    });
  }
);



