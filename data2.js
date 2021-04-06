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
    name: "Protini™ Polypeptide Moisturizer",
    img1:
      "https://sephora.com/productimages/sku/s2025633-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "moisturizer-skincare",
    price: "$68.00",
  },
  {
    name: "Cicapair™ Tiger Grass Color Correcting Treatment SPF 30",
    img1:
      "https://sephora.com/productimages/sku/s1855709-main-zoom.jpg?imwidth=930",
    brand: "Dr. Jart+",
    category: "moisturizer-skincare",
    price: "$52.00",
  },
  {
    name: "The Dewy Skin Cream Plumping & Hydrating Moisturizer",
    img1:
      "https://sephora.com/productimages/sku/s2181006-main-zoom.jpg?imwidth=930",
    brand: "Tatcha",
    category: "moisturizer-skincare",
    price: "$68.00",
  },
  {
    name: "The Water Cream Oil-Free Pore Minimizing Moisturizer",
    img1:
      "https://sephora.com/productimages/sku/s1932920-main-zoom.jpg?imwidth=930",
    brand: "Tatcha",
    category: "moisturizer-skincare",
    price: "$68.00",
  },
  {
    name: "Dramatically Different Moisturizing Lotion+",
    img1:
      "https://sephora.com/productimages/sku/s1538354-main-zoom.jpg?imwidth=930",
    brand: "CLINIQUE",
    category: "moisturizer-skincare",
    price: "$29.50",
  },
  {
    name: "Barrier+ Triple Lipid-Peptide Face Cream",
    img1:
      "https://sephora.com/productimages/sku/s2215945-main-zoom.jpg?imwidth=930",
    brand: "Skinfix",
    category: "moisturizer-skincare",
    price: "$50.00",
  },
  {
    name: "Water Drench Hyaluronic Acid Moisturizer",
    img1:
      "https://sephora.com/productimages/sku/s1898550-main-zoom.jpg?imwidth=930",
    brand: "Peter Thomas Roth",
    category: "moisturizer-skincare",
    price: "$52.00",
  },
  {
    name: "Natural Moisturizing Factors + HA",
    img1:
      "https://sephora.com/productimages/sku/s2031425-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "moisturizer-skincare",
    price: "$5.80",
  },
  {
    name: "Dramatically Different Moisturizing Gel",
    img1:
      "https://sephora.com/productimages/sku/s789727-main-zoom.jpg?imwidth=930",
    brand: "CLINIQUE",
    category: "moisturizer-skincare",
    price: "$29.50",
  },
  {
    name: "Ultra Facial Cream",
    img1:
      "https://sephora.com/productimages/sku/s2172526-main-zoom.jpg?imwidth=930",
    brand: "Kiehl's Since 1851",
    category: "moisturizer-skincare",
    price: "$32.00",
  },
  {
    name: "Crème de la Mer Moisturizer",
    img1:
      "https://sephora.com/productimages/sku/s1932201-main-zoom.jpg?imwidth=930",
    brand: "La Mer",
    category: "moisturizer-skincare",
    price: "$190.00",
  },
  {
    name: "The True Cream Aqua Bomb",
    img1:
      "https://sephora.com/productimages/sku/s1686427-main-zoom.jpg?imwidth=930",
    brand: "belif",
    category: "moisturizer-skincare",
    price: "$38.00",
  },
  {
    name: "Adaptogen Deep Moisture Cream with Ashwagandha + Reishi",
    img1:
      "https://sephora.com/productimages/sku/s2379451-main-zoom.jpg?imwidth=930",
    brand: "Youth To The People",
    category: "moisturizer-skincare",
    price: "$18.00",
  },
  {
    name: "Hydra Vizor Invisible Moisturizer Broad Spectrum SPF 30 Sunscreen",
    img1:
      "https://sephora.com/productimages/sku/s2418879-main-zoom.jpg?imwidth=930",
    brand: "FENTY SKIN",
    category: "moisturizer-skincare",
    price: "$35.00",
  },
  {
    name: "Lala Retro™ Whipped Moisturizer with Ceramides",
    img1:
      "https://sephora.com/productimages/sku/s2233849-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "moisturizer-skincare",
    price: "$60.00",
  },
  {
    name: "The True Cream Moisturizing Bomb",
    img1:
      "https://sephora.com/productimages/sku/s1686419-main-zoom.jpg?imwidth=930",
    brand: "belif",
    category: "moisturizer-skincare",
    price: "$38.00",
  },
  {
    name: "Ultra Repair® Cream Intense Hydration",
    img1:
      "https://sephora.com/productimages/sku/s1309590-main-zoom.jpg?imwidth=930",
    brand: "First Aid Beauty",
    category: "moisturizer-skincare",
    price: "$16.00",
  },
  {
    name: "Lotus Anti-Aging Night Moisturizer",
    img1:
      "https://sephora.com/productimages/sku/s2175560-main-zoom.jpg?imwidth=930",
    brand: "fresh",
    category: "moisturizer-skincare",
    price: "$52.00",
  },
  {
    name: "Vitamin Enriched Face Base Priming Moisturizer",
    img1:
      "https://sephora.com/productimages/sku/s1292820-main-zoom.jpg?imwidth=930",
    brand: "Bobbi Brown",
    category: "moisturizer-skincare",
    price: "$62.00",
  },
  {
    name: "Superfood Air-Whip Moisturizer with Hyaluronic Acid",
    img1:
      "https://sephora.com/productimages/sku/s1863604-main-zoom.jpg?imwidth=930",
    brand: "Youth To The People",
    category: "moisturizer-skincare",
    price: "$48.00",
  },
  {
    name: "100% Organic Cold-Pressed Rose Hip Seed Oil",
    img1:
      "https://sephora.com/productimages/sku/s2031417-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "cleansing-oil-face-oil",
    price: "$9.80",
  },
  {
    name: "Virgin Marula Luxury  Face Oil",
    img1:
      "https://sephora.com/productimages/sku/s1679315-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "cleansing-oil-face-oil",
    price: "$72.00",
  },
  {
    name: "Squalane + Vitamin C Rose Oil",
    img1:
      "https://sephora.com/productimages/sku/s2382166-main-zoom.jpg?imwidth=930",
    brand: "Biossance",
    category: "cleansing-oil-face-oil",
    price: "$72.00",
  },
  {
    name: "Luna Retinol Sleeping Night Oil",
    img1:
      "https://sephora.com/productimages/sku/s1681881-main-zoom.jpg?imwidth=930",
    brand: "SUNDAY RILEY",
    category: "cleansing-oil-face-oil",
    price: "$105.00",
  },
  {
    name: "Superberry Hydrate + Glow Dream Oil",
    img1:
      "https://sephora.com/productimages/sku/s2067916-main-zoom.jpg?imwidth=930",
    brand: "Youth To The People",
    category: "cleansing-oil-face-oil",
    price: "$44.00",
  },
  {
    name: "C.E.O Glow Vitamin C + Turmeric Face Oil",
    img1:
      "https://sephora.com/productimages/sku/s2213528-main-zoom.jpg?imwidth=930",
    brand: "SUNDAY RILEY",
    category: "cleansing-oil-face-oil",
    price: "$80.00",
  },
  {
    name: "Midnight Recovery Concentrate",
    img1:
      "https://sephora.com/productimages/sku/s1988732-main-zoom.jpg?imwidth=930",
    brand: "Kiehl's Since 1851",
    category: "cleansing-oil-face-oil",
    price: "$52.00",
  },
  {
    name: "100 percent Pure Argan Oil",
    img1:
      "https://sephora.com/productimages/sku/s1121797-main-zoom.jpg?imwidth=930",
    brand: "Josie Maran",
    category: "cleansing-oil-face-oil",
    price: "$49.00",
  },
  {
    name: "Mini Virgin Marula Luxury Face Oil",
    img1:
      "https://sephora.com/productimages/sku/s2015378-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "cleansing-oil-face-oil",
    price: "$40.00",
  },
  {
    name: "U.F.O. Ultra-Clarifying Face Oil",
    img1:
      "https://sephora.com/productimages/sku/s1842251-main-zoom.jpg?imwidth=930",
    brand: "SUNDAY RILEY",
    category: "cleansing-oil-face-oil",
    price: "$80.00",
  },
  {
    name: "Emerald CBD + Adaptogens Deep Moisture Glow Oil",
    img1:
      "https://sephora.com/productimages/sku/s2213445-main-zoom.jpg?imwidth=930",
    brand: "Herbivore",
    category: "cleansing-oil-face-oil",
    price: "$58.00",
  },
  {
    name: "Glow Stick SPF 50 PA++++",
    img1:
      "https://sephora.com/productimages/sku/s2322790-main-zoom.jpg?imwidth=930",
    brand: "Supergoop!",
    category: "cleansing-oil-face-oil",
    price: "$25.00",
  },
  {
    name: "Superfood Antioxidant Cleanser",
    img1:
      "https://sephora.com/productimages/sku/s1863588-main-zoom.jpg?imwidth=930",
    brand: "Youth To The People",
    category: "face-wash-facial-cleanser",
    price: "$36.00",
  },
  {
    name: "Soy Makeup Removing Face Wash",
    img1:
      "https://sephora.com/productimages/sku/s2421816-main-zoom.jpg?imwidth=930",
    brand: "fresh",
    category: "face-wash-facial-cleanser",
    price: "$44.00",
  },
  {
    name: "Green Clean Makeup Removing Cleansing Balm",
    img1:
      "https://sephora.com/productimages/sku/s1899103-main-zoom.jpg?imwidth=930",
    brand: "Farmacy",
    category: "face-wash-facial-cleanser",
    price: "$34.00",
  },
  {
    name: "Daily Microfoliant Exfoliator",
    img1:
      "https://sephora.com/productimages/sku/s2002087-main-zoom.jpg?imwidth=930",
    brand: "Dermalogica",
    category: "face-wash-facial-cleanser",
    price: "$59.00",
  },
  {
    name: "Oat Cleansing Balm",
    img1:
      "https://sephora.com/productimages/sku/s2335636-main-zoom.jpg?imwidth=930",
    brand: "The INKEY List",
    category: "face-wash-facial-cleanser",
    price: "$9.99",
  },
  {
    name: "The Deep Cleanse Gentle Exfoliating Cleanser",
    img1:
      "https://sephora.com/productimages/sku/s2023646-main-zoom.jpg?imwidth=930",
    brand: "Tatcha",
    category: "face-wash-facial-cleanser",
    price: "$38.00",
  },
  {
    name: "The Rice Wash Skin-Softening Cleanser",
    img1:
      "https://sephora.com/productimages/sku/s2382232-main-zoom.jpg?imwidth=930",
    brand: "Tatcha",
    category: "face-wash-facial-cleanser",
    price: "$35.00",
  },
  {
    name: "Special Cleansing Gel",
    img1:
      "https://sephora.com/productimages/sku/s2002103-main-zoom.jpg?imwidth=930",
    brand: "Dermalogica",
    category: "face-wash-facial-cleanser",
    price: "$39.00",
  },
  {
    name: "Squalane Cleanser",
    img1:
      "https://sephora.com/productimages/sku/s2238988-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "face-wash-facial-cleanser",
    price: "$7.90",
  },
  {
    name: "Pure Skin Face Cleanser",
    img1:
      "https://sephora.com/productimages/sku/s1217710-main-zoom.jpg?imwidth=930",
    brand: "First Aid Beauty",
    category: "face-wash-facial-cleanser",
    price: "$22.00",
  },
  {
    name: "Salicylic Acid Acne + Pore Cleanser",
    img1:
      "https://sephora.com/productimages/sku/s2211605-main-zoom.jpg?imwidth=930",
    brand: "The INKEY List",
    category: "face-wash-facial-cleanser",
    price: "$9.99",
  },
  {
    name: "Beste™ No. 9 Jelly Cleanser",
    img1:
      "https://sephora.com/productimages/sku/s2022598-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "face-wash-facial-cleanser",
    price: "$32.00",
  },
  {
    name: "Skin Perfecting 2% BHA Liquid Exfoliant",
    img1:
      "https://sephora.com/productimages/sku/s2421360-main-zoom.jpg?imwidth=930",
    brand: "Paula's Choice",
    category: "exfoliating-scrub-exfoliator",
    price: "$29.50",
  },
  {
    name: "Daily Microfoliant Exfoliator",
    img1:
      "https://sephora.com/productimages/sku/s2002087-main-zoom.jpg?imwidth=930",
    brand: "Dermalogica",
    category: "exfoliating-scrub-exfoliator",
    price: "$59.00",
  },
  {
    name: "Watermelon + AHA Glow Sleeping Mask",
    img1:
      "https://sephora.com/productimages/sku/s1955764-main-zoom.jpg?imwidth=930",
    brand: "Glow Recipe",
    category: "exfoliating-scrub-exfoliator",
    price: "$45.00",
  },
  {
    name: "ExfoliKate® Intensive Pore Exfoliating Treatment",
    img1:
      "https://sephora.com/productimages/sku/s2393692-main-zoom.jpg?imwidth=930",
    brand: "Kate Somerville",
    category: "exfoliating-scrub-exfoliator",
    price: "$25.00",
  },
  {
    name: "Yo Glow Facial Enzyme Scrub",
    img1:
      "https://sephora.com/productimages/sku/s2337293-main-zoom.jpg?imwidth=930",
    brand: "Wishful",
    category: "exfoliating-scrub-exfoliator",
    price: "$39.00",
  },
  {
    name: "Lemonade Smoothing Scrub",
    img1:
      "https://sephora.com/productimages/sku/s2406957-main-zoom.jpg?imwidth=930",
    brand: "OLEHENRIKSEN",
    category: "exfoliating-scrub-exfoliator",
    price: "$32.00",
  },
  {
    name:
      "Yerba Mate Resurfacing + Exfoliating Energy Facial with Enzymes + Niacinamide",
    img1:
      "https://sephora.com/productimages/sku/s2339810-main-zoom.jpg?imwidth=930",
    brand: "Youth To The People",
    category: "exfoliating-scrub-exfoliator",
    price: "$54.00",
  },
  {
    name: "The Method: Polish Normal-Combination Skin",
    img1:
      "https://sephora.com/productimages/sku/s1747773-main-zoom.jpg?imwidth=930",
    brand: "LANCER Skincare",
    category: "exfoliating-scrub-exfoliator",
    price: "$60.00 $75.00",
  },
  {
    name: "Sugar Strawberry Exfoliating Face Wash",
    img1:
      "https://sephora.com/productimages/sku/s2223592-main-zoom.jpg?imwidth=930",
    brand: "fresh",
    category: "exfoliating-scrub-exfoliator",
    price: "$33.00",
  },
  {
    name: "Regenerating Exfoliating Cleanser",
    img1:
      "https://sephora.com/productimages/sku/s1647536-main-zoom.jpg?imwidth=930",
    brand: "Tata Harper",
    category: "exfoliating-scrub-exfoliator",
    price: "$42.00",
  },
  {
    name: "GOOPGLOW Microderm Instant Glow Exfoliator",
    img1:
      "https://sephora.com/productimages/sku/s2319168-main-zoom.jpg?imwidth=930",
    brand: "goop",
    category: "exfoliating-scrub-exfoliator",
    price: "$125.00",
  },
  {
    name: "Transforming Walnut Scrub",
    img1:
      "https://sephora.com/productimages/sku/s1910538-main-zoom.jpg?imwidth=930",
    brand: "OLEHENRIKSEN",
    category: "exfoliating-scrub-exfoliator",
    price: "$28.00",
  },
  {
    name: "Niacinamide 10% + Zinc 1%",
    img1:
      "https://sephora.com/productimages/sku/s2031391-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "face-serum",
    price: "$5.90",
  },
  {
    name: "Hyaluronic Acid 2% + B5",
    img1:
      "https://sephora.com/productimages/sku/s2031375-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "face-serum",
    price: "$6.80",
  },
  {
    name: "Watermelon Glow Niacinamide Dew Drops",
    img1:
      "https://sephora.com/productimages/sku/s2404846-main-zoom.jpg?imwidth=930",
    brand: "Glow Recipe",
    category: "face-serum",
    price: "$34.00",
  },
  {
    name: "Buffet",
    img1:
      "https://sephora.com/productimages/sku/s2031367-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "face-serum",
    price: "$14.80",
  },
  {
    name: "C-Firma™ Vitamin C Day Serum",
    img1:
      "https://sephora.com/productimages/sku/s1765239-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "face-serum",
    price: "$80.00",
  },
  {
    name: "Avocado Ceramide Redness Relief Serum",
    img1:
      "https://sephora.com/productimages/sku/s2450096-main-zoom.jpg?imwidth=930",
    brand: "Glow Recipe",
    category: "face-serum",
    price: "$42.00",
  },
  {
    name: "Good Genes All-In-One Lactic Acid Treatment",
    img1:
      "https://sephora.com/productimages/sku/s1887298-main-zoom.jpg?imwidth=930",
    brand: "SUNDAY RILEY",
    category: "face-serum",
    price: "$122.00 ($142.00 value)",
  },
  {
    name: "Natural Moisturizing Factors + HA",
    img1:
      "https://sephora.com/productimages/sku/s2031425-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "face-serum",
    price: "$5.80",
  },
  {
    name: "Protini™ Powerpeptide Resurfacing Serum",
    img1:
      "https://sephora.com/productimages/sku/s2429710-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "face-serum",
    price: "$82.00",
  },
  {
    name: "T.L.C. Framboos™ Glycolic Resurfacing Night Serum",
    img1:
      "https://sephora.com/productimages/sku/s2427714-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "face-serum",
    price: "$90.00",
  },
  {
    name: "Plum Plump™ Hyaluronic Acid Serum",
    img1:
      "https://sephora.com/productimages/sku/s2371524-main-zoom.jpg?imwidth=930",
    brand: "Glow Recipe",
    category: "face-serum",
    price: "$42.00",
  },
  {
    name: "100% L-Ascorbic Acid Powder",
    img1:
      "https://sephora.com/productimages/sku/s2336451-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "face-serum",
    price: "$5.80",
  },
  {
    name: "Watermelon Glow PHA +BHA Pore-Tight Toner",
    img1:
      "https://sephora.com/productimages/sku/s2348431-main-zoom.jpg?imwidth=930",
    brand: "Glow Recipe",
    category: "acne-products-acne-cream",
    price: "$34.00",
  },
  {
    name: "Salicylic Acid Acne Healing Dots",
    img1:
      "https://sephora.com/productimages/sku/s1962141-main-zoom.jpg?imwidth=930",
    brand: "Peace Out",
    category: "acne-products-acne-cream",
    price: "$19.00",
  },
  {
    name: "T.L.C. Framboos™ Glycolic Resurfacing Night Serum",
    img1:
      "https://sephora.com/productimages/sku/s2427714-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "acne-products-acne-cream",
    price: "$90.00",
  },
  {
    name: "T.L.C. Sukari Babyfacial™ AHA + BHA Mask",
    img1:
      "https://sephora.com/productimages/sku/s1912385-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "acne-products-acne-cream",
    price: "$80.00",
  },
  {
    name: "SUPERMUD® Charcoal Instant Treatment Mask",
    img1:
      "https://sephora.com/productimages/sku/s1901230-main-zoom.jpg?imwidth=930",
    brand: "GLAMGLOW",
    category: "acne-products-acne-cream",
    price: "$60.00",
  },
  {
    name: "Succinic Acid Acne Treatment",
    img1:
      "https://sephora.com/productimages/sku/s2425098-main-zoom.jpg?imwidth=930",
    brand: "The INKEY List",
    category: "acne-products-acne-cream",
    price: "$8.99",
  },
  {
    name: "ExfoliKate® Intensive Pore Exfoliating Treatment",
    img1:
      "https://sephora.com/productimages/sku/s2393692-main-zoom.jpg?imwidth=930",
    brand: "Kate Somerville",
    category: "acne-products-acne-cream",
    price: "$25.00",
  },
  {
    name: "Salicylic Acid Treatment Serum",
    img1:
      "https://sephora.com/productimages/sku/s2369031-main-zoom.jpg?imwidth=930",
    brand: "Peace Out",
    category: "acne-products-acne-cream",
    price: "$34.00",
  },
  {
    name: "Max Complexion Salicylic Acid Pore Refining Pads",
    img1:
      "https://sephora.com/productimages/sku/s784603-main-zoom.jpg?imwidth=930",
    brand: "Peter Thomas Roth",
    category: "acne-products-acne-cream",
    price: "$46.00",
  },
  {
    name: "Oil-Absorbing Pore Treatment Strips",
    img1:
      "https://sephora.com/productimages/sku/s2026391-main-zoom.jpg?imwidth=930",
    brand: "Peace Out",
    category: "acne-products-acne-cream",
    price: "$19.00",
  },
  {
    name: "Vinopure Natural Salicylic Acid Pore Minimizing Serum",
    img1:
      "https://sephora.com/productimages/sku/s2114932-main-zoom.jpg?imwidth=930",
    brand: "Caudalie",
    category: "acne-products-acne-cream",
    price: "$49.00",
  },
  {
    name: "U.F.O. Ultra-Clarifying Face Oil",
    img1:
      "https://sephora.com/productimages/sku/s1842251-main-zoom.jpg?imwidth=930",
    brand: "SUNDAY RILEY",
    category: "acne-products-acne-cream",
    price: "$80.00",
  },
  {
    name: "Banana Bright Eye Crème",
    img1:
      "https://sephora.com/productimages/sku/s2018984-main-zoom.jpg?imwidth=930",
    brand: "OLEHENRIKSEN",
    category: "eye-treatment-dark-circle-treatment",
    price: "$39.00",
  },
  {
    name: "Retinol Eye Stick",
    img1:
      "https://sephora.com/productimages/sku/s2415420-main-zoom.jpg?imwidth=930",
    brand: "Peace Out",
    category: "eye-treatment-dark-circle-treatment",
    price: "$28.00",
  },
  {
    name: "Avocado Melt Retinol Eye Sleeping Mask",
    img1:
      "https://sephora.com/productimages/sku/s2266708-main-zoom.jpg?imwidth=930",
    brand: "Glow Recipe",
    category: "eye-treatment-dark-circle-treatment",
    price: "$42.00",
  },
  {
    name: "C-Tango™ Vitamin C Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2062081-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "eye-treatment-dark-circle-treatment",
    price: "$64.00",
  },
  {
    name: "Wrinkle Blur™ Bakuchiol Eye Gel Crème",
    img1:
      "https://sephora.com/productimages/sku/s2434942-main-zoom.jpg?imwidth=930",
    brand: "OLEHENRIKSEN",
    category: "eye-treatment-dark-circle-treatment",
    price: "$49.00",
  },
  {
    name: "Caffeine Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2211514-main-zoom.jpg?imwidth=930",
    brand: "The INKEY List",
    category: "eye-treatment-dark-circle-treatment",
    price: "$9.99",
  },
  {
    name: "Moisturizing Eye Bomb",
    img1:
      "https://sephora.com/productimages/sku/s1997394-main-zoom.jpg?imwidth=930",
    brand: "belif",
    category: "eye-treatment-dark-circle-treatment",
    price: "$48.00",
  },
  {
    name: "Flash Nap Instant Revival Eye Gel-Cream",
    img1:
      "https://sephora.com/productimages/sku/s2443703-main-zoom.jpg?imwidth=930",
    brand: "FENTY SKIN",
    category: "eye-treatment-dark-circle-treatment",
    price: "$32.00",
  },
  {
    name: "Brightening Dark Circle Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2433746-main-zoom.jpg?imwidth=930",
    brand: "REN Clean Skincare",
    category: "eye-treatment-dark-circle-treatment",
    price: "$49.00",
  },
  {
    name: "Benefiance Wrinkle Smoothing Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2246650-main-zoom.jpg?imwidth=930",
    brand: "Shiseido",
    category: "eye-treatment-dark-circle-treatment",
    price: "$64.00",
  },
  {
    name: "Creamy Eye Treatment with Avocado",
    img1:
      "https://sephora.com/productimages/sku/s1988815-main-zoom.jpg?imwidth=930",
    brand: "Kiehl's Since 1851",
    category: "eye-treatment-dark-circle-treatment",
    price: "$32.00",
  },
  {
    name: "The Silk Peony Melting Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2236263-main-zoom.jpg?imwidth=930",
    brand: "Tatcha",
    category: "eye-treatment-dark-circle-treatment",
    price: "$60.00",
  },
  {
    name: "Banana Bright Eye Crème",
    img1:
      "https://sephora.com/productimages/sku/s2018984-main-zoom.jpg?imwidth=930",
    brand: "OLEHENRIKSEN",
    category: "eye-cream-dark-circles",
    price: "$39.00",
  },
  {
    name: "Retinol Eye Stick",
    img1:
      "https://sephora.com/productimages/sku/s2415420-main-zoom.jpg?imwidth=930",
    brand: "Peace Out",
    category: "eye-cream-dark-circles",
    price: "$28.00",
  },
  {
    name: "Avocado Melt Retinol Eye Sleeping Mask",
    img1:
      "https://sephora.com/productimages/sku/s2266708-main-zoom.jpg?imwidth=930",
    brand: "Glow Recipe",
    category: "eye-cream-dark-circles",
    price: "$42.00",
  },
  {
    name: "C-Tango™ Vitamin C Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2062081-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "eye-cream-dark-circles",
    price: "$64.00",
  },
  {
    name: "Wrinkle Blur™ Bakuchiol Eye Gel Crème",
    img1:
      "https://sephora.com/productimages/sku/s2434942-main-zoom.jpg?imwidth=930",
    brand: "OLEHENRIKSEN",
    category: "eye-cream-dark-circles",
    price: "$49.00",
  },
  {
    name: "Caffeine Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2211514-main-zoom.jpg?imwidth=930",
    brand: "The INKEY List",
    category: "eye-cream-dark-circles",
    price: "$9.99",
  },
  {
    name: "Moisturizing Eye Bomb",
    img1:
      "https://sephora.com/productimages/sku/s1997394-main-zoom.jpg?imwidth=930",
    brand: "belif",
    category: "eye-cream-dark-circles",
    price: "$48.00",
  },
  {
    name: "Flash Nap Instant Revival Eye Gel-Cream",
    img1:
      "https://sephora.com/productimages/sku/s2443703-main-zoom.jpg?imwidth=930",
    brand: "FENTY SKIN",
    category: "eye-cream-dark-circles",
    price: "$32.00",
  },
  {
    name: "Brightening Dark Circle Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2433746-main-zoom.jpg?imwidth=930",
    brand: "REN Clean Skincare",
    category: "eye-cream-dark-circles",
    price: "$49.00",
  },
  {
    name: "Benefiance Wrinkle Smoothing Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2246650-main-zoom.jpg?imwidth=930",
    brand: "Shiseido",
    category: "eye-cream-dark-circles",
    price: "$64.00",
  },
  {
    name: "Creamy Eye Treatment with Avocado",
    img1:
      "https://sephora.com/productimages/sku/s1988815-main-zoom.jpg?imwidth=930",
    brand: "Kiehl's Since 1851",
    category: "eye-cream-dark-circles",
    price: "$32.00",
  },
  {
    name: "The Silk Peony Melting Eye Cream",
    img1:
      "https://sephora.com/productimages/sku/s2236263-main-zoom.jpg?imwidth=930",
    brand: "Tatcha",
    category: "eye-cream-dark-circles",
    price: "$60.00",
  },
  {
    name: "Instant Detox Mask",
    img1:
      "https://sephora.com/productimages/sku/s1698018-main-zoom.jpg?imwidth=930",
    brand: "Caudalie",
    category: "face-mask",
    price: "$39.00",
  },
  {
    name: "Superberry Hydrate + Glow Dream Mask with Vitamin C",
    img1:
      "https://sephora.com/productimages/sku/s2180941-main-zoom.jpg?imwidth=930",
    brand: "Youth To The People",
    category: "face-mask",
    price: "$48.00",
  },
  {
    name: "Watermelon + AHA Glow Sleeping Mask",
    img1:
      "https://sephora.com/productimages/sku/s1955764-main-zoom.jpg?imwidth=930",
    brand: "Glow Recipe",
    category: "face-mask",
    price: "$45.00",
  },
  {
    name: "T.L.C. Sukari Babyfacial™ AHA + BHA Mask",
    img1:
      "https://sephora.com/productimages/sku/s1912385-main-zoom.jpg?imwidth=930",
    brand: "Drunk Elephant",
    category: "face-mask",
    price: "$80.00",
  },
  {
    name: "Salicylic Acid 2% Masque",
    img1:
      "https://sephora.com/productimages/sku/s2267581-main-zoom.jpg?imwidth=930",
    brand: "The Ordinary",
    category: "face-mask",
    price: "$12.00",
  },
  {
    name: "SUPERMUD® Charcoal Instant Treatment Mask",
    img1:
      "https://sephora.com/productimages/sku/s1901230-main-zoom.jpg?imwidth=930",
    brand: "GLAMGLOW",
    category: "face-mask",
    price: "$60.00",
  },
  {
    name: "Face Mask",
    img1:
      "https://sephora.com/productimages/sku/s1973700-main-zoom.jpg?imwidth=930",
    brand: "SEPHORA COLLECTION",
    category: "face-mask",
    price: "$4.00 $5.50",
  },
  {
    name: "Water Sleeping Mask",
    img1:
      "https://sephora.com/productimages/sku/s1966241-main-zoom.jpg?imwidth=930",
    brand: "LANEIGE",
    category: "face-mask",
    price: "$25.00",
  },
  {
    name: "Microneedling Anti-Wrinkle Retinol Patches",
    img1:
      "https://sephora.com/productimages/sku/s2298701-main-zoom.jpg?imwidth=930",
    brand: "Peace Out",
    category: "face-mask",
    price: "$28.00",
  },
  {
    name: "Rare Earth Deep Pore Cleansing Mask",
    img1:
      "https://sephora.com/productimages/sku/s1989359-main-zoom.jpg?imwidth=930",
    brand: "Kiehl's Since 1851",
    category: "face-mask",
    price: "$38.00",
  },
  {
    name: "Superclay Purify + Clear Power Mask",
    img1:
      "https://sephora.com/productimages/sku/s2450674-main-zoom.jpg?imwidth=930",
    brand: "Youth To The People",
    category: "face-mask",
    price: "$36.00",
  },
  {
    name: "Sheet Masks",
    img1:
      "https://sephora.com/productimages/sku/s1723881-main-zoom.jpg?imwidth=930",
    brand: "Dr. Jart+",
    category: "face-mask",
    price: "$6.00",
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
        if (data[i].category === "moisturizer-skincare") {
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p381030-av-03-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p411540-av-02-zoom.jpg?imwidth=1224"
          );
        }
        if (data[i].category === "cleansing-oil-face-oil") {
          imagesArray.push(
            "https://www.sephora.com/productimages/sku/s1679315-av-04-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p442549-av-01-zoom.jpg?imwidth=1224"
          );
        }

        if (data[i].category === "face-wash-facial-cleanser") {
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p436359-av-02-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p422007-av-05-zoom.jpg?imwidth=1224"
          );
        }

        if (data[i].category === "exfoliating-scrub-exfoliator") {
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p423688-av-03-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p423688-av-04-zoom.jpg?imwidth=1224"
          );
        }

        if (data[i].category === "face-serum") {
          imagesArray.push(
            "https://www.sephora.com/productimages/sku/s1765239-av-03-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/sku/s1765239-av-01-zoom.jpg?imwidth=1224"
          );
        }

        if (data[i].category === "acne-products-acne-cream") {
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p467655-av-06-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p467655-av-01-zoom.jpg?imwidth=1224"
          );
        }

        if (data[i].category === "eye-treatment-dark-circle-treatment") {
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p422000-av-02-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/sku/s2246650-av-05-zoom.jpg?imwidth=1224"
          );
        }

        if (data[i].category === "eye-cream-dark-circles") {
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p422000-av-02-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/sku/s2246650-av-05-zoom.jpg?imwidth=1224"
          );
        }

        if (data[i].category === "face-mask") {
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p376409-av-11-zoom.jpg?imwidth=1224"
          );
          imagesArray.push(
            "https://www.sephora.com/productimages/product/p422002-av-04-zoom.jpg?imwidth=1224"
          );
        }

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
        if (category.name == "moisturizer-skincare")
          description =
            " A soothing, lightweight moisturizer, this sweet soufflé of banana, magnesium, turmeric, and cica is your recipe for calmer, hydrated, even skin.";
        else if (category.name == "cleansing-oil-face-oil")
          description =
            "A face oil rich in critical antioxidants and omegas 6 and 9 that moisturizes, nourishes, and visibly balances while restoring a youthful-looking glow.";
        else if (category.name == "face-wash-facial-cleanser")
          description =
            "A PH-neutral, daily cream cleanser that gently washes away impurities without stripping skin—leaving it hydrated, feeling soft, and looking luminous.";
        else if (category.name == "exfoliating-scrub-exfoliator")
          description =
            "A two-in-one face scrub and mask that buffs and hydrates with real brown sugar and strawberries.";
        else if (category.name == "face-serum")
          description =
            "A mega-strength AM/PM exfoliating serum that visibly improves skin’s texture, tone, radiance, and bounce with 10% lactic acid and 11 signal peptides.";
        else if (category.name == "acne-products-acne-cream")
          description =
            " A non-drying, gentle, and targeted acne treatment that clears acne spots fast while layering under makeup without flaking.";
        else if (category.name == "eye-treatment-dark-circle-treatment")
          description =
            "A formula to instantly brighten all skin tones, with a cooling metal tip to help massage away puffs.";
        else if (category.name == "eye-cream-dark-circles")
          description =
            "A formula to instantly brighten all skin tones, with a cooling metal tip to help massage away puffs.";
        else if (category.name == "face-mask")
          description =
            "A skin-smoothing, cult-favorite nightly sleeping mask with watermelon, hyaluronic acid, and AHAs that gently exfoliate and refine the look of pores.";
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
