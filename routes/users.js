var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var csurfProtection = csrf();
var User = require('../configs/model/user-schema');
var bcrypt = require('bcrypt-nodejs');
 // router.use(csurfProtection);


/* GET users listing. */
router.get('/all-clients', function(req, res) {
  res.render('users/all-clients', {title : 'Clients Information', layout: 'admin-layout'});
});


router.get('/sign-up', function(req, res, next) {

    res.render('users/sign-up', {title : 'Users account'});
});


router.post('/createUser', function (req, res) {
    //getting input fields from the form.

    var firstName  = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    //validating the input fields.
    req.checkBody('firstName', 'first name is missing').notEmpty();
    req.checkBody('lastName', ' last name is missing').notEmpty();
    req.checkBody('email', ' email is missing').notEmpty();
    req.checkBody('email', ' Invalid email address').isEmail();
    req.checkBody('password', 'password  is missing').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('users/sign-up', { allErrors : errors });
    }
    else {
        var newUser = new User({
            firstname : firstName,
            lastname : lastName,
            email : email,
            password : password
        });
        User.createUser(newUser,  function (err, user) {
            if(err){throw err;

                console.log(user);
            }
        });
        req.flash('success_msg', 'Registration successful please login to manage your profile');
        res.redirect('login');
    }

});





















router.get('/login', function(req, res) {

    res.render('users/login', {title : 'Login'});
});












router.get('/user-profile', function (req, res) {
    res.render('users/user-profile');

});

module.exports = router;
