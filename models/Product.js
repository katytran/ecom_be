const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    ratingAvg: { type: String, required: false },
    countInStock: { type: Number, required: false },

    images: [{ type: String, required: false }],
    isDeleted: { type: Boolean, default: false },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamp: true }
);
productSchema.plugin(require("./plugins/isDeletedFalse"));

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
