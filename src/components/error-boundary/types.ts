import { FCWithChildren } from "types";

export interface ErrorBoundaryProps extends FCWithChildren {
  fallbackComponent: React.ComponentType<ErrorBoundaryFallbackProps>;
}
export interface ErrorBoundaryState {
  error: null | Error;
}

export type ErrorBoundaryFallbackProps = {
  error: ErrorBoundaryState["error"];
  resetError: () => void;
};
