const Order = require("../models/Order");
const Product = require("../models/Product");
const utilsHelper = require("../helpers/utils.helper");
const orderControllers = {};
const email = require("../helpers/email");

orderControllers.getAllOrder = async (req, res, next) => {
  try {
    requestedOrders = await Order.find({}).populate("userId");

    if (requestedOrders) {
      utilsHelper.sendResponse(
        res,
        200,
        true,
        { requestedOrders },
        null,
        "Get all order Success"
      );
    } else return new (Error("400 - No orders found"))();
  } catch (error) {
    next(error);
  }
};

//Create the order
orderControllers.createOrder = async (req, res, next) => {
  try {
    const {
      userId,
      products,
      shippingAddress,
      paymentMethod,
      estimatedPrice,
      shippingPrice,
      taxPrice,
      totalOrderPrice,
    } = req.body;
    console.log("estimated price", estimatedPrice);

    const productList = [];
    let estimated_BE = 0;

    for (let item of products) {
      if (item.qty < 1) {
        return next(new Error("400 - Invalid Quantity"));
      }

      //let product = await Product.findById(item._id);

      let product = await Product.findById(item._id).lean();

      if (product) {
        // update product count in stock
        let countInStock = product.countInStock;
        let countSold = product.countSold;
        console.log("CountInstock ", countInStock);
        console.log("Countsold ", countSold);

        if (countInStock > item.qty) {
          countInStock = countInStock - item.qty;
          countSold = Number(countSold) + Number(item.qty);
          let updatedProduct = await Product.findByIdAndUpdate(
            item._id,
            {
              countInStock,
              countSold,
            },
            { new: true }
          );
          console.log("updated product", updatedProduct);
        } else return next(new Error("400 - Not enough counts in stock"));

        console.log("CountInstock update", countInStock);
        console.log("Countsold update", countSold);
        product.image = product.images[0];
        product.qty = item.qty;
        estimated_BE += item.qty * product.price;
        console.log("product found", product);
        productList.push(product);
      }
    }
    console.log("total estimated", estimated_BE);

    const shippingPrice_BE = estimated_BE > 100 ? 0 : 10;
    const taxPrice_BE = 0.09 * estimated_BE;
    const total_BE = (estimated_BE + shippingPrice_BE + taxPrice_BE).toFixed(2);

    console.log("shiping be", shippingPrice_BE);
    console.log("total be", total_BE);
    console.log("total Order", totalOrderPrice);
    if (total_BE != totalOrderPrice)
      return next(new Error("400 - Total Price Does Not Match"));

    if (productList.length !== 0) {
      const order = await Order.create({
        userId,
        products: productList,
        shippingAddress,
        paymentMethod,
        estimatedPrice,
        shippingPrice,
        taxPrice,
        totalOrderPrice,
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
    const order = await Order.findById(orderId);
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

orderControllers.getMyOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const order = await Order.find({
      userId,
      isPaid: true,
    });
    if (!order) return next(new Error("401- Order not found"));
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "get my orders success"
    );
    console.log("orders", order);
  } catch (error) {
    next(error);
  }
};

orderControllers.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { products } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
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

orderControllers.updateOrderPayment = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const paymentResult = req.body.paymentResult;
    console.log("payment result", paymentResult);

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        isPaid: true,
        paidAt: Date.now(),
        paymentResult: paymentResult,
      },
      { new: true }
    );
    if (!order) return next(new Error("401- Order not found"));
    email.sendTestEmail();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { order },
      null,
      "update order payment success"
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
