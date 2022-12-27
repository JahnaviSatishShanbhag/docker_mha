const express = require('express');
const router = express.Router();
const {authenticate} = require('../helpers/authenticate');

router.get('/', authenticate, (req, res) => {
    res.render('ourpartners');
});

module.exports = router;