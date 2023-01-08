// Basic
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

// Basic sequirity Middleware

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Database
const mongoose = require("mongoose");
// Security Middleware Implement

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body-parser implement

app.use(bodyParser.json());

// Request Rate limit

const limiter = rateLimit({ windowMS: 15 * 60 * 100, max: 3000 });
app.use(limiter);

// Mongo DB Connection

let URI = "mongodb://127.0.0.1:27017/Todo";
let OPTION = { user: "", pass: "", autoIndex: true};
mongoose.connect(URI, OPTION, (error) => {
  console.log("Connection Success");
  console.log(error);
});

// Routing implement
app.use("/api/v1", router);

// undefined route implement
app.use("*", (req, res) => {
  res.status(404), json({ status: "fail", data: "Not Found" });
});

module.exports = app;
