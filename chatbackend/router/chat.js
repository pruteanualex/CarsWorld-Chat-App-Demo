const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');
const {validate} = require('../validators/index');
const authController = require('../middleware/auth');
const {chatFile}  = require('../middleware/fileUpload');




router.route('/').get(authController.auth,chatController.index);
router.route('/create').post(authController.auth,chatController.create);
router.route('/upload-image').post(authController.auth,[chatFile],chatController.imageUpload);
router.route('/paginate-messages').get(authController.auth,chatController.messages);
router.route('/:id').delete(authController.auth,chatController.deleteChat);
   


module.exports = router;




