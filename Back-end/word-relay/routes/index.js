var express = require('express');
const path = require('path')
var router = express.Router();

router.get("/", (req, res, next) => {
  console.log(path.join(__dirname, '../../../Front-end/word-relay/build'));
  // res.json("aa");
  // res.sendFile(path.join(__dirname, '../../../Front-end/word-relay/build/index.html'));
  res.sendFile(path.join(__dirname, './build/index.html'));
})


module.exports = router;