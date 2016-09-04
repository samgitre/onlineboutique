var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema =  new Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};


module.exports.authenticate = function (email, callback) {
    var query = {email : email};
    User.findOne(query, callback);

};

module.exports.comparePassword = function (userPassword, hash, callback) {
    bcrypt.compare(userPassword, hash, function (err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};


