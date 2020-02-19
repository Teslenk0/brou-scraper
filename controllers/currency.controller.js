"use strict";

const httpStatusCodes = require("../utils/http_status_codes");

const Currency = require("../models/Currency");

function GetLatest(req, res) {
  Currency.findOne({}, {}, { sort: { created_at: -1 } })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => console.log(err));
}

function GetByDate(req, res) {
  res.json({
    statusCode: httpStatusCodes.NOT_IMPLEMENTED,
    message: "not_implemented"
  });
  res.statusCode = httpStatusCodes.NOT_IMPLEMENTED;
}

module.exports = {
  GetByDate,
  GetLatest
};
