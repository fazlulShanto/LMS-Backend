const Express = require('express');
const router  = Express.Router();
const {getSchedule
} = require('../controller/users/userController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    getSchedule(req,res);
    
})


module.exports = router;