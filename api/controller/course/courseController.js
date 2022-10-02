const courseModel = require("../../db/Model/courseModel");
const LessonModel = require("../../db/Model/LessonModel");
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

const createNewCourse = (req, res) => {
    // console.log(req.headers)
    const { id, code, name, desc, othersinfo, instructor ,creatorid} = req.headers;
    const lessons = [];
    const newCourse = new courseModel({
        id,
        code,
        name,
        desc,
        othersinfo,
        lessons: lessons,
        instructor,
        creatorid
    });

    newCourse
        .save()
        .then((result) => {
            // console.log(creatorid)
            // console.log(result);

            res.status(200).send({ message: "course created" });
        })
        .catch((er) => {
            console.log(`can't create course`);
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

module.exports = {
    getCourse,
    createNewCourse,
    deleteCourse,
    addLesson,
    deleteLesson,
    updateCourse
};
