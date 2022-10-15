const Express = require('express');
const router  = Express.Router();
const {allowUser,refusUser} = require('../controller/admin/adminController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    // console.log(req.body)
    res.status(200).send('admin Route home');
 
    
});
router.post('/approval',async (req,res)=>{
    const {verdict,user_uuid} = req.body;
    let rslt ,operation = verdict ? 'Approved' : 'Deleted';
    if(verdict){
         rslt =  await  allowUser(user_uuid);
    }else{
        rslt =  await  refusUser(user_uuid);
    }

    if(rslt){
        res.status(200).send({
            message : `user request ${operation}!`
        })
    }else{
        res.status(500).send({
            message:`failed to process the operation : ${operation}`
        })
    }
})
router.post('/student-list',async (req,res)=>{
    const {verdict,user_uuid} = req.body;
    let rslt ,operation = verdict ? 'Approved' : 'Deleted';
    if(verdict){
         rslt =  await  allowUser(user_uuid);
    }else{
        rslt =  await  refusUser(user_uuid);
    }

    if(rslt){
        res.status(200).send({
            message : `user request ${operation}!`
        })
    }else{
        res.status(500).send({
            message:`failed to process the operation : ${operation}`
        })
    }
})




module.exports = router;