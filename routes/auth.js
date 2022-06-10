const express = require('express');
const { ensureAuthenticated } = require('../config/checkAuth');
const router = express.Router();
const User = require('../models/User');

//------------ Importing Controllers ------------//
const authController = require('../controllers/authController')

//------------ Login Route ------------//
router.get('/login', (req, res) => res.render('login'));

//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.render('forgot'));

router.get('/about', (req, res) => res.render('about'));

//------------ Reset Password Route ------------//
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id })
});



router.get('/dashboard', (req, res) => {
    req.session.isAuth = true;
    User.find()
        // .then(users => res.json(users))
        .then(users => {
            if (users){
             
            res.render('dash', {
                 users: users,
            })
            }
        })
});
router.get('/dashboard/:code', (req, res) => {
    var code = req.params.code;

    User.findOne({refer: code})
        .then(user =>{
            if (user){
                res.render("dash.ejs",
                {refer: code}
                )
            }
            else{
                res.redirect("/auth/dashboard");
                req.flash(
                    'error_msg',
                    'Please Register and activate to get referral code.'
                );

            }
        })
});

//------------ Register Route ------------//
router.get('/register', (req, res) => res.render('register'));

//------------ Register POST Handle ------------//
router.post('/register', authController.registerHandle);

//------------ Email ACTIVATE Handle ------------//
router.get('/activate/:token', authController.activateHandle);

//------------ Forgot Password Handle ------------//
router.post('/forgot', authController.forgotPassword);

//------------ Reset Password Handle ------------//
router.post('/reset/:id', authController.resetPassword);

//------------ Reset Password Handle ------------//
router.get('/forgot/:token', authController.gotoReset);

//------------ Login POST Handle ------------//
router.post('/login', authController.loginHandle);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);

module.exports = router;