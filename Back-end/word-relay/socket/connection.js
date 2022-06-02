exports.init = (io) => {
  console.log('Init socket.io');
  io.on('connection', (socket) => {
    console.log('connected');
  })
}