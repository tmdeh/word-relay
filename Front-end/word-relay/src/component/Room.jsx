import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import {HOST} from "../config";
import Button from "./Button";
import Loading from "./Loading";


const Room = () => {
  
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  const [info, setInfo] = useState({});

  const getRoomInfo = async() => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${HOST}/room/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }});
      setInfo(response.data.roomInfo);
      setNickname(response.data.nickname);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      if(error.response.status === 401) {
        alert("토큰 만료 메인으로 돌아갑니다.");
        localStorage.removeItem("token");
        window.location.reload();
      }
      console.log(error)
    }
  } 

  useEffect(() => {
    getRoomInfo();
  }, [])


  const onStartButtonClick = () => {

  }

  const onExitButtonClick = () => {

  }

  return(
    <Background>
      {!loading ?      
      <>
        <Header>
        <Name>{nickname}</Name>
        <Title>{info.name}</Title>
        <Buttons>
          {/* {nickname === info.head.nickname ? <Button onClick={onStartButtonClick} color={"#99EA97"}>시작</Button> : ""} */}
        </Buttons>
      </Header>
      <Body>
        {/* {info.member.map(i => 
        <Member key={i._id}>
          <MemberName></MemberName>
        </Member>)} */}
      </Body>
      <Exit>
        <Button onClick={onExitButtonClick} color={"#EA9797"}>나가기</Button>
      </Exit>
      </>
      :
      <Loading isLoading={loading} type="spin" color="99EA97"></Loading>
      }
    </Background>
  )
  
}

const Background = styled.div`
  width:100%;
  height:100%;
`

const Title = styled.div`
  font-size: 30px;
`

const Header = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: #9EDA9D;
  justify-content: space-between;
`
const Name = styled.div`
  font-size: 30px;
  margin-left: 69px;
`

const Buttons = styled.div`
  
`

const Body = styled.div``

const Member = styled.div`
  background-color: #9EDA9D;
`

const MemberName = styled.div``

const Exit = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
`

export default Room;