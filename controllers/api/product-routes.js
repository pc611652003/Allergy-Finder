const router = require('express').Router();
const { Product } = require('../../models');

// Add a Data to Product Table
router.post('/', async (req, res) => {
    try {
      const dbProductData = await Product.create({
        name: req.body.name,
        product_id: req.body.product_id,
        product_image: req.body.product_image,
        user_id: req.body.user_id,
      });
      res.status(200).json(dbProductData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Get All Data from Product Table
router.get('/', async (req, res) => {
    try {
      const dbProductData = await Product.findAll();
      res.status(200).json(dbProductData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Get All Data related to the user from Product Table
router.get('/:user_id', async (req, res) => {
    try {
      const dbProductData = await Product.findAll({
        where: {
            user_id: req.params.user_id,
        }
      });
      res.status(200).json(dbProductData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Update a Data in Product Table
router.put('/:id', async (req, res) => {
    try {
      const dbProductData = await Product.update({
        name: req.body.name,
        product_id: req.body.product_id,
        product_image: req.body.product_image,
        user_id: req.body.user_id,
      },{
        where: {
            id: req.params.id,
        }  
      });
      res.status(200).json(dbProductData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

//Delete a Data from Product Table
router.delete('/:id', async (req, res) => {
    try {
      const dbProductData = await Product.destroy({
        where: {
            id: req.params.id,
        }  
      });
      res.status(200).json(dbProductData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;