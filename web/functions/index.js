const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello this is http");
});

exports.addMessage = functions.https.onRequest((req, res) => {
  const original= req.query.text;

  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    res.redirect(303, snapshot.ref);
  });
});

/*exports.getUrl = functions.https.onRequest((req, res) => {
  const user= req.query.text;

  admin.database().ref('/messages').on('event', (data) => {

  });
});*/





