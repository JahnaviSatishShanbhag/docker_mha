const express=require('express');
const app=express();
const path=require('path');
const env=require('dotenv').config();
const ejs=require('ejs');
const cookieParser = require('cookie-parser');

const PORT=process.env.PORT || 5500;

const {db}=require('./loggers/database');
db();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine','ejs');

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/signout', require('./routes/signout'));
app.use('/home',require('./routes/home'));
app.use('/gethelp',require('./routes/gethelp'));
app.use('/joinus',require('./routes/joinus'));
app.use('/ourpartners',require('./routes/ourpartners'));
app.use('/yourstory',require('./routes/your_story'));
app.use('/corona',require('./routes/corona'));
app.use('/donate',require('./routes/donate'));
app.use('/thanks',require('./routes/thanks'));

app.listen(PORT,()=>
{
    console.log(`Connected to the port ${PORT}.....`);
});