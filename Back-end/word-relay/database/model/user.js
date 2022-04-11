const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: String,
    token_exp: Number
})

module.exports = mongoose.model('user', userSchema);