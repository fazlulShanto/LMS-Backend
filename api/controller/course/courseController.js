const courseModel = require("../../db/Model/courseModel");
const LessonModel = require("../../db/Model/LessonModel");

const getCourse = (req, res) => {
    const { id } = req.headers;
    courseModel.findOne({ id }, (err, result) => {
        if (result) {
            res.send(result);
        }else{
            res.status(400).send({message : "not found"})
        }
    });
};

const createNewCourse = (req, res) => {
    // console.log(req.headers)
    const { id, code, name, desc, othersinfo, instructor } = req.headers;
    const lessons = [];
    console.log(
        `${id} : ${code} -> ${name} \n ${desc} ${othersinfo} \n${lessons}`
    );
    const newCourse = new courseModel({
        id,
        code,
        name,
        desc,
        othersinfo,
        lessons: lessons,
        instructor,
    });

    newCourse
        .save()
        .then((res) => {
            console.log(res);
        })
        .catch((er) => console.log(er));

    res.status(200).send({ message: "nice" });
};

const addLesson = (req, res) => {
    // console.log(req.headers)
    const { lessonid, course_uid } = req.headers;
    // console.log(lessonid, course_uid, title )
    // console.log(req.body)
    const {lessonTitle,delta,resources} = req.body;
    const tasks = [];
    const newLesson = new LessonModel({
        id:lessonid,
        title:lessonTitle,
        delta:delta,
        tasks,
        resources
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
                        
                        res.status(200).send({ message: "done" });
                    }else{

                        res.send({message : `can't update course lesson`});
                    }
                }
            );
        }

        else{
            console.log('no')
          res.send({message :`can't find course`})
        }
    });
    // console.log(`course :${course_uid} title :${title}\n delta :`);
    // console.log(delta)
    // res.status(200).send({message:"done"})
};



const bruhLesson = (req, res) => {
    // console.log(req.headers)
    // const course_uid = '473f8eaaef713'
    const { lessonid, delta, title ,course_uid} = req.headers;
    // console.log(lessonid,title,course_uid)
    const tasks = [];
    const newLesson = new LessonModel({
        id:lessonid,
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
                    }else{

                        res.send({message : `can't update course lesson`});
                    }
                }
            );
        }

        else{
            console.log('no')
          res.send({message :`can't find course`})
        }
    });
    // console.log(`course :${course_uid} title :${title}\n delta :`);
    // console.log(delta)
    // res.status(200).send({message:"done"})
};

module.exports = {
    getCourse,
    addLesson,
    createNewCourse,
    bruhLesson
};
