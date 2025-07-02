import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-900/20 via-slate-900 to-blue-900/20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-900/10"></div>
      </div>

      <div className="container relative z-10 px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Daniel Galindo
          <span className="text-blue-400">.</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl mb-8 text-blue-200 max-w-2xl">
          Desarrollador Full Stack especializado en crear soluciones digitales impactantes
        </h2>
        
        <div className="flex gap-4">
          <Link
            href="#proyectos"
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            Ver mis proyectos <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          
          <Link
            href="#contacto"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Contacto
          </Link>
        </div>
      </div>
    </section>
  );
};