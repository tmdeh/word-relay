const join = require("./join");

exports.init = (io) => {
  console.log('Init socket.io');
  io.on('connection', (socket) => {

    socket.on('join', ({roomId}) => { //방 입장
      join(socket, roomId)
    })

    socket.on('start', ()=>{}); //게임 시작

    socket.on('answer', ()=>{}); //사용자의 답
  })
}