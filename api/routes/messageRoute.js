const express = require('express');
const router = express.Router();
const {addMessage,getMessages} = require('../controller/message/messageController');

router.post('/',addMessage);
router.get('/:chatid',getMessages);


module.exports = router;