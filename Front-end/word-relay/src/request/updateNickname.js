import axios from "axios";
import { HOST } from "../config";


const updateNickname = async(token, data) => {
  try {
    if(token !== "") {
      const res = await axios({url:`http://${HOST}/nickname`, data:data, method:"put", headers : {"Authorization" : token}})
      if (res.status === 200) {
        return {
          newNickname : data.newNickname,
          token : res.data.token,
          status : 200
        };
      }
    }
  } catch (err) {
    if (err.message === "Network Error") {
      alert("네트워크 연결을 확인하세요")
    } else {
      if (err.response.data.status === 400 || err.response.data.message === "이미 존재하는 닉네임입니다.") {
        alert("이미 사용중인 닉네임 입니다.")
      } else if(err.response.data.status === 500) {
        alert("서버 오류 발생")
      } else {
        alert("알수 없는 오류 발생")
      }
    }
  }
}

export default updateNickname;