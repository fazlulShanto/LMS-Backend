const Express = require('express');
const router  = Express.Router();
const {handleLogin}  =require('../controller/auth/authController');

router.post('/',(req,res)=>{
    // res.statusCode =400;
    handleLogin(req,res);
    // res.status(404).send('auth login');
    
})



module.exports = router;