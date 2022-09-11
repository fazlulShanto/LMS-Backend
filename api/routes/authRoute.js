const Express = require('express');
const router  = Express.Router();
const {test}  =require('../controller/auth/authController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    res.status(404).send('auth login');
    
})

router.get('/refresh',(req,res)=>{
    res.send(`refresh`)
});

router.post('/logout',(req,res)=>{
    res.send('logout')
});

module.exports = router;