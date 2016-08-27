var express = require('express');
var router = express.Router();
var products = require('../configs/model/products-schema');
var multer = require('multer');
var fs = require('fs');
var multiparty = require('multiparty');
var form = new multiparty.Form();



/* Shopping cart */
router.get('/cart-items', function(req, res, next) {
    res.render('cart/cart-items', {title : 'Shopping cart'});
});

router.get('/add-to-cart', function(req, res, next) {
    res.render('cart/add-to-cart', {title : 'add item to cart'});
});

module.exports= router;