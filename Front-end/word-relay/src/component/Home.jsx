import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import Loading from "./Loading";
import Modal from "./Model";
import { useNavigate } from "react-router-dom";
import join from "../request/join";
import tokenState from "../recoil/token";
import { useRecoilState} from "recoil";
import getRoomList from "../request/getList";
import getNickname from "../request/getNickname";
import updateNickname from "../request/updateNickname";
import { SocketContext } from "../socket/socket";
import nicknameState from "../recoil/nickname";


const Home = () => {
  const [token, setToken] = useRecoilState(tokenState)
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [nicknameInput, setNicknameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [roomId, setRoomId] = useState(0);

  const socketClient = useContext(SocketContext);

  const navigate = useNavigate();

  const onClickCreateRoomButton = () => {
    navigate("/room/create");
  }

  const changeNicknameButton = async() => {
    setIsLoading(true)
    let data = {
      newNickname: nicknameInput
    }
    const res = await updateNickname(token, data);
    if(res.status === 200) {
      setNickname(res.newNickname);
      setToken(res.token)
      setOpen(false)
    }
    setIsLoading(false);
  }

  const onChangeNicknameInput = (e) => {
    setNicknameInput(e.target.value)
  }

  const onClickRoom = async(e) => {
    setIsLoading(true)
    const res = await join(token, e.currentTarget.id, null, navigate, socketClient)
    if (res === 401) {
      setToken("")
      window.location.reload();
    } else if (res === 419) {
      alert("빈자리가 없습니다.");
    } else if (res === 420) {
      alert("없는 방입니다.");
    } else if (res === 500) {
      alert("서버 오류")
    }
    setIsLoading(false)
  }

  const onClickPasswordRoom = (e) => {
    setPasswordModalOpen(true)
    setRoomId(e.currentTarget.id)
  }

  const joinPasswordRoom = async() => {
    const res = await join(token, roomId, passwordInput, navigate, socketClient)
    if(res === 400) {
      alert("비밀번호가 일치하지 않습니다.");
    }
    else if(res === 401) {
      setToken("")
      window.location.reload();
    } else if (res === 419) {
      alert("빈자리가 없습니다.");
      setPasswordModalOpen(false)
    } else if (res === 420) {
      alert("없는 방입니다.");
      setPasswordModalOpen(false);
    }
  }

  const close = () => {
    setOpen(false)
  }

  useEffect(() => {
    request()
  }, [token, setToken])
  

  const request = async() => {
    
    if(token === "") {
      window.location.reload();
    } 
    setIsLoading(true)
    await getRoomList(token).then(res => {
      if(res === 401) {
        setToken("")
        window.location.reload();
      }
      setRoomList(res);
    }).catch((error) => {
      console.error(error)
      setIsLoading(false)
    })

    await getNickname(token).then(res => {
      if(res === 401) {
        setToken("")
        window.location.reload();
      }
      setNickname(res)
    }).catch((error) => {
      console.error(error)
      setIsLoading(false)
    })
    setIsLoading(false)
  }


  useEffect(() => {
    socketClient.on("update-roomList", ({rooms}) => {
      setRoomList(rooms)
    })
  }, [socketClient])


  return (
    <div>
      {!isLoading ?
      <>
        <NavigationBar>
          <NameDiv>{nickname}</NameDiv>
          <Buttons>
            <Button color={"#99EA97"} onClick={() => setOpen(true)}>닉네임 변경</Button>
            <Button color={"#99EA97"} onClick = {onClickCreateRoomButton}>방 만들기</Button>
          </Buttons>
        </NavigationBar>
        <Modal open={open} close={close} header={"닉네임 변경"}>
          <ModalContainer>
            <NicknameInput placeholder="새로운 닉네임" onChange={onChangeNicknameInput}></NicknameInput>
            <Button color={"#99EA97"} onClick={changeNicknameButton}>변경하기</Button>
            <Button color={"#EA9797"} onClick={close}>취소</Button>
          </ModalContainer>
        </Modal>
        <Modal open={passwordModalOpen} close={() => setPasswordModalOpen(false)} header={"비밀번호 입력"}>
          <ModalContainer>
            <NicknameInput placeholder="비밀번호" onChange={e => setPasswordInput(e.target.value)}></NicknameInput>
            <Button color={"#99EA97"} onClick={joinPasswordRoom}>입장</Button>
            <Button color={"#EA9797"} onClick={() => setPasswordModalOpen(false)}>취소</Button>
          </ModalContainer>
        </Modal>
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
      </>
       :
      <Loading isLoading={isLoading} type="spin" color="99EA97"></Loading>}

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
  text-overflow: nowrap;
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