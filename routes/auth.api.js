const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
/**
 * @route POST api/auth/login
 * @description User can Login with email
 * @access Public
 */

router.post("/login", authController.loginWithEmail);

/**
 * @route POST api/auth/login/facebook
 * @description User can Login with FB
 * @access Public
 */
router.post(
  "/login/facebook",
  passport.authenticate("facebook-token", { session: false }),
  authController.login
);

/**
 * @route POST api/auth/login/google
 * @description User can Login with google
 * @access Public
 */
router.post(
  "/login/google",
  passport.authenticate("google-token", { session: false }),
  authController.login
);

module.exports = router;
