const express=require('express');
const router=express.Router();
const {getCookieValue,authenticate}=require('../helpers/authenticate');
const {connection}=require('../loggers/database');

router.get('/',authenticate,(req,res)=>
{
    res.render('gethelp');
});

router.post('/', (req,res) => {
    let user=getCookieValue(req);
    let {name,address,email,phone}=req.body;
    if (!name || !address || !email || !phone)
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
        user_email:user
    };
    let sql='INSERT INTO get_help set ?';
    connection.query(sql,post,(error,result) => {
        if (error)
        {
            return res.status(400).json({message:error});
        }
        else
        {
            return res.status(200).json({getHelpUser:post});
        }
    });
});

module.exports=router;