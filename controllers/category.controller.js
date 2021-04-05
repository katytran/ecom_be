const utilsHelper = require("../helpers/utils.helper");
const Category = require("../models/Category");
const categoryController = {};

categoryController.getAllCategory = async (req, res, next) => {
  try {
    const requestedCategories = await Category.find({});
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { requestedCategories },
      null,
      "Get all categories Success"
    );
  } catch (error) {
    next(error);
  }
};

categoryController.add = async (req, res, next) => {
  try {
    const { name } = req.body;
    let category = await Category.findOne({ name: name });
    if (!category) {
      category = await Category.create({ name: name });
      utilsHelper.sendResponse(
        res,
        200,
        true,
        { category },
        null,
        `Category ${name} Created Successfully`
      );
    } else {
      return next(new Error("Category existed"));
    }
  } catch (error) {
    next(error);
  }
};

categoryController.delete = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!category) {
      return next(new Error("Category not found"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { category },
      null,
      `Category ${req.params.id} Deleted Successfully`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = categoryController;
