const Express = require('express');
const Multer  = require('multer');
const multer = Multer();
const router  = Express.Router();
const {verifyRoles} = require('../middleware/verifyRoles');



const {addTask,courseTaskList,getTask,deleteTask,updateResult,publishResult,
       addResponse,getAllResponse,getSingleResponse ,addAssignment}  =require('../controller/task/taskController');
const { uploadToTask } = require('../controller/upload/uploadController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    courseTaskList(req,res);
   
})
router.get('/:id',(req,res)=>{
    getTask(req,res);
});
router.post('/',multer.single() ,(req,res)=>{
    addTask(req,res);
});
// ******************************************************************************


router.post('/assignment',uploadToTask().single("files") ,(req,res)=>{
    addAssignment(req,res)

    // res.send('nice')
});
router.post('/publish',multer.none() , async (req,res)=>{
    const {status , taskid } = req.body;
    let cst = false;
    if(status == 1){
        cst = true;
    }
    const pd =await publishResult(cst,taskid); 
    if(pd){
       return res.status(200).send('Done');
    }
    return res.status(400).send('Not Done');
});

router.delete('/:id',(req,res)=>{
    deleteTask(req,res);
});

router.get('/response/:taskid',(req,res)=>{

})
router.post('/marks',multer.none(),async (req,res)=>{
    const {taskid , studentid , marks} = req.body;
    const rs  = await updateResult(taskid,studentid,marks);
    if(rs){
        return    res.status(200).send("done");
    }
    return res.status(500).send('Failed')
})
router.post('/response',multer.none(),(req,res)=>{

    addResponse(req,res);
})
router.get('/response/:taskid/:userid',(req,res)=>{


})

module.exports = router;