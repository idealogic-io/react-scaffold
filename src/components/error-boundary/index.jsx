import React from "react";

import { ErrorBoundaryStyled } from "./styles";

import { Text, Button } from "components";

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

  redirect() {
    window.location.replace("/");
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryStyled>
          <Text as="h1" fSize="title1">
            Something went wrong!
          </Text>
          <Text>Please, go to home page</Text>
          <Button onClick={this.redirect}>Go to home</Button>
        </ErrorBoundaryStyled>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
