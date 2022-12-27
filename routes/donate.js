const express = require('express');
const router = express.Router();
const { connection } = require('../loggers/database');
const { getCookieValue, authenticate } = require('../helpers/authenticate');

router.get('/', authenticate, (req, res) => {
    res.render('donate');
});

router.get('/debit', authenticate, (req, res) => {
    res.render('debit');
});

router.get('/credit', authenticate, (req, res) => {
    res.render('credit');
});

router.get('/upi', authenticate, (req, res) => {
    res.render('upi');
});

router.post('/',(req,res)=>
{
    let user=getCookieValue(req);
    const {name,email,phone,amount,mode_of_payment}=req.body;
    if (!name || !email || !phone || !amount|| !mode_of_payment)
    {
        return res.status(400).json({
            message: 'Please provide all the details'
        });
    }
    const paymentDetails = [name, email, phone, amount, mode_of_payment, user];
    const sql = `INSERT INTO donate(name,email,phone,amount,mode_of_payment,user_email) VALUES (?,?,?,?,?,?);`;
    connection.query(sql, paymentDetails, (error, result) => {
        if (error) {
            return res.status(400).json({ message: error });
        }
        else {
            return res.status(200).json({ paymentDetails: paymentDetails });
        }
    });
});

module.exports = router;
