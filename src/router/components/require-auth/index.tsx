import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "store/store";
import { ROUTES } from "router/routes";

const RequireAuth: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const token = useAppSelector(state => state.auth.token);

  if (!token) {
    return <Navigate to={`/${ROUTES.login}`} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
