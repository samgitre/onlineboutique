var express = require('express');
var router = express.Router();


router.get('/payment', function (req, res) {

    res.render('pay/payment', {title : 'Payment page'});

});

module.exports = router;