import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    const { fallbackComponent: FallbackComponent } = this.props;
    const { error } = this.state;

    return error ? <FallbackComponent error={error} resetError={this.resetError} /> : this.props.children;
  }
}

export default ErrorBoundary;
