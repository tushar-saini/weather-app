const functions = require("firebase-functions");
const express = require("express");

const app = express();
app.set("views", "./views");
app.set("view engine", "pug");

// Dashboard showing the visualization
const dashboard = require("./routes/dashboard");


const {
  initializeApp,
} = require("firebase-admin/app");
const {
  getFirestore, FieldValue,
} = require("firebase-admin/firestore");
initializeApp();

const db = getFirestore();

// Main web page
app.get("/", (request, response) => {
  response.render("index");
});

// Dashboard web page
app.get("/dashboard", (request, response) => {
  // Get location from GET params
  let id; // Shows the location or device id.
  request.query["id"] ? id = request.query["id"] : id = "shimla";
  dashboard.showDashboard(db, id, response);
});

// Research page
app.get("/research", (request, response) => {
  response.render("research");
});


app.get("/adddata", (request, response) => {
  // Add a new document in collection "cities"
  const data = {};
  let id = "test";
  for (const param in request.query) {
    if (param === "id") {
      id = request.query[param];
    } else {
      data[param] = request.query[param];
    }
  }

  data["timestamp"] = FieldValue.serverTimestamp();
  data["unix_timestamp"] = new Date().getTime();

  db.collection(id).add(data).then(() => {
    response.send("Data saved successfully.");
  }).catch((error) => {
    console.error("Error writing document: ", error);
  });
});


exports.app = functions.https.onRequest(app);
