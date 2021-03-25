const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");
const categoryController = require("../controllers/category.controller");

//
/**
 * @route GET api/category?page=1&limit=10
 * @description User can see list of all categorys
 * @access Public
 */
router.get("/", categoryController.getAllCategory);

/**
 * @route POST api/category/add
 * @description Admin can add category
 * @access Admin Required
 */
router.post(
  "/add",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  categoryController.add
);

/**
 * @route DELETE api/category/:id/delete
 * @description Admin can delete category
 * @access Admin required
 */
router.delete(
  "/:id/delete",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  categoryController.delete
);

module.exports = router;
