var jwt = require("jsonwebtoken");
const User = require("../database/model/user");
require("dotenv").config();

exports.accessSign = (name) => {
  const exp = parseInt(Date.now()/1000) + 60 * 5
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
    const newToken = this.accessSign(token.foo)
    req.body.nickname = token.foo;
    req.body.token = newToken;
    next()
  } catch (error) {
    if(error.message == "jwt expired") {
      const users = await User.find().exec()
      for(let user of users) {
        if ((Date.now()/1000) > user.token_exp) {
          await User.findByIdAndDelete(user._id)
        }
      }
      res.status(401).json({
        status : 401,
        message : error.message
      })
    }
  }
}