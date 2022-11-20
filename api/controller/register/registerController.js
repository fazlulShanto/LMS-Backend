const bcrypt = require('bcrypt');
const userModel = require('../../db/Model/userModel');
const {sendOTP} = require('../../controller/mail/mailController');
const {deleteOtp,getOtp} = require('../../controller/otp/optController');

const handleNewUser = async (req,res) =>{
    const {email,pwd,isTeacher,form_otp,lastname,firstname} = req.body;
    // console.log('rq',req.body)
    if(!email || !pwd){
        return res.status(400).send({
            message : `email and password are required!`
        })
    }
    //check for duplicate user
  const dbUser =  await userModel.findOne({email : email}).exec();
  if(dbUser){
    return res.status(409).send({
        message : `User already exist with this email.`
    })
  }
  try {
    //encrypt password
    const hashedPassword = await bcrypt.hash(pwd,Number(process.env.SALT));
    const uuid = Math.random().toString(36).slice(2);
    const userRoles = {
      "User": 10000,
    }
    if(isTeacher){
      userRoles.Teacher = 63521;
    }else{
      userRoles.Student = 35909;
    }
    const dbOtp = await getOtp(email);
    if(dbOtp != form_otp){
      return res.status(400).send({message : 'wrong OTP'})
    }
    await new userModel({
        user_uuid : uuid,
        email : email,
        password : hashedPassword,
        roles:userRoles,
        approved:false,
        firstname : firstname,
        lastname : lastname
    }).save();
    await deleteOtp(email);
    return res.status(201).send({
        'success':`New user  ${email} has been created`
    })

  } catch (error) {
    return res.status(500).send({
        message : `server failed to create new User`,
        error : error
    })
  }
}

const sendOtp =async (req,res)=>{
  console.log(req.body,'regcontro')
  const {to} = req.body;
  const result = await sendOTP(to);
  if(result){
    res.status(200).send(`otp sent!`)
  }
  else{
    res.status(500);
  }
}



module.exports = {
  handleNewUser,
  sendOtp
}