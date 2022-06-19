const user = require("../database/model/user")

module.exports = async(socket, nickname) => {
  await user.updateOne({nickname}, {$set : {socketId : socket.id}})
}