const jwt=require('jsonwebtoken');
const env=require('dotenv');

function generateAuthToken(user)
{
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
        {
            user: user.email,
            name:user.name
        },
        secret,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
}

module.exports=generateAuthToken;