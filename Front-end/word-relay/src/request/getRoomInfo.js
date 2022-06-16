const { default: axios } = require("axios");
const { HOST } = require("../config");


module.exports = async(token, id,navigate) => {
  try {
    const response = await axios.get(`http://${HOST}/room/${id}`, {
      headers: {
        Authorization: token
      }
    });
    if(response.data.roomInfo === null) {
      throw new Error("방 불러오기를 실패 하였습니다. 메인으로 돌아갑니다.")
    }
    return response
  } catch (error) {
    console.error(error)
    alert(error.message);
    navigate("/")
  }
}