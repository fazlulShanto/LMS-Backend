const Express = require('express');
const router  = Express.Router();
const {handleLogout}  =require('../controller/auth/logoutController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    handleLogout(req,res);
    // res.status(404).send('auth login');
    
})

module.exports = router;