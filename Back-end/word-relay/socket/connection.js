const createRoom = require("./createRoom");
const exitRoom = require("./exitRoom");
const join = require("./join");
const start = require("./start");


exports.init = (io) => {
  console.log('Init socket.io');
  io.on('connection', (socket) => {
    
    console.log("connected", socket.id)

    socket.on('init', ({msg}) => {
      socket.emit("OK", {id: socket.id})
    })

    socket.on('join', ({roomId}) =>join(socket, roomId));//방 입장
    
    socket.on('create-room', () => createRoom(socket));

    socket.on('start', ({roomId})=>{//게임 시작
      start(socket, roomId);
    });

    socket.on('leave-room', ({roomId}) => {//방 퇴장
      exitRoom(socket, roomId)
    })

    socket.on('answer', ()=>{}); //사용자의 답
  })
}