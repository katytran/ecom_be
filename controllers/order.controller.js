const Order = require("../models/Order");
const Product = require("../models/Product");
const utilsHelper = require("../helpers/utils.helper");
const orderControllers = {};

//Create the order
orderControllers.createOrder = async (req, res, next) => {
  try {
    const { userId, products, total } = req.body;
    const productList = [];
    let totalBe = 0;

    for (let item of products) {
      if (item.quantity < 1) {
        return next(new Error("400 - Invalid Quantity"));
      }

      let product = await Product.findById(item.id).lean();
      if (product) {
        product.quantity = item.quantity;
        totalBe += item.quantity * product.price;
        productList.push(product);
      }
    }

    if (totalBe !== total)
      return next(new Error("400 - Total Price Does Not Match"));
    if (productList.length !== 0) {
      const order = await Order.create({
        userId,
        products: productList,
        total,
      });
      utilsHelper.sendResponse(
        res,
        200,
        true,
        { order },
        null,
        "Created order successfully"
      );
    }

    return next(new Error("Invalid products id list"));
  } catch (error) {
    next(error);
  }
};

//Get detail of an order by its ID
orderControllers.getDetailOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.find({ orderId });
    if (!order) return next(new Error("401- Order not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "get detail order success"
    );
  } catch (error) {
    next(error);
  }
};

orderControllers.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { products } = req.body;
    const order = await Order.findByIdAndUpdate(
      { orderId },
      { products },
      { new: true }
    );
    if (!order) return next(new Error("401- Order not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "update order success"
    );
  } catch (error) {
    next(error);
  }
};

orderControllers.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOneAndUpdate(
      {
        _id: orderId,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!order) {
      return next(new Error("Order not found"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      `Oder ${{ ...req.params.id }} Updated Successfully`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = orderControllers;
