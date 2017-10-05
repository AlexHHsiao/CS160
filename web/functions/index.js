const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ffmpeg = require('ffmpeg');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
admin.initializeApp(functions.config().firebase);



exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello this is http");
});

exports.addMessage = functions.https.onRequest(function (req, res) {
  const original= req.query.name;

  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    res.redirect(303, snapshot.ref);
  });
});

exports.test = functions.https.onRequest(function (req, res) {

  const fileUrl = 'https://firebasestorage.googleapis.com/v0/b/sjsu-cs-160.' +
    'appspot.com/o/video-org%2Fyizhou.yan92%40gmail.com.avi?alt=media&token=b50afc16-5005-4798-8a7e-0262f87022a1';
  const file = fs.creat


});





