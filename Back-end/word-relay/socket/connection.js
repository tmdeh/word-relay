const room = require("../database/model/room");
const answer = require("./answer");
const createRoom = require("./createRoom");
const disconnect = require("./disconnect");
const exitRoom = require("./exitRoom");
const hit = require("./hit");
const init = require("./init");
const join = require("./join");
const socketChanged = require("./socketChanged");
const start = require("./start");


exports.init = (io) => {
  console.log('Init socket.io');
  io.on('connection', (socket) => {
    
    console.log("connected", socket.id)

    socket.on("init", ({nickname}) => {
      init(socket, nickname)
    })

    socket.on("socket-changed", ({nickname}) => {
      socketChanged(socket, nickname)
    })

    socket.on('disconnect', ({nickname})=> {
      disconnect(socket, nickname);
    })

    socket.on('init', ({msg}) => {
      socket.emit("OK", {id: socket.id})
    })

    socket.on('join', ({roomId}) => join(io, socket, roomId));//방 입장
    
    socket.on('create-room', () => createRoom(socket));

    socket.on('start-game', ({roomId})=>{//게임 시작
      start(io, roomId);
    });

    socket.on('leave-room', ({roomId}) => {//방 퇴장
      exitRoom(io, socket, roomId)
    })

    socket.on('answer', ({roomId, word})=>{
      answer(io, socket, roomId, word)
    }); //사용자의 답

    socket.on('hit', ({roomId, nickname}) => {
      hit(io, socket, roomId, nickname)
    })

    socket.on("die", ({roomId}) => {

    })
  })
}