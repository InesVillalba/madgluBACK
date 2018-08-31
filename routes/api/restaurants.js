var express = require('express');
var router = express.Router();

const modelRestaurants = require('../../models/restaurants.js');

// GET http://localhost:3000/api/restaurants/
router.get('/', (req, res) => {
    modelRestaurants.getRestAndCategories((err, rows) => {
        let restaurantes = [];
        rows.forEach(row => {
            // Si en el array restaurantes existe un objeto que coincida con el id de la fila que estamos iterando con el foreach (row) devuelve ese objeto en restFound
            let restFound = restaurantes.find((rest) =>{                            
                return row.restId === rest.id
            })
            
            if(!restFound){
                restaurantes.push({
                    id: row.restId,
                    name: row.restName,
                    description: row.restDescription,
                    area: row.restArea,
                    address: row.restAddress, 
                    tags: [row.tagName]
                })
            }else{
                restFound.tags.push(row.tagName)
            }
        });
        res.json(restaurantes)
    })
}) 

// GET http://localhos:3000/api/restaurants/3
router.get('/:idRestaurant', (req, res) => {
    modelRestaurants.getById(req.params.idRestaurant, (err, rows) => {
        if(err) console.log('No se ha encontrado un restaurante con ese ID');
        if(rows.length == 1){
            res.json(rows[0]);
        }
    })
})


module.exports = router;
