const router = require("express").Router();

const fetch = require("node-fetch");
const sequelize = require('../config/connection');
require('dotenv').config();

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
  var allergens = [];
  if (req.session.loggedIn) {
    const allergenData = await Allergen.findAll({
      where: {
        user_id: req.session.user
      }
    });
    allergens = allergenData.map((allergen) =>
      allergen.get({ plain: true })
    );
    res.redirect("/");
    return;
  } 

  res.render("login",{ allergens });
});

router.get("/search", async (req, res) => {
  var searches = [];
  var allergens = [];
  search_product = req.session.search_product;
  search_allergen = req.session.search_allergen;

	var apiUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=${search_product}&number=5`;

  if (search_allergen) {
    apiUrl = apiUrl + `&intolerances=${search_allergen}`;
  }
  
  //this only fetches name and images but you are able to filter by intolerances such as dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.
  await fetch(apiUrl, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY
    }
  })
  .then(response => response.json())
  .then(data => 
    {
      for (let i = 0; i < data.length; i++){
        var name = data[i].name;
        var nameAttitute = name.replace(/\s/g, "%20");
        var product_image = `https://spoonacular.com/cdn/ingredients_100x100/${data[i].image}`;
        var searchItem = {
          index: i,
          name: name,
          nameAttitute: nameAttitute,
          product_image: product_image
        };
        searches.push(searchItem);
      }
    })
  .catch(err => {
    console.error(err);
  })
    
  if (req.session.loggedIn) {

    const allergenData = await Allergen.findAll({
      where: {
        user_id: req.session.user
      }
    });
    allergens = allergenData.map((allergen) =>
      allergen.get({ plain: true })
    );
  }

  res.render("searchResult", {
    searches,
    allergens,
    loggedIn: req.session.loggedIn,
  });
});

router.post("/search", async (req, res) => {
  req.session.search_product = req.body.search_product;
  req.session.search_allergen = req.body.search_allergen;

  const search_queries = {
    product: req.session.search_product,
    allergen: req.session.search_allergen,
  }
  res.status(200).json(search_queries);
});

module.exports = router;
