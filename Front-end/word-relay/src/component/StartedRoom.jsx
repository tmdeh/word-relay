import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
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
  const [msg, setMsg] = useState("");
  const [input, setInput] = useState("");
  const [myTurn, setMyTurn] = useState(false);
  const [turn, setTurn] = useState("");
  const [token, setToken] = useRecoilState(tokenState);
  const timeRef = useRef(null);
  const inputRef = useRef();
  const [hart, setHart] = useState(3);
  const socket = useContext(SocketContext);
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
      setTurn(turn)
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

    socket.on("wrong", ({msg}) => {
      setMsg(msg);
    })
  }, [])

  

  useEffect(() => {
    if(start) {
      if(myTurn) {
        if(timer <= 0) {
          clearInterval(timeRef.current);
          setHart(hart - 1)
          setMsg("");
          setTimer(5)
          socket.emit("hit", {roomId: id, nickname});
        }
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
    setMsg("");
    setInput(e.currentTarget.value)
  }

  const onEnterKeyPress = (e) => {
    if(start) {
      if(myTurn) {
        if(e.key === "Enter") {
          inputRef.current.value = "";
          const regex = /^[???-???|0-9|]+$/;
          if(regex.test(input)){
            socket.emit("answer", {roomId : id, word: input, nickname: nickname})
          }
        }
      }
    }
  }

  return(
    <AppDiv>
      <WordBoxDiv>{start ? word : timer + "??? ?????? ??????"}</WordBoxDiv>
      {msg}
      <InputDiv>
        <Input onChange={onChangeInput} onKeyDown={onEnterKeyPress} ref={inputRef}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}></Input>
        <Timer>{timer}</Timer>
      </InputDiv>
      {loading ?
      <Loading isLoading={loading} type="spin" color="99EA97"></Loading> :          
      <UserListDiv>
        {memberInfo.map(e => 
          <UserDiv key={e._id} color={turn === e.user.nickname ? '#DA9D9D' : '#9EDA9D'}>
            <Nickname>{e.user.nickname}</Nickname>
            <Hart>{e.hart}??????</Hart>
            <Score>{e.score}???</Score>
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
const Hart = styled.div`
`


export default StartedRoom;