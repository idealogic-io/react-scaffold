// Global vars imports
import React, { createContext, PropsWithChildren, useContext, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
// Store imports
import { useAppSelector } from "store/store";

type ContextType = {
  socketConnect: () => void;
  socketDisconnect: () => void;
};

const SocketContext = createContext<ContextType | null>(null);

const SocketContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { token } = useAppSelector(state => state.auth);

  const socket = io(`${process.env.REACT_APP_SOCKET_URL}` as string, {
    transports: ["websocket"],
    autoConnect: false,
    reconnection: false,
    query: {
      token: `${token}`,
    },
  });

  useEffect(() => {
    if (token) {
      socketConnect();
    } else {
      socketDisconnect();
    }
  }, [token]);

  const socketConnect = useCallback(() => {
    socket.connect();
  }, [token]);

  const socketDisconnect = useCallback(() => {
    socket.disconnect();
  }, [token]);

  const context = {
    socketConnect,
    socketDisconnect,
  };

  return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
  const socketContext = useContext(SocketContext);
  if (socketContext === null) {
    throw new Error("Socket context is not found");
  }
  return socketContext;
};

export default SocketContextProvider;
