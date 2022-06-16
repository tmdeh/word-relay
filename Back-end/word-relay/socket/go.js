const room = require("../database/model/room")

module.exports = async(io, roomId) => {
  const hangle = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '마', '파', '하'];
  const randomIndex = Math.round(Math.random()  * 12);
  await room.findByIdAndUpdate(roomId, {started: true, });
  io.to(roomId).emit("update-word", {word: hangle[randomIndex]})
}