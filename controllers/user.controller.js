const utilsHelper = require("../helpers/utils.helper");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userController = {};

userController.register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) return next(new Error("401 - Email already exists"));

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password });

    utilsHelper.sendResponse(res, 200, true, { user }, null, "Created account");
  } catch (error) {
    next(error);
  }
};

//get current user .
userController.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log("userId", userId);
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return next(Error("No user found"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      "Return user success"
    );
  } catch (error) {
    next(error);
  }
};

//get current user .
userController.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log("users", users);
    if (!users) {
      return next(Error("No users found"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { users },
      null,
      "Return user success"
    );
  } catch (error) {
    next(error);
  }
};

//Get order of current user
userController.getCurrentUserOrder = async (req, res, next) => {
  try {
    //pagination
    //change to req.query
    let { page, limit, sortBy, ...filter } = req.body;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalOrders = await Order.count({ ...filter });
    const totalPages = Math.ceil(totalOrders / limit);
    const offset = limit * (page - 1);

    //current user
    const currentUserId = req.userId;
    const currentUser = await User.findById(currentUserId);

    //target user
    const userId = req.params.id;

    // current user request other Order
    if (userId !== currentUserId && currentUser.role !== "admin") {
      return next(
        new Error("401- only admin able to check other user Order detail")
      );
    }
    // current user request its Order or Admin request user's order
    const order = await Order.find({ userId })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    // in case no order
    if (!order) return next(new Error(`401- ${userId} has no order`));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order, totalPages },
      null,
      "get order from userId success"
    );
  } catch (error) {
    next(error);
  }
};

userController.paymentUserOrder = async (req, res, next) => {
  try {
    //get request detail
    const { orderId } = req.params.id;
    const currentUserId = req.userId;

    //find the order to pay , get balance
    let order = await Order.findById(orderId);
    let currentUser = await User.findById(currentUserId);
    const total = order.total;
    const funds = currentUser.balance;
    //check funds
    if (total > funds) return next(new Error("403-Insufficient balance"));

    // update new balance
    currentUser = await User.findOneAndUpdate(
      {
        _id: currentUserId,
      },
      { balance: funds - total },
      { new: true }
    );
    //update new order
    order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { status: "paid" },
      { new: true }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "Payment success"
    );
  } catch (error) {
    next(error);
  }
};

//do the topup again
userController.topupOrder = async (req, res, next) => {
  try {
    //get request detail
    const { orderId } = req.params.id;
    const currentUserId = req.userId;

    //find the order to pay , get balance
    let order = await Order.findById(orderId);
    let currentUser = await User.findById(currentUserId);
    const total = order.total;
    const funds = currentUser.balance;
    //check funds
    if (total > funds) return next(new Error("403-Insufficient balance"));

    // update new balance
    currentUser = await User.findOneAndUpdate(
      {
        _id: currentUserId,
      },
      { balance: funds - total },
      { new: true }
    );
    //update new order
    order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { status: "paid" },
      { new: true }
    );
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "Payment success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
