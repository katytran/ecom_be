const utilsHelper = require("../helpers/utils.helper");
const Category = require("../models/Category");
const categoryController = {};

categoryController.getAllCategory = async (req, res, next) => {
  try {
    let { page, limit, ...filters } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    console.log(page);

    const totalCategory = await Category.find({ ...filters }).countDocuments();
    const totalPages = Math.ceil(totalCategory / limit);
    const offset = limit * (page - 1);
    const requestedCategory = await Category.find({ ...filters })
      .skip(offset)
      .limit(limit);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { requestedCategory, totalPages },
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
