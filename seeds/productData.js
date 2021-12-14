const { Product } = require('../models');
const fs = require('fs');

const seedProduct = () => {
  let productdata = [];
  fs.readFile('../db/Product.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      productdata = JSON.parse(data);
      Product.bulkCreate(productdata);
    }
  });
}

module.exports = seedProduct;