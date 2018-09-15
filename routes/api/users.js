var express = require('express');
var router = express.Router();

const modelUsers = require('../../models/users.js')

router.post('/registro', (req, res) => {
    modelUsers.newUser(req.body, (err, rows) =>{
        console.log(err);
        res.json(rows);
    })
})

router.post('/login', (req, res) => {
    modelUsers.getUser(req.body, (err, rows) =>{
        console.log(err);
        res.json(rows[0]);
    })
})

router.post('/favorites', (req, res) => {
    modelUsers.saveFavorite(req.body, (err, rows) => {
        console.log(err);
        res.json(rows);
    })
})

router.post('/delfav', (req, res) => {
    modelUsers.removeFavorite(req.body, (err, rows) => {
        console.log(err);
        res.json(rows);
    })
})

module.exports = router;
