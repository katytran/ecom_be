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
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    ratingAvg: { type: String, required: false },
    countInStock: { type: Number, required: true },
    countSold: { type: Number },
    images: [{ type: String, required: false }],
    isDeleted: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

// productSchema.index({ title: "text", brand: "text" });

productSchema.plugin(require("./plugins/isDeletedFalse"));

const Product = mongoose.model("Product", productSchema);
// Product.createIndexes();
module.exports = Product;
