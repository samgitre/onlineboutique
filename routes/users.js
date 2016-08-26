var express = require('express');
var router = express.Router();
var User = require('../configs/model/user-schema');
var csrf = require('csurf');
var passport = require('passport');
var csurfProtection = csrf();
var bcrypt = require('bcrypt-nodejs');
router.use(csurfProtection);


/* GET users listing. */
router.get('/all-clients', function(req, res) {
  res.render('users/all-clients', {title : 'Clients Information', layout: 'admin-layout'});
});


router.get('/sign-up', function(req, res, next) {

    res.render('users/sign-up', {title : 'Users account', csurfToken : req.csrfToken()});
});


router.get('/login', function(req, res) {

    res.render('users/login', {title : 'Users account'});
});


router.post('/createUser', passport.authenticate('local-sign-up', {
    successRedirect : '/users/profile',
    failureRedirect : '/users/sign-up',
    failureFlash : true
}));


router.get('/user-profile', function (req, res) {
    res.render('users/user-profile');

});


module.exports = router;
