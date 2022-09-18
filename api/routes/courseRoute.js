const Express = require('express');
const router  = Express.Router();
const multer  = require('multer')
const upload = multer()
const {getCourse,addLesson,createNewCourse,bruhLesson}  =require('../controller/course/courseController');

router.get('/',(req,res)=>{
   getCourse(req,res)
    
})

router.post('/',(req,res)=>{
    createNewCourse(req,res)
    
})

router.post('/add',(req,res)=>{
    res.send(`course route post home`)
    
})

router.post('/add/lesson',(req,res)=>{
    // console.log(req.f)
    addLesson(req,res);
    
})
router.post('/addlesson',upload.none(),(req,res)=>{
    // console.log(req.headers)
    // console.log(req.body)
    addLesson(req,res);
    // bruhLesson(req,res)
    // res.status(200).send({message : "working fine"})
    // addLesson(req,res);
    
})


module.exports = router;