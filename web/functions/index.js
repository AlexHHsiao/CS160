const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ffmpeg = require('ffmpeg');
const http = require('http');
const url = require('url');
const fs = require('fs');
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

  const getFile = url.parse(fileUrl, true);
  const fileName = "." + getFile;

/*  fs.readFile(fileName, function(err, data) {

    res.send(data);
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.send(data)
    return res.end();
  });*/
fs.readlink(fileUrl, function(err, data) {
  res.send("asdfas");
  res.send(data);
})

});





