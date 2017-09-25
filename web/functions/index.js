const functions = require('firebase-functions');
const admin = require('firebase-admin');
//const express = require('express');
//var serviceAccount = require("./../sjsu-cs-160-firebase-adminsdk-qc6zo-9ffaf3cefd.json");

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello this is http");
});

/*process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']
var ffmpeg = require('ffmpeg')

exports.ffmpeg = function(event, context) {
  new ffmpeg('./thumb.MP4', function (err, video) {
    if (!err) {
      video.fnExtractFrameToJPG('/tmp', {
        every_n_frames: 20,
        file_name : 'image_frame_%t_%s'
      }, function (error, files) {
        if (!error)
          console.log('Frames: ' + files);
        context.done();
      });
    } else {
      console.log('Error: ' + err);
    }
  });
}*/

