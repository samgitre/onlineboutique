var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName: { type: String,
            Required : true
    },
    lastName: {
        type: String,
        Required: true
    },
    email: { type: String,
            Required : true
    },
    password: { type: String,
               Required : true
    }});

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSaltSync(10, function (err, salt) {
        bcrypt.hashSync(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports = mongoose.model('Users', userSchema);