const otpModel = require('../../db/Model/otpModel');

const getOtp = async(email)=>{
    const dt =await otpModel.findOne({email:email}).exec();

    if(dt?.email){
        return dt.otp;
    }
    return false;
}

const deleteOtp = async (email)=>{
    const dt = await otpModel.deleteOne({email:email}).exec();
    if(dt?.deletedCount){
        return true;
    }
    return false;
}

module.exports = {
    getOtp,
    deleteOtp
}