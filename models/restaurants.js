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

    if(arrFilters.foodType.length > 0 && arrFilters.areas.length > 0){
        
        var strQuery = 'select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r '
        +'inner join rest_tags rt on r.id = rt.id_rest '
        +'inner join categorie c on c.id = rt.id_categorie '
        +'where r.id in (select id_rest from rest_tags where rest_tags.id_categorie in (?)) '
        +'or r.area in (?) '
        +'group by 1,2,3,4,5'

        db.get().query(strQuery, [arrFilters.foodType, arrFilters.areas], (err, rows) => {
            if(err) return done(err.message);
            done(null, rows);
        })

    }else if(arrFilters.foodType.length == 0 && arrFilters.areas.length == 0){

        var strQuery = 'select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r '
        +'inner join rest_tags rt on r.id = rt.id_rest '
        +'inner join categorie c on c.id = rt.id_categorie '
        +'group by 1,2,3,4,5'
        

        db.get().query(strQuery, (err, rows) => {
            if(err) return done(err.message);
            done(null, rows);
        })

    }else if(arrFilters.foodType.length > 0 && arrFilters.areas.length == 0){
        
        var strQuery = 'select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r '
        +'inner join rest_tags rt on r.id = rt.id_rest '
        +'inner join categorie c on c.id = rt.id_categorie '
        +'where r.id in (select id_rest from rest_tags where rest_tags.id_categorie in (?)) '
        +'group by 1,2,3,4,5'

        db.get().query(strQuery, [arrFilters.foodType], (err, rows) => {
            if(err) return done(err.message);
            done(null, rows);
        })

    }else{
        var strQuery = 'select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r '
        +'inner join rest_tags rt on r.id = rt.id_rest '
        +'inner join categorie c on c.id = rt.id_categorie '
        +'where r.area in (?) '
        +'group by 1,2,3,4,5'

        db.get().query(strQuery, [arrFilters.areas], (err, rows) => {
            if(err) return done(err.message);
            done(null, rows);
        })
    }











    

    /*
    arrFilters --> objeto json que contenga 2 objetos json con la siguiente estructura:

    arrFilter = {
        foodType : [italiano, cafe],
        areas : []
    }

    ¿ QUÉ HAY QUE HACER?

    Existen 4 posibles casuisticas:
        1 - ambos arrays tiene datos
        2 - ningun array tiene datos
        3 - foodType tiene datos y areas esta vacio
        4 - foodType está vacío y areas tiene datos

    La única diferencia en la query va a ser nuestro WHERE !!!

    --------------------------------------------------------------------------------------------------------------------------

    if(arrFilters.foodType.length > 0 && arrFilters.areas.length > 0){
        // ____ 1 ____
    }else if(arrFilters.foodType.length == 0 && arrFilters.areas.length == 0){
        // ____ 2 ____
    }else if(arrFilters.foodType.length > 0 && arrFilters.areas.length == 0){
        // ____ 3 ____
    }else{
        // ____ 4 ____
    }

    --------------------------------------------------------------------------------------------------------------------------

    ____ 1 ____
    select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r
    inner join rest_tags rt on r.id = rt.id_rest
    inner join categorie c on c.id = rt.id_categorie
    where r.id in (select id_rest from rest_tags where rest_tags.id_categorie in (?))
    or r.area in (?)
    group by 1,2,3,4,5

    db.get().query(strQuery, [arrFilters.foodType, arrFilters.areas], (err, rows) => {

    ____ 2 ____
    no hay where
    select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r
    inner join rest_tags rt on r.id = rt.id_rest
    inner join categorie c on c.id = rt.id_categorie
    group by 1,2,3,4,5

    db.get().query(strQuery, (err, rows) => {

    ____ 3 ____
    select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r
    inner join rest_tags rt on r.id = rt.id_rest
    inner join categorie c on c.id = rt.id_categorie
    where r.id in (select id_rest from rest_tags where rest_tags.id_categorie in (?))
    group by 1,2,3,4,5

    db.get().query(strQuery, [arrFilters.foodType], (err, rows) => {

    ____ 4 ____
    select r.id, r.name, r.description, r.area, r.address, GROUP_CONCAT(c.name SEPARATOR ",") as tags from restaurants r
    inner join rest_tags rt on r.id = rt.id_rest
    inner join categorie c on c.id = rt.id_categorie
    where r.area in (?)
    group by 1,2,3,4,5

    db.get().query(strQuery, [arrFilters.areas], (err, rows) => {
    */
}
