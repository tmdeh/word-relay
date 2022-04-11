var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.accessSign = (name) => {
  token = jwt.sign(
    {
      foo: name,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      algorithm: "SHA256",
    },
    process.env.PRIVATE_KEY
  );
  return token;
};

exports.refreshSign = (name) => {
  token = jwt.sign(
    {
      foo: name,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
      algorithm: "SHA256",
    },
    process.env.PRIVATE_KEY
  );
  return token;
};


exports.verify = (req, res, next) => {
  const token = req.header("Authorization")
  const nickname = jwt.verify(token, process.env.PRIVATE_KEY)
  req.body.nickname = nickname.foo
  next()
}