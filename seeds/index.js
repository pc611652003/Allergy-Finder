const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedProduct = require('./productData');
const seedAllergen = require('./allergenData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedProduct();

  await seedAllergen();

  process.exit(0);
};

seedAll();
