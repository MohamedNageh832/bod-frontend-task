import { useEffect, useRef, useState } from "react";

const UseDebounce = <T>(value: T, delayMillis: number = 300) => {
  const [debounced, setDebounced] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (value === debounced) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebounced(value), delayMillis);
  }, [value, debounced, delayMillis]);

  return debounced;
};

export default UseDebounce;
