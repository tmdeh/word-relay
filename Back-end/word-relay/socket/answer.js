const Game = require("../database/model/game");
const room = require("../database/model/room");
const user = require("../database/model/user");

module.exports = async(io, socket, roomId, input) => {
  const word = input.substring(input.length - 1, input.length);
  const game = await Game.findOne({roomId : roomId}).populate("member.user");
  const {_id} = await user.findOne({socketId : socket.id})
  const lastWord = game.history.pop();
  let userId;
  for(let i of game.member) {
    if(i.user.socketId == socket.id) {
      userId = i.user._id
    }
  }
  if(lastWord.substring(lastWord.length - 1, lastWord.length) === input[0]) {
    await Game.updateOne({_id : game._id, 'member.user' : _id}, {$push: {history: input}, $inc : {turnIndex : 1, "member.$.score" : 1}});
    const g = await Game.findById(game._id).populate("member.user");
    console.log(g.turnIndex)
    io.to(roomId).emit("update-word", {word: input, turn : g.member[g.turnIndex % g.member.length].user.nickname, member : game.member})
  }
}