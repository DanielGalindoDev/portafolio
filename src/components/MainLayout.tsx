import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
