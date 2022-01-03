const router = require('express').Router();

const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const allergenRoutes = require('./allergen-routes');
const searchRoutes = require('./search-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/allergens', allergenRoutes);
router.use('/search', searchRoutes);

module.exports = router;
