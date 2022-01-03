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

    const allergenData = await Allergen.findAll({
      where: {
        user_id: req.session.user
      }
    });
    const allergens = allergenData.map((allergen) =>
      allergen.get({ plain: true })
    );

    res.render("homepage", {
      products,
      allergens,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  const allergenData = await Allergen.findAll({
    where: {
      user_id: req.session.user
    }
  });
  const allergens = allergenData.map((allergen) =>
    allergen.get({ plain: true })
  );
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    allergens,
  });
});

router.get("/search", async (req, res) => {
  const searches = req.session.searchData;

  const allergenData = await Allergen.findAll({
    where: {
      user_id: req.session.user
    }
  });
  const allergens = allergenData.map((allergen) =>
    allergen.get({ plain: true })
  );

  res.render("searchResult", {
    searches,
    allergens,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
