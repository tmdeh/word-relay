import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Room from "./component/Room";
import CreateRoom from "./component/CreateRoom";
import Nickname from "./component/Nickname";
import Home from "./component/Home";
import tokenState from "./recoil/token"



const Router = () => {

  const token = useRecoilValue(tokenState)
  
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