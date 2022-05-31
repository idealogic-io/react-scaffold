import React from "react";

import { StyledErrorBoundary } from "./StyledErrorBoundary";

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
        <StyledErrorBoundary>
          <Text as="h1" fontSize="32px">
            Something went wrong!
          </Text>
          <Text>Please, go to home page</Text>
          <InternalLink to={ROUTES.landing}>Go to home</InternalLink>
        </StyledErrorBoundary>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
