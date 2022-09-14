const Express = require('express');
const router  = Express.Router();
const {getCourse,addLesson,createNewCourse}  =require('../controller/course/courseController');

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
    addLesson(req,res);
    
})


module.exports = router;