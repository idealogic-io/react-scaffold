import React from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "navigation/routes";

import { ErrorBoundaryFallbackProps } from "./types";
// TODO style component with scss
const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ error, resetError }) => {
  const navigate = useNavigate();

  const onPressHandler = () => {
    resetError();
    navigate(ROUTES.landing);
  };

  return (
    <>
      <h1>Something went wrong!</h1>
      <p>{error?.toString()}</p>
      <h2>Please, go to home page</h2>
      <button onClick={onPressHandler}>Go to home</button>
    </>
  );
};

export default ErrorBoundaryFallback;
