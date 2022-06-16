const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  roomId : {type:Schema.Types.ObjectId, ref:"room"},
  history : [
    {
      user : {type:Schema.Types.ObjectId, ref:'user'},
      score : Number,
    }
  ],
  winner: {type:Schema.Types.ObjectId, ref:"user"}
})

module.exports = mongoose.model('game', gameSchema);