const User = require('./User');
const Allergen = require('./Allergen');
const Product = require('./Product');

User.hasMany(Allergen, {
    foreignKey: 'user_id',
});
  
Allergen.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Product, {
    foreignKey: 'user_id',
});
  
Product.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Allergen, Product };