/**
 * Created by Samson on 8/17/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({

    title: {
        type : String,
         required : true
    },
    category: {
        type : String,
         required : true
    },
    color: {
        type : String,
         required : true
    },
    price: {
        type : String,
         required : true
    },
    quantity: {
        type : String,
         required : true
    },
    productImage :{
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Product', product);


