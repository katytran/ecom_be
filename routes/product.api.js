const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");
const productControllers = require("../controllers/product.controller");

//
/**
 * @route GET api/product?page=1&limit=10
 * @description User can see list of all products
 * @access Public
 */
router.get("/", productControllers.getAllProduct);

/**
 * @route GET api/product/:id
 * @description Get single product
 * @access Public
 */
router.get("/:id", productControllers.getSingleProduct);

/**
 * @route POST api/product/add
 * @description Admin can add product
 * @access Admin Required
 */
router.post(
  "/add",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productControllers.add
);

/**
 * @route PUT api/product/:id/update
 * @description Admin can update product
 * @access Admin required
 */
router.put(
  "/:id/update",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productControllers.update
);

/**
 * @route DELETE api/product/:id/delete
 * @description Admin can delete product
 * @access Admin required
 */
router.delete(
  "/:id/delete",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  productControllers.delete
);

module.exports = router;
