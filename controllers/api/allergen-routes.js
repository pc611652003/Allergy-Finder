const router = require('express').Router();
const { Allergen } = require('../../models');

// Add a Data to Allergen Table
router.post('/', async (req, res) => {
    try {
      var user_id = 0;
      if (!req.body.user_id) {
        user_id = req.session.user;
      } else {
        user_id = req.body.user_id;
      }
      const dbAllergenData = await Allergen.create({
        allergen_name: req.body.allergen_name,
        user_id: user_id,
      });
      res.status(200).json(dbAllergenData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Get All Data from Allergen Table
router.get('/', async (req, res) => {
    try {
      const dbAllergenData = await Allergen.findAll();
      res.status(200).json(dbAllergenData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Get All Data related to the user from Allergen Table
router.get('/:user_id', async (req, res) => {
    try {
      const dbAllergenData = await Allergen.findAll({
        where: {
            user_id: req.params.user_id,
        }
      });
      res.status(200).json(dbAllergenData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Update a Data in Allergen Table
router.put('/:id', async (req, res) => {
    try {
      const dbAllergenData = await Allergen.update({
        allergen_name: req.body.allergen_name,
        user_id: req.body.user_id,
      },{
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json(dbAllergenData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Delete a Data from Allergen Table
router.delete('/:id', async (req, res) => {
    try {
      const dbAllergenData = await Allergen.destroy({
        where: {
            id: req.params.id,
        }
      });
      res.status(200).json(dbAllergenData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;