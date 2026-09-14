import * as React from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  closeFunction: (event: MouseEvent) => void
) => {
  React.useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeFunction?.(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeFunction]);
};