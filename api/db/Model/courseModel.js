const mongoose = require('mongoose');

const courseSchema =new mongoose.Schema({
    id:{
        type:String,
        unique : true
    },
    instructor: {
        type:String,
        require:true
    },
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
    resources:Array,
    students:Array,
    lastupdate :  {
        type:String,
        require:true,
        default : new Date().toLocaleDateString()
    },
    tasks:Array
});

module.exports = mongoose.model('courses',courseSchema);