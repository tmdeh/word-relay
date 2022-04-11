var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.accessSign = (name) => {
  const exp = Math.floor(Date.now() / 1000) + (60 * 5)
  const token = jwt.sign(
    {
      foo: name,
      exp: exp,
      algorithm: "SHA256",
    },
    process.env.PRIVATE_KEY
  );
  return token;
};


exports.verify = (req, res, next) => {
  try {
    const tokenS = req.header("Authorization")
    const token = jwt.verify(tokenS, process.env.PRIVATE_KEY)
    const newToken = this.accessSign(token.foo)
    req.body.nickname = token.foo;
    req.body.token = newToken;
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