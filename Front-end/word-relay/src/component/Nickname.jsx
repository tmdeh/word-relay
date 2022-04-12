import React, { useState } from "react";
import axios from 'axios'
import Loading from './Loading'

const Nickname = () => {
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setNickname(e.target.value)
    if (e.key === 'Enter') {
      send()
    }
  }

  const send = async () => {
    if (nickname === "") {
      alert("닉네임 칸이 비었습니다.")
      return
    }
    
    setIsLoading(true)
    let data = {
      nickname: nickname
    }
    await axios.post("http://localhost:8080/nickname", data)
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          localStorage.setItem('token', res.data.token)
          window.location.href = "/home"
        }
      })
      .catch((err) => {
        alert("이미 사용중인 닉네임 입니다.")
      })
    setIsLoading(false)
  }

  return (
    <div>
      <h1>끝말잇기</h1>
      <input type="text" onKeyDown={onChange} />
      <button onClick={send}>시작</button>
      <Loading isLoading={isLoading} type="spin" color="99EA97"></Loading>
    </div>
  )

}

export default Nickname