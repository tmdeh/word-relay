import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { HOST } from "../config";
import tokenExpired from "../expired";
import tokenState from "../recoil/token";
import Button from "./Button";
import Loading from "./Loading";


const Room = () => {
  const [token, setToken] = useRecoilState(tokenState)
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  const [head, setHead] = useState("");
  const [title, setTitle] = useState("");
  const [memberLimit, setMemberLimit] = useState(0);
  const [memberList, setMemberList] = useState([]);

  const navigate = useNavigate();

  const getRoomInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${HOST}/room/${id}`, {
        headers: {
          Authorization: token
        }
      });
      console.log(response.data)
      setHead(response.data.roomInfo.head.nickname);
      setTitle(response.data.roomInfo.name);
      setMemberList(response.data.roomInfo.member);
      setMemberLimit(response.data.roomInfo.member_limit);
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        tokenExpired(navigate)
        window.location.reload();
      }
      console.log(error)
    }
  }, [id, navigate])
  
  const getNickname = useCallback(async() => {
    console.log(token)
    const response = await axios.get(`http://${HOST}/nickname`, {
      headers: {
        Authorization: token
      }
    });
    setNickname(response.data.nickname)
  }, [])

  
  useEffect(() => {
    getRoomInfo();
    getNickname();
  }, [getRoomInfo, getNickname])


  const onStartButtonClick = () => {
    
  }

  const onExitButtonClick = async() => {
    try {
      let con = window.confirm("나가시겠습니까?");
      if(con) {
        const response = await axios.delete(`http://${HOST}/room/${id}`,{
          headers: {
            Authorization: token
          }
        })
        if(response.status === 200) {
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("토큰 만료 메인으로 돌아갑니다.");
        setToken("");
        window.location.reload();
      }
      else if(error.response.status === 400) {
        alert("이미 나갔습니다.")
        navigate("/home");
      } else {
        alert("오류 발생")
      }
      console.log(error)
    }
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
                  {i.nickname === head ? <img src="/star.svg" alt="방장"/> : null}
                </Star>
              </Member>)}
            {[...Array(memberLimit-memberList.length)].map((v,i) => 
              <Empty key={i}></Empty>
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