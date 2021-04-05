const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
categorySchema.plugin(require("./plugins/isDeletedFalse"));

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
