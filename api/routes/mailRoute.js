const Express = require('express');
const router  = Express.Router();
const {sendMail,sendOTP}  =require('../controller/mail/mailController');

  
router.get('/',(req,res)=>{
    // res.statusCode =400;
    res.status(404).send('Mail Home');
    
})

router.get('/send',(req,res)=>{
    sendMail(req,res);
});

router.post('/otp',(req,res)=>{
    const otp = generateOTP(6);
    sendOTP();
})

module.exports = router;