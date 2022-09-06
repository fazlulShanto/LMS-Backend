const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
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
    student_id : String,
    session : String,
    hall_name : String,
    blood_group : String,
    bio : String,
    fb : String,
    github: String
});




module.exports = mongoose.model('User',userSchema);