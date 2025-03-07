import { useState, useEffect } from "react";

export default function useIsMobile(breakpoint: number = 768): boolean {
  const windowWidth =
    typeof window !== "undefined"
      ? Math.max(window?.innerWidth, window?.outerWidth, 0)
      : 0;
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? windowWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(windowWidth < breakpoint);
    };

    window?.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
