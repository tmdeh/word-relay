const app = require('../app');
const Room = require('../database/model/room')
const User = require('../database/model/user')


exports.get = async(req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const roomInfo = await Room.find({_id : roomId}).populate("head").populate("member");
    res.status(200).json({
      roomInfo: roomInfo[0],
      nickname: req.body.nickname,
    })
  } catch (error) {
    next(error)
    res.status(500)
  }
}

exports.create = async(req, res, next) => {
  try {
    console.log(req.body.nickname)
    let { _id } = await User.findOne({nickname: req.body.nickname})

    if(req.body.title === "" || req.hasPassword && req.password === "") {
      throw new Error("입력칸을 확인해주세요.")
    }

    const roomData = new Room({
      name : req.body.title,
      member_limit: req.body.memberLimit,
      has_password: req.body.hasPassword,
      head : _id,
      password : req.body.password,
      member: [_id],
      history: {}
    })
  
    let resData = await roomData.save()
    
    res.status(201).json({
      status: 201,
      message : "created",
      data : {
        resData
      }
    })
  } catch (error) {
    error.status = 400
    next(error)
  }
}

exports.join = async(req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId)
    if(room === null) {
      let err = new Error("없는 방입니다.");
      err.status = 420;
      throw err;
    }
    if(await passwordCheck(roomId, req.body.hasPassword, req.body.password)) {
      const {_id} = await User.findOne({nickname : req.body.nickname});
      if(room.member.length >= room.member_limit) {
        let error = new Error("빈자리가 없습니다.");
        error.status = 419;
        throw error
      }
      await Room.findOneAndUpdate({_id : roomId}, {$push: { member: _id }})
      res.status(201).json({
        status: 201,
        message : "Created"
      })
    } else {
      res.status(400).json({
        status: 400,
        message : "Join Failed"
      })
    }
  } catch (error) {
    next(error)
  }
}

const passwordCheck = async(roomId, hasPassword, userPassword) => {
  if(hasPassword) { //비밀번호가 존재할 경우
    console.log(roomId)
    const { password } = await Room.findById(roomId)
    if(password === userPassword) {
      return true;
    } else {
      return false;
    }
  }
  return true
}

exports.getList = async(req, res) => {
  try {
    // res.status(200).json({})
    const data = await Room.find().populate('member').populate('head');
    
    if(data.length === 0) {
      res.status(204);
      return
    }
    res.status(200).json({
      status: 200,
      message : "OK",
      list: data
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status : 500,
      message : "서버에 문제 발생"
    })
  }
}

exports.exit = async(req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId).populate("head").populate("member");

    let userId = "";
    for(let i of room.member) {
      console.log(req.body.nickname)
      if(i.nickname === req.body.nickname) {
        userId = i._id;
      }
    }

    if(userId === "") {
      let error = new Error("없는 사용자입니다.");
      error.status = 400;
      throw(error)
    }

    if(room.head.nickname === req.body.nickname) {
      await Room.deleteOne({_id : roomId});
      res.status(200).json({
        status: 200,
        message : "OK",
      })
      return;
    }
    
    await Room.updateOne(
      {_id : roomId}, 
      {$pull: {member : userId}}
    );
    res.status(200).json({
      status: 200,
      message : "OK",
    })
  } catch (error) {
    next(error)
  }
}