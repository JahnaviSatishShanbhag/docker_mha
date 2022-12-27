const express = require('express');
const router = express.Router();
const { getCookieValue, authenticate } = require('../helpers/authenticate');
const {connection}=require('../loggers/database');

router.get('/', authenticate, (req, res) => {
    const d = new Date();
    const year = d.getFullYear();
    res.render('joinus', { presentyear: year });
});

router.post('/',(req,res)=>
{
    let user=getCookieValue(req);
    let {name,address,email,phone,day,month}=req.body;
    if (!name || !address || !email || !phone || !day || !month)
    {
        return res.status(400).json({
            message: 'Please provide all the details'
        });
    }
    let post={
        name,
        address,
        email,
        phone,
        day,
        month,
        year:new Date().getFullYear(),
        user_email:user
    };
    let sql='INSERT INTO join_us set ?';
    connection.query(sql,post,(error,result) => {
        if (error)
        {
            return res.status(400).json({message:error});
        }
        else
        {
            return res.status(200).json({joinUsUser:post});
        }
    });
});

module.exports = router;