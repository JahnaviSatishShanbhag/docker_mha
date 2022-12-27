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
        res.render('sign_up');
    }
    // res.redirect('/home');
});

router.get('/users',async(req,res)=>
{
    let sql='SELECT * FROM sign_up;';
    connection.query(sql,(error,results)=>
    {
        if (error) {
            return res.status(400).json({ message: error });
        }
        else if (results.length==0)
        {
            return res.status(404).json({ message: 'No users found' });
        } 
        else
        {
            return res.status(200).json({users:results});
        }
    });
});

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    connection.query('SELECT email FROM sign_up WHERE email = ?', [email], async (error, results) => {
        if (error) {
            return res.status(400).json({ message: error });
        }
        else if (results.length > 0) {
            return res.status(400).json({
                message: 'That email has already been registered'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        let user={ username: username, email: email, password: hashedPassword };
        connection.query('INSERT INTO sign_up SET ?',user, (error, result) => {
            if (error) {
                return res.status(400).json({ message: error });
            } 
            else {
                const token=generateAuthToken(user);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60),
                    httpOnly: true
                };
                res.cookie('jwt', token, cookieOptions);
                res.status(200).json({user:result[0]});
            }
        });

    });
});

module.exports=router;