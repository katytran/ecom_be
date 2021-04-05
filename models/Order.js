const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
        brand: {
          type: String,
          required: true,
          trim: true,
          uppercase: true,
        },
        price: { type: Number, required: true },
        qty: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: false },
      },
    ],

    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address1: { type: String, required: true },
      address2: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
      lat: Number,
      lng: Number,
    },

    paymentMethod: { type: String, required: true },

    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    estimatedPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalOrderPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
orderSchema.plugin(require("./plugins/isDeletedFalse"));

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
