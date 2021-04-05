const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authentication");
/**
 * @route POST api/users/
 * @description User can register account
 * @access Public
 */

router.post("/", userController.register);

/**
 * @route GET api/user/me
 * @description Return current user info
 * @access Login required
 */
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);

/**
 * @route GET api/user/all
 * @description Return all info
 * @access Login required
 */
router.get(
  "/all",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  userController.getAllUser
);

/**
 * @route GET api/users/:id/order
 * @description Return list orders of current user
 * @access Login Required or Admin authorized
 */
router.get(
  "/:id/order",
  authMiddleware.loginRequired,
  userController.getCurrentUserOrder
);

/**
 * @route Put api/user/:id/payment
 * @description User can make payment
 * @access Login required
 */

router.put(
  "/:id/payment",
  authMiddleware.loginRequired,
  userController.paymentUserOrder
);

/**
 * @route PUT api/user/:id/topup
 * @description Top-up user balance
 * @access Admin requied
 */

router.put(
  "/:id/topup",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  userController.paymentUserOrder
);

module.exports = router;
