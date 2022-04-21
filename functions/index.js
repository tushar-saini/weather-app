const functions = require("firebase-functions");
const express = require("express");
const app = express();

const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
initializeApp();

const db = getFirestore();

app.get("/", (req, res) => {
  res.send("Welcome to the app......");
});

app.get("/adddata", (request, response) => {
  // Add a new document in collection "cities"
  let data = {};
  let id = "test";
  for (var param in request.query) {
    if (param === "id") {
      id = request.query[param]
    } else {
      data[param] = request.query[param];
    }
  }

  data['timestamp'] = FieldValue.serverTimestamp();
  data['unix_timestamp'] = new Date().getTime();

  db.collection(id).add(data).then(() => {
      response.send("Data saved successfully.");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
});


exports.app = functions.https.onRequest(app);
