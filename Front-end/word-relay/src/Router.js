import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Room from "./component/Room";
import CreateRoom from "./component/CreateRoom";
import Nickname from "./component/Nickname";
import Home from "./component/Home";
import tokenState from "./recoil/token"
import StartedRoom from "./component/StartedRoom";
import { SocketContext } from "./socket/socket";
import nicknameState from "./recoil/nickname";
import Over from "./component/Over";



const Router = () => {

  const token = useRecoilValue(tokenState);
  const socket = useContext(SocketContext);
  const nickname = useRecoilValue(nicknameState);
  const preventClose = (e) => { 
    e.preventDefault();
    socket.emit("disconnect");
    e.returnValue = "";
  }

  useEffect(() => {  
    window.addEventListener("beforeunload", preventClose);  
    return () => {    
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
  useEffect(() => {
    socket.emit("socket-changed", {nickname})
  }, [socket.id])
  return (
    <Routes>
    {token !== "" ? (
    <>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/room/">
        <Route path="home/:id" element={<Room />}></Route>
        <Route path="create" element={<CreateRoom />}></Route>
      </Route>
      <Route path="/over/:id" element={<Over></Over>}></Route>
      <Route path="/wordrelay/:id" element={<StartedRoom />}></Route>
      <Route path="*" element={<Navigate replace to='/home'></Navigate>}></Route>
      </>
      ) :
        <>
          <Route path="/" element={<Nickname />} ></Route>
          <Route path='*' element={<Navigate replace to='/' />} />
        </>
      }
  </Routes>
  )
}

export default Router;