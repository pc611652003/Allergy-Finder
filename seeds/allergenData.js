const { Allergen } = require('../models');

const allergendata = [
  {
    "allergen_name": "peanuts",
    "user_id": 1 
  }
];

const seedAllergen = () => Allergen.bulkCreate(allergendata);

module.exports = seedAllergen;