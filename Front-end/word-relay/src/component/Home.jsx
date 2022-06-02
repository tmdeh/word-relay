import axios from "axios";
import { HOST } from "../config";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import Loading from "./Loading";
import Modal from "./Model";
import { useNavigate } from "react-router-dom";
import tokenExpired from "../expired";
import io from "socket.io-client"
import join from "../request/join";
import tokenState from "../recoil/token";
import { useRecoilState } from "recoil";
import useNickname from "../request/useNickname";

const Home = () => {
  const [token, setToken] = useRecoilState(tokenState)
  const [nickname, setNickname] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [roomId, setRoomId] = useState(0);

  const [socket, setSocket] = useState();

  const navigate = useNavigate();


  const getRoomList = useCallback(async() => {
    try {
      const res = await axios.get(`http://${HOST}/room/list`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      if(res.status === 200) {
        setRoomList(res.data.list)
      }
    } catch (error) {
      if (error.response.status === 401) {
        tokenExpired(navigate)
        window.location.reload()
      }
      console.log(error)
    }
  }, [navigate])

  const onClickChangeNicknameButton = () => {
    setOpen(true)
  }

  const onClickCreateRoomButton = () => {
    navigate("/room/create");
  }

  const changeNicknameButton = async() => {
    setIsLoading(true)
    let data = {
      newNickname: nicknameInput
    }
    await axios({url:`http://${HOST}/nickname`, data:data, method:"put", headers : {"Authorization" : localStorage.getItem("token")}})
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token)
          setNickname(nicknameInput);
          setOpen(false);
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

  const onClickRoom = async(e) => {
    setIsLoading(true)
    await join(e.currentTarget.id, null, navigate, socket)
    setIsLoading(false)
  }

  const onClickPasswordRoom = (e) => {
    setPasswordModalOpen(true)
    console.log(e.currentTarget.id)
    setRoomId(e.currentTarget.id)
  }

  const close = () => {
    setOpen(false)
  }

  useEffect(() => {
    setNickname(useNickname)
    getRoomList();
    setSocket(io("localhost:8080"))
  }, [getRoomList])


  return (
    <div> 
      <NavigationBar>
        <NameDiv>{nickname}</NameDiv>
        <Buttons>
          <Button color={"#99EA97"} onClick={onClickChangeNicknameButton}>닉네임 변경</Button>
          <Button color={"#99EA97"} onClick = {onClickCreateRoomButton}>방 만들기</Button>
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
      <Modal open={passwordModalOpen} close={() => setPasswordModalOpen(false)} header={"비밀번호 입력"}>
        <ModalContainer>
          <NicknameInput placeholder="비밀번호" onChange={e => setPasswordInput(e.target.value)}></NicknameInput>
          <Button color={"#99EA97"} onClick={() => join(roomId, passwordInput, navigate, socket)}>입장</Button>
          <Button color={"#EA9797"} onClick={() => setPasswordModalOpen(false)}>취소</Button>
        </ModalContainer>
      </Modal>
      <Loading isLoading={isLoading} type="spin" color="99EA97"></Loading>
      <RoomList>
        {roomList.map(i => 
        <RoomItem key={i._id} onClick={i.has_password ? onClickPasswordRoom : onClickRoom} id={i._id}>
          <Title>{i.name}</Title>
          <Head>{i.head.nickname}</Head>
          <Members>
            <Member>{i.member.length}</Member>/
            <Limit>{i.member_limit}</Limit>
          </Members>
          <img src={i.has_password ? "lock2.svg" : "lock1.svg"} alt="비밀번호"></img>
        </RoomItem>
        )}
      </RoomList>
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

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RoomItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #99EA97;
  width: 80%;
  height: 4rem;
  margin-top: 25px;
  border-radius: 25px;
`

const Members = styled.div`
  display: flex;
`

const Title = styled.div`
`

const Head = styled.div`
`

const Limit = styled.div`
  
`

const Member = styled.div`
  
`

export default Home