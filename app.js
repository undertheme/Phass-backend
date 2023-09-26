require("dotenv").config();
const express = require("express");
require("./service/bot");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");
const db = require("./model/index");

// CORS error fixing
app.use(cors());

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

db.sequelize
  .sync()
  .then(async () => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.use("/api", router);

module.exports = app;
