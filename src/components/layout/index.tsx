import { ReactNode } from "react";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="m-15">{children}</div>
    </div>
  );
}
