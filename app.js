const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
require("./middlewares/passport");

const utilsHelper = require("./helpers/utils.helper");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/api", indexRouter);
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));

//SEND PAYPAL _CLIENT TO FRONT END
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT || "CHECK PAYPAL CLIENT");
});
/* DB Connections */
mongoose
  .connect(mongoURI, {
    // some options to deal with deprecated warning
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Mongoose connected to ${mongoURI}`))
  .catch((err) => console.log(err));

// catch 404 and forard to error handler
app.use((req, res, next) => {
  const err = new Error("404 - Resource not found");
  next(err);
});

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  console.log("ERROR", err);
  const statusCode = err.message.split(" - ")[0];
  const message = err.message.split(" - ")[1];
  if (!isNaN(statusCode)) {
    utilsHelper.sendResponse(res, statusCode, false, null, { message }, null);
  } else {
    utilsHelper.sendResponse(
      res,
      500,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});

module.exports = app;
