const { Allergen } = require('../models');
const fs = require('fs');

const seedAllergen = () => {
  let allergendata = [];
  fs.readFile('../db/Allergen.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      allergendata = JSON.parse(data);
      Allergen.bulkCreate(allergendata);
    }
  });
  
}

module.exports = seedAllergen;