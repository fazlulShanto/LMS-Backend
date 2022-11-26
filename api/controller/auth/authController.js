const bcrypt = require('bcrypt');
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

const handleLogin = async (req, res) => {

    const { email, pwd } = req.body;
    // console.log(`kook:`,Object.values(req.cookies))
    if (!email || !pwd) {
        return res.status(400).send({
            message: `email and password are required!`
        })
    }
    //check if it is a registered user
    const dbUser = await userModel.findOne({ email: email });
    if (!dbUser) {
        return res.status(401).send({
            message: `User Doesn't exist with this email.`
        })
    }
    if(!dbUser.approved){
        return res.status(403).send({
            message: `User Not Approved`
        })
    }
    //test password

    const match = await bcrypt.compare(pwd, dbUser.password);
    if (match) {
        //create jwt
        const userRoles = dbUser.roles;

        const accessToken = jwt.sign(
            {
                "email": dbUser.email,
                "user_uuid": dbUser.user_uuid,
                "roles": userRoles
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { "user_uuid": dbUser.user_uuid },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
        const dbr = updateRefreshToken(dbUser.email, refreshToken);
        if (!dbr) {
            return res.status(500).send({
                message: `Coudn't update Refreshtoken!`
            })
        }


        res.cookie('jwt', refreshToken, {
			sameSite: 'none',
            httpOnly: true,
		})

        res.status(200).send({
            message: `ok`,
            user_uuid:dbUser.user_uuid,
            roles:dbUser.roles,
            accessToken: accessToken,
            userName : dbUser.firstname || 'Backend'
        })

    } else {
        res.status(401).send({
            message: `invalid email/password!`
        })
    }
};




module.exports = {
    handleLogin,
}