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

// GET http://localhost:3000/api/restaurants/3
router.get('/:idRestaurant', (req, res) => { 
    modelRestaurants.getById(req.params.idRestaurant, (err, rows) => {       
        if(err) console.log('No se ha encontrado un restaurante con ese ID');
        if(rows.length == 1){
            res.json(rows[0]);
            
        }
    })
})

// POST http://localhost:3000/api/restaurants/filtered
router.post('/filtered', (req,res) => {
    //console.log(req.body)
    modelRestaurants.filter(req.body, (err, rows) => {
        if(err) return console.log(err);
        console.log(rows)
        res.json(rows);
    })
})

// GET http://localhost:3000/api/restaurants/favorites/13
router.get('/favorites/:idUser', (req, res) => {
    console.log(req.params.idUser)
    modelRestaurants.getFavoriteRestaurants(req.params.idUser, (err, rows) => {
        if(err) return console.log(err);
        console.log(rows)
        res.json(rows);
    })
})

// POST http://localhost:3000/api/restaurants/addcomentario
router.post('/addcomentario', (req, res) => {
    modelRestaurants.addReview(req.body, (err, rows) => {
        console.log(err);
        res.json(rows);
    })
})

// GET http://localhost:3000/api/restaurants/comentarios/1
router.get('/comentarios/:idRestaurant', (req, res) => { 
    modelRestaurants.getReviews(req.params.idRestaurant, (err, rows) => {       
        if(err) console.log('No se ha encontrado ningún comentario para este restaurante');
        res.json(rows);            
    })
})
module.exports = router;
