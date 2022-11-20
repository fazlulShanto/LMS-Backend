const userModel = require('../../db/Model/userModel');
const moment = require('moment');
const infoArray = [
    'student_id',    'email',
    'firstname',     'lastname',
    'birthdate',     'phone',
    'permanentaddr', 'session',
    'bloodgroup',    'hall',
    'bio',           'fblink',
    'githublink',    'designation'
  ];
const template ={
    first_name : "",
    last_name : "",
    phone : "",
    email :"",
    birth_date : moment("16-12-1971", "DD-MM-YYYY"),
    address:"",
    student_id:"",
    session : "",
    hall_name : "",
    blood_group:"",
    bio : ""
}

async function setUserInfo(req,res){
    const receivedKeys = Object.keys(req.body).filter(v => infoArray.includes(v));
    // console.log(receivedKeys)
    // console.log(req.body)
    const pd = {};
    const id = req.body.uuid;
    receivedKeys.forEach(v => pd[v] = req.body[v] )

    // if(pd.birthdate){
    //     pd.birthdate = pd.birthdate
    //     console.log(pd.birthdate)
    // }

   const re =  await userModel.findOneAndUpdate({user_uuid:id},pd, {rawResult: true}).exec();
   
   if(re.value){

       res.sendStatus(200);
   }else{
    res.sendStatus(500);
   }
    /*
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.github||  "";
       rt = github || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{        first_name,
            last_name,
            phone,
            email,
            birth_date,
            address,
            student_id,
            session,
            hall_name,
            blood_group,
            bio,
            fb,
            github},(er,fd)=>{
            if(fd?.acknowledged){
                res.send('update user info')
            }else{
                res.send(er)
            }
        })
    })
    */
}
function getUserInfo(req,res){
    const {id} = req.params;
    userModel.findOne({user_uuid:id},(err,result)=>{
        let rt = [];
        // console.log(`Get Request : \n userId :${id} result : ${result}`)
        if(result){
            rt = result;
        }
        res.send(rt);
    });
   
}

async function getAllUnApprovedUser(req,res){
    const allUser = await userModel.find({approved:false}).exec();
    if(allUser.length){
        const modifiedUser = allUser.map(us =>{
            const pd = {
                key:Math.random(),
                name:`${us.firstname} ${us.lastname}`,
                email:us.email,
                role : Object.keys(us.roles).includes('Teacher') && 'Teacher' || 'Student',
                user_uuid : us.user_uuid
            };
            return pd
        })

      return  res.status(200).json(modifiedUser);
    }
    return res.status(200).json([]);
}
async function getAllApprovedStudent(req,res){
    const allUser = await userModel.find({approved:true}).where({
        'roles.Student' :35909
    }).exec();
    if(allUser.length){
        const modifiedUser = allUser.map(us =>{
            const pd = {
                key:Math.random(),
                name:`${us.firstname} ${us.lastname}`,
                email:us.email,
                role : Object.keys(us.roles).includes('Teacher') && 'Teacher' || 'Student',
                user_uuid : us.user_uuid
            };
            return pd
        })

      return  res.status(200).json(modifiedUser);
    }
    return res.status(200).json([]);
}
async function getAllApprovedTeacher(req,res){
    const allUser = await userModel.find({approved:true}).where({
        'roles.Teacher' :63521
    }).exec();
    if(allUser.length){
        const modifiedUser = allUser.map(us =>{
            const pd = {
                key:Math.random(),
                email:us.email,
                name:`${us.firstname} ${us.lastname}`,
                role : Object.keys(us.roles).includes('Teacher') && 'Teacher' || 'Student',
                user_uuid : us.user_uuid
            };
            return pd
        })

      return  res.status(200).json(modifiedUser);
    }
    return res.status(200).json([]);
}
async function getAllCourses(req,res){
    const {id} = req.headers;
   
    const user = await userModel.findOne({user_uuid:id}).exec();
    // console.log(user)
    if(user?.courses){
      return  res.status(200).json(user.courses);
    }
    return res.status(200).json([]);
}
async function getAllApprovedUser(req,res){
    const allUser = await userModel.find({approved:true}).exec();
    if(allUser.length){
        const modifiedUser = allUser.map(us =>{
            const pd = {
                key:Math.random(),
                email:us.email,
                role : Object.keys(us.roles).includes('Teacher') && 'Teacher' || 'Student',
                user_uuid : us.user_uuid
            };
            return pd
        })

      return  res.status(200).json(modifiedUser);
    }
    return res.status(200).json([]);
}



module.exports = {
    setUserInfo,getUserInfo,getAllUnApprovedUser,
    getAllApprovedStudent,getAllApprovedTeacher,getAllCourses
}