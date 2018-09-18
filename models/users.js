const db = require('../db');
const md5 = require('md5');

exports.newUser = ({username, password, mail}, done) => {
    password = md5(password);
    db.get().query('INSERT INTO users VALUES (null, ?, ?, ?, null, true)', [username, password, mail], (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
};

exports.getUser = ({username, password}, done) => {
    password = md5(password);
    db.get().query('SELECT * FROM users WHERE username = ? AND pswd = ? and isActivated = true', [username, password], (err,rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
};

exports.saveFavorite = ({restId, userId}, done) => {
    db.get().query('INSERT INTO user_favs VALUES (null, ?, ?)', [restId, userId], (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

exports.removeFavorite = ({restId, userId}, done) => {
    db.get().query('DELETE FROM user_favs WHERE id_rest = ? and id_user = ?', [restId, userId], (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}

exports.removeUser = ({userId}, done) => {
    db.get().query('UPDATE users set isActivated = false WHERE id = ?', [userId], (err, rows) => {
        if(err) return done(err.message);
        done(null, rows);
    })
}


