var express = require('express');
var router = express.Router();

const modelRestaurants = require('../../models/restaurants.js');

// GET http://localhost:3000/api/restaurants/
router.get('/', (req, res) => {
    modelRestaurants.getRestAndCategories((err, rows) => {
      res.json(rows);
    })
}) 

// GET http://localhost:3000/api/restaurants/categories
router.get('/categories', (req, res) => {    
    modelRestaurants.getCategories((err, rows) => {  
        res.json(rows);
    })
})

// GET http://localhost:3000/api/restaurants/areas
router.get('/areas', (req, res) => {    
    modelRestaurants.getAreas((err, rows) => {  
        res.json(rows);
    })
})

router.post('/filter', (req, res) => {
    console.log(req.body);
})

// GET http://localhost:3000/api/restaurants/3
router.get('/:idRestaurant', (req, res) => {
    modelRestaurants.getById(req.params.idRestaurant, (err, rows) => {
        if(err) console.log('No se ha encontrado un restaurante con ese ID');
        if(rows.length == 1){
            res.json(rows[0]);
        }
    })
})

module.exports = router;
