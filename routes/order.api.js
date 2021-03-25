const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");
const orderControllers = require("../controllers/order.controller");

/**
 * @route POST api/order/login
 * @description User can create order
 * @access Login require
 */
router.post("/", authMiddleware.loginRequired, orderControllers.createOrder);

/**
 * @route GET api/order/login
 * @description User can see order detail
 * @access Login required
 */
router.get(
  "/:id",
  authMiddleware.loginRequired,
  orderControllers.getDetailOrder
);

/**
 * @route PUT api/order/login
 * @description User can update order
 * @access Login require
 */
router.put(
  "/:id/update",
  authMiddleware.loginRequired,
  orderControllers.updateOrder
);

/**
 * @route DELETE api/order/login
 * @description Admin can delete order
 * @access Admin required
 */
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  orderControllers.deleteOrder
);

module.exports = router;
