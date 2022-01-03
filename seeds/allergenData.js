const { Allergen } = require('../models');

const allergendata = [
  {
    "allergen_name": "Peanut",
    "user_id": 1 
  }
];

const seedAllergen = () => Allergen.bulkCreate(allergendata);

module.exports = seedAllergen;