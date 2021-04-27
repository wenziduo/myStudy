const express = require("express");

const expressMiddleware = express();

expressMiddleware.use(function (req, res, next) {
  console.log("01 - start");
  next();
  console.log("01 - end");
});
expressMiddleware.use(function (req, res, next) {
  console.log("02 - start");
  next();
  console.log("02 - end");
});
expressMiddleware.use(function (req, res, next) {
  console.log("03 - start");
  next();
  console.log("03 - end");
});
expressMiddleware.get("/", function (req, res, next) {
  res.send("Hello World!");
});

expressMiddleware.listen(3009);
