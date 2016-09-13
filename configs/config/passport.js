var passport = require('passport');
var User = require('../model/user-schema');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local', new LocalStrategy(
    function(username, password, done) {
           User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Invalid email or password.' });
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
            if(err) throw err;
            if(isMatch){
                return done(null, user);
            }
            else {
                return done(null, false, 'Invalid  user email or password');
            }

        });

        });

    }));
