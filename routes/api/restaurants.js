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

/*
// GET http://localhost:3000/api/restaurants/filter?areas=Arganzuela,Centro&categories=cafe,italiano
router.get('/filter', (req, res) => {    
    //console.log("FILTER: "+req.params);
    
    //let myAreas = req.param.filters.areas === "" ? null : req.param.filters.areas;
    //let myCategories = req.param.filters.caregories === "" ? null : req.param.filters.categories;

    modelRestaurants.getFilteredRestaurants("'Arganzuela','Centro'", "'cafe','italiano'", (err, rows) => {
        if(err) console.log('No se ha encontrado un restaurante con ese ID');
        if(rows.length == 1){
            res.json(rows);
        }
    })
})
*/
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
