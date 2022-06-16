import './App.css';
import styled from "styled-components";
import {RecoilRoot} from 'recoil'
import Router from './Router';
import { SocketProvider } from './socket/socket'; //모든 하위 컴포넌트에서 socket을 사용할 수 있도록
import { useEffect } from 'react';





function App() {
  return(
    <AppDiv>
      <RecoilRoot>
        <SocketProvider>
          <Router />
        </SocketProvider>
      </RecoilRoot>
    </AppDiv>
  )
}
const AppDiv = styled.div`
/* width: 95vw; */
height: 80vh;
`

export default App;
