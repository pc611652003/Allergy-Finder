const { Product } = require("../models");

const productdata = [
  {
    name: "Planters Dry Roasted Peanuts",
    product_image:
      "https://images.albertsons-media.com/is/image/ABS/109350016?$ecom-pdp-desktop$&defaultImage=Not_Available",
    user_id: 1,
  },
  {
    name: "DP1 - Frog",
    product_image:
      "http://images2.fanpop.com/image/answers/342000/342741_1263941970327.98res_449_393.jpg",
    user_id: 1,
  },
  {
    name: "DP2 - Chicken",
    product_image:
      "https://i.redd.it/sntnztl9wam41.jpg",
    user_id: 1,
  },
  {
    name: "somecat",
    product_image:
      "https://64.media.tumblr.com/9e26cbe3e0867fe7af1626fcb6ad3568/tumblr_puea0achjL1wiwvfvo1_1280.jpg",
    user_id: 1,
  },
  {
    name: "sometrash",
    product_image:
      "https://i.pinimg.com/474x/ef/49/37/ef493790714a037449d62d3f2a6fccbf--cutest-animals-funny-animals.jpg",
    user_id: 1,
  }
];

const seedProduct = () => Product.bulkCreate(productdata);

module.exports = seedProduct;
