var express = require('express');
var path = require('path');
var router = express.Router();
var products = require('../configs/model/products-schema');
var multer = require('multer');
var fs = require('fs');
var multiparty = require('multiparty');
var form = new multiparty.Form();



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


/* GET add products page */
router.get('/all-products', function(req, res, next) {
    res.render('admin/all-products', {title : 'Manage Products', layout: 'admin-layout'});
});


router.get('/add-products', function(req, res, next) {
    res.render('admin/add-products', {title : 'Add New Products', layout: 'admin-layout'});
});


router.post('/add-product', function (req, res, next) {

    // var product = new products();
    // product.productImage.data = fs.readFileSync(req.files.image.path);
    // product.productImage.contentType = 'image/jpg';
    //
    // product.title = req.body.title;
    // product.category = req.body.category;
    // product.color = req.body.color;
    // product.price = req.body.price;
    // product.quantity = req.body.quantity;
    //
    // product.save(function (err) {
    //     if(err){
    //         return res.status(500).send()
    //     }
    //     return res.status(200).send('product added successfully');
    //
    // });

    try {
        form.parse(req, function (err, fields, files) {
            var   img = files.image[0];
            var  imagePath = './public/images/' + img.originalFilename;
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
                productImage: imagePath
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
