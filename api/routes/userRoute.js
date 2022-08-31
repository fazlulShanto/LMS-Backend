const Express = require('express');
const router  = Express.Router();

router.get('/',(req,res)=>{
    res.send("User route")
})
router.get('/dk',(req,res)=>{
    res.send("User route1")
})


module.exports = router;