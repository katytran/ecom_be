const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
reviewSchema.plugin(require("./plugins/isDeletedFalse"));

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
