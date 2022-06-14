const Room = require("../database/model/room");

module.exports = async(socket, roomId) => {
  const { member } = await Room.findById(roomId).populate('member');
  socket.to(roomId).emit("update-room", {member});
  socket.join(roomId)
}