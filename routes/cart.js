var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var multiparty = require('multiparty');
var form = new multiparty.Form();
var products = require('../configs/model/products-schema');
var shoppingCart = require('../configs/model/shopping-cart');



/* Shopping cart */
router.get('/cart-items', function(req, res, next) {
    res.render('cart/cart-items', {title : 'Shopping cart'});
});


router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;

    var cart = new shoppingCart(req.session.cart ? req.session.cart : {item :{}} );
    products.findById(productId, function (err, product) {
        if(err) {
            return res.redirect('/')
        }

        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
    });

module.exports= router;