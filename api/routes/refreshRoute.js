const Express = require('express');
const router  = Express.Router();
const {handleRefreshToken}  =require('../controller/auth/refreshController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    handleRefreshToken(req,res);
    // res.status(404).send('auth login');
    
})

module.exports = router;