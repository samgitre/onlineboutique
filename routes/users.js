var express = require('express');
var router = express.Router();
var User = require('../configs/model/user-schema');
var csrf = require('csurf');
var passport = require('passport');
var csurfProtection = csrf();
var bcrypt = require('bcrypt-nodejs');
// router.use(csurfProtection);


/* GET users listing. */
router.get('/all-clients', function(req, res) {
  res.render('users/all-clients', {title : 'Clients Information', layout: 'admin-layout'});
});


router.get('/sign-up', function(req, res, next) {

    res.render('users/sign-up', {title : 'Users account'});
});


router.get('/login', function(req, res) {

    res.render('users/login', {title : 'Users account'});
});


router.post('/createUser',function (req, res, next) {

    var user = new User({

    })





    // var firstName = req.body.firstName;
    // var lastName =req.body.lastName;
    //  var email = req.body.email;
    //  var password = req.body.password;
    //
    // req.checkBody('firstName', 'first name is required').notEmpty();
    // req.checkBody('lastName', 'last name is required').notEmpty();
    // req.checkBody('email', 'Invalid email').isEmail();
    // req.checkBody('password', 'password name is required').notEmpty();
    //
    //
    // var errors = req.validationErrors();
    //
    // if(errors){
    //     res.render('users/sign-up', {errors : errors});
    // }
    // else {
    //      var newUser = User({
    //          firstName : firstName,
    //          lastName : lastName,
    //          email: email,
    //          password : password
    //      });
    //
    //        User.createUser(newUser, function (err, user) {
    //         if(err){
    //             throw  err;
    //             console.log(user);
    //         }
    //         else {
    //             res.flash('success_msg', ' You have been registered successfully. Please log in to manage your profile');
    //             res.redirect('users/login');
    //
    //         }
    //
    //     })
    //
    // }
});


router.get('/user-profile', function (req, res) {
    res.render('users/user-profile');

});

module.exports = router;
