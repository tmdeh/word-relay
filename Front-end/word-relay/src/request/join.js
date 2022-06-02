const { default: axios } = require("axios")
const { HOST } = require("../config")
const { default: tokenExpired } = require("../expired")

module.exports = async(roomId, password, navigate, socket) => {
  try {
    const response = await axios({
      url : `http://${HOST}/room/${roomId}`,
      method: "POST",
      data : {
        hasPassword : password ? true : false,
        password : password
      },
      headers : {
        "Authorization" : localStorage.getItem("token")
      }
    })

    if(response.status === 201) {
      console.log(socket)
      socket.emit('join', {roomId: roomId})
      navigate(`/room/home/${roomId}`)
    }
    console.log(response)
  } catch (error) {
    if (error.response.status === 401) {
      tokenExpired(navigate)
    } else if (error.response.status === 419) {
      alert("빈자리가 없습니다.");
    } else {
      console.log(error)
    }
  }
}