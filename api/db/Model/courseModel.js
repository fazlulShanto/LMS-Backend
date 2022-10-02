const mongoose = require('mongoose');

const courseSchema =new mongoose.Schema({
    id:{
        type:String,
        unique : true
    },
    instructor:String,
    creatorid : String,
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
    lessons:Array,
    resources:Array
});

module.exports = mongoose.model('courses',courseSchema);