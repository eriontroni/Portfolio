import  { useEffect, useState } from "react";

export type DebounceType = {
  delay?: number;
  onDebounce: (value: string) => void;
};

const useDebounce = ({ delay = 500, onDebounce }: DebounceType) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDebounce(debouncedValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay,debouncedValue]);

  function triggerChange(value: string) {
    setDebouncedValue(value);
  }
  return { triggerChange };
};

export default useDebounce;
