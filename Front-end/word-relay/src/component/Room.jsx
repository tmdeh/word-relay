import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { HOST } from "../config";
import Button from "./Button";
import Loading from "./Loading";


const Room = () => {

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  const [head, setHead] = useState("");
  const [title, setTitle] = useState("");
  const [memberLimit, setMemberLimit] = useState(0);
  const [memberList, setMemberList] = useState([]);

  const getRoomInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${HOST}/room/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setHead(response.data.roomInfo.head.nickname);
      setTitle(response.data.roomInfo.name);
      setMemberList(response.data.roomInfo.member);
      setNickname(response.data.nickname);
      setMemberLimit(response.data.roomInfo.member_limit);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
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

  return (
    <Background>
      {!loading ?
        <>
          <Header>
            <Name>{nickname}</Name>
            <Title>{title}</Title>
            <Buttons>
              {head === nickname ? <Button onClick={onStartButtonClick} color={"#99EA97"}>시작</Button> : ""}
            </Buttons>
          </Header>
          <Body>
            {memberList.map(i =>
              <Member key={i._id}>
                <MemberName>{i.nickname}</MemberName>
                <Star>
                  <img src="/star.svg" />
                </Star>
              </Member>)}
            {[...Array(memberLimit-memberList.length)].map(i => 
              <Empty></Empty>
              )}
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

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`

const Member = styled.div`
  display: flex;
  background-color: #9EDA9D;
  margin-top: 5rem;
  width: 45%;
  height: 5rem;
  border-radius: 25px;
  font-size: 30px;
  align-items: center;
  justify-content: space-evenly;
`

const Star = styled.div`
`

const MemberName = styled.div``

const Exit = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
`

const Empty = styled.div`
  background-color: #E5E5E5;
  border-radius: 25px;
  margin-top: 5rem;
  width: 45%;
  height: 5rem;`

export default Room;