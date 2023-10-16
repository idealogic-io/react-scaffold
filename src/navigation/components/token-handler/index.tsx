import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "store/store";
import { ROUTES } from "navigation/routes";

const TokenHandler: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { token } = useAppSelector(state => state.auth);

  if (token) {
    return <Navigate to={"/" + ROUTES.home} replace />;
  }

  return <>{children}</>;
};

export default TokenHandler;
