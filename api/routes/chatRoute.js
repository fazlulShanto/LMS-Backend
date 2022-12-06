const express = require('express');
const router = express.Router();
const {createChat,userChats,findChat} = require('../controller/chat/chatController');

router.post('/',createChat);
router.get('/:userid',userChats);
router.get("/find/:firstid/:secondid",findChat );









module.exports = router;