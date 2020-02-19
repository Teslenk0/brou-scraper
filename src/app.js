"use strict";
const cron = require("node-cron");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

//Database
const db = require("./config/database");

//Utils
const httpStatusCodes = require("./utils/http_status_codes");

//Routes
const indexRouter = require("./routes/index");
const currencyRouter = require("./routes/currency");

//Scheduled function
const SaveLatestValues = require("./cronjob/cron");

var app = express();
db.connect();

//Run the first time
SaveLatestValues();

//Cronjob for checking values every 30 minutes
cron.schedule("0 */30 * * * *", function() {
  console.log("Executing cron job to fetch new values");
  SaveLatestValues();
});

//Mounting
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Mounting routes
app.use("/api/v1", indexRouter);
app.use("/api/v1/currency", currencyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(httpStatusCodes.NOT_FOUND));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || httpStatusCodes.INTERNAL_SERVER_ERROR);
});

module.exports = app;
