var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var adminSchema = mongoose.Schema;


var admin =  new adminSchema({
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
    },
    isAdmin : {
        type : Boolean,
        default: false
    }
});

var Admin = module.exports = mongoose.model('Admin', admin);

module.exports.createAdmin = function (newAdmin, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newAdmin.password, salt, function (err, hash) {
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
};


module.exports.getUserByUsername = function (username, callback) {
    var query = {username : username};
    Admin.findOne(query, callback);
};


module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};


module.exports.getUserById = function (id, callback) {
    Admin.findById(id, callback);
};
