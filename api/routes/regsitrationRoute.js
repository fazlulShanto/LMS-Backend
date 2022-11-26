const Express = require('express');
const router  = Express.Router();
const {handleNewUser,sendOtp,changePassword} = require('../controller/register/registerController');

router.post('/',(req,res)=>{
    // res.statusCode =400;
    // console.log(req.body)
    // res.status(200).send('User Route home');
    handleNewUser(req,res);
    
});
router.post('/otp',(req,res)=>{
    sendOtp(req,res);
})
router.post('/change-password',(req,res)=>{
    changePassword(req,res);
})



module.exports = router;