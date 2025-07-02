import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow px-4 py-8 mt-10">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
