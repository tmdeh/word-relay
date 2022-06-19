const Room = require("../database/model/room");

module.exports = async(io, socket, roomId) => {
  const { member } = await Room.findById(roomId).populate('member').populate('head');
  socket.join(roomId)
  io.to(roomId).emit("update-room", {member});
}