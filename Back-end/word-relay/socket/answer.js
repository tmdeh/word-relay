const Game = require("../database/model/game");
const room = require("../database/model/room");
const user = require("../database/model/user");

module.exports = async(io, socket, roomId, input, nickname) => {
  const game = await Game.findOne({roomId : roomId}).populate("member.user");
  const {_id} = await user.findOne({nickname : nickname})
  socket.emit("aa", {msg : "aa"})
  const lastWord = game.history.pop();
  let userId;
  for(let i of game.member) {
    if(i.user.socketId == socket.id) {
      userId = i.user._id
    }
  }
  if(lastWord.substring(lastWord.length - 1, lastWord.length) === input[0]) {
    for(let w of game.history) {
      if(w == input) {
        console.log("중복 발생")
        socket.emit("wrong", {msg : "사용한 단어 입니다."})
        return
      }
    }

    const session = await Game.startSession();
    session.startTransaction();
    await Game.updateOne({_id : game._id}, {
      $push: {history: input}, 
      $inc : {turnIndex : 1}
    });
    await Game.updateOne({roomId : roomId, "member.user" : _id}, {$inc : {'member.$.score' : input.length}});
    await session.commitTransaction();
    session.endSession();

    const g = await Game.findById(game._id).populate("member.user");
    io.to(roomId).emit("update-word", {word: input, turn : g.member[g.turnIndex % g.member.length].user.nickname, member : g.member})
  }
}