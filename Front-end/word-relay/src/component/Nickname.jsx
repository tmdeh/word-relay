import React, { useState } from "react";
import axios from 'axios'
import Loading from './Loading'
import styled from "styled-components";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import tokenExpired from "../expired";

const Nickname = () => {
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const navigate = useNavigate();

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
        // console.log(res)
        if (res.status === 201) {
          localStorage.setItem('token', res.data.token)
          window.location.href = "/home"
        }
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          alert("네트워크 연결을 확인하세요")
        } else {
          if (err.response.data.status === 400 || err.response.data.message === "이미 존재하는 닉네임입니다.") {
            alert("이미 사용중인 닉네임 입니다.")
          } else if(err.response.data.status === 500) {
            alert("서버 오류 발생")
          } else if(err.response.data.status === 401) {
            tokenExpired(navigate);
          } else {
            alert("알수 없는 오류 발생")
          }
        }
      })
    setIsLoading(false)
  }

  const buttonColor = "#99EA97"

  return (
    <Background>
      <Main>
        <Title>끝말잇기</Title>
        <NicknameInput placeholder="닉네임을 입력하세요." type="text" onKeyDown={onChange} />
        <Button onClick={send} color={buttonColor}>시작하기</Button>
        <Loading isLoading={isLoading} type="spin" color="99EA97"></Loading>
      </Main>
    </Background>
  )

}

const Title = styled.div`
font-size: 96px;
font-weight: bold;
text-align: center;
`

const Background = styled.div`
margin-top: 10rem;
width:100%;
height:100%;
`

const Main = styled.div`
width: 40rem;
height: 35rem;
margin: auto;
display: grid;
justify-items: center;
`

const NicknameInput = styled.input`
border-radius: 15px;
width: 600px;
height: 40px;
outline: none;
border-color: #9EDA9D;
&:focus {
  outline: none;
}
`



export default Nickname