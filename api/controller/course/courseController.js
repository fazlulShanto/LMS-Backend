const courseModel = require("../../db/Model/courseModel");
const teacherModel = require("../../db/Model/teacherModel");
const LessonModel = require("../../db/Model/LessonModel");
const userModel = require("../../db/Model/userModel");
const path = require("path");

const getCourse = (req, res) => {
    const { id } = req.headers;
    courseModel.findOne({ id }, (err, result) => {
        if (result) {
            res.send(result);
        } else {
            res.status(400).send({ message: "not found" });
        }
    });
};
const getTeacherCourseList = async (req,res) =>{
    const {id} = req.headers;
    // console.log(`id = ${id}`)
    const list = await courseModel.find({creatorid:id}).exec();
    if(list){
        // console.log(list)
        return res.status(201).send({
        message:'ok',
        courses : list
    });
    }
    else{
        res.status(500).send();
    }
}
const getStudentCourseList = async (req,res) =>{
    const {id} = req.headers;
    const list = await userModel.findOne({user_uuid:id}).exec();
    if(list?.courses){

        const getSingleCourseInfo = async (coid)=>{
            const cD = await courseModel.findOne({id:coid}).exec();
            if(cD){
                return cD;
            }
            return false;
        }

      const Cod =  await Promise.all(await list.courses.map(async (courseId)=>{ return await getSingleCourseInfo(courseId) }));


        
        return res.status(201).send({
        message:'ok',
        courses : Cod
    });
    }
    else{
        res.status(500).send();
    }
}
const createNewCourse = (req, res) => {
    // console.log(req.headers)
    const { id, code, name, desc, othersinfo, instructor ,creatorid,activeday} = req.body;
    const parsedActiveday = activeday.split(',').filter(v => parseInt(v)).map(v => parseInt(v));
    const lessons = [];
    const newCourse = new courseModel({
        id,
        code,
        name,
        desc,
        othersinfo,
        lessons: lessons,
        instructor,
        creatorid,
        activeday :parsedActiveday
    });
// console.log(req.body)
    newCourse
        .save()
        .then(async (result) => {
            // console.log(creatorid)
            // console.log(result);
            res.status(200).send({ message: "course created" });
        })
        .catch((er) => {
            console.log(`can't create course`);
            console.log(er)
            res.status(400).send({ message: "not nice" });
        });

    
};
const updateCourse = (req,res)=>{
    console.log("course update request")
        
        const { id, code, name, desc, othersinfo} = req.body;

                courseModel.updateOne(
                    { id: id },
                    {
                        code,desc,name,othersinfo

                    },
                    (err, rslt) => {
                        if (rslt.acknowledged) {
                            // console.log(rslt);
    
                            res.status(200).send({ message: "done" });
                        } else {
                            res.send({ message: `can't update course lesson` });
                        }
                    }
                );
}

const addLesson = (req, res) => {
    // console.log(req.headers)
    const { lesson_id, course_uid } = req.headers;
    // console.log(lessonid, course_uid, title )
    // console.log(req.body)
    const { title, delta } = req.body;
    // console.log(`hi = ${resources}`)
    const tasks = [];
    // req.files.forEach(element => {
    //     console.log(element.filename)
    // });
    /*
        static  : Link type 
        http://localhost:3003/courses/fileName.mp4
    */

    const resources =
        req.files.map((v) => `http://localhost:3003/courses/${v.filename}`) ||
        [];
    const newLesson = new LessonModel({
        id: lesson_id,
        title: title,
        delta: delta,
        tasks,
        resources,
    });

    courseModel.findOne({ id: course_uid }, (err, result) => {
        if (result) {
            const { lessons } = result || [];
            lessons.push(newLesson);
            // console.log(lessons);
            courseModel.updateOne(
                { id: course_uid },
                {
                    lessons,
                },
                (err, rslt) => {
                    if (rslt.acknowledged) {
                        // console.log(rslt);

                        res.status(200).send({ message: "done" });
                    } else {
                        res.send({ message: `can't update course lesson` });
                    }
                }
            );
        } else {
            console.log("no");
            res.send({ message: `can't find course` });
        }
    });

    // console.log(`course :${course_uid} title :${title}\n delta :`);
    // console.log(delta)
    // res.status(200).send({message:"done"})
};

