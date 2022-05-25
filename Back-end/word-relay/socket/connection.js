const app = require('../app');

app.io.on('connection', (socket) => {
  socket.on('init', (msg) => {
    console.log(msg)
  })
})