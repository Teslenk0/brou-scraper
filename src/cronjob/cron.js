"use strict";

const Currency = require("../models/Currency");

const currencyScraper = require("../utils/scraper");

//This function checks for a new cotization
//This is scheduled every 6 hours in the cron

const SaveLatestValues = () => {
  currencyScraper()
    .then(data => {
      console.log(data);

      Currency.create(data)
        .then(doc => console.log(doc))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

module.exports = SaveLatestValues;
