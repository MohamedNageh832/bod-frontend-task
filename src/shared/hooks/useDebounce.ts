import { useRef, useState } from "react";

const UseDebounce = <T>(value: T, delayMillis: number) => {
  const [debounced, setDebounced] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  if (value !== debounced) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebounced(value), delayMillis);
  }

  return debounced;
};

export default UseDebounce;
