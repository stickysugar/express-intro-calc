/** Simple demo Express app. */

const express = require("express");
const app = express();
const { findMode, findMedian, findMean } = require("./stats.js");
const { convertStrNums } = require("./utils.js");

// useful error class to throw
const {
  NotFoundError,
  BadRequestError,
} = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json()); // don't need yet
app.use(express.urlencoded({ extended: true })); //don't need yet

function queryExist (req, res, next) {
  const numsStr = req.query.nums;
  if (!numsStr) {
    throw new BadRequestError(MISSING);
  }
  next();
}

app.use(queryExist);

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {

  const numsStr = req.query.nums;
  const nums = convertStrNums(numsStr)
  const mean = findMean(nums);

  return res.json({ operation: "mean", mean });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  const numsStr = req.query.nums;
  const nums = convertStrNums(numsStr)
  const median = findMedian(nums);

  return res.json({ operation: "median", median });
});

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {

  const numsStr = req.query.nums;
  const nums = convertStrNums(numsStr)
  const mode = findMode(nums);

  return res.json({ operation: "mode", mode });
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});


module.exports = app;