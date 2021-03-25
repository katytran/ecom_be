const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
/**
 * @route POST api/auth/login
 * @description User can Login with email
 * @access Public
 */

router.post("/login", authController.loginWithEmail);

module.exports = router;
