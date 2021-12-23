const router = require('express').Router();

const {Allergen, Product} = require('../models');

const withAuth = require('../utils/auth');

//Get all saved product for homepage
router.get('/', withAuth, async(req, res) => {
    try {
        const productData = await Product.findall(req.params.id, {
            include: [
                {
                    model: Product,
                    attributes: [
                        'id',
                        'name',
                        'filename' // we can add more attributes
                    ]
                }
            ]
        });
        const products = productData.map((product) =>
            product.get({plain:true})
        );
        res.render('homepage', {
            products,
            loggedIn:req.session.loggedIn,
        })
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Get all saved Allergen for homepage
router.get('/', withAuth, async (req,res) => {
    try {
        const allergenData = await Product.findall(req.params.id, {
            include: [
                {
                    model: Allergen,
                    attributes: [
                        'id',
                        'name',
                        'filename' // images
                    ]
                }
            ]
        });

        const Allergens = allergenData.map((allergen) =>
            allergen.get({plain:true})
        );

        res.render('homepage', {
            Allergens,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Get one product
router.get('/Product/:id', withAuth, async (req,res) => {
    try {
        const productData = await Product.findByPk(req.params.id, {
            include : [
                {
                    model: Product,
                    attributes: [
                        'id',
                        'name',
                        'filename', // get the image need to change for model
                    ],
                },
            ],
    });
    
    const product = productData.get({plain:true});
    res.render('product', {product, loggedIn:req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
    res.redirect('/');
    return;
}

res.render('login');
});

module.exports = router;