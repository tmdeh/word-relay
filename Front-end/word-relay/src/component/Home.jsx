import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import Modal from "./Model";

const Home = () => {

  const [nickname, setNickname] = useState("");
  const [open, setOpen] = useState(false);

  const getNickname = () => {
    console.log(localStorage.getItem("token"))
    axios.get('http://localhost:8080/nickname', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((res) => {
      console.log(res)
      setNickname(res.data.nickname)
    }).catch((error) => {
      console.log(error.response)
      if (error.response.status === 401) {
        alert("토큰이 만료되었습니다.")
        localStorage.removeItem("token")
        window.location.href = '/'
      }
    })

  }
  useEffect(() => {
    getNickname()
  }, [])


  const logoutClick = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  const changeNickname = () => {
    setOpen(true)
  }

  const createRoom = () => {

  }
  const close = () => {
    setOpen(false)
  }

  return (
    <div> 
      <NavigationBar>
        <NameDiv>{nickname}</NameDiv>
        <Buttons>
          <Button color={"#99EA97"} onClick={changeNickname}>닉네임 변경</Button>
          <Button color={"#99EA97"} onclick = {createRoom} >시작하기</Button>
        </Buttons>
        {/* <button onClick={logoutClick}>로그아웃</button> */}
      </NavigationBar>
      <Modal open={open} close={close} header={"닉네임 변경"}>
        <input></input>
      </Modal>
    </div>
  )
}

const NavigationBar = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: #9EDA9D;
  justify-content: space-between;
`

const NameDiv = styled.div`
  font-size: 30px;
  margin-left: 69px;
`

const Buttons = styled.div`
  display: flex;
`

export default Home