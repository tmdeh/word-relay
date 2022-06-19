const room = require("../database/model/room")

module.exports = async(socket) => {
  const rooms = await room.find().populate('head')
  socket.broadcast.emit("update-roomList", {rooms})
}