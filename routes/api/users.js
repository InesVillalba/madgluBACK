var express = require('express');
var router = express.Router();

const modelUsers = require('../../models/users.js')

router.post('/registro', (req, res) => {
    console.log(req.body);
    modelUsers.newUser(req.body, (err, rows) =>{
        console.log(err);
        res.json(rows);
    })
})

router.post('/login', (req, res) => {
    console.log(req.body);
    modelUsers.getUser(req.body, (err, rows) =>{
        console.log(err);
        res.json(rows[0]);
    })
})

module.exports = router;
