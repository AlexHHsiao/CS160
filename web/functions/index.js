const functions = require('firebase-functions');
const admin = require('firebase-admin');
//const express = require('express');
//var serviceAccount = require("./../sjsu-cs-160-firebase-adminsdk-qc6zo-9ffaf3cefd.json");

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello this is http");
});

