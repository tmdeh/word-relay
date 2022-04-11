var express = require('express');
const jwt = require('../lib/jwt')
var router = express.Router();

const nickname = require('../service/nickname')

router.post('/', nickname.set);

router.put('/', jwt.verify, nickname.change);

module.exports = router;
