import React, { PropsWithChildren, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

import { useAppSelector } from "store/store";
import { ROUTES } from "navigation/routes";

const RequireAuth: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { token } = useAppSelector(state => state.auth);

  const location = useLocation();
  // TODO change url from process.env
  const socket = io("https://api-escrypto-dev.idealogic.dev", {
    transports: ["websocket"],
    autoConnect: false,
    reconnection: true,
    query: {
      token,
    },
  });

  useEffect(() => {
    if (token) {
      socket.connect();
    } else {
      console.log("Disconnect");
      socket.disconnect();
    }
  }, [token]);

  socket.on("connect", () => {
    console.log("Connected", socket.id);
  });

  if (!token) {
    return <Navigate to={ROUTES.landing} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
