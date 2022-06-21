const { default: axios } = require("axios");
const { errorSelector } = require("recoil");
const { HOST } = require("../config");


export default async(token, id,navigate) => {
  try {
    const response = await axios.get(`http://${HOST}/room/game/${id}`, {
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
    if(error.response) {
      if(error.response.status === 401) {
        return 401
      }
    } 
    alert(error.message);
    navigate("/")
  }
}