const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: String,
})

module.exports = mongoose.model('user', userSchema);