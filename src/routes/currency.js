"use strict";
var express = require("express");
var router = express.Router();

var currencyController = require("../controllers/currency.controller");

/* GET users listing. */
router.route("/latest").get(currencyController.GetLatest);

router
    .route("/:date")
    .get(currencyController.ValidateDate, currencyController.GetByDate);

module.exports = router;
