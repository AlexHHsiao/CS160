//const functions = require('firebase-functions');
//const admin = require('firebase-admin');
const express = require('express')
const app = express();
const ffmpeg = require('ffmpeg');




app.get('/test', function(req, res) {
  res.send("Hello World!tttt");
 // var url = res.url;
 // console.log(url);
  try {
			var process = new ffmpeg('C:/Users/Yizhou/Desktop/1.avi');
			process.then(function (video) {
				// Video metadata
				console.log(video.metadata);
				// FFmpeg configuration
				console.log(video.info_configuration);
			}, function (err) {
				console.log('Error: ' + err);
			});
		} catch (e) {
			console.log(e.code);
			console.log(e.msg);
		}
});



app.listen(3000);
console.log('Running');
















// admin.initializeApp(functions.config().firebase);
//
//
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello this is http");
// });
//
// exports.addMessage = functions.https.onRequest((req, res) => {
//   const original= req.query.text;
//
//   admin.database().ref('/messages').push({original: original}).then(snapshot => {
//     res.redirect(303, snapshot.ref);
//   });
// });

/*exports.getUrl = functions.https.onRequest((req, res) => {
  const user= req.query.text;

  admin.database().ref('/messages').on('event', (data) => {

  });
});*/





