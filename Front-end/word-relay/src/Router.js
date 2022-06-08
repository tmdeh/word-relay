import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Room from "./component/Room";
import CreateRoom from "./component/CreateRoom";
import Nickname from "./component/Nickname";
import Home from "./component/Home";
import tokenState from "./recoil/token"
import { SocketContext } from "./socket/socket";



const Router = () => {

  const token = useRecoilValue(tokenState);
  const socket = useContext(SocketContext);

  useEffect(() => {
    return () => {
      if(socket) {
        // socket.disconnect()
      }
    };
  })

  return (
    <Routes>
    {token !== "" ? (
    <>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/room/">
        <Route path="home/:id" element={<Room />}></Route>
        <Route path="create" element={<CreateRoom />}></Route>
      </Route>
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