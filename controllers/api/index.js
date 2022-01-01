const router = require('express').Router();

const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const allergenRoutes = require('./allergen-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/allergens', allergenRoutes);

module.exports = router;
