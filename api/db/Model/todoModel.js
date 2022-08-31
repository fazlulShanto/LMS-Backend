const mongoose = require('mongoose');

const todoSchema =new mongoose.Schema({
    id:{
        type:String,
        unique : true
    },
    list :Array
});




module.exports = mongoose.model('Todok',todoSchema);