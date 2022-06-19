const Game = require("../database/model/game");
const room = require("../database/model/room");
const User = require("../database/model/user");

module.exports = async(io, socket, roomId, nickname) => {
  const hangle = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '마', '파', '하'];
  const randomIndex = Math.round(Math.random()  * 12);

  const {_id} = await User.findOne({nickname});
  await Game.updateOne({roomId: roomId, 'member.user' : _id}, {$push: {history : hangle[randomIndex]}, $inc : {'member.$.hart' : -1, turnIndex : 1}})
  const g = await Game.findOne({roomId : roomId}).populate("member.user");
  for(let i of g.member) {
    if(i.hart <= 0) {
      let bestUser = {
        _id : null,
        score : 0
      };
      for(let u of g.member) {
        if(bestUser.score < u.user.score) {
          bestUser._id = u.user._id;
          bestUser.score = u.score;
        }
      }
      await Game.updateOne({roomId : roomId}, {$set : {winner : bestUser._id}})
      io.to(roomId).emit('over')
      return
    }
  }
  console.log(g.turnIndex)
  io.to(roomId).emit('update-word', {word: hangle[randomIndex], turn : g.member[g.turnIndex % g.member.length].user.nickname, member : g.member})
}