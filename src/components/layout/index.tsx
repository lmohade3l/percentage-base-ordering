import { ReactNode } from "react";
import Header from "./header";
import useIsMobile from "@/hooks/useIsMobile";

export default function Layout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  return (
    <div>
      <Header />
      <div className={`${isMobile ? "m-5 ml-8" : " m-15"} `}>{children}</div>
    </div>
  );
}
