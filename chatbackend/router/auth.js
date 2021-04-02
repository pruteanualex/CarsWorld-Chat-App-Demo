const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {body} = require('express-validator');
const {validate} = require('../validators/index');
const {rules:registrationRulse} = require('../validators/auth/register');
const {rules:loginRulse} = require('../validators/auth/login');

router.route('/login').post([loginRulse,validate],authController.login);
  
router.route('/register').post([registrationRulse,validate], authController.register);
   


module.exports = router;