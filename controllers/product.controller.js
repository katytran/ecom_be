const utilsHelper = require("../helpers/utils.helper");
const Category = require("../models/Category");
const Product = require("../models/Product");
const productControllers = {};

productControllers.getAllProduct = async (req, res, next) => {
  try {
    // change to query later
    let { page, limit, query } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 30;
    console.log("query is this: ", query);
    // fenty foundation -> "fenty" "foundation"
    if (query)
      query = query
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map((kw) => `"${kw}"`)
        .join(" ");
    console.log("kew", query);
    let totalProducts;
    let requestedProducts;
    if (query === "") {
      console.log("hi");
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

    if (query === "") {
      requestedProducts = await Product.find({}).skip(offset).limit(limit);
    } else {
      requestedProducts = await Product.find({
        $text: { $search: query },
      })
        .skip(offset)
        .limit(limit);
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
    const product = await Product.findById(productId);
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

productControllers.update = async (req, res, next) => {
  try {
    const { name, description, price, categories } = req.body;

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

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        categories: categoryIds,
      },
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
