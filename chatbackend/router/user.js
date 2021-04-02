const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const {validate} = require('../validators/index');
const authController = require('../middleware/auth');
const {userFile}  = require('../middleware/fileUpload');
const {rules:updateRules} = require('../validators/user/update');


router.route('/update').post(authController.auth,[userFile,updateRules,validate],userController.update);
router.route('/search-users').get(authController.auth,userController.search);  

   


module.exports = router;