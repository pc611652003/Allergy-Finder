const { Product } = require('../models');

const productdata = [
  {
    "name": "Planters Dry Roasted Peanuts",
    "product_id": "some0random0code",
    "user_id": 1 
  }
];

const seedProduct = () => Product.bulkCreate(productdata);


module.exports = seedProduct;