const express = require('express');

const chatController = require('../controller/chat');
const authController = require('../middleware/auth');

const router = express.Router();

router.post('/addmessage',authController.authenticate, chatController.addmessage);

router.get('/getmessage/:lastMsgId',authController.authenticate, chatController.getmessage)

module.exports = router;