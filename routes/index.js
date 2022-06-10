const express = require('express');
const router = express.Router();

const User = require('../models/User');




router.get('/tables', (req, res) => {
    User.find()
        // .then(users => res.json(users))
        .then(users => {
            if (users){
             
            res.render('tables', {
                 users: users,
            })
            }
        })
});
// const { ensureAuthenticated } = require('../config/checkAuth')

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/about', (req, res) => {
    res.render('about');
});

//------------ Dashboard Route ------------//




module.exports = router;