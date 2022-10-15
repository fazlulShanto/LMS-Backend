const nodemailer = require('nodemailer');
const otpModel = require('../../db/Model/otpModel');

const transporter = nodemailer.createTransport({
    service:'outlook',
    auth:{
        user:process.env.mailUser,
        pass:process.env.mailPass
    }
});

function generateOTP(size =  6) {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i <size; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

function sendMail(req,res){
   
   const {to,message,subject} = req.query;
   const mailOptions = {
      from:process.env.mailUser,
      to:to,
      subject:subject,
      text:message
  }
  transporter.sendMail(
   mailOptions,(err,info)=>{
       if(!err){
           console.log(info.response);
         res.send("Sucessfully send the mail")
      }else{
          res.send("can't send mail");
       }
   }
)
   // res.send("done")
   
}

/**
 * 
 * @param {String} to 
 * @returns {Boolean}
 */
async function sendOTP(to){

    const subject = "LMS OTP";
    const _otp = generateOTP(6);
    const message = `${_otp}`
   
//    const {to,message,subject} = req.query;
   const mailOptions = {
      from:process.env.mailUser,
      to:to,
      subject:subject,
      text:message
  }
  const result =await transporter.sendMail(mailOptions)
  if(result.accepted){
    const dboptions = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      };
    const dt = {
        email:to,
        otp : _otp
    }
    const dbOtp = await otpModel.findOneAndUpdate({email:dt.email},dt,dboptions);
 
    if(dbOtp.otp==_otp){

        return true;
    }
    
  }
  return false;
   // res.send("done")
   
}

module.exports = {
     sendMail,
     sendOTP
}