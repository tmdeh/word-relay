const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: String, //닉네임
    token_exp: Number //토큰 만료일
})

module.exports = mongoose.model('user', userSchema);