const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");
const orderControllers = require("../controllers/order.controller");

/**
 * @route GET api/orders
 * @description User can see order history
 * @access Login required
 */
router.get(
  "/myorders",
  authMiddleware.loginRequired,
  orderControllers.getMyOrder
);

/**
 * @route GET api/orders
 * @description User can see order detail
 * @access Login required
 */
router.get(
  "/:id",
  authMiddleware.loginRequired,
  orderControllers.getDetailOrder
);
/**
 * @route POST api/orders
 * @description User can create order
 * @access Login require
 */
router.post("/add", authMiddleware.loginRequired, orderControllers.createOrder);

/**
 * @route GET api/orders
 * @description User can see order detail
 * @access Login required
 */
router.get(
  "/:id",
  authMiddleware.loginRequired,
  orderControllers.getDetailOrder
);

/**
 * @route PUT api/orders/:id
 * @description Admin can update order
 * @access Login require
 */
router.put(
  "/:id/update",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  orderControllers.updateOrder
);

/**
 * @route PUT api/orders/:id/pay
 * @description Update payment order to true
 * @access Login require
 */
router.put(
  "/:id/pay",
  authMiddleware.loginRequired,
  orderControllers.updateOrderPayment
);

/**
 * @route DELETE api/order/login
 * @description Admin can delete order
 * @access
 */
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  orderControllers.deleteOrder
);

module.exports = router;
