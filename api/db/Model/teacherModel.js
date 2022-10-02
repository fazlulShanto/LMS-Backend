const mongoose = require('mongoose');

const teacherSchema =new mongoose.Schema({
    id:{
        type:String,
        unique : true
    },
    first_name :String,
    last_name : String,
    phone: String,
    email :String,
    birth_date : Date,
    address : String,
    designation: String,
    blood_group : String,
    bio : String,
    fb : String,
    courses:Array,
    github: String
});




module.exports = mongoose.model('Teacher',teacherSchema);