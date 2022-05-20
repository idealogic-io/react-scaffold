import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "store/store";

const RequireAuth = ({ children }) => {
  const { token } = useAppSelector(state => state.auth);

  const location = useLocation();

  if (!token.length) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
