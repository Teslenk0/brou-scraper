"use strict";

//mongoose

const mongoose = require("mongoose");

//Schema for sell and buy costs
let ValueSchema = new mongoose.Schema({
    buy: {
        type: Number,
        required: true
    },
    sell: {
        type: Number,
        required: true
    }
});

//Schema for currencies
let CurrencySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
        index: true
    },
    USD: {
        type: ValueSchema
    },
    EBROU_USD: {
        type: ValueSchema
    },
    EUR: {
        type: ValueSchema
    },
    ARS: {
        type: ValueSchema
    },
    BRL: {
        type: ValueSchema
    },
    GBP: {
        type: ValueSchema
    },
    CHF: {
        type: ValueSchema
    },
    JPY: {
        type: ValueSchema
    },
    PYG: {
        type: ValueSchema
    },
    UNID_INDEX: {
        type: ValueSchema
    },
    ONZA_TROY: {
        type: ValueSchema
    }
});

const Currency = mongoose.model("Currency", CurrencySchema);

module.exports = Currency;
