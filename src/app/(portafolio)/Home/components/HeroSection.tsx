"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section id="inicio" className="relative h-[100vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-500">
      {/* Fondo con textura sutil */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-10">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-5"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-blue-100/30 dark:to-gray-800/30"></div>
      </div>

      {/* Efecto de partículas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400/20 dark:bg-blue-500/10"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-6 flex flex-col items-center text-center">
        {/* Logo con efecto de resaltado */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-2 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-md group-hover:bg-blue-400/30 dark:group-hover:bg-blue-500/20 transition-all duration-300 animate-pulse"></div>
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-100/50 dark:border-gray-700/50 group-hover:border-blue-400/70 dark:group-hover:border-blue-500/50 transition-all duration-300 shadow-lg dark:shadow-gray-800/20">
            <Image
              src="/images/logo.png"
              alt="Logo Daniel Galindo"
              fill
              className="object-cover dark:brightness-90"
              priority
            />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-300/50 dark:group-hover:border-blue-400/30 transition-all duration-500"></div>
        </div>

        {/* Contenido principal */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-white">
          Daniel <span className="text-blue-600 dark:text-blue-400">Galindo</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl">
          Desarrollador Full Stack especializado en crear soluciones digitales impactantes
        </h2>
        
        {/* Botones */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="#proyectos"
            className={buttonVariants({ 
              variant: "default", 
              size: "lg",
              className: "group transition-all hover:shadow-lg hover:shadow-blue-400/30 dark:hover:shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            })}
          >
            Ver mis proyectos 
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/AboutMe"
            className={buttonVariants({ 
              variant: "outline", 
              size: "lg",
              className: "border-blue-400 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-700/50 dark:hover:text-blue-300 transition-all"
            })}
          >
            Sobre mi
          </Link>
        </div>
      </div>
    </section>
  );
};