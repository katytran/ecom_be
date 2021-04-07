const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    body: { type: String, unique: false, default: "" },
    owner: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
postSchema.plugin(require("./plugins/isDeletedFalse"));

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
