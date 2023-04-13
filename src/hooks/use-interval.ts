import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: null | number) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => {
        clearInterval(id);
      };
    }

    return undefined;
  }, [delay]);
};
