const express = require('express');
const router = express.Router();


router.route('/home').get((req, res) => {
    res.send('Home Screem')
});


router.use('/',require('./auth'));
router.use('/users',require('./user')); 
router.use('/chats',require('./chat'));


module.exports = router;