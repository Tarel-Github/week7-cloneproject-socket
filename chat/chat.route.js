const express = require('express');
const router = express.Router();

const ChatsRoom=require('./chat.room')
const chatsRoom = new ChatsRoom

router.get('/',chatsRoom.createRoom)
router.get('/:chatListId',chatsRoom.createRoom)
// rouert.post('/')
//router.post('/:chatListId', chatsController.createChats);  

module.exports = router;