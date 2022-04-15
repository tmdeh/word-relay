import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Nickname from './component/Nickname';
import Home from './component/Home';
import Room from './component/Room';
import CreateRoom from './component/CreateRoom';
import styled from "styled-components";
import { useEffect, useState } from 'react';



function App() {
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token === null) {
      setHasToken(false)
    } else {
      setHasToken(true)
    }
  }, [])
  return (
    <AppDiv>
      <Routes>
        {hasToken ? <>
          <Route path="/home" element={<Home />}>
        </Route>
        <Route path="/room/:id" element={<Room />}></Route>
        <Route path="/room/create" element={<CreateRoom />}></Route>
        <Route path="*" element={<Navigate replace to='/home'></Navigate>}></Route>
        </> : 
        <>
          <Route path="/" element={<Nickname />} ></Route>
          <Route path='*' element={<Navigate replace to='/' />} />
        </>
        }
      </Routes>
    </AppDiv>
  );
}
const AppDiv = styled.div`
width: 100vw;
height: 100vh;
`

export default App;
