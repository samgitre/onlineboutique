var multer =require('multer');


module.exports = {

        storage : multer.diskStorage({

        destination: function (req, file, callback) {
            callback(null, './uploads', function (err) {
                if(err){
                    console.log('error has occurred');
                }
            });
        },

        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now())

        }
    })
};






