const userModel = require('../../db/Model/userModel');
const jwt = require('jsonwebtoken');

const deleteRefreshToken = async (email)=>{
   const dbr = await userModel.updateOne({email: email},{
        refresh_token : ""
    });

    if(dbr.modifiedCount){
        return true;
    }

    return false;
}

const handleLogout = async (req, res) => {

    /// on frontend ,delete the accesstoken

    const cookies = req.cookies;
    if (!cookies || !cookies?.jwt ) {
        
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;

    //if refreshtoken in db

    const dbUser = await userModel.findOne({ refresh_token:refreshToken });
    if (!dbUser) {

        res.clearCookie('jwt',{
            httpOnly : true
        });

        return res.status(201).send({
            message: `User Doesn't exist with this Token.`
        })
    }
    //delete refreshtoken
    const deleteResult = await deleteRefreshToken(dbUser.email);
    console.log("here")
    res.clearCookie('jwt',{
        httpOnly : true
    });
    return res.status(204).send({
        message:`${dbUser.user_uuid} logged out`
    });

};



module.exports = {
    handleLogout
}