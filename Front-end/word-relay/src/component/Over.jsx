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
  const [info, setInfo] = useState({});
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
    setInfo(res.data.gameInfo)
    setLoading(false)
  }

  const onClickBack = () => {
    navigate("/home");
  }

  return(
    <AppMain>
      {
        loading ? 
        <Loading isLoading={loading} type="spin" color="99EA97"></Loading> :
        <>
          <TitleDiv>결과</TitleDiv>
          <UserList>
            {info.member.map(i =>
            <User key={i._id}>
              <Nickname>{i.user.nickname}</Nickname>
              <Score>{i.score}점</Score>
            </User>
            )}
          </UserList>
          <Button color={"#EA9797"} onClick={onClickBack}>돌아가기</Button>
        </> 
      }
    </AppMain>

  )
}

const AppMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  /* width: 60%; */
  width: 800px;
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

const Hart = styled.div`
  
`

export default Over;