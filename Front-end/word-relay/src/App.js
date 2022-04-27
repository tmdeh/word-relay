import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Nickname from './component/Nickname';
import Home from './component/Home';
import Room from './component/Room';
import CreateRoom from './component/CreateRoom';
import styled from "styled-components";
import { useEffect } from 'react';

function App() {
  if (localStorage.getItem("token") != null) return (
    <AppDiv>
      <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/room/">
            <Route path=":id" element={<Room />}></Route>
            <Route path="create" element={<CreateRoom />}></Route>
          </Route>
          <Route path="*" element={<Navigate replace to='/home'></Navigate>}></Route>
      </Routes>
    </AppDiv>
  );
  else {
    return(
      <AppDiv>
        <Routes>
              <Route path="/" element={<Nickname />} ></Route>
              <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </AppDiv>
  )}
}
const AppDiv = styled.div`
/* width: 95vw; */
height: 80vh;
`

export default App;
