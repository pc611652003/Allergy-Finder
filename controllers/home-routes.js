const router = require('express').Router();

const {Allergen, Product} = require('../models');

const withAuth = require('../utils/auth');

//Get all saved product for homepage
router.get('/', withAuth, async(req, res) => {
    try {
        const productData = await Product.findall(req.params.id, {
            include: [
                {
                    
                }
            ]
        })
    }
})


module.exports = router;