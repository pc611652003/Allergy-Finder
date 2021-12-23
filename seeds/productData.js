const { Product } = require('../models');

const productdata = [
  {
    "name": "Planters Dry Roasted Peanuts",
    "product_id": "some0random0code",
    "product_image": "https://images.albertsons-media.com/is/image/ABS/109350016?$ecom-pdp-desktop$&defaultImage=Not_Available",
    "user_id": 1 
  }
];

const seedProduct = () => Product.bulkCreate(productdata);


module.exports = seedProduct;