const Express = require('express');
const router  = Express.Router();
const {initiateUserInfo,setUserInfo,getUserInfo,setUserFirstName,setPhoneNumber,setBloodGroup,setFB,setGithub,
    setUserLastName, setMail,setBirthdate,setAddress,setStudentId,setSession,setHallName, setBio} = require('../controller/users/userController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    res.status(200).send('User Route home');
    
})

router.post('/init/:id',(req,res)=>{
    initiateUserInfo(req,res);
  
});

router.post('/set/:id',(req,res)=>{
    // console.log("set user info")
    setUserInfo(req,res);
  
});

router.get('/get/:id',(req,res)=>{
    getUserInfo(req,res);
});

router.post('/set/first_name/:id/',(req,res)=>{
    setUserFirstName(req,res);
})
router.post('/set/last_name/:id/',(req,res)=>{
    setUserLastName(req,res);
})
router.post('/set/phone/:id/',(req,res)=>{
    setPhoneNumber(req,res);
})
router.post('/set/email/:id/',(req,res)=>{
    setMail(req,res);
})
router.post('/set/birth_date/:id/',(req,res)=>{
    setBirthdate(req,res);
})
router.post('/set/address/:id/',(req,res)=>{
    setAddress(req,res);
})
router.post('/set/student_id/:id/',(req,res)=>{
    setStudentId(req,res);
})
router.post('/set/session/:id/',(req,res)=>{
    setSession(req,res);
})
router.post('/set/hall_name/:id/',(req,res)=>{
    setHallName(req,res);
})
router.post('/set/blood_group/:id/',(req,res)=>{
    setBloodGroup(req,res);
})
router.post('/set/bio/:id/',(req,res)=>{
    setBio(req,res);
})
router.post('/set/fb/:id/',(req,res)=>{
    setFB(req,res);
})
router.post('/set/github/:id/',(req,res)=>{
    setGithub(req,res);
})

module.exports = router;