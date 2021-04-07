const Comment = require("../models/Comment");
const utilsHelper = require("../helpers/utils.helper");

const commentsController = {};

commentsController.create = catchAsync(async (req, res) => {
  const comment = await Comment.create({
    owner: req.userId,
    body: req.body.body,
    post: req.body.postId,
  });

  // Here we'd need to update the post as well.

  res.json(comment);
});

commentsController.read = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id }).populate(
    "owner"
  );
  if (!comment) {
    res.status(404).json({ message: "Comment not found." });
  } else {
    res.json(comment);
  }
};

commentsController.update = async (req, res) => {
  await Comment.findByIdAndUpdate(
    { _id: req.params.id },
    { email: req.body.email },
    { new: true },
    (err, comment) => {
      console.log({ err, comment });
      if (!comment) {
        res.status(404).json({ message: "Comment not found." });
      } else {
        res.json(comment);
      }
    }
  );
};

commentsController.destroy = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (!comment) {
      res.status(404).json({ message: "Comment not found." });
    } else {
      res.json(comment);
    }
  });
};

commentsController.list = async (req, res) => {
  await Comment.find({}, (err, comments) => {
    if (!comments) {
      res.status(404).json({ message: "Comments not found." });
    } else {
      res.json(comments);
    }
  });
};

module.exports = commentsController;
