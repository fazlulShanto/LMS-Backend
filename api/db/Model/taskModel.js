const mongoose = require('mongoose');

const taskSchema =new mongoose.Schema({
    taskid:{
        type:String,
        required : true,
        index: true,
        unique: true
    },
    course_id : {
        type : String,
        required : true
    },
    task_title : String,
    task_type:{
        type : String,
        required : true
    },
    marks : {
        type : Number,
        default : 1
    },
    publish_result  : {
        type : Boolean,
        default : false
    },
    final_result  : {
        type : Boolean,
        default : false
    },
    examinees :Array,
    time_start: String,
    time_end : String,
    mcq : Array,
    short : Array,
});

module.exports = mongoose.model('tasks',taskSchema);