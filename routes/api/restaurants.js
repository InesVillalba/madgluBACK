var express = require('express');
var router = express.Router();

const modelRestaurants = require('../../models/restaurants.js');

// GET http://localhost:3000/api/restaurants/
router.get('/', (req, res) => {
    modelRestaurants.getAll((err, rows) => {
        res.json(rows);
    })
})   

module.exports = router;
