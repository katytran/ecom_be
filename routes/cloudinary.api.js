const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");
const cloudinaryControllers = require("../controllers/cloudinary.controller");

router.post(
  "/uploadimages",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  (req, res) => console.log("in controllers")
  //cloudinaryControllers.upload
);

router.post(
  "/removeimages",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  cloudinaryControllers.remove
);

module.exports = router;
