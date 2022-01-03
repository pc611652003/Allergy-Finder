const express = require('express');
const router = express.Router();

var searches = [];

// Add a Data to Product Table
router.post('/', async (req, res) => {
    try {
        searches = req.body.searchProducts;
        req.session.searchData = searches;
        res.status(200).json(searches);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;