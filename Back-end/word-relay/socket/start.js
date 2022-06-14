
module.exports = (io, roomId) => {
  try {
    io.to(roomId).emit("started");
  } catch (error) {
    console.log(error)
  }
}