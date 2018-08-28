// Requiero la librería express para crear un servidor
var express = require('express');
var router = express.Router();

const restaurantsRouter = require('./api/restaurants.js');

// Gestiona todas las peticiones que se realicen sobre /api/restaurants
router.use('/restaurants', restaurantsRouter);


module.exports = router;
