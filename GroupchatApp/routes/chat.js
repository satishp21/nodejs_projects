const express = require('express');

const router = express.Router();

const chatcontroller = require('../controllers/chat');

const authMiddleware = require('../middleware/auth');

router.post('/post-chat', authMiddleware.authenticate, chatcontroller.postChat);

router.get('/get-chats', authMiddleware.authenticate, chatcontroller.getChats);
module.exports = router;