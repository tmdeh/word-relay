
module.exports = ({sokcet, roomId}) => {
  sokcet.to(roomId).emit("start");
}