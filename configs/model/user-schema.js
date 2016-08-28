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


userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password,  bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

 module.exports = mongoose.model('Users', userSchema);








// module.exports.createUser = function (newUser, callback) {
//     bcrypt.genSaltSync(10, function (err, salt) {
//         bcrypt.hashSync(newUser.password, salt, function (err, hash) {
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     });
// };