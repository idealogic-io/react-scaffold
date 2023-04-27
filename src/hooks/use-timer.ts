import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useInterval } from "hooks";
/**
 * Conducts a logic for timer. Accepts timestamp and returns remaining time every second.
 */
export const useTimer = ({ timestamp }: { timestamp: number }) => {
  const initTimeRemaining = useMemo(
    () => (timestamp === 0 ? 0 : +(timestamp - moment().valueOf() / 1000).toFixed()),
    [timestamp],
  );

  const [remainingSeconds, setRemainingSeconds] = useState(-1);

  useEffect(() => {
    setRemainingSeconds(initTimeRemaining);
  }, [timestamp, initTimeRemaining]);

  const updateRemainingSeconds = useCallback(() => {
    setRemainingSeconds(prev => {
      return prev - 1;
    });
  }, []);

  useInterval(updateRemainingSeconds, remainingSeconds === 0 ? null : 1 * 1000);

  return { initTimeRemaining, remainingSeconds };
};
