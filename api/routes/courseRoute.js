const Express = require('express');
const router  = Express.Router();
const multer  = require('multer')
const upload = multer()
const {multerUpload} = require('../controller/multer/multer');
const {getCourse,addLesson,createNewCourse,deleteLesson,deleteCourse,updateCourse,getTeacherCourseList}  =require('../controller/course/courseController');

router.get('/',(req,res)=>{
   getCourse(req,res)
    
})

router.post('/',upload.none(),(req,res)=>{
    createNewCourse(req,res)
    
})

router.put('/',(req,res)=>{
    updateCourse(req,res)
    
})

router.delete('/',(req,res)=>{
    deleteCourse(req,res);
    
})

router.get('/teacher-course',(req,res)=>{
    getTeacherCourseList(req,res);
})

router.post('/lesson/add',multerUpload().array('file'),(req,res)=>{
    // console.log(req.f)
    addLesson(req,res);
    
})
router.post('/lesson/delete',(req,res)=>{
    // console.log(req.f)
    deleteLesson(req,res);
    
})

router.post('/deletelesson',(req,res)=>{
    // console.log(req.f)
    deleteLesson(req,res);
    
})

router.post('/addlesson',multerUpload().array('file'),(req,res)=>{
    // console.log(req.headers)
    // console.log(req.body)
    addLesson(req,res);
    // bruhLesson(req,res)
    // res.status(200).send({message : "working fine"})
    // addLesson(req,res);

    // console.log(req.body.delta)
    // req.files.forEach(v =>{
    //     console.log(v.path)
    // })
    // res.status(200).send({msg : `done Upload`})
    
})


module.exports = router;