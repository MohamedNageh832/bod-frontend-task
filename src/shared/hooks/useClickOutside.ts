import { useEffect, type RefObject } from "react";

const UseClickOutside = (
  elementRef: RefObject<HTMLElement | null>,
  cb: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!elementRef.current || !target) return;
      const didClickOutside = !elementRef.current.contains(target);

      if (didClickOutside) cb();
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [elementRef, cb]);
};

export default UseClickOutside;
