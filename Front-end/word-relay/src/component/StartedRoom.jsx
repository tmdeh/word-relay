import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import nicknameState from "../recoil/nickname";
import tokenState from "../recoil/token";
import getGameInfo from "../request/getGameInfo";
import { SocketContext } from "../socket/socket";
import Loading from "./Loading";

const StartedRoom = () => {
  
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);
  const nickname = useRecoilValue(nicknameState);
  const [input, setInput] = useState("");
  const [myTurn, setMyTurn] = useState(false);
  const [token, setToken] = useRecoilState(tokenState);
  const timeRef = useRef(null);
  const [hart, setHart] = useState(3);
  const socket = useContext(SocketContext);
  const [roomInfo, setRoomInfo] = useState({});
  const [memberInfo, setMemberInfo] = useState([]);
  const [word, setWord] = useState("");
  const [timer, setTimer] = useState(3);
  const navigate = useNavigate();

  useBeforeunload((e) => {
    e.preventDefault();
    navigate("/")
  })

  useEffect(() => {
    socket.on("update-word", ({word, turn, member}) => {
      setMemberInfo(member)
      console.log("turn : " + turn)
      if(nickname === turn) {
        setMyTurn(true)
      } else {
        setMyTurn(false)
      }
      setStart(true)
      setWord(word)
      setTimer(5)
    })
    socket.on("over", ()=> {
      navigate("/over/" + id)
    })
  }, [socket])

  

  useEffect(() => {
    if(start) {
      if(timer <= 0) {
        clearInterval(timeRef.current);
        setTimer(5)
        setHart(hart - 1)
        socket.emit("hit", {roomId: id, nickname});
      }
    }
  }, [timer])

  useEffect(() => {
    timeRef.current = setInterval(() => {
      setTimer(time => time - 1);
    }, 1000)

    return () => {
      clearInterval(timeRef.current)
    }
  }, [word])

  useEffect(() => {
    init();
  }, [])


  const init = async() => {
    try {
      setLoading(true)
      const response = await getGameInfo(token, id, navigate);
      if(response === 401) {
        setToken("")
        window.location.reload();
      }
      setMemberInfo(response.data.gameInfo.member)
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
  }

  const onChangeInput = (e) => {
    setInput(e.currentTarget.value)
  }

  const onEnterKeyPress = (e) => {
    if(myTurn) {
      if(e.key === "Enter") {
        socket.emit("answer", {roomId : id, word: input})
      }
    }
  }

  return(
    <AppDiv>
      <WordBoxDiv>{start ? word : timer + "초 뒤에 시작"}</WordBoxDiv>
      <InputDiv>
        <Input onChange={onChangeInput} onKeyDown={onEnterKeyPress}></Input>
        <Timer>{timer}</Timer>
      </InputDiv>
      {loading ?
      <Loading isLoading={loading} type="spin" color="99EA97"></Loading> :          
      <UserListDiv>
        {memberInfo.map(e => 
          <UserDiv key={e._id} color={myTurn ? '#DA9D9D' : '#9EDA9D'}>
            <Nickname>{e.user.nickname}</Nickname>
            <Score>{e.score}점</Score>
          </UserDiv>
        )}
      </UserListDiv>
      }
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
  background-color: ${props => props.color};
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