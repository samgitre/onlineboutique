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

userSchema.method.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.method.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

exports.method = userSchema.method.encryptPassword;
exports.method = userSchema.method.validPassword;

module.exports = mongoose.model('Users', userSchema);