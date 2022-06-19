import axios from "axios";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tokenState from "../recoil/token";
import getGameInfo from "../request/getGameInfo";
import Button from "./Button";
import Loading from "./Loading";

const Over = () => {
  const {id} = useParams();
  const [token, setToken] = useRecoilState(tokenState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, [])

  const init = async() => {
    setLoading(true)
    const res = await getGameInfo(token, id, navigate)
    if(res === 401) {
      setToken("");
      window.location.reload();
    }
    setLoading(false)
  }

  return(
    <AppMain>
      {
        loading ? 
        <Loading isLoading={loading} type="spin" color="99EA97"></Loading> :
        <>
          <TitleDiv>결과</TitleDiv>
          <UserList>
            <User>
              <Nickname>사람1</Nickname>
              <Score>0점</Score>
            </User>
            <User>
              <Nickname>사람2</Nickname>
              <Score>0점</Score>
            </User>
          </UserList>
          <Button color={"#EA9797"}>돌아가기</Button>
        </> 
      }
    </AppMain>

  )
}

const AppMain = styled.div`
display: flex;
flex-direction: column;
`

const TitleDiv = styled.div`
  margin: 100px;
  font-size: 100px;
  text-align: center;
`

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const User = styled.div`
  width: 60%;
  height: 80px;
  background-color: #9EDA9D;
  border-radius: 20px;
  font-size: 25px;
  display: flex;
  margin: 25px;
  justify-content: space-around;
  align-items: center;
`

const Nickname = styled.div`

`

const Score = styled.div`
  
`

export default Over;