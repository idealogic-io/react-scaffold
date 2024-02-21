import { useState, useEffect } from "react";

export const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1000);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    time,
    isRunning,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    reset: () => {
      setTime(0);
      setIsRunning(false);
    },
  };
};
