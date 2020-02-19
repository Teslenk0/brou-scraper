"use strict";

//mongoose

const mongoose = require("mongoose");
require("dotenv").config();
//some required sets
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//config
const dbName = "brou_currencies";

const dbConnectionString = "mongodb://localhost/" + dbName;

// define the data to export
// if there is an existing connection returns it
// if not creates a new one
// like SINGLETON

module.exports = {
  connect: () =>
    mongoose.connect(process.env.MONGODB_URI || dbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
  dbName,
  connection: () => (mongoose.connection ? mongoose.connection : this.connect())
};
