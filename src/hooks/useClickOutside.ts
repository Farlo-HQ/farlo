import * as React from "react";

export const useClickOutside = (ref: any, closeFunction: () => any) => {
  React.useEffect(() => {
   
    const handleClickOutside = (event: { target: any }) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeFunction?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
