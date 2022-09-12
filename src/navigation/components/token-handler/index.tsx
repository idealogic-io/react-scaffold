import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "store/store";
import { ROUTES } from "navigation/routes";
// TODO create custom hook to get me profile and use it here
// So on every page this hook will be triggered and we can catch 401 error to logout user
const TokenHandler: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { token } = useAppSelector(state => state.auth);

  if (token) {
    return <Navigate to={"/" + ROUTES.home} replace />;
  }

  return <>{children}</>;
};

export default TokenHandler;
