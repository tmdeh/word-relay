import axios from "axios"
import { useRecoilState } from "recoil"
import { HOST } from "../config";
import tokenState from "../recoil/token"


const useNickname = async() => {
  const [token, setToken] = useRecoilState(tokenState);
  try {
    if(token !== "") {
      const res = await axios.get(`http://${HOST}/nickname`, {
        headers: {
          Authorization: token
        }
      })
      return res.data.nickname;
    }
  } catch (error) {
    if (error.response.status === 401) {
      setToken("")
      window.location.reload()
    }
    return "";
  }
}

export default useNickname;