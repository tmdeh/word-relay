const game = require("../database/model/game")
const room = require("../database/model/room")
const user = require("../database/model/user")

module.exports = async(socket, nickname) => {
  await user.findOneAndUpdate({nickname}, {$set : {socketId : socket.id}})
  // await game.updateMany({'member.user' : _id}, {$pull : {member : {user : _id}}})
  // await room.updateMany({'member' : _id}, {$pull : {member : {user: _id}}})
}