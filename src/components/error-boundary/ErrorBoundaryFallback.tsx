import React from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "navigation/routes";

import { Flex, Heading, Text, Button } from "components";

import { ErrorBoundaryFallbackProps } from "./types";

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ error, resetError }) => {
  const navigate = useNavigate();

  const onPressHandler = () => {
    resetError();
    navigate(ROUTES.landing);
  };

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" height="100vh">
      <Heading as="h1" scale="h1">
        Something went wrong!
      </Heading>
      <Text mt="8px">{error?.toString()}</Text>
      <Heading mt="8px" as="h2" scale="h2">
        Please, go to home page
      </Heading>
      <Button mt="8px" scale="lg" onClick={onPressHandler}>
        Go to home page
      </Button>
    </Flex>
  );
};

export default ErrorBoundaryFallback;
