const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'outlook',
    auth:{
        user:process.env.mailUser,
        pass:process.env.mailPass
    }
});

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

module.exports = {
     sendMail
}