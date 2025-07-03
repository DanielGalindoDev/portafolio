"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight} from "lucide-react";

const imagePairs = [
  {
    original: "/images/Ecualizador/EcualizacionParalela-1.jpg",
    equalized: "/images/Ecualizador/1.jpg",
    title: "Ecualización Urbana",
    description: "Mejora de contraste en fotografía"
  },
  {
    original: "/images/Ecualizador/EcualizacionParalela-2.jpg",
    equalized: "/images/Ecualizador/2.jpg",
    title: "Ecualización rural",
    description: "Resalta factores del ambiente"
  },
  {
    original: "/images/Ecualizador/EcualizacionParalela-imaRGB_1.jpg",
    equalized: "/images/Ecualizador/imaRGB_1.jpg",
    title: "Paisaje Natural",
    description: "Recuperación de detalles en sombras"
  },
  {
    original: "/images/Ecualizador/EcualizacionParalela-imaGray_1.jpg",
    equalized: "/images/Ecualizador/imaGray_1.jpg",
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
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
        <div className="flex-1 flex flex-col justify-center px-4 py-8">
          <div className="max-w-4xl mx-auto w-full">
            {/* Contenedor del carrusel con descripción integrada */}
            <div className="relative group" ref={containerRef}>
              {/* Tarjeta de contenido superpuesto */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 shadow-sm max-w-xs">
                  <h2 className="text-sm font-semibold text-slate-800 dark:text-white">
                    {imagePairs[currentIndex].title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {imagePairs[currentIndex].description}
                  </p>
                </div>
              </div>

              {/* Contenedor de imágenes */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shadow-md">
                {/* Imagen original */}
                <Image
                  src={imagePairs[currentIndex].original}
                  alt="Original"
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Imagen ecualizada con máscara */}
                <div
                  className="absolute top-0 left-0 w-full h-full overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                >
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
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md z-10 cursor-ew-resize"
                style={{ left: `${sliderValue}%` }}
              />

              {/* Controles del carrusel */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
                <Button
                  onClick={prevImage}
                  className="p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-sm hover:bg-white text-slate-800 dark:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={nextImage}
                  className="p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-sm hover:bg-white text-slate-800 dark:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Indicadores del carrusel con miniaturas */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-full backdrop-blur-sm">
                {imagePairs.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSliderValue(50);
                    }}
                    className={`relative w-1 h-1 transition-all ${
                      currentIndex === index 
                        ? 'bg-blue-600 scale-105' 
                        : 'bg-slate-400 hover:bg-slate-500 dark:bg-slate-600 dark:hover:bg-slate-400'
                    }`}
                    aria-label={`Mostrar ejemplo ${index + 1}`}
                  >
                    {/* Efecto de foco sutil */}
                    {currentIndex === index && (
                      <span className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Slider y controles inferiores */}
            <div className="mt-4 max-w-md mx-auto">
              <Input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between items-center mt-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="mr-2">← Original</span>
                  <span className="text-blue-600 dark:text-blue-400">Ecualizada →</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {currentIndex + 1}/{imagePairs.length}
                </div>
              </div>

              {/* Descripción técnica y botones */}
              <div className="mt-4 text-center">
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  Algoritmo C++ con OpenMP • Speedup: <span className="font-bold text-blue-600 dark:text-blue-400">2.5×</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}