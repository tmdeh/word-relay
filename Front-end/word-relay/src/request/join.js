const { default: axios } = require("axios")
const { HOST } = require("../config")

module.exports = async(token, roomId, password, navigate, socket) => {
  try {
    console.log("socket", socket)
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
        console.log(socket.id)
        socket.emit('join', {roomId: roomId})
        navigate(`/room/home/${roomId}`)
        return 201
      }
    }
    return 401
  } catch (error) {
    console.error(error)
    return error.response.status;
  }
}