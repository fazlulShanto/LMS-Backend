const Express = require('express');
const router  = Express.Router();
const {getTeacherCourseList} = require('../controller/users/teacherController');

router.get('/listCourses',async (req,res)=>{
    const {user_uuid} = req.body;
    const listCourse =await getTeacherCourseList(user_uuid);
    res.status(200).send({
        courses : listCourse,
        message : "ok"
    });
})


module.exports = router;