const userModel = require('../../db/Model/teacherModel');

const getTeacherCourseList = async (uuid)=>{
    const res = await userModel.findOne({id : uuid}).exec();
    const op = res?.courses?.length ?  res.courses : [];
    return op;
}


module.exports = {
    getTeacherCourseList
}