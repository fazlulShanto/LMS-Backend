const Express = require('express');
const Multer  = require('multer');
const multer = Multer();
const router  = Express.Router();
const {verifyRoles} = require('../middleware/verifyRoles');



const {addTask,courseTaskList,getTask,deleteTask,
       addResponse,getAllResponse,getSingleResponse }  =require('../controller/task/taskController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    courseTaskList(req,res);
   
})
router.get('/:id',(req,res)=>{
    getTask(req,res);
});
router.post('/',multer.none() ,(req,res)=>{
    addTask(req,res);
});

router.delete('/:id',(req,res)=>{
    deleteTask(req,res);
});


router.get('/response/:taskid',(req,res)=>{

    
})
router.post('/response',multer.none(),(req,res)=>{

    addResponse(req,res);
})
router.get('/response/:taskid/:userid',(req,res)=>{


})

module.exports = router;