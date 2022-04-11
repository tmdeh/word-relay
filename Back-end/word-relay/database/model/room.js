const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: String,
    member_limit: Number,
    has_password: Boolean,
    password: String,
    member: [{type: Schema.Types.ObjectId, ref: "user"}],
    game_breakdown: {   
        author: {type: Schema.Types.ObjectId, ref: "user"},
        word: String,
        write_at: Timestamp,
    }   
})

module.exports = mongoose.model('room', roomSchema);