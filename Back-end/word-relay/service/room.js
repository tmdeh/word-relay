const Room = require('../database/model/room')
const user = require('../database/model/user')


exports.get = async(req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const roomInfo = await Room.find({_id : roomId}).populate("head").populate("member");
    res.status(200).json({
      roomInfo: roomInfo[0],
      nickname: req.body.nickname
    })
  } catch (error) {
    next(error)
    res.status(500)
  }
}

exports.create = async(req, res, next) => {
  try {
    let { _id } = await user.findOne({nickname: req.body.nickname})

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
      token : req.body.token,
      data : {
        resData
      }
    })
  } catch (error) {
    error.status = 400
    next(error)
  }
}

exports.join = async(req, res) => {
  try {
    
  } catch (error) {
    
  }
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
      token: req.body.token,
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

exports.getMembers = (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

exports.exit = (req, res) => {
  try {
    
  } catch (error) {
    
  }
}