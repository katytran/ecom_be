const utilsHelper = require("../helpers/utils.helper");
const Review = require("../models/Review");
const reviewControllers = {};

reviewControllers.createReview = async (req, res, next) => {
  try {
    res.send("review create");
  } catch (error) {
    next(error);
  }
};

reviewControllers.getReview = async (req, res, next) => {
  try {
    res.send("review get");
  } catch (error) {
    next(error);
  }
};

reviewControllers.deleteReview = async (req, res, next) => {
  try {
    res.send("review delete");
  } catch (error) {
    next(error);
  }
};

module.exports = reviewControllers;
