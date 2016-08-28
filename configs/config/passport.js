var passport = require('passport');
var User = require('../model/user-schema');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.fineById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local-sign-up',  new LocalStrategy({
    firstNameField: 'fname',
    lastNameField : 'lname',
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},function (req, fname,lname, email, password, done) {
        User.findOne({'email' : email}, function (err, user) {
            if(err){
                return done(err);
            }
            if(user){
                return done(null, false,{message: 'This email is already in use.'});
            }
                var newUser = new User();
                newUser.fname = fname;
                newUser.lname = lname;
                newUser.email = email;
                newUser.password = newUser.encryptPassword(password);

            newUser.save(function (err, result) {
                if(err){
                    done(err);
                }
                else {
                    done(null, newUser);
                }
            });
        });
    }
));
