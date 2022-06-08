import axios from "axios"
import { HOST } from "../config"


export default async(token, data, navigate, socket) => {
  try {
    const res = await axios({
      url : `http://${HOST}/room`,
      method: 'post',
      data: data,
      headers : {
        Authorization: token
      }
    })
    if(res.status === 201) {
      socket.emit("join", ({roomId : res.data.data.resData._id}));
      navigate('/room/home/' + res.data.data.resData._id);
    }
  } catch (error) {
    console.log(error.response)
    if(error.response.status === 401) {
      return 401;
    }
    if(error.response.status===400) {
      alert(error.response.data.message)
    }
  }
}