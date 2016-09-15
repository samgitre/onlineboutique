var mongoose = require('mongoose');

var MONGOLAB_URI = "mongodb://samgitre:dy13lsd7425@ds033036.mlab.com:33036/boutiquedb";

var env = process.env.NODE_ENV || 'development';
var url = 'mongodb://localhost/boutiqueDB';


mongoose.connect(url, function (err) {
    if (err){
        console.log('unable to connect to mongodb');
    }
    else {console.log('connected to mongodb successfully')}
});


if(env === 'production'){
    mongoose.connect(MONGOLAB_URI, function (err) {
        if(err)throw err;
        console.log('connected to mongodb successfully')
    });
}
