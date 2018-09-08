const db = require('../db');

//Este fichero contiene todas las funciones para trabajar con el tabla RESTAURANTS

exports.getAll = (done) => {
    db.get().query('SELECT * FROM restaurants', (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

exports.getCategories = (done) =>{
    db.get().query('SELECT * FROM categorie order by value asc', (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

exports.getAreas = (done) =>{
    db.get().query('SELECT distinct area FROM restaurants order by area asc', (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

exports.getRestAndCategories = (done) => {
    db.get().query('select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags '
                    +'from restaurants r '
                    +'inner join rest_tags rt on r.id = rt.id_rest '
                    +'inner join categorie c on c.id = rt.id_categorie '
                    +'group by 1,2,3,4,5'
                , (err, rows) => {
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

exports.getCheckedFilters = (done) => {
    db.get().query('SELECT * FROM checkedFilters', (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

exports.filter = (arrFilters, done) => {
    db.get().query('select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r'
    +' inner join rest_tags rt on r.id = rt.id_rest'
    +' inner join categorie c on c.id = rt.id_categorie'
    +' where r.id in (select id_rest from rest_tags where rest_tags.id_categorie in (?))'
    +' group by 1,2,3,4,5', [arrFilters], (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}
