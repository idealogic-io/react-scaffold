import React, { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "store/store";
import { ROUTES } from "navigation/routes";

const RequireAuth: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { token } = useAppSelector(state => state.auth);

  const location = useLocation();

  if (!token) {
    return <Navigate to={ROUTES.landing} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
