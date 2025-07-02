"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const imagePairs = [
  {
    original: "/images/Ecualizador/EcualizacionParalela-1.jpg",
    equalized: "/images/Ecualizador/1.jpg",
    title: "Ecualización Urbana",
    description: "Mejora de contraste en fotografía arquitectónica"
  },
  {
    original: "/images/Ecualizador/EcualizacionParalela-2.jpg",
    equalized: "/images/Ecualizador/2.jpg",
    title: "Retrato Digital",
    description: "Optimización de iluminación facial"
  },
  {
    original: "/images/Ecualizador/EcualizacionParalela-3.jpg",
    equalized: "/images/Ecualizador/3.jpg",
    title: "Paisaje Natural",
    description: "Recuperación de detalles en sombras"
  }
];

export default function EcualizacionPage() {
  const [sliderValue, setSliderValue] = useState(50);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imagePairs.length);
    setSliderValue(50);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imagePairs.length) % imagePairs.length);
    setSliderValue(50);
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
        {/* Contenido principal */}
        <div className="flex-1 flex flex-col justify-center px-4 py-8">
          <div className="max-w-6xl mx-auto w-full">
            {/* Encabezado minimalista */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                {imagePairs[currentIndex].title}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {imagePairs[currentIndex].description}
              </p>
            </div>

            {/* Contenedor del comparador */}
            <div className="relative group" ref={containerRef}>
              {/* Imagen original */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={imagePairs[currentIndex].original}
                  alt="Original"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Imagen ecualizada con máscara */}
              <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imagePairs[currentIndex].equalized}
                    alt="Ecualizada"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Línea divisoria */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 cursor-ew-resize"
                style={{ left: `${sliderValue}%` }}
              />

              {/* Controles del carrusel */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
                <Button
                  onClick={prevImage}
                  className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md hover:bg-white text-slate-800 dark:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md hover:bg-white text-slate-800 dark:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Indicadores del carrusel */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {imagePairs.map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSliderValue(50);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'bg-blue-600 w-6' : 'bg-slate-300 dark:bg-slate-600'}`}
                  />
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="mt-6 max-w-md mx-auto">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-3 text-sm text-slate-500 dark:text-slate-400">
                <span>Original</span>
                <span>Ecualizada</span>
              </div>
            </div>

            {/* Descripción técnica */}
            <div className="mt-8 text-center max-w-2xl mx-auto">
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Algoritmo implementado en C++ con OpenMP para procesamiento paralelo.
                Speedup promedio de <span className="font-bold text-blue-600 dark:text-blue-400">2.5×</span>.
              </p>
              
              <div className="flex justify-center gap-4">
                <Link
                  href="https://github.com/DanielGalindoDev/proyecto-ecualizacion"
                  target="_blank"
                  className={buttonVariants({ variant: "default", size: "lg" })}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver código
                </Link>
                <Link
                  href="#proyectos"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Ver otros proyectos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer minimalista */}
        <div className="py-4 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
          Proyecto académico - Facultad de Ingeniería UNAM
        </div>
      </div>
    </MainLayout>
  );
}