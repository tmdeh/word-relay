import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/"></Route>
      <Route path="/home"></Route>
      <Route path="/room/:id"></Route>
      <Route path="/home/create"></Route>
    </div>
  );
}

export default App;
