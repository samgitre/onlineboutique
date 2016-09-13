var express = require('express');
var router = express.Router();
var products = require('../configs/model/products-schema');


/* GET home page. */
router.get('/', function (req, res, next) {
  products.find(function (err,docs) {
    var productChunk = [];
    var chunkSize = 3;

    for(var i =0; i <docs.length; i+= chunkSize){
      productChunk.push(docs.slice(i,i + chunkSize));
    }
    res.render('shop/index', {products : productChunk, title: 'Online Boutique'});
  });
});



module.exports = router;
