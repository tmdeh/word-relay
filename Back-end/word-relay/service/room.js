const Room = require('../database/model/room')
const user = require('../database/model/user')

exports.create = async(req, res) => {
  try {
    let { _id } = await user.findOne({nickname: req.body.nickname})
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
    res.status(400).json({
      status: 400,
      message: "bad request"
    })
  }
}

exports.join = async(req, res) => {

}

exports.getList = async(req, res) => {
  try {
    const data = await Room.find();

    res.status(200).json({
      status: 200,
      message : "ok",
      token: req.body.token,
      data: data
    })
  } catch (error) {
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

}