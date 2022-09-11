const mongoose = require('mongoose');

const tempSchema =new mongoose.Schema({
    id:{
        type:String,
        unique : true
    },
    data : Object
});




module.exports = mongoose.model('temp',tempSchema);