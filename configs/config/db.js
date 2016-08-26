var mongoose = require('mongoose');

var url = 'mongodb://localhost/boutiqueDB';

mongoose.connect(url, function (err) {
    if (err){
        console.log('unable to connect to mongodb');
    }
    else {console.log('connected to mongodb successfully')}

});