const deleteLesson = (req, res) => {
    const { lesson_id, course_uid } = req.headers;
    // console.log(lesson_id,course_uid)
    courseModel.findOne({ id: course_uid }, (err, result) => {
        if (result) {
            const { lessons } = result || [];
            modifiedLessons = lessons.filter((v) => v.id != lesson_id);
            courseModel.updateOne(
                { id: course_uid },
                {
                    lessons: modifiedLessons,
                },
                (err, rslt) => {
                    if (rslt.acknowledged) {
                        // console.log(rslt);

                        res.status(200).send({ message: "lesson deleted with id "+ lesson_id });
                    } else {
                        res.send({ message: `can't delete course lesson` });
                    }
                }
            );
        }
    });
    // res.send("delete lesson");
};



const deleteCourse = (req, res) => {
    const { course_uid } = req.headers;
    courseModel.deleteOne({id : course_uid},(err,result)=>{
        const { deletedCount } = result;
        if(deletedCount){
            res.send({message : 'successfully delete the course'})
        }
    })
    // res.send("delete lesson");
};
const addStudentToCourse = async (req, res) => {
    const { cid, student_id } = req.body;
    let statusCode = 200;
    const messageObj = {
        type: 'success',
        message: ''
    }
    //check if user exist in the course
    const chkCourseStd = await courseModel.findOne({ id: cid }).exec();
    if (chkCourseStd?.students) {
        const searchStd = chkCourseStd.students.find((v) => v.stdudent_id == student_id);
        if (searchStd) {
            statusCode = 401;
            messageObj.error = `User already enrolled to the course / wait till Teacher Accept your Request.`
        }
        else {
            const courseStdList = await courseModel.findOneAndUpdate({ id: cid }, {
                $push: {
                    students: {
                        stdudent_id: student_id,
                        status: false
                    }
                }
            }).exec();
            // console.log(`Update Course :`,courseStdList)
            if (!courseStdList) {
                messageObj.error = `Can't update Course Student list in DB`;
            }
        }
    }else{

        statusCode = 404;
        messageObj.type = 'error';
        messageObj.error = `Course doesn't exist.`
    }
    return res.status(statusCode).json(messageObj);
}
const approveStudentToCourse = async (req, res) => {
    const { cid, student_id } = req.body;
    let statusCode = 200;
    const messageObj = {
        type: 'success',
        message: ''
    }
    //check if user exist in the course
    const chkCourseStd = await courseModel.findOne({ id: cid }).exec();
    if (chkCourseStd?.students) {
        const searchStd = chkCourseStd.students.find((v) => v.stdudent_id == student_id);
        if (!searchStd) {
            statusCode = 401;
            messageObj.type='error';
            messageObj.error = `User din't not enrolled to the course`
        }
        else {
            const courseStdList = await courseModel.findOneAndUpdate({ id: cid ,
                    "students.stdudent_id":student_id
                }, {
                    "$set":{
                        "students.$.status": true
                    }
            }).exec();
            // console.log(`Update Course :`,courseStdList)
            if (!courseStdList) {
                messageObj.error = `Can't update Course Student list in DB`;
            }else{
                //add the course in student course list
                const poorStudent = await userModel.findOneAndUpdate({user_uuid: student_id},{
                    $push : {
                        courses:cid
                    }
                }).exec();

                if(poorStudent){
                messageObj.message = 'Done!'}
                else{
                    statusCode = 401;
                    messageObj.message = `can't update user course list`
                }
            }
        }
    }else{

        statusCode = 404;
        messageObj.type = 'error';
        messageObj.error = `Course doesn't exist.`
    }
    return res.status(statusCode).json(messageObj);
}
const removeStudentToCourse = async (req, res) => {
    const { cid, student_id } = req.body;
    let statusCode = 200;
    const messageObj = {
        type: 'success',
        message: ''
    }
    //check if user exist in the course
    const chkCourseStd = await courseModel.findOne({ id: cid }).exec();
    if (chkCourseStd?.students) {
        const searchStd = chkCourseStd.students.find((v) => v.stdudent_id == student_id);
        if (!searchStd) {
            statusCode = 401;
            messageObj.type='error';
            messageObj.error = `User din't not enrolled to the course`
        }
        else {
            const courseStdList = await courseModel.updateOne({ id: cid ,
                    "students.stdudent_id":student_id
                }, {
                    $pull:{
                        students:{
                            stdudent_id:student_id
                        }
                    }
            }).exec();
            // console.log(`Update Course :`,courseStdList)
            if (!courseStdList) {
                messageObj.error = `Can't update Course Student list in DB`;
            }else{
                //add the course in student course list
                const poorStudent = await userModel.updateOne({user_uuid: student_id},{
                    $pull : {
                        courses:cid
                    }
                }).exec();

                if(poorStudent){
                messageObj.message = 'Done!'}
                else{
                    statusCode = 401;
                    messageObj.message = `can't update user course list`
                }
            }
        }
    }else{

        statusCode = 404;
        messageObj.type = 'error';
        messageObj.error = `Course doesn't exist.`
    }
    return res.status(statusCode).json(messageObj);
}

