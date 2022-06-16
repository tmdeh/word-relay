const room = require("../database/model/room");
const User = require("../database/model/user");


module.exports = async(socket) => {
  const user = await User.findOne({socketId : socket.id});
  if(user) {
    await room.deleteMany({head: user._id});
    const rooms = await room.find();
    socket.broadcast.emit('update-roomList', {rooms})
  }
}