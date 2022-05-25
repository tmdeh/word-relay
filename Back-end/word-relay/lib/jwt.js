var jwt = require("jsonwebtoken");
const User = require("../database/model/user");
const Room = require("../database/model/room");
require("dotenv").config();

exports.accessSign = (name) => {
  const exp = parseInt(Date.now()/1000) + 60 * 240
  const token = jwt.sign(
    {
      foo: name,
      exp: exp,
      algorithm: "SHA256",
    },
    process.env.PRIVATE_KEY
  );

  return {token: token, exp: exp};
};


exports.verify = async(req, res, next) => {
  try {
    const tokenS = req.header("Authorization")
    const token = jwt.verify(tokenS, process.env.PRIVATE_KEY)
    req.body.nickname = token.foo;
    next()
  } catch (error) {
    if(error.message == "jwt expired") {
      res.status(401).json({
        status : 401,
        message : error.message
      })
    }
  }
}