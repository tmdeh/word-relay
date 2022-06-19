const Game = require("../database/model/game");
const Room = require("../database/model/room");

module.exports = async(io, roomId) => {
  try {
    const hangle = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '마', '파', '하'];
    const randomIndex = Math.round(Math.random()  * 12);

    const room = await Room.findById(roomId);
    const game = {};
    const userArray = [];
    for(let i of room.member) {
      userArray.push(
        {
          user : i._id,
          hart : 3,
          score : 0
        }
      )
    }
    game.roomId = roomId;
    game.member = userArray;
    game.history = [hangle[randomIndex]];
    game.winner = null;
    game.turnIndex = 0;

    
    await Game.create(game);

    setTimeout(async() => {
      await Room.updateOne({roomId}, {started: true});
      const {member, turnIndex} = await Game.findOne({roomId : roomId}).populate("member.user");
      console.log(turnIndex)
      io.to(roomId).emit("update-word", {word: hangle[randomIndex], turn : member[turnIndex].user.nickname, member : member})
    }, 3000)

    io.to(roomId).emit("started-game");
  } catch (error) {
    console.log(error)
  }
}