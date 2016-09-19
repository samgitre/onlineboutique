var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var order = new Schema({

    user: { type: Schema.ObjectId, ref: 'User' },
    cart: {type : Object,required : true
    },
    address: {type : String,required : true
    },
    firstname: {type : String,required : true
    },
    lastname: {type : String,required : true
    },
    paymentId : { type: String, required: true
    },
    Date: {type: Date,  default: Date.now()}
});

module.exports = mongoose.model('Order', order);
