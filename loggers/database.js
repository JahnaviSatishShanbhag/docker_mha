const mysql = require('mysql2');
const env=require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

module.exports=
{
    connection,
    db:function()
    {
    
        connection.connect(function (err) {
            if (err) throw err;
            console.log("Connected to the database!");
        });
    }
} 