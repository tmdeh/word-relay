import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import Loading from "./Loading";
import Modal from "./Model";

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);

  const getNickname = () => {
    // console.log(localStorage.getItem("token"))
    axios.get('http://localhost:8080/nickname', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((res) => {
      // console.log(res)
      setNickname(res.data.nickname)
    }).catch((error) => {
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


  const onClickChangeNicknameButton = () => {
    setOpen(true)
  }

  const onClickCreateRoomButton = () => {

  }

  const changeNicknameButton = async() => {
    setIsLoading(true)
    let data = {
      newNikcname: nicknameInput
    }
    await axios({url:"http://localhost:8080/nickname", data:data, method:"put", headers : {"Authorization" : localStorage.getItem("token")}})
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log("before : ", localStorage.getItem("token"))
          localStorage.setItem('token', res.data.token)
          console.log("res : ", res.data.token)
          console.log("after : ", localStorage.getItem("token"))
          // window.location.href = "/home"
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
          } else {
            alert("알수 없는 오류 발생")
          }
        }
      })
    setIsLoading(false);
  }

  const onChageNicknameInput = (e) => {
    setNicknameInput(e.target.value)
  }


  const close = () => {
    setOpen(false)
  }

  return (
    <div> 
      <NavigationBar>
        <NameDiv>{nickname}</NameDiv>
        <Buttons>
          <Button color={"#99EA97"} onClick={onClickChangeNicknameButton}>닉네임 변경</Button>
          <Button color={"#99EA97"} onclick = {onClickCreateRoomButton} >시작하기</Button>
        </Buttons>
        {/* <button onClick={logoutClick}>로그아웃</button> */}
      </NavigationBar>
      <Modal open={open} close={close} header={"닉네임 변경"}>
        <ModalContainer>
          <NicknameInput placeholder="새로운 닉네임" onChange={onChageNicknameInput}></NicknameInput>
          <Button color={"#99EA97"} onClick={changeNicknameButton}>변경하기</Button>
          <Button color={"#EA9797"} onClick={close}>취소</Button>
        </ModalContainer>
      </Modal>
      <Loading isLoading={isLoading} type="spin" color="99EA97"></Loading>
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

const NicknameInput = styled.input`
  margin: 15px;
  height: 55px;
  width: 550px;
  margin-bottom: 30px;
  border-radius: 20px;
  font-size:30px;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
  align-items: center;
  height: 400px;
`

export default Home