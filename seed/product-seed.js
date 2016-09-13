var mongoose = require('mongoose');
var productSchema = require('../configs/model/products-schema');
 require('../configs/config/db');

var products = [
    new productSchema({
        title : 'One product',
        category: 'Men',
        color : 'white',
        price : 3000,
        quantity : 40,
        productImage : 'images/cute-girl.jpg'

}),
    new productSchema({
        title : 'two product',
        category: 'women',
        color : 'white',
        price : 4000,
        quantity : 40,
        productImage : 'images/jac1.jpg'
    }),
    new productSchema({
        title : 'two product',
        category: 'women',
        color : 'white',
        price : 4000,
        quantity : 40,
        productImage : 'images/wd1.jpg'
    }),
    new productSchema({
        title : 'two product',
        category: 'women',
        color : 'white',
        price : 4000,
        quantity : 40,
        productImage : 'images/black-girl.jpg'
    }),
        new productSchema({
            title : 'two product',
            category: 'women',
            color : 'white',
            price : 4000,
            quantity : 40,
            productImage : 'images/su.jpg'
        }),
            new productSchema({
                title : 'three product',
                category: 'kids',
                color : 'pink',
                price : 200,
                quantity : 20,
                productImage : 'images/girl.jpg'
            })];
 var done = 0 ;
 for(var i = 0; i <products.length; i++)
     products[i].save(function (err, success) {
         done++;
         if(done == products.length){
             exit();
         }
     });
 function exit() {
    mongoose.disconnect();
 }