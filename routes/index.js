const express = require("express");
const router = express.Router();

// userApi
const userApi = require("./user.api");
router.use("/user", userApi);

// authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);

// productApi
const productApi = require("./product.api");
router.use("/products", productApi);

// orderApi
const orderApi = require("./order.api");
router.use("/orders", orderApi);

// categoryApi
const categoryApi = require("./category.api");
router.use("/category", categoryApi);

// reviewApi
const reviewApi = require("./review.api");
router.use("/review", reviewApi);

// cloudinaryApi
const cloudinaryApi = require("./cloudinary.api");
router.use("/cloudinary", cloudinaryApi);

module.exports = router;
