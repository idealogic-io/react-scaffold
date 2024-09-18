import { ErrorResult } from "services/types";

export const useSocketEventHandlers = () => {
  const onSocketErrorHandler = (error: ErrorResult) => {
    console.warn("Couldn't update socket event: ", error);
  };

  return {
    onSocketErrorHandler,
  };
};
