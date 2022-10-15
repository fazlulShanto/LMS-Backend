const userModel = require('../../db/Model/userModel');
const jwt = require('jsonwebtoken');

const updateRefreshToken = async (email, token) => {
    const dbr = await userModel.updateOne({ email: email }, {
        refresh_token: token
    });

    if (dbr.modifiedCount) {
        return true;
    }

    return false;
}
const updateAccessToken = async (email, token) => {
    const dbr = await userModel.updateOne({ email: email }, {
        refresh_token: token
    });

    if (dbr.modifiedCount) {
        return true;
    }

    return false;
}

const test = () => {
    return `auth controller`
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies || !cookies?.jwt) {

        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;
    //check if it is a registered user
    const dbUser = await userModel.findOne({ refresh_token: refreshToken });
    if (!dbUser) {
        return res.status(403).send({
            message: `User Doesn't exist with this Token.`
        })
    }
    //validate refreshtoken


    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.user_uuid != dbUser.user_uuid) {
                // console.log(`decoded:`,decoded);
                // console.log(err)
                console.log(`DB user:`, dbUser)
                return res.status(403).send({
                    message: `not a valid token`,
                    error: err
                })
            }
            const accessToken = jwt.sign(
                {
                    "email": dbUser.email,
                    "user_uuid": dbUser.user_uuid,
                    "roles": userRoles
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            );

            res.status(200).send({
                message: `id :${dbUser.user_uuid} email : ${dbUser.email}`,
                accessToken: accessToken
            })
        })
};



module.exports = {
    handleRefreshToken
}