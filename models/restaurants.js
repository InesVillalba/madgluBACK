const db = require('../db');

//Este fichero contiene todas las funciones para trabajar con el tabla RESTAURANTS

exports.getAll = (done) => {
    db.get().query('SELECT * FROM restaurants', (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

exports.getCategories = (done) =>{
    db.get().query('SELECT * FROM categorie', (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

exports.getRestAndCategories = (done) => {
    db.get().query('select r.id as restId, r.name as restName, r.description as restDescription, r.area as restArea, r.address as restAddress, c.name as tagName from restaurants r, categorie c, rest_tags rt where r.id = rt.id_rest and c.id = rt.id_categorie;', (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}


exports.getById = (idRestaurant, done) => {
    db.get().query('SELECT * FROM restaurants WHERE id = ?', [idRestaurant], (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

