import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "navigation/routes";
// Components
import { Text, Button } from "components";
// Types
import { ErrorBoundaryFallbackProps } from "./types";
import { StyledFlexWrapper } from "./StyledErrorBoundary";

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ error, resetError }) => {
  const navigate = useNavigate();

  const onPressHandler = () => {
    resetError();
    navigate(ROUTES.landing);
  };

  return (
    <StyledFlexWrapper>
      <Text as="h1" my="16px" $fontWeight="bold" fontSize="28px">
        Something went wrong!
      </Text>
      {error && <Text mb="30px">{error.toString()}</Text>}

      <Text as="h2" $fontWeight="bold" my="16px" fontSize="20px">
        Please, go to home page
      </Text>

      <Button variant="primary" width="100%" onClick={onPressHandler}>
        Go to home
      </Button>
    </StyledFlexWrapper>
  );
};

export default ErrorBoundaryFallback;
