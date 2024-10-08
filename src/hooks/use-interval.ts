import { useEffect, useRef } from "react";
/**
 * Creates a timed interval that runs a callback function at a specified time interval.
 * @param callback
 * @param delay
 */
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
