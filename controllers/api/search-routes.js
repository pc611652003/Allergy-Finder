const express = require('express');
const router = express.Router();
require('dotenv').config();
const withAuth = require("../../utils/auth");

var searches = [];

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

router.get('/', withAuth, async (req, res) => {
    try {
        apiKey = process.env.API_KEY;
        res.status(200).json({ message: apiKey });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;