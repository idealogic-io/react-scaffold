import React, { ErrorInfo } from "react";

import { StyledErrorBoundary } from "./StyledErrorBoundary";

import { Text, InternalLink } from "components";
import { ROUTES } from "navigation/routes";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: Readonly<ErrorBoundaryProps> | ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught error", error, errorInfo);
  }

  render() {
    // TODO translate text
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
