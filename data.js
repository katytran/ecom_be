const Product = require("./models/Product");
const Category = require("./models/Category");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const faker = require("faker");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const Review = require("./models/Review");

const imageToBase64 = require("image-to-base64");

cloudinary.config({
  cloud_name: "dqpygpxb7",
  api_key: "685213955419871",
  api_secret: "oJpnja9nbZToY-H6htfrCaRyo78",
});

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    // some options to deal with deprecated warning
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongoose connected to ${mongoURI}`);
    generateData();
    //generateUser();
  })

  .catch((err) => console.log(err));

const data = [
  {
    name: "Double Wear Stay-in-Place Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2112167-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2112167-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2112167-av-02-zoom.jpg?imwidth=930",
    brand: "Estée Lauder",
    category: "foundation-makeup",
    price: "$43.00",
  },
  {
    name: "Super Serum Skin Tint SPF 40 Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2428779-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2428779-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2428779-av-02-zoom.jpg?imwidth=930",
    brand: "ILIA",
    category: "foundation-makeup",
    price: "$48.00",
  },
  {
    name: "Luminous Silk Perfect Glow Flawless Oil-Free Foundation",
    img1:
      "https://sephora.com/productimages/sku/s1359538-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1359538-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1359538-av-02-zoom.jpg?imwidth=930",
    brand: "Armani Beauty",
    category: "foundation-makeup",
    price: "$64.00",
  },
  {
    name: "Pro Filt'r Soft Matte Longwear Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2164671-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2164671-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2164671-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "foundation-makeup",
    price: "$36.00",
  },
  {
    name: "CC+ Cream with SPF 50+",
    img1:
      "https://sephora.com/productimages/sku/s1868157-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1868157-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1868157-av-02-zoom.jpg?imwidth=930",
    brand: "IT Cosmetics",
    category: "foundation-makeup",
    price: "$39.50",
  },
  {
    name: "Ultra HD Invisible Cover Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2246726-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2246726-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2246726-av-02-zoom.jpg?imwidth=930",
    brand: "MAKE UP FOR EVER",
    category: "foundation-makeup",
    price: "$43.00",
  },
  {
    name: "#FauxFilter Luminous Matte Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2425353-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2425353-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2425353-av-02-zoom.jpg?imwidth=930",
    brand: "HUDA BEAUTY",
    category: "foundation-makeup",
    price: "$40.00",
  },
  {
    name:
      "COMPLEXION RESCUE™ Tinted Moisturizer with Hyaluronic Acid and Mineral SPF 30",
    img1:
      "https://sephora.com/productimages/sku/s2176972-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2176972-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2176972-av-02-zoom.jpg?imwidth=930",
    brand: "bareMinerals",
    category: "foundation-makeup",
    price: "$33.00",
  },
  {
    name: "Natural Radiant Longwear Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2031011-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2031011-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2031011-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "foundation-makeup",
    price: "$49.00",
  },
  {
    name: "Original Loose Powder Mineral Foundation SPF 15",
    img1:
      "https://sephora.com/productimages/sku/s1922541-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1922541-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1922541-av-02-zoom.jpg?imwidth=930",
    brand: "bareMinerals",
    category: "foundation-makeup",
    price: "$32.00",
  },
  {
    name: "Teint Idole Ultra Long Wear Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2169845-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2169845-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2169845-av-02-zoom.jpg?imwidth=930",
    brand: "Lancôme",
    category: "foundation-makeup",
    price: "$47.00",
  },
  {
    name: "Tinted Moisturizer Natural Skin Perfector Broad Spectrum SPF 30",
    img1:
      "https://sephora.com/productimages/sku/s2250611-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2250611-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2250611-av-02-zoom.jpg?imwidth=930",
    brand: "Laura Mercier",
    category: "foundation-makeup",
    price: "$47.00",
  },
  {
    name: "Pro Filt'r Soft Matte Powder Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2413631-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2413631-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2413631-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "foundation-makeup",
    price: "$36.00",
  },
  {
    name: "Born This Way Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2084648-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2084648-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2084648-av-02-zoom.jpg?imwidth=930",
    brand: "Too Faced",
    category: "foundation-makeup",
    price: "$40.00",
  },
  {
    name: "Dior Airflash Spray Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2224848-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2224848-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2224848-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "foundation-makeup",
    price: "$62.00",
  },
  {
    name: "Soft Matte Complete Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2374502-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2374502-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2374502-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "foundation-makeup",
    price: "$40.00",
  },
  {
    name: "Reboot Active Care Revitalizing Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2308443-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2308443-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2308443-av-02-zoom.jpg?imwidth=930",
    brand: "MAKE UP FOR EVER",
    category: "foundation-makeup",
    price: "$39.00",
  },
  {
    name: "BACKSTAGE Face & Body Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2070712-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2070712-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2070712-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "foundation-makeup",
    price: "$40.00",
  },
  {
    name: "Liquid Touch Weightless Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2361285-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2361285-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2361285-av-02-zoom.jpg?imwidth=930",
    brand: "Rare Beauty by Selena Gomez",
    category: "foundation-makeup",
    price: "$29.00",
  },
  {
    name: "Matte Velvet Skin Blurring Powder Foundation",
    img1:
      "https://sephora.com/productimages/sku/s2209906-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2209906-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2209906-av-02-zoom.jpg?imwidth=930",
    brand: "MAKE UP FOR EVER",
    category: "foundation-makeup",
    price: "$38.00",
  },
  {
    name: "Radiant Creamy Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2172310-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2172310-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2172310-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "concealer",
    price: "$30.00",
  },
  {
    name: "Under Eye Brightening Corrector",
    img1:
      "https://sephora.com/productimages/sku/s1660547-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1660547-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1660547-av-02-zoom.jpg?imwidth=930",
    brand: "BECCA Cosmetics",
    category: "concealer",
    price: "$32.00",
  },
  {
    name: "Vanish™ Airbrush Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2303006-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2303006-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2303006-av-02-zoom.jpg?imwidth=930",
    brand: "Hourglass",
    category: "concealer",
    price: "$34.00",
  },
  {
    name: "Soft Matte Complete Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2371425-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2371425-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2371425-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "concealer",
    price: "$30.00",
  },
  {
    name: "Match Stix Trio",
    img1:
      "https://sephora.com/productimages/sku/s1925841-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1925841-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1925841-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "concealer",
    price: "$27.00 $54.00 ($75.00 value)",
  },
  {
    name: "Born This Way Super Coverage Multi-Use Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2222982-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2222982-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2222982-av-02-zoom.jpg?imwidth=930",
    brand: "Too Faced",
    category: "concealer",
    price: "$30.00",
  },
  {
    name: "Bye Bye Under Eye Full Coverage Anti-Aging Waterproof Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2137834-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2137834-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2137834-av-02-zoom.jpg?imwidth=930",
    brand: "IT Cosmetics",
    category: "concealer",
    price: "$28.00",
  },
  {
    name: "Match Stix Matte Contour Skinstick",
    img1:
      "https://sephora.com/productimages/sku/s1925577-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1925577-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1925577-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "concealer",
    price: "$25.00",
  },
  {
    name: "Maracuja Creaseless Undereye Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2094548-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2094548-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2094548-av-02-zoom.jpg?imwidth=930",
    brand: "tarte",
    category: "concealer",
    price: "$26.00",
  },
  {
    name: "Pro Filt'r Instant Retouch Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2173367-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2173367-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2173367-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "concealer",
    price: "$26.00",
  },
  {
    name: "True Skin Serum Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2196871-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2196871-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2196871-av-02-zoom.jpg?imwidth=930",
    brand: "ILIA",
    category: "concealer",
    price: "$30.00",
  },
  {
    name: "Mini Vanish™ Airbrush Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2409415-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2409415-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2409415-av-02-zoom.jpg?imwidth=930",
    brand: "Hourglass",
    category: "concealer",
    price: "$15.00",
  },
  {
    name: "Dior Forever Skin Correct Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2303634-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2303634-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2303634-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "concealer",
    price: "$36.00",
  },
  {
    name: "Revealer Super Creamy + Brightening Concealer and Daytime Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2333771-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2333771-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2333771-av-02-zoom.jpg?imwidth=930",
    brand: "Kosas",
    category: "concealer",
    price: "$28.00",
  },
  {
    name: "Liquid Touch Brightening Concealer",
    img1:
      "https://sephora.com/productimages/sku/s2362028-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2362028-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2362028-av-02-zoom.jpg?imwidth=930",
    brand: "Rare Beauty by Selena Gomez",
    category: "concealer",
    price: "$19.00",
  },
  {
    name: "Touché Éclat All-Over Brightening Concealer Pen",
    img1:
      "https://sephora.com/productimages/sku/s2209344-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2209344-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2209344-av-02-zoom.jpg?imwidth=930",
    brand: "Yves Saint Laurent",
    category: "concealer",
    price: "$38.00",
  },
  {
    name: "Under Eye Corrector",
    img1:
      "https://sephora.com/productimages/sku/s1317650-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1317650-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1317650-av-02-zoom.jpg?imwidth=930",
    brand: "Bobbi Brown",
    category: "concealer",
    price: "$29.00",
  },
  {
    name: "Magic Vanish Color Corrector",
    img1:
      "https://sephora.com/productimages/sku/s2245090-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2245090-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2245090-av-02-zoom.jpg?imwidth=930",
    brand: "Charlotte Tilbury",
    category: "concealer",
    price: "$32.00",
  },
  {
    name: "Make No Mistake Foundation & Concealer Stick",
    img1:
      "https://sephora.com/productimages/sku/s1887389-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1887389-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1887389-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "concealer",
    price: "$14.00 $20.00",
  },
  {
    name: "Bright Future Gel Serum Concealer",
    img1:
      "https://sephora.com/productimages/sku/s1686153-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1686153-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1686153-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "concealer",
    price: "$14.00",
  },
  {
    name: "Glam Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2378313-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2378313-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2378313-av-02-zoom.jpg?imwidth=930",
    brand: "Natasha Denona",
    category: "eyeshadow-palettes",
    price: "$65.00",
  },
  {
    name: "Naked Wild West Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2418085-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2418085-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2418085-av-02-zoom.jpg?imwidth=930",
    brand: "Urban Decay",
    category: "eyeshadow-palettes",
    price: "$49.00",
  },
  {
    name: "BACKSTAGE Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2343986-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2343986-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2343986-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "eyeshadow-palettes",
    price: "$49.00",
  },
  {
    name: "Tartelette™ Juicy Amazonian Clay Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2370609-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2370609-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2370609-av-02-zoom.jpg?imwidth=930",
    brand: "tarte",
    category: "eyeshadow-palettes",
    price: "$45.00",
  },
  {
    name: "Luxury Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2308211-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2308211-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2308211-av-02-zoom.jpg?imwidth=930",
    brand: "Charlotte Tilbury",
    category: "eyeshadow-palettes",
    price: "$53.00",
  },
  {
    name: "Mothership VIII Eyeshadow Palette - Divine Rose II Collection",
    img1:
      "https://sephora.com/productimages/sku/s2436731-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2436731-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2436731-av-02-zoom.jpg?imwidth=930",
    brand: "PAT McGRATH LABS",
    category: "eyeshadow-palettes",
    price: "$125.00",
  },
  {
    name: "Coach x Sephora Collection Sharky Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2324150-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2324150-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2324150-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "eyeshadow-palettes",
    price: "$38.00",
  },
  {
    name: "Eye Color Quad Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2428126-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2428126-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2428126-av-02-zoom.jpg?imwidth=930",
    brand: "TOM FORD",
    category: "eyeshadow-palettes",
    price: "$88.00",
  },
  {
    name: "Coach x Sephora Collection Rexy Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2324143-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2324143-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2324143-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "eyeshadow-palettes",
    price: "$38.00",
  },
  {
    name: "Circo Loco Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2435865-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2435865-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2435865-av-02-zoom.jpg?imwidth=930",
    brand: "Natasha Denona",
    category: "eyeshadow-palettes",
    price: "$129.00",
  },
  {
    name: "Naked2 Basics Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s1637719-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1637719-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1637719-av-02-zoom.jpg?imwidth=930",
    brand: "Urban Decay",
    category: "eyeshadow-palettes",
    price: "$29.00",
  },
  {
    name: "Naughty Nude Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2396844-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2396844-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2396844-av-02-zoom.jpg?imwidth=930",
    brand: "HUDA BEAUTY",
    category: "eyeshadow-palettes",
    price: "$67.00",
  },
  {
    name: "Naked3 Palette",
    img1:
      "https://sephora.com/productimages/sku/s1573336-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1573336-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1573336-av-02-zoom.jpg?imwidth=930",
    brand: "Urban Decay",
    category: "eyeshadow-palettes",
    price: "$54.00",
  },
  {
    name: "Soft Glam Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2036481-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2036481-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2036481-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyeshadow-palettes",
    price: "$45.00",
  },
  {
    name: "Obsessions Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2137230-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2137230-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2137230-av-02-zoom.jpg?imwidth=930",
    brand: "HUDA BEAUTY",
    category: "eyeshadow-palettes",
    price: "$27.00",
  },
  {
    name: "Love Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2304822-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2304822-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2304822-av-02-zoom.jpg?imwidth=930",
    brand: "Natasha Denona",
    category: "eyeshadow-palettes",
    price: "$65.00",
  },
  {
    name: "The New Nude Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2137289-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2137289-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2137289-av-02-zoom.jpg?imwidth=930",
    brand: "HUDA BEAUTY",
    category: "eyeshadow-palettes",
    price: "$65.00",
  },
  {
    name: "Eye-Conic Multi-Finish Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2337855-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2337855-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2337855-av-02-zoom.jpg?imwidth=930",
    brand: "Marc Jacobs Beauty",
    category: "eyeshadow-palettes",
    price: "$49.50",
  },
  {
    name: "Master Mattes™ Eyeshadow Palette",
    img1:
      "https://sephora.com/productimages/sku/s2389518-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2389518-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2389518-av-02-zoom.jpg?imwidth=930",
    brand: "MAKEUP BY MARIO",
    category: "eyeshadow-palettes",
    price: "$48.00",
  },
  {
    name: "Artist Color Eye Shadow",
    img1:
      "https://sephora.com/productimages/sku/s2033454-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2033454-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2033454-av-02-zoom.jpg?imwidth=930",
    brand: "MAKE UP FOR EVER",
    category: "eyeshadow-palettes",
    price: "$17.00",
  },
  {
    name: "Highliner Gel Eye Crayon Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s1501311-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1501311-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1501311-av-02-zoom.jpg?imwidth=930",
    brand: "Marc Jacobs Beauty",
    category: "eyeliner",
    price: "$26.00",
  },
  {
    name: "Stay All Day® Waterproof Liquid Eye Liner",
    img1:
      "https://sephora.com/productimages/sku/s1221084-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1221084-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1221084-av-02-zoom.jpg?imwidth=930",
    brand: "stila",
    category: "eyeliner",
    price: "$22.00",
  },
  {
    name: "Tattoo Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s1177567-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1177567-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1177567-av-02-zoom.jpg?imwidth=930",
    brand: "KVD Beauty",
    category: "eyeliner",
    price: "$21.00",
  },
  {
    name: "24/7 Glide-On Waterproof Eyeliner Pencil",
    img1:
      "https://sephora.com/productimages/sku/s1393693-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1393693-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1393693-av-02-zoom.jpg?imwidth=930",
    brand: "Urban Decay",
    category: "eyeliner",
    price: "$22.00",
  },
  {
    name: "Retractable Waterproof Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s1118033-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1118033-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1118033-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "eyeliner",
    price: "$13.00",
  },
  {
    name: "Life Liner Double Ended Eyeliner Liquid & Pencil",
    img1:
      "https://sephora.com/productimages/sku/s2282606-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2282606-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2282606-av-02-zoom.jpg?imwidth=930",
    brand: "HUDA BEAUTY",
    category: "eyeliner",
    price: "$12.00 $25.00",
  },
  {
    name: "Heavy Metal Glitter Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s2235653-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2235653-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2235653-av-02-zoom.jpg?imwidth=930",
    brand: "Urban Decay",
    category: "eyeliner",
    price: "$21.00",
  },
  {
    name: "Fineliner Ultra-Skinny Gel Eye Crayon Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s1773118-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1773118-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1773118-av-02-zoom.jpg?imwidth=930",
    brand: "Marc Jacobs Beauty",
    category: "eyeliner",
    price: "$25.00",
  },
  {
    name: "12 Hour Contour Pencil Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s1473743-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1473743-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1473743-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "eyeliner",
    price: "$11.00",
  },
  {
    name: "Colorful Wink-It Felt Tip Liquid Eyeliner - Waterproof",
    img1:
      "https://sephora.com/productimages/sku/s1698695-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1698695-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1698695-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "eyeliner",
    price: "$14.00",
  },
  {
    name: "Colorful Shadow & Liner",
    img1:
      "https://sephora.com/productimages/sku/s1642081-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1642081-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1642081-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "eyeliner",
    price: "$14.00",
  },
  {
    name: "Artist Color Pencil: Eye, Lip & Brow Pencil",
    img1:
      "https://sephora.com/productimages/sku/s2072437-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2072437-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2072437-av-02-zoom.jpg?imwidth=930",
    brand: "MAKE UP FOR EVER",
    category: "eyeliner",
    price: "$18.00",
  },
  {
    name: "Long-Wear Gel Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s1287408-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1287408-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1287408-av-02-zoom.jpg?imwidth=930",
    brand: "Bobbi Brown",
    category: "eyeliner",
    price: "$28.00",
  },
  {
    name: "Heavy Metal Glitter Eyeliner - Sparkle Out Loud Collection",
    img1:
      "https://sephora.com/productimages/sku/s2235653-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2235653-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2235653-av-02-zoom.jpg?imwidth=930",
    brand: "Urban Decay",
    category: "eyeliner",
    price: "$21.00",
  },
  {
    name: "Tattoo Liner: Cat Eyes for a Cause Limited Edition",
    img1:
      "https://sephora.com/productimages/sku/s2453504-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2453504-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2453504-av-02-zoom.jpg?imwidth=930",
    brand: "KVD Beauty",
    category: "eyeliner",
    price: "$21.00",
  },
  {
    name: "Tarteist™ Double Take Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s1827062-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1827062-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1827062-av-02-zoom.jpg?imwidth=930",
    brand: "tarte",
    category: "eyeliner",
    price: "$24.00",
  },
  {
    name: "Flypencil Longwear Pencil Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s2316388-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2316388-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2316388-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "eyeliner",
    price: "$22.00",
  },
  {
    name: "Kitten Mini Tattoo Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s2352490-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2352490-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2352490-av-02-zoom.jpg?imwidth=930",
    brand: "KVD Beauty",
    category: "eyeliner",
    price: "$12.00",
  },
  {
    name: "Always Sharp Longwear Waterproof Kôhl Eyeliner Pencil",
    img1:
      "https://sephora.com/productimages/sku/s1551902-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1551902-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1551902-av-02-zoom.jpg?imwidth=930",
    brand: "Smashbox",
    category: "eyeliner",
    price: "$22.00",
  },
  {
    name: "Roller Liner Waterproof Liquid Eyeliner",
    img1:
      "https://sephora.com/productimages/sku/s2181238-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2181238-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2181238-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "eyeliner",
    price: "$22.00",
  },
  {
    name: "Brow Wiz",
    img1:
      "https://sephora.com/productimages/sku/s2372530-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2372530-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2372530-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyebrow-makeup-pencils",
    price: "$23.00",
  },
  {
    name: "Brow Freeze Styling Wax",
    img1:
      "https://sephora.com/productimages/sku/s2411486-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2411486-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2411486-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyebrow-makeup-pencils",
    price: "$23.00",
  },
  {
    name: "Gimme Brow+ Tinted Volumizing Eyebrow Gel",
    img1:
      "https://sephora.com/productimages/sku/s2080224-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2080224-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2080224-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$24.00",
  },
  {
    name: "Precisely, My Brow Pencil Waterproof Eyebrow Definer",
    img1:
      "https://sephora.com/productimages/sku/s2086759-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2086759-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2086759-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$24.00",
  },
  {
    name: "#BombBrows Microshade Brow Pencil",
    img1:
      "https://sephora.com/productimages/sku/s2431047-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2431047-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2431047-av-02-zoom.jpg?imwidth=930",
    brand: "HUDA BEAUTY",
    category: "eyebrow-makeup-pencils",
    price: "$17.00",
  },
  {
    name: "GrandeBROW Brow Enhancing Serum",
    img1:
      "https://sephora.com/productimages/sku/s2114817-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2114817-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2114817-av-02-zoom.jpg?imwidth=930",
    brand: "Grande Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$70.00",
  },
  {
    name: "DIPBROW™ Pomade",
    img1:
      "https://sephora.com/productimages/sku/s1578699-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1578699-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1578699-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyebrow-makeup-pencils",
    price: "$21.00",
  },
  {
    name: "Brow Definer",
    img1:
      "https://sephora.com/productimages/sku/s2372548-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2372548-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2372548-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyebrow-makeup-pencils",
    price: "$23.00",
  },
  {
    name: "Clear Brow Gel",
    img1:
      "https://sephora.com/productimages/sku/s1012855-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1012855-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1012855-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyebrow-makeup-pencils",
    price: "$22.00",
  },
  {
    name: "Goof Proof Waterproof Easy Shape & Fill Eyebrow Pencil",
    img1:
      "https://sephora.com/productimages/sku/s2217511-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2217511-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2217511-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$24.00",
  },
  {
    name: "Retractable Brow Pencil - Waterproof",
    img1:
      "https://sephora.com/productimages/sku/s2242998-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2242998-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2242998-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "eyebrow-makeup-pencils",
    price: "$12.00",
  },
  {
    name: "Brow Powder Duo",
    img1:
      "https://sephora.com/productimages/sku/s929778-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s929778-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s929778-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyebrow-makeup-pencils",
    price: "$23.00",
  },
  {
    name: "Brow Microfilling Eyebrow Pen",
    img1:
      "https://sephora.com/productimages/sku/s2382851-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2382851-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2382851-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$25.00",
  },
  {
    name: "Mini Gimme Brow+ Tinted Volumizing Eyebrow Gel",
    img1:
      "https://sephora.com/productimages/sku/s2181329-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2181329-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2181329-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$14.00",
  },
  {
    name: "24-HR Brow Setter Clear Eyebrow Gel",
    img1:
      "https://sephora.com/productimages/sku/s1935774-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1935774-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1935774-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$24.00",
  },
  {
    name: "Brush #12",
    img1:
      "https://sephora.com/productimages/sku/s1578657-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1578657-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1578657-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyebrow-makeup-pencils",
    price: "$18.00",
  },
  {
    name: "DIPBROW® Gel",
    img1:
      "https://sephora.com/productimages/sku/s2182111-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2182111-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2182111-av-02-zoom.jpg?imwidth=930",
    brand: "Anastasia Beverly Hills",
    category: "eyebrow-makeup-pencils",
    price: "$20.00",
  },
  {
    name: "GrandeBROW Brow Enhancing Serum Mini",
    img1:
      "https://sephora.com/productimages/sku/s2227320-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2227320-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2227320-av-02-zoom.jpg?imwidth=930",
    brand: "Grande Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$36.00",
  },
  {
    name: "Great Brow Basics Pencil & Gel Set",
    img1:
      "https://sephora.com/productimages/sku/s2217396-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2217396-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2217396-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "eyebrow-makeup-pencils",
    price: "$36.00 ($60.00 value)",
  },
  {
    name: "Diorshow Brow Styler Ultra-Fine Precision Brow Pencil",
    img1:
      "https://sephora.com/productimages/sku/s1178219-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1178219-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1178219-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "eyebrow-makeup-pencils",
    price: "$29.00",
  },
  {
    name: "Rouge Dior Refillable Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s2419620-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2419620-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2419620-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "lipstick",
    price: "$38.00",
  },
  {
    name: "Mattemoiselle Plush Matte Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s2156545-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2156545-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2156545-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "lipstick",
    price: "$7.00 $18.00",
  },
  {
    name: "L'Absolu Lacquer Long-Lasting Liquid Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s2067544-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2067544-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2067544-av-02-zoom.jpg?imwidth=930",
    brand: "Lancôme",
    category: "lipstick",
    price: "$26.00",
  },
  {
    name: "Powermatte Lip Pigment",
    img1:
      "https://sephora.com/productimages/sku/s1965524-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1965524-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1965524-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "lipstick",
    price: "$26.00",
  },
  {
    name: "Cream Lip Stain Liquid Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s1959386-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1959386-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1959386-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "lipstick",
    price: "$15.00",
  },
  {
    name: "Hyaluronic Happikiss Lipstick Balm",
    img1:
      "https://sephora.com/productimages/sku/s2420503-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2420503-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2420503-av-02-zoom.jpg?imwidth=930",
    brand: "Charlotte Tilbury",
    category: "lipstick",
    price: "$34.00",
  },
  {
    name: "Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s2245751-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2245751-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2245751-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "lipstick",
    price: "$26.00",
  },
  {
    name: "Colorfix Eye, Cheek & Lip Cream Pigment",
    img1:
      "https://sephora.com/productimages/sku/s2439628-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2439628-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2439628-av-02-zoom.jpg?imwidth=930",
    brand: "Danessa Myricks Beauty",
    category: "lipstick",
    price: "$18.00",
  },
  {
    name: "Lip + Cheek",
    img1:
      "https://sephora.com/productimages/sku/s2062446-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2062446-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2062446-av-02-zoom.jpg?imwidth=930",
    brand: "MILK MAKEUP",
    category: "lipstick",
    price: "$30.00",
  },
  {
    name: "Matte Revolution Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s2116879-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2116879-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2116879-av-02-zoom.jpg?imwidth=930",
    brand: "Charlotte Tilbury",
    category: "lipstick",
    price: "$34.00",
  },
  {
    name: "Velvet Matte Lipstick Pencil",
    img1:
      "https://sephora.com/productimages/sku/s1900083-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1900083-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1900083-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "lipstick",
    price: "$27.00",
  },
  {
    name: "Stunna Lip Paint Longwear Fluid Lip Color",
    img1:
      "https://sephora.com/productimages/sku/s1925114-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1925114-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1925114-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "lipstick",
    price: "$25.00",
  },
  {
    name: "Multi-Stick Cheek & Lip",
    img1:
      "https://sephora.com/productimages/sku/s2334522-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2334522-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2334522-av-02-zoom.jpg?imwidth=930",
    brand: "ILIA",
    category: "lipstick",
    price: "$34.00",
  },
  {
    name: "Everlasting Liquid Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s1890623-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1890623-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1890623-av-02-zoom.jpg?imwidth=930",
    brand: "KVD Beauty",
    category: "lipstick",
    price: "$21.00",
  },
  {
    name: "Rouge Volupte Shine Lipstick Balm",
    img1:
      "https://sephora.com/productimages/sku/s2427243-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2427243-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2427243-av-02-zoom.jpg?imwidth=930",
    brand: "Yves Saint Laurent",
    category: "lipstick",
    price: "$38.00",
  },
  {
    name: "Matte Revolution Lipstick- Pillow Talk Collection",
    img1:
      "https://sephora.com/productimages/sku/s2309383-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2309383-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2309383-av-02-zoom.jpg?imwidth=930",
    brand: "Charlotte Tilbury",
    category: "lipstick",
    price: "$34.00",
  },
  {
    name: "Power Bullet Matte Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s2198562-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2198562-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2198562-av-02-zoom.jpg?imwidth=930",
    brand: "HUDA BEAUTY",
    category: "lipstick",
    price: "$25.00",
  },
  {
    name: "Le Rouge Perfecto Beautifying Lip Balm",
    img1:
      "https://sephora.com/productimages/sku/s1862002-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1862002-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1862002-av-02-zoom.jpg?imwidth=930",
    brand: "Givenchy",
    category: "lipstick",
    price: "$25.00 $37.00",
  },
  {
    name: "The Multiple",
    img1:
      "https://sephora.com/productimages/sku/s1017920-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1017920-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1017920-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "lipstick",
    price: "$39.00",
  },
  {
    name: "MatteTrance™ Lipstick",
    img1:
      "https://sephora.com/productimages/sku/s2351583-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2351583-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2351583-av-02-zoom.jpg?imwidth=930",
    brand: "PAT McGRATH LABS",
    category: "lipstick",
    price: "$38.00",
  },
  {
    name: "Gloss Bomb Universal Lip Luminizer",
    img1:
      "https://sephora.com/productimages/sku/s1925965-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1925965-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1925965-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "lip-gloss",
    price: "$19.00",
  },
  {
    name: "Dior Addict Lip Maximizer Plumping Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2449114-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2449114-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2449114-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "lip-gloss",
    price: "$35.00",
  },
  {
    name: "Lip Gloss",
    img1:
      "https://sephora.com/productimages/sku/s1596451-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1596451-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1596451-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "lip-gloss",
    price: "$24.00",
  },
  {
    name: "Gloss Bomb Cream Color Drip Lip Cream",
    img1:
      "https://sephora.com/productimages/sku/s2399285-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2399285-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2399285-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "lip-gloss",
    price: "$19.00",
  },
  {
    name: "Lip Injection Extreme Lip Plumper",
    img1:
      "https://sephora.com/productimages/sku/s1494004-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1494004-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1494004-av-02-zoom.jpg?imwidth=930",
    brand: "Too Faced",
    category: "lip-gloss",
    price: "$29.00",
  },
  {
    name: "Lip Injection Maximum Plump Extra Strength Lip Plumper",
    img1:
      "https://sephora.com/productimages/sku/s2410942-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2410942-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2410942-av-02-zoom.jpg?imwidth=930",
    brand: "Too Faced",
    category: "lip-gloss",
    price: "$29.00",
  },
  {
    name: "Gloss Luxe Lip Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2259661-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2259661-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2259661-av-02-zoom.jpg?imwidth=930",
    brand: "TOM FORD",
    category: "lip-gloss",
    price: "$55.00",
  },
  {
    name: "Full-On™ Plumping Lip Polish Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2311389-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2311389-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2311389-av-02-zoom.jpg?imwidth=930",
    brand: "Buxom",
    category: "lip-gloss",
    price: "$21.00",
  },
  {
    name: "ShineOn Jelly Lip Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2328094-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2328094-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2328094-av-02-zoom.jpg?imwidth=930",
    brand: "Tower 28 Beauty",
    category: "lip-gloss",
    price: "$14.00",
  },
  {
    name: "Dior Addict Stellar Lip Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2341287-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2341287-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2341287-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "lip-gloss",
    price: "$30.00",
  },
  {
    name: "Forget The Filler Lip Plumper Line Smoothing Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2414514-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2414514-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2414514-av-02-zoom.jpg?imwidth=930",
    brand: "LAWLESS",
    category: "lip-gloss",
    price: "$25.00",
  },
  {
    name: "Shade Slick Tinted Lip Oil",
    img1:
      "https://sephora.com/productimages/sku/s2426732-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2426732-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2426732-av-02-zoom.jpg?imwidth=930",
    brand: "MERIT",
    category: "lip-gloss",
    price: "$24.00",
  },
  {
    name: "Lip Glow Oil",
    img1:
      "https://sephora.com/productimages/sku/s2449130-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2449130-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2449130-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "lip-gloss",
    price: "$35.00",
  },
  {
    name: "Full-On™ Plumping Lip Cream Gloss",
    img1:
      "https://sephora.com/productimages/sku/s1668995-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1668995-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1668995-av-02-zoom.jpg?imwidth=930",
    brand: "Buxom",
    category: "lip-gloss",
    price: "$21.00",
  },
  {
    name: "Coach x Sephora Collection Tea Rose Lipgloss Set",
    img1:
      "https://sephora.com/productimages/sku/s2324200-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2324200-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2324200-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "lip-gloss",
    price: "$36.00",
  },
  {
    name: "ShineOn Milky Lip Jelly Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2375426-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2375426-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2375426-av-02-zoom.jpg?imwidth=930",
    brand: "Tower 28 Beauty",
    category: "lip-gloss",
    price: "$14.00",
  },
  {
    name: "Stay Vulnerable Glossy Lip Balm",
    img1:
      "https://sephora.com/productimages/sku/s2418614-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2418614-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2418614-av-02-zoom.jpg?imwidth=930",
    brand: "Rare Beauty by Selena Gomez",
    category: "lip-gloss",
    price: "$18.00",
  },
  {
    name: "Lip Injection Power Plumping Lip Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2410967-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2410967-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2410967-av-02-zoom.jpg?imwidth=930",
    brand: "Too Faced",
    category: "lip-gloss",
    price: "$23.00",
  },
  {
    name: "LUST: Lip Gloss",
    img1:
      "https://sephora.com/productimages/sku/s2187953-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2187953-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2187953-av-02-zoom.jpg?imwidth=930",
    brand: "PAT McGRATH LABS",
    category: "lip-gloss",
    price: "$28.00",
  },
  {
    name: "Balmy Gloss Tinted Lip Oil",
    img1:
      "https://sephora.com/productimages/sku/s2354082-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2354082-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2354082-av-02-zoom.jpg?imwidth=930",
    brand: "ILIA",
    category: "lip-gloss",
    price: "$26.00",
  },
  {
    name: "Blush",
    img1:
      "https://sephora.com/productimages/sku/s2296986-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2296986-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2296986-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "blush",
    price: "$30.00",
  },
  {
    name: "Soft Pinch Liquid Blush",
    img1:
      "https://sephora.com/productimages/sku/s2354140-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2354140-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2354140-av-02-zoom.jpg?imwidth=930",
    brand: "Rare Beauty by Selena Gomez",
    category: "blush",
    price: "$20.00",
  },
  {
    name: "Stay Vulnerable Melting Cream Blush",
    img1:
      "https://sephora.com/productimages/sku/s2418663-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2418663-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2418663-av-02-zoom.jpg?imwidth=930",
    brand: "Rare Beauty by Selena Gomez",
    category: "blush",
    price: "$21.00",
  },
  {
    name: "Blush Color Infusion",
    img1:
      "https://sephora.com/productimages/sku/s2411668-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2411668-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2411668-av-02-zoom.jpg?imwidth=930",
    brand: "Laura Mercier",
    category: "blush",
    price: "$32.00",
  },
  {
    name: "Colorfix Eye, Cheek & Lip Cream Pigment",
    img1:
      "https://sephora.com/productimages/sku/s2439628-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2439628-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2439628-av-02-zoom.jpg?imwidth=930",
    brand: "Danessa Myricks Beauty",
    category: "blush",
    price: "$18.00",
  },
  {
    name: "Lip + Cheek",
    img1:
      "https://sephora.com/productimages/sku/s2062446-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2062446-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2062446-av-02-zoom.jpg?imwidth=930",
    brand: "MILK MAKEUP",
    category: "blush",
    price: "$30.00",
  },
  {
    name: "Multi-Stick Cheek & Lip",
    img1:
      "https://sephora.com/productimages/sku/s2334522-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2334522-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2334522-av-02-zoom.jpg?imwidth=930",
    brand: "ILIA",
    category: "blush",
    price: "$34.00",
  },
  {
    name: "BACKSTAGE Rosy Glow Blush",
    img1:
      "https://sephora.com/productimages/sku/s2328375-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2328375-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2328375-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "blush",
    price: "$37.00",
  },
  {
    name: "BeachPlease Lip + Cheek Cream Blush",
    img1:
      "https://sephora.com/productimages/sku/s2284875-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2284875-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2284875-av-02-zoom.jpg?imwidth=930",
    brand: "Tower 28 Beauty",
    category: "blush",
    price: "$20.00",
  },
  {
    name: "Amazonian Clay 12-Hour Blush",
    img1:
      "https://sephora.com/productimages/sku/s2274017-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2274017-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2274017-av-02-zoom.jpg?imwidth=930",
    brand: "tarte",
    category: "blush",
    price: "$15.00",
  },
  {
    name: "Artist Face Color Highlight, Sculpt and Blush Powder",
    img1:
      "https://sephora.com/productimages/sku/s1972793-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1972793-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1972793-av-02-zoom.jpg?imwidth=930",
    brand: "MAKE UP FOR EVER",
    category: "blush",
    price: "$23.00",
  },
  {
    name: "Ambient Lighting Blush Collection",
    img1:
      "https://sephora.com/productimages/sku/s2378586-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2378586-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2378586-av-02-zoom.jpg?imwidth=930",
    brand: "Hourglass",
    category: "blush",
    price: "$40.00",
  },
  {
    name: "Cheeks Out Freestyle Cream Blush",
    img1:
      "https://sephora.com/productimages/sku/s2352730-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2352730-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2352730-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "blush",
    price: "$20.00",
  },
  {
    name: "Cheek To Chic Blush",
    img1:
      "https://sephora.com/productimages/sku/s2182574-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2182574-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2182574-av-02-zoom.jpg?imwidth=930",
    brand: "Charlotte Tilbury",
    category: "blush",
    price: "$40.00",
  },
  {
    name: "Baby Cheeks Blush Stick",
    img1:
      "https://sephora.com/productimages/sku/s2434132-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2434132-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2434132-av-02-zoom.jpg?imwidth=930",
    brand: "Westman Atelier",
    category: "blush",
    price: "$48.00",
  },
  {
    name: "Rouge Blush",
    img1:
      "https://sephora.com/productimages/sku/s2209146-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2209146-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2209146-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "blush",
    price: "$44.00",
  },
  {
    name: "BACKSTAGE Glow Face Palette",
    img1:
      "https://sephora.com/productimages/sku/s2087849-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2087849-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2087849-av-02-zoom.jpg?imwidth=930",
    brand: "Dior",
    category: "blush",
    price: "$45.00",
  },
  {
    name: "Air Matte Sheer Cream Blush",
    img1:
      "https://sephora.com/productimages/sku/s2417657-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2417657-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2417657-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "blush",
    price: "$30.00",
  },
  {
    name: "The Multiple",
    img1:
      "https://sephora.com/productimages/sku/s1017920-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1017920-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1017920-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "blush",
    price: "$39.00",
  },
  {
    name: "Colorful Face Powders – Blush, Bronze, Highlight, & Contour",
    img1:
      "https://sephora.com/productimages/sku/s1636828-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1636828-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1636828-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "blush",
    price: "$14.00",
  },
  {
    name: "Sun Stalk'r Instant Warmth Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s2436038-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2436038-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2436038-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "bronzer-makeup",
    price: "$30.00",
  },
  {
    name: "Hoola Matte Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s513234-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s513234-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s513234-av-02-zoom.jpg?imwidth=930",
    brand: "Benefit Cosmetics",
    category: "bronzer-makeup",
    price: "$30.00",
  },
  {
    name: "Bronzer Powder",
    img1:
      "https://sephora.com/productimages/sku/s2337483-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2337483-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2337483-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "bronzer-makeup",
    price: "$38.00",
  },
  {
    name: "Airbrush Matte Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s2351187-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2351187-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2351187-av-02-zoom.jpg?imwidth=930",
    brand: "Charlotte Tilbury",
    category: "bronzer-makeup",
    price: "$55.00",
  },
  {
    name: "Matte Cream Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s1898162-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1898162-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1898162-av-02-zoom.jpg?imwidth=930",
    brand: "MILK MAKEUP",
    category: "bronzer-makeup",
    price: "$30.00",
  },
  {
    name: "Cheeks Out Freestyle Cream Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s2352839-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2352839-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2352839-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "bronzer-makeup",
    price: "$32.00",
  },
  {
    name: "SEA Breezy Cream Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s2309300-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2309300-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2309300-av-02-zoom.jpg?imwidth=930",
    brand: "tarte",
    category: "bronzer-makeup",
    price: "$29.00",
  },
  {
    name: "Gucci Poudre De Beauté Éclat Soleil Bronzing Powder",
    img1:
      "https://sephora.com/productimages/sku/s2369148-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2369148-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2369148-av-02-zoom.jpg?imwidth=930",
    brand: "Gucci",
    category: "bronzer-makeup",
    price: "$62.00",
  },
  {
    name: "The Multiple",
    img1:
      "https://sephora.com/productimages/sku/s1017920-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1017920-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1017920-av-02-zoom.jpg?imwidth=930",
    brand: "NARS",
    category: "bronzer-makeup",
    price: "$39.00",
  },
  {
    name: "Ambient® Lighting Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s1688860-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1688860-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1688860-av-02-zoom.jpg?imwidth=930",
    brand: "Hourglass",
    category: "bronzer-makeup",
    price: "$52.00",
  },
  {
    name: "Colorful Face Powders – Blush, Bronze, Highlight, & Contour",
    img1:
      "https://sephora.com/productimages/sku/s1636828-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1636828-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1636828-av-02-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "bronzer-makeup",
    price: "$14.00",
  },
  {
    name: "Nudies Matte Blush & Bronze",
    img1:
      "https://sephora.com/productimages/sku/s2328896-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2328896-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2328896-av-02-zoom.jpg?imwidth=930",
    brand: "NUDESTIX",
    category: "bronzer-makeup",
    price: "$34.00",
  },
  {
    name: "Chocolate Soleil Matte Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s2064459-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2064459-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2064459-av-02-zoom.jpg?imwidth=930",
    brand: "Too Faced",
    category: "bronzer-makeup",
    price: "$32.00",
  },
  {
    name: "Mini Matte Cream Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s2257269-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2257269-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2257269-av-02-zoom.jpg?imwidth=930",
    brand: "MILK MAKEUP",
    category: "bronzer-makeup",
    price: "$18.00",
  },
  {
    name: "Face Trace Cream Contour Stick",
    img1:
      "https://sephora.com/productimages/sku/s2434108-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2434108-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2434108-av-02-zoom.jpg?imwidth=930",
    brand: "Westman Atelier",
    category: "bronzer-makeup",
    price: "$48.00",
  },
  {
    name: "Match Stix Shimmer Skinstick",
    img1:
      "https://sephora.com/productimages/sku/s1925759-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1925759-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1925759-av-02-zoom.jpg?imwidth=930",
    brand: "FENTY BEAUTY by Rihanna",
    category: "bronzer-makeup",
    price: "$26.00",
  },
  {
    name: "Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s1287986-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1287986-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1287986-av-02-zoom.jpg?imwidth=930",
    brand: "Bobbi Brown",
    category: "bronzer-makeup",
    price: "$44.00",
  },
  {
    name: "Sunlit Bronzer",
    img1:
      "https://sephora.com/productimages/sku/s1954460-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s1954460-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s1954460-av-02-zoom.jpg?imwidth=930",
    brand: "BECCA Cosmetics",
    category: "bronzer-makeup",
    price: "$38.00",
  },
  {
    name: "NightLite Bronzer Powder",
    img1:
      "https://sephora.com/productimages/sku/s2354025-main-zoom.jpg?imwidth=930",
    img2:
      "https://sephora.com/productimages/sku/s2354025-av-01-zoom.jpg?imwidth=930",
    img3:
      "https://sephora.com/productimages/sku/s2354025-av-02-zoom.jpg?imwidth=930",
    brand: "ILIA",
    category: "bronzer-makeup",
    price: "$34.00",
  },
];

const generateUser = async () => {
  let userIDs = [];
  for (let i = 0; i < 60; i++) {
    try {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash("123", salt);
      const name = faker.name.findName();
      const email = faker.internet.email();
      const user = await User.create({ name, email, password });
      userIDs.push(user._id);
    } catch (e) {
      console.log("e", e);
    }
  }
  return userIDs;
};

const generateData = async () => {
  let userIDs = await generateUser();
  for (let i = 0; i < data.length - 1; i++) {
    try {
      let product = await Product.findOne({ name: data[i].name });

      if (!product) {
        let imagesArray = [];
        imagesArray.push(data[i].img1);
        imagesArray.push(data[i].img2);
        imagesArray.push(data[i].img3);
        let category;
        let categoryId;
        console.log("cate name", data[i].category);
        category = await Category.findOne({ name: data[i].category });

        if (!category) {
          category = await Category.create({ name: data[i].category });
          console.log("category", category);
          categoryId = category._id;
        }
        categoryId = category._id;
        let description;
        if (category.name == "foundation-makeup")
          description =
            "A lightweight, buildable light-to-medium coverage skin tint that leaves skin looking blurred and smoothed – in flexible shades for all";
        else if (category.name == "concealer")
          description =
            "An award-winning concealer that corrects, contours, highlights, and perfects up to 16 hours—all shades are now available in mini size";
        else if (category.name == "eyeshadow-palettes")
          description =
            "A mini eyeshadow palette featuring nine variations of the sexiest nude shades designed to be worn by everyone";
        else if (category.name == "eyeliner")
          description =
            "A creamy, waterproof eye pencil that glides on lids, won‘t run or smudge, has a built-in blender and sharpener, and comes in a range of shades and finishes";
        else if (category.name == "eyebrow-makeup-pencils")
          description =
            "A creamy, waterproof eyebrow pencil that glides on lids, won‘t run or smudge, has a built-in blender and sharpener, and comes in a range of shades and finishes";
        else if (category.name == "lipstick")
          description =
            "An ultra-slim lipstick with a long-wearing, petal-soft matte finish, created in a rainbow of weightless, color-intense shades designed to flatter all skin tones";
        else if (category.name == "lip-gloss")
          description =
            "An ultra-slim lip gloss with a long-wearing, petal-soft matte finish, created in a rainbow of weightless, color-intense shades designed to flatter all skin tones";
        else if (category.name == "blush")
          description =
            "An award-winning, pressed powder blush that delivers healthy-looking color to flatter any skin tone";
        else if (category.name == "bronzer-makeup")
          description =
            "A clean, talc-free, super creamy bronzing powder that gives you a just got back from the beach look";
        const ingredients =
          "Hydrogenated Polyisobutene, Hydrogenated Poly(C6-14 Olefin), Mica, Octyldodecanol, Ethylene/Propylene/Styrene Copolymer, Trimethylsiloxysilicate, Isododecane, 1,2-Hexanediol, Disteardimonium Hectorite, Sorbitan Sesquioleate, Propylene Carbonate, Triethoxycaprylylsilane, Aluminum Hydroxide, Helianthus Annuus (Sunflower) Seed Oil, Gardenia Florida Fruit Extract, Nelumbo Nucifera (Sacred Lotus) Flower Extract, Nymphaea Odorata Root Extract. [+/- May Contain/Peut Contenir: Iron Oxides (CI 77491), Red 7 Lake (CI 15850), Yellow 6 Lake (CI 15985), Titanium Dioxide (CI 77891), Yellow 5 Lake (CI 19140), Red 28 Lake (CI 45410)]";

        product = await Product.create({
          brand: data[i].brand,
          name: data[i].name,
          description: description,
          price: Number(data[i].price.slice(1, 3)),
          category: category._id,
          ingredients,
          images: imagesArray,
          countInStock: Number(faker.random.number(10000) + 1),
          countSold: Number(faker.random.number(4000) + 1),
        });

        const numberOfReviews = faker.random.number(5) + 1;
        const reviewers = faker.random.arrayElements(userIDs, numberOfReviews);
        for (let j = 0; j < numberOfReviews; j++) {
          await generateSingleReview(reviewers[j], product._id);
        }
        console.log(`${product._id} created success`);
      }
    } catch (e) {
      console.log("eror", e);
    }
  }
};

const generateSingleReview = async (userId, productId) => {
  const review = await Review.create({
    user: userId,
    product: productId,
    rating: faker.random.number(4) + 1,
    title: faker.commerce.productName(),
    body: faker.commerce.productDescription(),
  });

  //update product
  const updateProduct = await Product.findByIdAndUpdate(productId, {
    $push: { reviews: review._id },
  });
  if (updateProduct) console.log("update product");
};
