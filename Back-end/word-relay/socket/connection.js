const join = require("./join");
const start = require("./start");


exports.init = (io) => {
  console.log('Init socket.io');
  io.on('connection', (socket) => {
    
    console.log("connected", socket.id)

    socket.on('init', ({msg}) => {
      console.log(msg);
      socket.emit("OK", {id: socket.id})
    })

    socket.on('join', ({roomId}) => { //방 입장
      join(socket, roomId)
    })

    socket.on('start', ({roomId})=>{//게임 시작
      start(socket, roomId);
    }); 
    socket.on('answer', ()=>{}); //사용자의 답
  })
}