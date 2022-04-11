import './App.css';
import { Route, Routes } from "react-router-dom";
import Nickname from './component/Nickname';
import Home from './component/Home';
import Room from './component/Room';
import CreateRoom from './component/CreateRoom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Nickname />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/room/:id" element={<Room />}></Route>
        <Route path="/home/create" element={<CreateRoom />}></Route>
      </Routes>
    </div>
  );
}

export default App;
