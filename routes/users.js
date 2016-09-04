var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../configs/model/user-schema');


/* GET clients listing. */
router.get('/all-clients', function(req, res) {
  res.render('users/all-clients', {title : 'Clients Information', layout: 'admin-layout'});
});

//Getting the sign up page
router.get('/sign-up', function(req, res, next) {

    res.render('users/sign-up', {title : 'Users account'});
});

//Creating new user account
router.post('/createUser',  function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.email;
    var password = req.body.password;

    req.checkBody('firstname', 'firstname is missing').notEmpty();
    req.checkBody('lastname', 'lastname is missing').notEmpty();
    req.checkBody('email', 'enter your email').notEmpty().withMessage('Invalid email address').isEmail();
    req.checkBody('password', 'password is missing').notEmpty();

    var showErrors = req.validationErrors();
    if(showErrors) {
        res.render('users/sign-up', {errors: showErrors});
    }
    else {
        var user = new User({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password

        });
    }
    User.createUser(user, function (err, user) {

        if(err) throw err;
        console.log(user);
    });

    req.flash('success_msg', 'Your account has been created successfully, now you can  login to manage your account');
    res.redirect('login');
});


// Getting the login page
router.get('/login', function(req, res) {

    res.render('users/login', {title : 'Login'});
});



// // Authenticate and Logging in the user with the passport module
router.post('/loginUser', passport.authenticate('local',
    {
        successRedirect: 'user-profile',
        failureRedirect: 'login',
        failureFlash : true
    }), function(req, res) {


        res.redirect('user-profile');
});

router.get('/user-profile', function (req, res) {

    res.render('users/user-profile');
});

module.exports = router;
