var express = require('express');
var router = express.Router();

const room = require('../service/room')

//방 생성
router.post('/', room.create);

//방 입장
router.post('/:roomId', room.join);

//방 리스트
router.get('/list', room.getList);

//멤버 목록
router.get('/member', room.getMembers);

//방 퇴장
router.delete("/:roomId", room.exit);

module.exports = router;