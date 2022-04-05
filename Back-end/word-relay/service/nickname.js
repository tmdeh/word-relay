const token = require("../lib/jwt");

exports.set = (req, res) => {
  try {
    const nickname = req.body.nickname;

    const refreshToken = token.refreshSign(nickname);
    const accessToken = token.accessSign(nickname);

    res.status(201).json({
      token: accessToken,
    });
  } catch (error) {}
};

exports.change = (req, res) => {};
