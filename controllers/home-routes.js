const router = require("express").Router();

const { Allergen, Product } = require("../models");

const withAuth = require("../utils/auth");

//Get all saved product for homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const productData = await Product.findAll({
      where: {
        user_id: req.session.user
      }
    });
    const products = productData.map((product) => product.get({ plain: true }));

    const allergenData = await Product.findAll({
      where: {
        user_id: req.session.user
      }
    });
    const Allergens = allergenData.map((allergen) =>
      allergen.get({ plain: true })
    );

    res.render("homepage", {
      products,
      Allergens,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/search", (req, res) => {

    // hardcode data for develop use only
    // should be replace by result from external API
    const searches = [
      
        {
          index: 1,
          name: 'somecat',
          product_id: 'somecode',
          product_image: 'https://64.media.tumblr.com/9e26cbe3e0867fe7af1626fcb6ad3568/tumblr_puea0achjL1wiwvfvo1_1280.jpg',
          description: 'This is a dummy',
          allergen: 'nut, milk',
        },
        
        {
          index: 2,
          name: 'sometrash',
          product_id: 'someothercode',
          product_image: 'https://i.pinimg.com/474x/ef/49/37/ef493790714a037449d62d3f2a6fccbf--cutest-animals-funny-animals.jpg',
          description: 'This is a dummy 2',
          allergen: 'nut, milk, egg',
        }

      ];

    console.log('Here : ', searches);
    res.render('searchResult', { searches });
});

module.exports = router;
