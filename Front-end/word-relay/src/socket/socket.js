import React, { createContext  } from 'react';
import { io } from 'socket.io-client';
import { HOST } from '../config';

const socket = io(`http://${HOST}`),
SocketContext = createContext(socket);

socket.on('connect', () => console.log('connected to socket'));

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export { SocketContext, SocketProvider };