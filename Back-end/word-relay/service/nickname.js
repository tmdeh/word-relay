const User = require("../database/model/user");
const token = require("../lib/jwt");

exports.set = async(req, res) => {
  try {
    const nickname = req.body.nickname;

    await check(nickname)

    const accessToken = token.accessSign(nickname);
  
  
    const user = new User({
      nickname : nickname,
    })
  
    await user.save()
    
    res.status(201).json({
      token: accessToken,
    });
  } catch (error) {
    res.status(400).json({
      status : 400,
      message : error
    })
  }
};

exports.change = async(req, res) => {
  try {
    const newNikcname = req.body.newNickname;
    const beforeNickname = req.body.nickname;
    await check(newNikcname)
    await User.findOneAndUpdate({nickname: beforeNickname}, {nickname: newNikcname})
    res.status(200).json({
      status:200,
      message : "OK",
      token : req.body.token
    })
  } catch (error) {
    res.status(400).json({
      status : 400,
      message : error
    })
  }
};


const check = async(name) => {
  const u = await User.find({nickname: name}).exec()
  if(u.length > 0) {
    throw "이미 사용중인 닉네임 입니다."
  }
}