"use strict";

const httpStatusCodes = require("../utils/http_status_codes");

const moment = require("moment");
const Currency = require("../models/Currency");

//Get latest values
function GetLatest(req, res) {
  Currency.findOne({}, {}, { sort: { created_at: -1 } })
    .then(doc => {
      res.status(httpStatusCodes.OK).json(doc);
    })
    .catch(err => res.json(err));
}

//Middleware to validate date passed by param in request
function ValidateDate(req, res, next) {
  const date = req.params.date;
  var d = moment(date, "YYYY-MM-DD", true);

  if (d.isValid()) {
    req.dateValid = true;
    next();
  } else {
    req.dateValid = false;
    next();
  }
}

// GETS THE VALID DATE AND LOOK IN MONGO FOR THE LATEST
// VALUES FOR THAT DAY
//QUERY IN MONGO DB:
/*db.getCollection("currencies").find(
  { 
    "date" : { 
        "$gte" : ISODate("2020-02-19T00:00:00.000+0000"), 
        "$lte" : ISODate("2020-02-20T00:00:00.000+0000")
    }
}
).sort(
{ 
    "date" : -1.0
}
).limit(1);*/
function GetByDate(req, res) {
  if (req.dateValid) {
    let date = moment(req.params.date, "YYYY-MM-DDTHH:mm:ss.SSSZ");

    date = date.utcOffset("+0000").format("YYYY-MM-DDTHH:mm:ss.SSSZ");

    console.log(date);

    let nextDate = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      .add(1, "d")
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    console.log(nextDate);

    Currency.find({
      date: {
        $gte: date,
        $lte: nextDate
      }
    })
      .then(doc => {
        //console.log(doc);

        res.status(httpStatusCodes.OK).json(doc);
      })
      .catch(err => res.json(err));
  } else {
    res.status(httpStatusCodes.BAD_REQUEST).json({
      error: "bad_request",
      status_code: httpStatusCodes.BAD_REQUEST,
      message: "invalid date format, it must be in iso [YYYY-MM-DD]"
    });
  }
}

module.exports = {
  ValidateDate,
  GetByDate,
  GetLatest
};
