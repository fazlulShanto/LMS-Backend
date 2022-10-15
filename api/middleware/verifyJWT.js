const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')){
       return res.sendStatus(401);
    }
    // console.log(authHeader)
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err){
                return res.sendStatus(403);
            }
            // console.log(decoded)
            req.user_uuid = decoded.user_uuid;
            req.roles = decoded.roles;
            /*
                        {
                "email": dbUser.email,
                "user_uuid": dbUser.user_uuid,
                "roles": userRoles
            },
            */
            next();
        }
    )

}

module.exports= {
    verifyJWT
}