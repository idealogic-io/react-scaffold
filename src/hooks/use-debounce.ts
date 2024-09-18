import { useEffect, useState } from "react";
/**
 * Is used to debounce a function call. Debouncing is a technique used to improve performance and reduce unnecessary function calls.
 * @param value any value
 * @param delay delay is seconds
 * @returns value delayed in a time
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
