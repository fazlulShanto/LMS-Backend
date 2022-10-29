const taskModel = require("../../db/Model/taskModel");
const crypto = require("crypto");
const { response } = require("express");
const addTask = (req, res) => {
    let {
        task_title,
        courseid,
        time_start,
        taskid,
        time_end,
        mcq,
        short,
        marks,
        task_type,
        publish_result,
    } = req.body;

    // console.log( req.body)

    time_start = new Date(time_start).setSeconds(0);
    time_end = new Date(time_end).setSeconds(0);
    short = JSON.parse(short);
    mcq = JSON.parse(mcq);
    const tempMarks = parseInt(marks, 10);
    marks = tempMarks ? tempMarks : 1;

    mcq = mcq.map((v, id) => {
        // console.log(v);
        v.id = crypto.randomBytes(4).toString("hex");
        return v;
    });
    short = short.map((v, id) => {
        v.id = crypto.randomBytes(4).toString("hex");
        return v;
    });

    const examinees = [];
    const newTask = new taskModel({
        taskid,
        task_title,
        marks,
        publish_result,
        course_id: courseid,
        time_end,
        task_type,
        time_start,
        mcq,
        short,
        examinees,
    })
        .save()
        .then((result) => {
            res.status(200).send({ message: "task created" });
        })
        .catch((er) => {
            console.log(er);
            res.status(400).send({ message: "not nice" });
        });
};
const deleteTask = (req, res) => {
    const { id } = req.params;
    taskModel.deleteOne({ taskid: id }, (err, result) => {
        if (result.deletedCount) {
            res.status(200).send("deleted the task.");
        } else {
            res.status(200).send("can't delete.");
        }
    });
};
const courseTaskList = async (req, res) => {
    const {courseid} = req.headers;
    // console.log(`course id : ` , courseid)
    const list = await taskModel.find({
        course_id:courseid
    });
    const ids = list.map((v) => v.taskid);
    res.send(list);
};
const getTask = (req, res) => {
    const { id } = req.params;
    // console.log(req.params)

    taskModel.findOne({ taskid: id }, (err, result) => {
        if (result) {
            res.send(result);
        } else {
            res.status(404).send(`Task doesn't exist.`);
        }
    });
};

const judgeResponse = async (taskid, rep) => {
    const data = await taskModel.findOne({ taskid: taskid });
    if (typeof rep === "string") {
        rep = JSON.parse(rep);
    }
    let allMcq = {};
    data.mcq.forEach((v) => {
        const { id, ans } = v;
        allMcq[id] = ans;
    });
    // console.log('allMcq')
    // console.log(allMcq)
    // console.log(rep)
    let userMcq = {};
    rep.filter((v) => typeof v.ans === "object").forEach((v) => {
        const { qid, ans } = v;
        userMcq[qid] = ans;
    });
    // console.log(userMcq)
    let result = 0;
    const correct = [];
    const incorrect = []
    Object.keys(allMcq).forEach((v) => {
        const ans = allMcq[v];
        // console.log(v)
        if (userMcq[v]) {
            const userAns = userMcq[v];
            // console.log(`dbAns : ${ans }  myans : ${userAns}`);
            const vd =
                ans.length == userAns.length &&
                ans.every((val) => userAns.includes(val) == true);
                // console.log(`qid = ${v}  vd = ${vd} ua = ${userAns} = dba = ${ans}`)
                if(vd){
                    correct.push({qid:v , correctans : [...ans]});
                }else{
                    incorrect.push({qid : v , userans : [...userAns] , correctans : [...ans]});
                }
            result += vd;
        }
    });
    return {
        correct: correct,
        total: data.mcq.length,
        incorrect: incorrect,
    };
};

const addResponse = async (req, res) => {
    const { userid, taskid, response } = req.body;
    // console.log(userid,taskid)
    // console.log(response,userid,taskid)

    const verdict = await judgeResponse(taskid, response);

    const dbSave = {
        studentid : userid,
        response : verdict
    }
    const addres = await taskModel.findOneAndUpdate({taskid : taskid},{
        $push : {
            examinees : dbSave
        }
    });
    if(addres){

       return res.status(200).send({message : 'done', correct : verdict.correct.length});
    }
    return res.status(500).send({message : 'failed'});
    
};

const getAllResponse = (req, res) => {};

const getSingleResponse = (req, res) => {};

module.exports = {
    courseTaskList,
    getTask,
    addTask,
    deleteTask,
    addResponse,
    getAllResponse,
    getSingleResponse,
};
