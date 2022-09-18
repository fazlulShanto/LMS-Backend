const mongoose = require('mongoose');

const lessonModel =new mongoose.Schema({
    id:{
        type:String,
        unique : true
    },
    course_code:String,
    title : {
        type:String,
        require:true
    },
    delta:{
        type:Object,
        require:true
    },
    tasks:Object,
    resources:Array
});

module.exports = mongoose.model('lesson',lessonModel);