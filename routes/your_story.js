const express = require('express');
const router = express.Router();
const { connection } = require('../loggers/database');
const { getCookieValue, authenticate } = require('../helpers/authenticate');

router.get('/', authenticate, (req, res) => {
    const sql = `SELECT name,story FROM your_story`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
        }
        else {
            res.render('yourstory',
                {
                    stories: results
                });
        }
    });
});

router.post('/',(req,res)=>
{
    let user=getCookieValue(req);
    const {name,story}=req.body;
    if (!name || !story)
    {
        return res.status(400).json({
            message: 'Please provide your name and story'
        });
    }
    const storyDetails = [name, story, user];
    const sql = `INSERT INTO your_story(name,story,user_email) VALUES (?,?,?);`;
    connection.query(sql, storyDetails, (error, result) => {
        if (error) {
            return res.status(400).json({ message: error });
        }
        else {
            return res.status(200).json({ story: storyDetails });
        }
    });
});

module.exports = router;
