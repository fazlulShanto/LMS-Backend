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
    activeday:Array,
    othersinfo : String,
    lessons: {
        type : Array,
        default : []
    },
    resources:Array,
    students:Array,
    lastupdate :  {
        type:String,
        require:true,
        default : new Date().toLocaleDateString()
    },
    tasks:{
        type : Array,
        default : []
    }
});

module.exports = mongoose.model('courses',courseSchema);