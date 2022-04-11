const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: String,
    refresh_token: String
})

module.exports = mongoose.model('user', userSchema);