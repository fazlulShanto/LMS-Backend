const Express = require('express');
const router  = Express.Router();
const {sendMail}  =require('../controller/mail/mailController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    res.status(404).send('Mail Home');
    
})

router.get('/send',(req,res)=>{
    sendMail(req,res);
});

module.exports = router;