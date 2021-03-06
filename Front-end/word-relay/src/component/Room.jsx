import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { HOST } from "../config";
import nicknameState from "../recoil/nickname";
import tokenState from "../recoil/token";
import getRoomInfo from "../request/getRoomInfo";
import { SocketContext } from "../socket/socket";
import Button from "./Button";
import Loading from "./Loading";


const Room = () => {
  const [token, setToken] = useRecoilState(tokenState)
  const socket = useContext(SocketContext)
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const nickname = useRecoilValue(nicknameState)
  const [head, setHead] = useState("");
  const [title, setTitle] = useState("");
  const [memberLimit, setMemberLimit] = useState(0);
  const [memberList, setMemberList] = useState([]);

  const navigate = useNavigate();

  useBeforeunload((e) => {
    e.preventDefault();
  })

  const setRoomInfo = useCallback(async () => {
    setLoading(true);

    const response = await getRoomInfo(token, id,navigate)
    if(response === 401) {
      setToken("");
      window.location.reload();
    }
    setHead(response.data.roomInfo.head.nickname);
    setTitle(response.data.roomInfo.name);
    setMemberList(response.data.roomInfo.member);
    setMemberLimit(response.data.roomInfo.member_limit);
    setLoading(false);
  }, [id, token, navigate, setToken])
  
  useEffect(() => {
    setRoomInfo();
  }, [setRoomInfo])

  useEffect(() => {
    socket.on("update-room", ({member}) => {
      setMemberList(member)
    })
  
    socket.on("started-game", () => {
      navigate(`/wordrelay/${id}`)
    })
  }, [socket, navigate, id])

  const onStartButtonClick = () => {
    socket.emit("start-game", {roomId: id})
  }


  const onExitButtonClick = async() => {
    try {
      let con = window.confirm("??????????????????????");
      if(con) {

        const response = await axios.delete(`http://${HOST}/room/${id}`,{
          headers: {
            Authorization: token
          }
        })
        if(response.status === 200) {
          socket.emit("leave-room", ({
            roomId: id
          }))
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("?????? ?????? ???????????? ???????????????.");
        setToken("");
        window.location.reload();
      }
      else if(error.response.status === 400) {
        alert("?????? ???????????????.")
        navigate("/home");
      } else {
        alert("?????? ??????")
      }
      console.error(error)
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
              {head === nickname ? <Button onClick={onStartButtonClick} color={"#99EA97"}>??????</Button> : ""}
            </Buttons>
          </Header>
          <Body>
            {memberList.map(i =>
              <Member key={i._id}>
                <MemberName>{i.nickname}</MemberName>
                <Star>
                  {i.nickname === head ? <img src="/star.svg" alt="??????"/> : null}
                </Star>
              </Member>)}
            {[...Array(memberLimit-memberList.length)].map((v,i) => 
              <Empty key={i}></Empty>
              )}
          </Body>
          <Exit>
            <Button onClick={onExitButtonClick} color={"#EA9797"}>?????????</Button>
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