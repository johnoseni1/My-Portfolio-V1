const express = require('express');
const router = express.Router();

// const User = require('../models/User');




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
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/blog', (req, res) => {
    res.render('blog');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

router.get('/services', (req, res) => {
    res.render('services');
});

//------------ Dashboard Route ------------//




module.exports = router;