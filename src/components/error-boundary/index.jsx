import React from "react";

import { ErrorBoundaryStyled } from "./styles";

import { Text, InternalLink } from "components";
import { ROUTES } from "navigation/routes";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryStyled>
          <Text as="h1" fontSize="32px">
            Something went wrong!
          </Text>
          <Text>Please, go to home page</Text>
          <InternalLink to={ROUTES.landing}>Go to home</InternalLink>
        </ErrorBoundaryStyled>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
