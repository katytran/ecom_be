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
        quantity: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        images: [{ imageUrl: { type: String, required: false } }],
      },
    ],
    status: { type: String, emum: ["pending", "paid"], default: "pending" },
    total: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true }
);
orderSchema.plugin(require("./plugins/isDeletedFalse"));

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
