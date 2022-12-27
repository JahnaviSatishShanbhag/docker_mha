const express=require('express');
const router=express.Router();
const {getCookieValue}=require('../helpers/authenticate');

router.get('/',(req,res)=>
{
    let user=getCookieValue(req);
    res.render('home',
    {
        user:user
    });
});

module.exports=router;