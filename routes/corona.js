const express=require('express');
const router=express.Router();
const {authenticate}=require('../helpers/authenticate');

router.get('/',authenticate,(req,res)=>
{
    res.render('corona');
});

module.exports=router;