import { useState, useEffect } from "react";

const useDeviceSize = (size = 900) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("onload", handleWindowResize);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("onload", handleWindowResize);
    };
  }, []);

  return { width, height, isMobile: width === 0 ? false : width <= size };
};

export { useDeviceSize };
