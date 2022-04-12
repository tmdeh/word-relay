import './App.css';
import { Route, Routes } from "react-router-dom";
import Nickname from './component/Nickname';
import Home from './component/Home';
import Room from './component/Room';
import CreateRoom from './component/CreateRoom';
import styled from "styled-components";

function App() {

  const AppDiv = styled.div`
    width: 100vw;
    height: 100vh;
  `

  return (
    <AppDiv>
      <Routes>
        <Route path="/" element={<Nickname />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/room/:id" element={<Room />}></Route>
        <Route path="/home/create" element={<CreateRoom />}></Route>
      </Routes>
    </AppDiv>
  );
}

export default App;
