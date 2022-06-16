const User = require("../database/model/user");
const jwt = require("../lib/jwt");

exports.set = async(req, res) => {
  try {
    const nickname = req.body.nickname;

    await check(nickname)

    const {token, exp} = jwt.accessSign(nickname);

    const user = new User({
      nickname : nickname,
      token_exp : new Date(exp)
    })
  
    await user.save()
    
    res.status(201).json({
      token: token,
      nickname: nickname
    });
  } catch (error) {
    console.error(error)
    res.status(400).json({
      status : 400,
      message : "이미 존재하는 닉네임입니다."
    })
  }
};

exports.change = async(req, res) => {
  try {
    const newNikcname = req.body.newNickname;
    const beforeNickname = req.body.nickname;
    await check(newNikcname)
    const user = await User.findOne({nickname: beforeNickname})

    await User.findOneAndUpdate({nickname: beforeNickname}, {nickname: newNikcname})
    // console.log(user)
    const {token} = jwt.accessSign(newNikcname)

    res.status(200).json({
      status: 200,
      message : "OK",
      token : token
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      status : 400,
      message : "이미 존재하는 닉네임입니다."
    })
  }
};

exports.get = async(req, res) => {
  try {
    res.status(200).json({
      message : "OK",
      nickname  : req.body.nickname,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 400,
      message: "토큰이 잘못 됐습니다",
    })
  }
}


const check = async(name) => {
  const u = await User.find({nickname: name}).exec()
  if(u.length > 0) {
    throw new Error("이미 사용중인 닉네임 입니다.")
  }
}