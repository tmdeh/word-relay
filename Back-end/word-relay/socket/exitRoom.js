const Room = require("../database/model/room")

module.exports = async(socket, roomId) => {
  try {
    if(null == await Room.findById(roomId)) {
      const rooms = await Room.find();
      socket.broadcast.emit("update-roomList", {rooms})
      return
    }
    const { member } = await Room.findById(roomId).populate('member');
  
    socket.to(roomId).emit("update-room", {member})
  } catch (error) {
    console.error(error)
  } finally {
    socket.leave(roomId)
  }
}