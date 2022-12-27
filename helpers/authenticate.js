const jwt = require('jsonwebtoken');
const { connection } = require('../loggers/database');

const getCookieValue = function (req) {
    const token = req.cookies.jwt;
    const secret = process.env.JWT_SECRET;
    if (!token)
    {
        return null;
    }
    const decodedToken = jwt.verify(token, secret);
    return decodedToken.user;
}

const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.redirect('/signup');
        // res.status(401).json({
        //     message: 'Unauthorized:no token provided'
        // });
    }
    else {
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/signup');
            }
            else {
                connection.query('SELECT email FROM sign_up WHERE email = ?', [decodedToken.user], async (error, results) => {
                    if (error) {
                        res.redirect('/signup');
                        // res.status(400).json({ message: error });
                    }
                    else if (results.length == 0) {
                        res.redirect('/signup');
                        // res.status(400).json({
                        //     message: 'User not found'
                        // });
                    }
                });
                req.token = token;
                req.user = decodedToken.user;
                next();
            }
        });
    }
}

module.exports = {
    getCookieValue: getCookieValue,
    authenticate: authenticate
}
