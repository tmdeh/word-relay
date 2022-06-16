import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import nicknameState from "../recoil/nickname";
import tokenState from "../recoil/token";
import getRoomInfo from "../request/getRoomInfo";
import { SocketContext } from "../socket/socket";

const StartedRoom = () => {
  
  const {id} = useParams();
  const [start, setStart] = useState(false);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [myTurn, setMyTurn] = useState(true);
  const [token, setToken] = useRecoilState(tokenState);
  const [time, setTime] = useState();
  const [hart, setHart] = useState(3);
  const socket = useContext(SocketContext);
  const [roomInfo, setRoomInfo] = useState({});
  const [word, setWord] = useState("");
  const [timer, setTimer] = useState(3.0);
  const navigate = useNavigate();

  useBeforeunload((e) => {
    e.preventDefault();
    navigate("/")
  })

  useEffect(() => {
    socket.on("update-word", ({word}) => {
      setStart(true)
      setWord(word)
      setTime(setTimeout(() => {
        setHart(hart - 1);
      }, 5000))
    })
  }, [socket])

  useEffect(() => {
    init();
  }, [])

  const init = async() => {
    try {
      const response = await getRoomInfo(token, id, navigate);
      setRoomInfo(response.data.roomInfo)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(roomInfo)
  }, [roomInfo])

  useEffect(() => {
    if(hart <= 0) {
      socket.emit("die", {nickname});
    }
  }, [hart])

  return(
    <AppDiv>
      <WordBoxDiv>{start ? word : timer + "초 뒤에 시작"}</WordBoxDiv>
      <InputDiv>
        <Input></Input>
        <Timer>{timer}</Timer>
      </InputDiv>
      <UserListDiv>
        {roomInfo.member.map(i => 
          <UserDiv key={i.user._id}>
            <Nickname>{i.user.nickname}</Nickname>
            <Score>{i.score}</Score>
          </UserDiv>
        )}
      </UserListDiv>
    </AppDiv>
  )

}


const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const WordBoxDiv = styled.div`
  width: 50%;
  height: 3.5rem;
  border-radius: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: nowrap;
  font-size: 30px;
  margin: 20px;
  background-color: #99EA97;
`

const InputDiv = styled.div`
  width: 50%;
`

const Input = styled.input`
  width: 98%;
  height: 3.5rem;
  text-align: center;
  border-radius: 20px;
  font-size: 30px;
  margin: 10px;
`
const Timer = styled.div`
  text-align: right;
`

const UserListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: center;
`

const UserDiv = styled.div`
  background-color: ${props => props.isTurn ? '#DA9D9D' : '9EDA9D'};
  /* #9EDA9D */
  margin: 15px;
  width: 60%;
  height: 3.5rem;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Nickname = styled.div``
  
const Score = styled.div`
`


export default StartedRoom;