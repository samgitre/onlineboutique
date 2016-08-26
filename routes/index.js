var express = require('express');
var router = express.Router();
var products = require('../configs/model/products-schema');


/* GET home page. */
router.get('/', function(req, res, next) {

try {
  products.find({}, function (err, docs) {
    if (typeof products === "undefined") {
      res.status(404).send('Product collection does not exist');
      return;
    }
    var product = docs;
    res.render('./shop/index', {title: 'Online Boutique', products: product});
  });
}
catch (e){
  document.write(e.message);
}
});

module.exports = router;
