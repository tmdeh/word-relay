import axios from "axios";
import { HOST } from "../config";


const getRoomList = async(token) => {
  try {
    if(token !== "") {
      const res = await axios.get(`http://${HOST}/room/list`, {
        headers: {
          Authorization: token
        }
      });
      if(res.status === 200) {
        return res.data.list;
      }
    }
    return 401;
  } catch (error) {
    if (error.response.status === 401) {
      return 401;
    }
    console.error(error)
  }
}

export default getRoomList;