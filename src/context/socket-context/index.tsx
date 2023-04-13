import React, { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { io } from "socket.io-client";

import { useAppSelector } from "store/store";
import { useSocketEventHandlers } from "./hooks";
import { SOCKET_EVENT_NAMES } from "./socket-event-names";

type ContextType = {
  socketConnect: () => void;
  socketDisconnect: () => void;
};

const SocketContext = createContext<ContextType | null>(null);

const socket = io(`${process.env.REACT_APP_SOCKET_URL}` as string, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: false,
});

const SocketContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { token } = useAppSelector(state => state.auth);

  const { onSocketErrorHandler } = useSocketEventHandlers();

  useEffect(() => {
    if (token) {
      socket.io.opts.query = { token };
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [token]);

  useEffect(() => {
    socket.on(SOCKET_EVENT_NAMES.exception, onSocketErrorHandler);

    return () => {
      socket.off(SOCKET_EVENT_NAMES.exception);
    };
  }, []);

  const context = null;

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
