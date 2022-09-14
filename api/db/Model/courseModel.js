const mongoose = require('mongoose');

const courseSchema =new mongoose.Schema({
    id:{
        type:String,
        unique : true
    },
    instructor:String,
    name : {
        type:String,
        require:true,
        unique : true
    },
    code:{
        type:String,
        require:true,
        unique : true
    },
    desc:String,
    othersinfo : String,
    lessons:Array
});

module.exports = mongoose.model('courses',courseSchema);