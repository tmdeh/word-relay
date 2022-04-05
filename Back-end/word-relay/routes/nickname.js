var express = require('express');
var router = express.Router();

const nickname = require('../service/nickname')

/* GET home page. */
router.post('/', nickname.set);

module.exports = router;
