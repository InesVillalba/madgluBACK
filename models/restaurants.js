const db = require('../db');

//Este fichero contiene todas las funciones para trabajar con el tabla RESTAURANTS

exports.getAll = (done) => {
    db.get().query('SELECT * FROM restaurants', (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}
