const Room = require("../database/model/room");

module.exports = async(socket, roomId) => {
  console.log(roomId)
  const { member } = await Room.findById(roomId).populate();
  socket.to(roomId).emit("joined", {member});
  socket.join(roomId)
} 