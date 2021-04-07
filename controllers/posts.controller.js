const Post = require("../models/Post");
const utilsHelper = require("../helpers/utils.helper");

const postController = {};

postController.list = async (req, res, next) => {
  try {
    let { page, limit, title } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 9;
    let posts;
    if (title) {
      posts = await Post.find({ title: new RegExp(title, "i") })
        .sort({ createdAt: -1 })
        .populate("category")
        .populate("product")
        .populate({ path: "reviews", populate: { path: "owner" } })
        .populate({
          path: "reactions",
          populate: { path: "owner" },
        })
        .populate("owner");
    }
    if (!title) {
      posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("category")
        .populate("product")
        .populate({ path: "reviews", populate: { path: "owner" } })
        .populate({
          path: "reactions",
          populate: { path: "owner" },
        })
        .populate("owner");
    }

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { posts },
      null,
      `get ${posts.length} success`
    );
  } catch (error) {
    next(error);
  }
};

postController.listByCategory = async (req, res, next) => {
  try {
    let { category } = { ...req.query };
    let posts;
    if (category) {
      posts = await Post.find({ category: { $in: category } })
        .populate("category")
        .populate("product")
        .populate({ path: "reviews", populate: { path: "owner" } })
        .populate({
          path: "reactions",
          populate: { path: "owner" },
        })
        .populate("owner");
    }
    if (!category) {
      posts = await Post.find()
        .populate("category")
        .populate("product")
        .populate({ path: "reviews", populate: { path: "owner" } })
        .populate({
          path: "reactions",
          populate: { path: "owner" },
        })
        .populate("owner");
    }

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { posts },
      null,
      `get ${posts.length} success`
    );
  } catch (error) {
    next(error);
  }
};
postController.getDetailPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
      .populate("category")
      .populate("product")
      .populate({ path: "reviews", populate: { path: "owner" } })
      .populate("owner");

    if (!post) return next(new Error("post not exists"));

    utilsHelper.sendResponse(res, 200, true, { post }, null, "get detail post");
  } catch (error) {
    next(error);
  }
};

postController.create = async (req, res, next) => {
  try {
    const post = await Post.create({
      ...req.body,
      owner: req.userId,
    });
    utilsHelper.sendResponse(res, 200, true, { post }, null, "post created");
  } catch (error) {
    next(error);
  }
};
postController.getPostByDoctor = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };

    const posts = await Post.find({ owner: req.params.id })
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("product")
      .populate({ path: "reviews", populate: { path: "owner" } })
      .populate({
        path: "reactions",
        populate: { path: "owner" },
      })
      .populate("owner");
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { posts },
      null,
      `get ${posts.length} success`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = postController;
