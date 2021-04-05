const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const utilsHelper = require("../helpers/utils.helper");
const cloudinaryControllers = {};

cloudinaryControllers.upload = async (req, res) => {
  let result = cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
};

cloudinaryControllers.remove = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return Next(new Error(error));
    else {
      utilsHelper.sendResponse(
        res,
        200,
        true,
        { product },
        null,
        `Destroy ${image_id}`
      );
    }
  });
};

module.exports = cloudinaryControllers;
