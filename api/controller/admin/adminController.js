const userModel = require('../../db/Model/userModel');

const allowUser = async (id)=>{
    const dbUser = await userModel.updateOne({user_uuid:id},{approved : true}).exec();   
    if(dbUser.modifiedCount){
        return true;
    }    

    return false;
}

const refusUser =async (id)=>{
    const dbUser = await userModel.deleteOne({user_uuid:id}).exec();   
    if(dbUser.deletedCount){
        return true;
    }    
    return false;
}


module.exports = {
    allowUser,
    refusUser
}