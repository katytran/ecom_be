const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true }
);
reviewSchema.plugin(require("./plugins/isDeletedFalse"));

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
