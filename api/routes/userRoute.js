const Express = require('express');
const router  = Express.Router();
const {initiateUserInfo,setUserInfo,getUserInfo,
    getAllUnApprovedUser,getUserListId,
    getAllApprovedStudent,getAllApprovedTeacher,getAllCourses
} = require('../controller/users/userController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    res.status(200).send('User Route home');
    
})

router.post('/init/:id',(req,res)=>{
    initiateUserInfo(req,res);
  
});

router.post('/set',(req,res)=>{
    // console.log("set user info")
    setUserInfo(req,res);
  
});

router.get('/get/:id',(req,res)=>{
    getUserInfo(req,res);
});


router.get('/allunapproved',(req,res)=>{
    getAllUnApprovedUser(req,res);
})
router.get('/approved-student',(req,res)=>{
    getAllApprovedStudent(req,res);
})
router.get('/approved-teacher',(req,res)=>{
    getAllApprovedTeacher(req,res);
})
router.get('/all-courses',(req,res)=>{
    // console.log(req.headers)
    getAllCourses(req,res);
})
/// get user list for search in chat
router.get('/userlist',getUserListId);

module.exports = router;