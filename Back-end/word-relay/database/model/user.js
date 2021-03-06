const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: {type: String, unique: true}, //닉네임
    token_exp: Number, //토큰 만료일
    socketId: String
})

module.exports = mongoose.model('user', userSchema);