import './App.css';
import styled from "styled-components";
import {RecoilRoot} from 'recoil'
import Router from './Router';


function App() {
  return(
    <AppDiv>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </AppDiv>
  )
}
const AppDiv = styled.div`
/* width: 95vw; */
height: 80vh;
`

export default App;
