const room = require("../database/model/room")

module.exports = async(socket) => {
  const rooms = await room.find()
  socket.broadcast.emit("update-roomList", {rooms})
}