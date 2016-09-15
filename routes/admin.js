var express = require('express');
var path = require('path');
var router = express.Router();

var fs = require('fs');
var multiparty = require('multiparty');
var form = new multiparty.Form();

var products = require('../configs/model/products-schema');
var Admin = require('../configs/model/admin-schema');



/* GET users listing. */
router.post('/admin-home', function(req, res, next) {
    res.render('admin/admin-home', {title : 'Admin Dashboard', layout: 'admin-layout'});
});


router.get('/admin-login', function(req, res, next) {
    res.render('admin/admin-login', {title : 'Admin Login'});
});


router.get('/admin-user', function(req, res, next) {
    res.render('admin/admin-user', {title : 'Admin User' , layout: 'admin-layout'});
});


router.post('/admin-user', function(req, res, next) {

       var setAdmin = req.body.setAdmin;
        var check = req.body.isAdmin;
        if(check.checked){
            setAdmin = true;
        }

    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var username = req.body.email;
    var password = req.body.password;
    var admin = setAdmin;

    req.checkBody('firstname', 'firstname is missing').notEmpty();
    req.checkBody('lastname', 'lastname is missing').notEmpty();
    req.checkBody('email', 'enter your email').notEmpty().withMessage('Invalid email address').isEmail();
    req.checkBody('password', 'password is missing').notEmpty();

    var showErrors = req.validationErrors();
    if(showErrors) {
        res.render('admin/admin-user', {errors: showErrors});
    }
    else {
        var adminUser = new Admin({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
            isAdmin : admin
        });
    }
    Admin.createUser(adminUser, function (err, user) {

        if(err) throw err;
        console.log(user);
    });

    req.flash('success_msg', 'Account created successfully');
    res.redirect('admin-login');
});


/* GET add products page */
router.get('/all-products', function(req, res, next) {
    res.render('admin/all-products', {title : 'Manage Products', layout: 'admin-layout'});
});



router.get('/add-products', function(req, res, next) {
    res.render('admin/add-products', {title : 'Add New Products', layout: 'admin-layout'});
});


router.post('/add-product', function (req, res, next) {

    try {
        form.parse(req, function (err, fields, files) {
            var   img = files.image[0];
            var  imagePath = './public/images/' + img.originalFilename;
            var  imageUrl = 'images/' + img.originalFilename;
            fs.readFile(img.path, function (err, data) {
                fs.writeFile(imagePath, data, function (err) {
                    if (err) {
                        console.log('error has occurred')
                    }

                });
            });
            var product = new products({
                title: fields.title,
                category: fields.category,
                color: fields.color,
                price: fields.price,
                quantity: fields.quantity,
                productImage: imageUrl
            });
            product.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(200).send('Product created successfully');
                    console.log(req.files)
                }
            });
        });
    }catch (e){
        res.send(e.message);
    }
});


router.get('/product/:id', function (req, res) {
    products.findById(req.params.id, function (err, product) {
        if(err){
            res.send(err);
        }
        res.json(product);
    });
});


router.delete('/product/:id',function (req,res) {
    products.remove({_id: req.params.id}, function (err, product) {
        if(err){
            res.send(err);
        }
        res.json({message : 'product deleted successfully'});
    });
});

module.exports = router;
