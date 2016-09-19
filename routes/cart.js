var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var stripe = require("stripe")("sk_test_tHAUTa2iOoCHKTZ7n9fpihWj");
var multiparty = require('multiparty');
var form = new multiparty.Form();
var products = require('../configs/model/products-schema');
var shoppingCart = require('../configs/model/shopping-cart');
var Order = require('../configs/model/order');



// adding items to the shopping cart
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


 //reduce cart items
router.get('/reduceItems/:id', function (req,res,next) {
    var productId = req.params.id;
    var cart = new shoppingCart(req.session.cart ? req.session.cart : {item :{}} );
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('cart/cart-items');
});


 //increase cart items
router.get('/increaseItems/:id', function (req,res,next) {
    var productId = req.params.id;
    var cart = new shoppingCart(req.session.cart ? req.session.cart : {item :{}} );
    cart.addByOne(productId);
    req.session.cart = cart;
    res.redirect('cart/cart-items');
});


/* displaying the shopping cart on request */
router.get('/cart-items', function(req, res, next) {
    if(!req.session.cart){
        return res.render('cart/cart-items', {items: null , title: 'Shopping Cart'});
    }
    else {
        var cart = new shoppingCart(req.session.cart);
        return res.render('cart/cart-items',{items : cart.generateArray(),totalQty: cart.totalQty,
            totalPrice :cart.totalPrice, productTitle: cart.items.title, title: 'Shopping Cart'});
    }
});



//requesting the check out form.
router.get('/check-out', function (req, res, next) {
    if(!req.session.cart){
        return res.redirect('/');
    }
    else {
        var cart = new shoppingCart(req.session.cart);
        return res.render('cart/check-out',{totalPrice :cart.totalPrice, title: 'Check Out'});
    }
});



// making charges from customer credit card.
router.post('/checkout' , function (req, res,next) {

    if(!req.session.cart) {
        return res.redirect('/');
    }
    var cart = new shoppingCart(req.session.cart);
    var token = req.body.stripeToken;

    var charge = stripe.charges.create({
        amount: cart.totalPrice*100,
        currency: "usd",
        source: token,
        description: "Example charge"
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            req.flash('error_msg', 'payment not successful');
           return res.redirect('check-out');
        }
           var order = new Order({
               user: req.user,
               cart : cart,
               firstname : req.body.firstname,
               lastname : req.body.lastname,
               address : req.body.address,
               paymentId :charge.id
           });
        order.save(function (err, success) {

            if(err) {
                req.flash('error_msg', 'could nt information to database');
               return res.redirect('check-out')
            }
            req.flash('success_msg', ' you have successfully paid for your items');
            req.session.cart = null;
            res.redirect('/');
        });

    });
});

module.exports= router;