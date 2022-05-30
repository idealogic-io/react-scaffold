import { FCWithChildren } from "types";

export interface ErrorBoundaryProps extends FCWithChildren {}
export interface ErrorBoundaryState {
  hasError: boolean;
}
