const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { connection } = require('../loggers/database');
const generateAuthToken=require('../helpers/auth');
const {getCookieValue}=require('../helpers/authenticate');

router.get('/',async(req,res)=>
{
    let user=getCookieValue(req);
    if (user!=null)
    {
        res.redirect('/home');
    }
    else
    {
        res.render('sign_in');
    }
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide an email and password'
            });
        }
        connection.query('SELECT * FROM sign_up where email = ?', [email], async (error, result) => {
            if (error) {
                return res.status(400).json({ message: error });
            }
            else if (result.length==0)
            {
                return res.status(400).json({
                    message: 'Email is incorrect'
                });
            }
            else if (!(await bcrypt.compare(password, result[0].password))) {
                return res.status(400).json({
                    message: 'Password is incorrect'
                });
            }
            else {
                const token=generateAuthToken(result[0]);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60),
                    httpOnly: true
                };
                res.cookie('jwt', token, cookieOptions);
                res.status(200).json({user:result[0]});
            }
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;