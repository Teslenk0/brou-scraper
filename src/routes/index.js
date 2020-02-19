"use strict";

var express = require("express");
var router = express.Router();

const httpStatusCodes = require("../utils/http_status_codes");

const API_INFORMATION = {
  api: "BROU-scraper",
  api_version: "1.0.1",
  author: "Brahian Pena",
  endpoints: {
    get_latest: {
      http_method: "GET",
      route: "/api/v1/currency/latest"
    },
    get_by_date: {
      date_format: "YYYY-MM-DD",
      http_method: "GET",
      route: "/api/v1/currency/:day_wanted"
    }
  }
};

/* GET api information page (home). */
router.get("/", function(req, res, next) {
  res.json(API_INFORMATION);
  res.statusCode = httpStatusCodes.OK;
});

module.exports = router;
