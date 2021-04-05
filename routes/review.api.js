const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");
const reviewControllers = require("../controllers/review.controller");

/**
 * @route GET api/review/user/:id
 * @description User can see list of reviews of a user
 * @access Public
 */
// router.get("/user/:id", reviewControllers.getReview);

/**
 * @route GET api/review/product/:id
 * @description User can see list of reviews of a product
 * @access Public
 */
router.get("/:id", reviewControllers.getSingleReview);

/**
 * @route POST api/review/add
 * @description Admin can add review
 * @access Admin Required
 */
router.post(
  "/add",
  authMiddleware.loginRequired,
  reviewControllers.createReview
);

/**
 * @route POST api/review/get
 * @description everyone
 * @access everyone
 */
router.get("/", reviewControllers.getAllReview);

/**
 * @route DELETE api/review/:id/delete
 * @description Admin can delete review
 * @access Admin required
 */
router.delete(
  "/:id/delete",
  authMiddleware.loginRequired,
  reviewControllers.deleteReview
);

module.exports = router;
