const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { cache, auth, errorHandler } = require("./middleware");
const routes = require("./routes");
const MONGO_DB_URL = process.env.MONGO_DB;

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(auth());
app.use(cache(10));

app.use("/city", routes.city);
app.use("/state", routes.state);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

let initMongo = async () => {};
if (!global.TESTS) {
  initMongo = async () => {
    await mongoose
      .connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((result) => {
        console.log("MongoDB Connected");
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

module.exports = { app, initMongo };
