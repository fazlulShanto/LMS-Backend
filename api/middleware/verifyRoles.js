const verifyRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401);
        const roles  = [...allowedRoles]
        console.log(roles);
        console.log(Object.values(req.roles))

        const result  = Object.values(req.roles).map( role => roles.includes(role)).find(val => val=== true);
        if(!result){
          return  res.sendStatus(401);
        }
        next();
    
    }
}

module.exports = {verifyRoles};