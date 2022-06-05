import axios from "axios"
import { HOST } from "../config";


const getNickname = async(token) => {
  try {
    if(token !== "") {
      const res = await axios.get(`http://${HOST}/nickname`, {
        headers: {
          Authorization: token
        }
      })
      return res.data.nickname;
    }
    return 401;
  } catch (error) {
    if (error.response.status === 401) {
      return 401
    }
    return "";
  }
}

export default getNickname;