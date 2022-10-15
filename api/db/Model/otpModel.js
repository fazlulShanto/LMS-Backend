const mongoose = require('mongoose');

const otpModel =new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('OTP',otpModel);