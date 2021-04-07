const { image } = require("faker");
const utilsHelper = require("../helpers/utils.helper");
const Category = require("../models/Category");
const Product = require("../models/Product");
const productControllers = {};

productControllers.getAllProduct = async (req, res, next) => {
  try {
    // change to query later
    let { page, limit, query, sortBy, filter } = req.query;

    // page = parseInt(page) || 1;
    // limit = parseInt(limit) || 30;
    page = parseInt(page);
    limit = parseInt(limit);

    // fenty foundation -> "fenty" "foundation"
    if (query)
      query = query
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map((kw) => `"${kw}"`)
        .join(" ");

    let totalProducts;
    let requestedProducts;
    console.log("query", query);
    if (filter !== "") {
      totalProducts = await Product.find({ category: filter }).countDocuments();
    } else if (query === "" && filter == "") {
      totalProducts = await Product.find({}).countDocuments();
    } else {
      totalProducts = await Product.find({
        //   $or: [
        //     { name: { $regex: query, $options: "i" } },
        //     { brand: { $regex: query, $options: "i" } },
        //   ],
        // }).countDocuments();
        $text: { $search: query },
      }).countDocuments();
    }

    const totalPages = Math.ceil(totalProducts / limit);
    const offset = limit * (page - 1);
    console.log(offset);
    console.log("filter", filter);
    if (filter !== "") {
      requestedProducts = await Product.find({
        category: filter,
      })
        .skip(offset)
        .limit(limit)
        .populate("category")
        .populate("reviews");
    } else if (query === "" && filter === "") {
      requestedProducts = await Product.find({})
        .skip(offset)
        .limit(limit)
        .populate("category")
        .populate("reviews");
    } else {
      requestedProducts = await Product.find({
        $text: { $search: query },
      })
        .skip(offset)
        .limit(limit)
        .populate("category")
        .populate("reviews");
    }

    // const requestedProducts = await Product.find({})
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { requestedProducts, totalPages },
      null,
      "Get all product Success"
    );
  } catch (error) {
    next(error);
  }
};

/*productControllers.getAllProduct = async (req, res, next) => {
  try {
    // change to query later
    let { page, limit, ...filters } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 30;
    console.log("filters is this: ", { ...filters });

    const totalProducts = await Product.find({
      name: { $regex: query, $options: "i" },
    }).countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    const offset = limit * (page - 1);
    console.log(offset);
    const requestedProducts = await Product.find({ ...filters })
      .skip(offset)
      .limit(limit);
    console.log("requested product", requestedProducts);
    // const requestedProducts = await Product.find({})
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { requestedProducts, totalPages },
      null,
      "Get all product Success"
    );
  } catch (error) {
    next(error);
  }
};
*/
productControllers.getSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId)
      .populate("category")
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      `Get product id: ${productId}`
    );
  } catch (error) {
    next(error);
  }
};

productControllers.add = async (req, res, next) => {
  try {
    const {
      brand,
      name,
      description,
      price,
      category,
      images,
      ingredients,
      countInStock,
    } = req.body;

    let product = await Product.findOne({ name: name });
    if (!product) {
      let imagesArray = [];
      console.log("category", category);
      let categoryBE = await Category.find({ name: category });
      console.log("categoryBE", categoryBE);
      categoryId = categoryBE[0]._id;
      console.log("categoryBE", categoryId);

      for (let item of images) {
        imagesArray.push(item);
      }

      product = await Product.create({
        brand,
        name,
        description,
        price,
        category: categoryId,
        images,
        ingredients,
        countInStock,
        images: imagesArray,
        countSold: 0,
      });
      console.log("product", product);
      // utilsHelper.sendResponse(
      //   res,
      //   200,
      //   true,
      //   { product },
      //   null,
      //   `Product ${name} Created Successfully`
      // );
    } else {
      return next(new Error("Product existed"));
    }
  } catch (error) {
    next(error);
  }
};
/*
productControllers.add = async (req, res, next) => {
  try {
    const { brand, name, description, price, categories, images } = req.body;

    let product = await Product.findOne({ name: name });
    if (!product) {
      let categoryIds = [];

      for (let item of categories) {
        let category = await Category.findOne({ name: item });
        if (category) {
          categoryIds.push(category._id);
        } else {
          category = await Category.create({ name: item });
          categoryIds.push(category._id);
        }
      }
      product = await Product.create({
        brand,
        name,
        description,
        price,
        categories: categoryIds,
        images,
      });
      utilsHelper.sendResponse(
        res,
        200,
        true,
        { product },
        null,
        `Product ${name} Created Successfully`
      );
    } else {
      return next(new Error("Product existed"));
    }
  } catch (error) {
    next(error);
  }
};

*/
productControllers.update = async (req, res, next) => {
  try {
    const {
      brand,
      name,
      description,
      price,
      category,
      images,
      ingredients,
      countInStock,
      countSold,
    } = req.body;
    console.log("category", category);

    let categoryBE = await Category.find({ name: category });
    console.log("categoryBE", categoryBE);
    categoryId = categoryBE[0]._id;
    console.log("categoryBE", categoryId);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        brand,
        name,
        description,
        price,
        category: categoryId,
        images,
        ingredients,
        countInStock,
        countSold,
      },
      { new: true }
    );
    console.log();
    if (!product) {
      return next(new Error("Product not found"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      `Product ${name} Updated Successfully`
    );
  } catch (error) {
    next(error);
  }
};

productControllers.delete = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!product) {
      return next(new Error("Product not found"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { product },
      null,
      `Product ${req.params.id} Deleted Successfully`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = productControllers;