const getCourseStudentList = async (req,res)=>{
    const {cid}= req.headers;
    // console.log(cid)
    const rs = await courseModel.findOne({id : cid}).exec();
    // console.log(rs.students)
    if(rs?.students){
        const {students} = rs;
        const singleUserInfo = async (v)=>{
            const ui = await userModel.findOne({user_uuid:v.stdudent_id}).exec();
            if(ui){
                return ({
                    id: v.stdudent_id,
                    name : ui.username,
                    email : ui.email,
                    avatar : null,
                    status : v.status
                })
            };
            return false;
        }
       const infoList =  await Promise.all(await students.map( async (v) => await singleUserInfo(v) ))

        const approved = infoList.filter(v => v.status);
        const unAprroved = infoList.filter(v => !v.status);
        const teacherInfo  = {
            name : rs.instructor,
            id :rs.creatorid,
            status : true
        }
        const tcInfo = await userModel.findOne({user_uuid: rs.creatorid}).exec();
        // console.log(tcInfo)
        if(tcInfo){
            teacherInfo.email = tcInfo.email;
            teacherInfo.avatar = null
        }

        return res.status(200).json(
            {approved,unAprroved,teacherInfo}
        );
    }else{
        return res.status(404).send('No data found')
    }
}

const bruhLesson = (req, res) => {
    // console.log(req.headers)
    // const course_uid = '473f8eaaef713'
    const { lessonid, delta, title, course_uid } = req.headers;
    // console.log(lessonid,title,course_uid)
    const tasks = [];
    const newLesson = new LessonModel({
        id: lessonid,
        title,
        delta,
        tasks,
    });
    // console.log(JSON.parse(delta))
    courseModel.findOne({ id: course_uid }, (err, result) => {
        if (result) {
            const { lessons } = result || [];
            lessons.push(newLesson);
            // console.log(lessons);
            courseModel.updateOne(
                { id: course_uid },
                {
                    lessons,
                },
                (err, rslt) => {
                    if (rslt.acknowledged) {
                        // console.log(rslt);
                        // console.log("wtf");
                        res.status(200).send({ message: "doneq" });
                    } else {
                        res.send({ message: `can't update course lesson` });
                    }
                }
            );
        } else {
            console.log("no");
            res.send({ message: `can't find course` });
        }
    });
    // console.log(`course :${course_uid} title :${title}\n delta :`);
    // console.log(delta)
    // res.status(200).send({message:"done"})
};

const postAnnouncement = async (req,res) =>{
    const temid  = Math.random().toString(36).slice(2);
    const {cid,post,date } = req.body;
   const pd = await courseModel.findOneAndUpdate({id:cid},{
        $push : {
            announcement : {post,date, id : temid}
        }
    } ).exec();
    if(pd){
        return res.status(200).send("done");
    }
    return res.status(500).send("not done");
}
const deleteAnnouncement = async (req,res) =>{
    const {cid,postid } = req.body;
   const pd = await courseModel.findOneAndUpdate({id:cid},{
        $pull : {
            announcement : {
                id : postid
            }
        }
    } ).exec();
    if(pd){
        return res.status(200).send("done");
    }
    return res.status(500).send("not done");
}
const getAnnouncement = async (req,res) =>{

    const {cid} = req.headers;

    
   const pd = await courseModel.findOne({id : cid}).exec();
    if(pd){
       
        return res.status(200).send(pd.announcement);
    }
    
    return res.status(200).send([]);
}

module.exports = {
    getCourse,
    createNewCourse,
    deleteCourse,
    addLesson,
    deleteLesson,
    updateCourse,
    getTeacherCourseList,
    addStudentToCourse,
    getCourseStudentList,
    approveStudentToCourse,
    removeStudentToCourse,
    getStudentCourseList,
    postAnnouncement,
    getAnnouncement,
    deleteAnnouncement
};
