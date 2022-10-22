const userModel = require('../../db/Model/userModel');
const moment = require('moment');
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
function initiateUserInfo(req,res){
    const {id} = req.params;
    console.log(req.headers)
    // const {first_name,last_name,phone,email,birth_date,address,student_id} = req.headers;
    const {first_name,last_name,phone,email,birth_date,address,student_id} = template;
    const pd = new userModel({
        id,
        first_name,last_name,phone,email,birth_date,address,student_id
    });
    pd.save().catch(er=> console.log(`can't initiatie use ${id}`))
    

    res.send('done');

}

function setUserName(req,res){

    res.send("set user Name")

}
function setUserFirstName(req,res){
    const {id} = req.params;
    const {first_name} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.first_name|| "";
       rt = first_name;
        userModel.updateOne({id:id},{first_name : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update First Name')
            }
        })
    })
    
}
function setUserLastName(req,res){
    const {id} = req.params;
    const {last_name} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.last_name||  "";
       rt = last_name || "";
       console.log(rt)
        userModel.updateOne({id:id},{last_name : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update last Name')
            }else{
                res.send("can't update last name")
            }
        })
    })
}
function setPhoneNumber(req,res){
    const {id} = req.params;
    const {phone} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.phone||  "";
       rt = phone || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{phone : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update phone')
            }else{
                res.send("can't update phone")
            }
        })
    })
}
function setMail(req,res){
    const {id} = req.params;
    const {email} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.email||  "";
       rt = email || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{email : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update email')
            }else{
                res.send("can't update email")
            }
        })
    })
}
function setBirthdate(req,res){
    const {id} = req.params;
    const {birth_date} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.birth_date||  "";
       rt = birth_date || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{birth_date : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update birth_date')
            }else{
                res.send("can't update birth_date")
            }
        })
    })
}
function setAddress(req,res){
    const {id} = req.params;
    const {address} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.address||  "";
       rt = address || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{address : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update address')
            }else{
                res.send("can't update address")
            }
        })
    })
}
function setStudentId(req,res){
    const {id} = req.params;
    const {student_id} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.student_id||  "";
       rt = student_id || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{student_id : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update student_id')
            }else{
                res.send("can't update student_id")
            }
        })
    })
}
function setSession(req,res){
    const {id} = req.params;
    const {session} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.session||  "";
       rt = session || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{session : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update session')
            }else{
                res.send("can't update session")
            }
        })
    })
}
function setHallName(req,res){
    const {id} = req.params;
    const {hall_name} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.hall_name||  "";
       rt = hall_name || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{hall_name : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update hall_name')
            }else{
                res.send("can't update hall_name")
            }
        })
    })
}
function setBloodGroup(req,res){
    const {id} = req.params;
    const {blood_group} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.blood_group||  "";
       rt = blood_group || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{blood_group : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update blood_group')
            }else{
                res.send("can't update blood_group")
            }
        })
    })
}
function setBio(req,res){
    const {id} = req.params;
    const {bio} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.bio||  "";
       rt = bio || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{bio : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update bio')
            }else{
                res.send("can't update bio")
            }
        })
    })
}
function setFB(req,res){
    const {id} = req.params;
    const {fb} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.fb||  "";
       rt = fb || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{fb : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update fb')
            }else{
                res.send("can't update fb")
            }
        })
    })
}
function setGithub(req,res){
    const {id} = req.params;
    const {github} = req.headers;
    userModel.find({id:id},(er,dt)=>{
       let  rt = dt?.github||  "";
       rt = github || "";
    //    console.log(rt)
        userModel.updateOne({id:id},{github : rt},(er,fd)=>{
            if(fd.acknowledged){
                res.send('update github')
            }else{
                res.send("can't update github")
            }
        })
    })
}
function setUserInfo(req,res){
    const {id} = req.params;
    const {
        first_name,
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
        github,
    }  = req.headers;
    console.log(req.headers)
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
}
function getUserInfo(req,res){
    const {id} = req.params;
    userModel.findOne({id:id},(err,result)=>{
        let rt = [];
        // console.log(`Get Request : \n userId :${userId} result : ${result}`)
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
    initiateUserInfo, setUserInfo,getUserInfo,setUserName,setUserFirstName,
    setUserLastName,setMail,setPhoneNumber,setBirthdate,setAddress,setStudentId,
    setSession,setHallName,setBloodGroup,setBio,setFB,setGithub,getAllUnApprovedUser,
    getAllApprovedStudent,getAllApprovedTeacher,getAllCourses
}