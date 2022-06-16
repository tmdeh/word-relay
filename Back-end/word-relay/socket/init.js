const user = require("../database/model/user")


module.exports = async(socket, nickname) => {
  await user.findOneAndUpdate({nickname}, {$set: { socketId : socket.id }})
}