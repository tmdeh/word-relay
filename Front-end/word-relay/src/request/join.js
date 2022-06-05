const { default: axios } = require("axios")
const { HOST } = require("../config")

module.exports = async(token, roomId, password, navigate, socket) => {
  try {
    if(token !== "") {
      const response = await axios({
        url : `http://${HOST}/room/${roomId}`,
        method: "POST",
        data : {
          hasPassword : password ? true : false,
          password : password
        },
        headers : {
          "Authorization" : token
        }
      })
      if(response.status === 201) {
        console.log(socket)
        socket.emit('join', {roomId: roomId})
        navigate(`/room/home/${roomId}`)
        return
      }
    }
    return 401
  } catch (error) {
    return error.response.status;
  }
}