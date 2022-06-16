const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: String, //방 이름
    member_limit: Number, //최대 멤버 수
    has_password: Boolean, //비밀번호가 존재하는지
    password: String, //비밀번호
    member: [
        {
            user : {type: Schema.Types.ObjectId, ref: "user"},
            score : Number
        }
    ],
    head: {type: Schema.Types.ObjectId, ref:"user"},  //방장
    started: Boolean,
})

module.exports = mongoose.model('room', roomSchema);