const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  roomId : {type:Schema.Types.ObjectId, ref:"room"},
  member : [
    {
      user : {type:Schema.Types.ObjectId, ref:"user"},
      hart : Number,
      score : Number
    }
  ],
  winner: {type:Schema.Types.ObjectId, ref:"user"},
  history : [String],
  turnIndex : Number
})

module.exports = mongoose.model('game', gameSchema);