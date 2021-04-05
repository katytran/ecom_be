const utilsHelper = require("../helpers/utils.helper");
const Review = require("../models/Review");
const Product = require("../models/Product");
const reviewControllers = {};

reviewControllers.createReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId, rating, title, body } = req.body;

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      title,
      body,
    });

    const product = await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id },
    });

    if (!product) {
      return next(new Error("401- Product not found"));
    }

    console.log("product", product);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { review },
      null,
      `Create Review Success`
    );
  } catch (error) {
    next(error);
  }
};

reviewControllers.getSingleReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    console.log("review", reviewId);
    const review = await Review.findById(reviewId)
      .populate("user")
      .populate("product");
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { review },
      null,
      `Get Review id: ${reviewId}`
    );
  } catch (error) {
    next(error);
  }
};

reviewControllers.getAllReview = async (req, res, next) => {
  try {
    let { productId, page, limit, query, sortBy, filter } = req.query;
    console.log("in here");
    console.log("product Id", productId);
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 30;

    if (query)
      query = query
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map((kw) => `"${kw}"`)
        .join(" ");

    let totalReviews;
    let requestedReviews;
    console.log("query", query);
    if (filter !== "") {
      totalReviews = await Review.find({
        product: productId,
        rating: filter,
      }).countDocuments();
    } else if (query === "" && filter == "") {
      totalReviews = await Review.find({ product: productId }).countDocuments();
    } else {
      totalReviews = await Review.find({
        product: productId,
        //   $or: [
        //     { title: { $regex: query, $options: "i" } },
        //     { body: { $regex: query, $options: "i" } },
        //   ],
        // }).countDocuments();
        $text: { $search: query },
      }).countDocuments();
    }

    const totalPages = Math.ceil(totalReviews / limit);
    const offset = limit * (page - 1);
    console.log(offset);
    console.log("filter", filter);
    if (filter !== "") {
      requestedReviews = await Review.find({
        product: productId,
        rating: filter,
      })
        .sort({ rating: -1 })
        .skip(offset)
        .limit(limit);
    } else if (query === "" && filter === "") {
      requestedReviews = await Review.find({ product: productId })
        .sort({ rating: -1 })
        .skip(offset)
        .limit(limit);
    } else {
      requestedReviews = await Review.find({
        $text: { $search: query },
      })
        .sort({ rating: -1 })
        .skip(offset)
        .limit(limit);
    }

    // const requestedReviews = await Review.find({})
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { requestedReviews, totalPages },
      null,
      "Get all Review Success"
    );
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
