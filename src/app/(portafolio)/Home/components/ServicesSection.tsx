"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Code,
  Cpu,
  Globe,
  Smartphone,
  Database,
  GitBranch,
  Server,
  Network,
  Box
} from "lucide-react";

const services = [
  {
    icon: <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Desarrollo Web Frontend",
    description: "Aplicaciones modernas optimizadas para rendimiento y SEO.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: <Smartphone className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Diseño Responsive",
    description: "Interfaces adaptables para todos los dispositivos.",
    tags: ["Mobile-First", "UI/UX", "Figma"],
  },
  {
    icon: <Cpu className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Backend",
    description: "APIs robustas y escalables.",
    tags: ["Node.js","Django","Spring Boot"],
  },
  {
    icon: <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Bases de Datos",
    description: "Modelado y optimización de datos.",
    tags: ["MySQL", "Oracle","PostgreSQL"],
  },
  {
    icon: <Server className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "SysAdmin",
    description: "Configuración y mantenimiento de servidores.",
    tags: ["Linux", "Docker","Kubernetes","AWS"],
  },
  {
    icon: <Network className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Redes y Seguridad informática",
    description: "Implementación de redes seguras y eficientes.",
    tags: ["CCNA","Cisco"],
  },
  {
    icon: <GitBranch className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Control de Versiones",
    description: "Gestión eficiente del código fuente.",
    tags: ["Git", "GitHub", "GitLab"],
  },
  {
  icon: <Box className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
  title: "Desarrollo 3D",
  description: "Modelado, renderizado y animación 3D para aplicaciones y videojuegos.",
  tags: ["Blender", "Three.js", "Unity", "WebGL"],
}
];

export const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 2;
  const totalSlides = Math.ceil(services.length / slidesToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const groupedServices = [];
  for (let i = 0; i < services.length; i += slidesToShow) {
    groupedServices.push(services.slice(i, i + slidesToShow));
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Fondo con textura sutil */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.015]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent dark:from-blue-900/15 dark:to-transparent"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto w-full">
        <div className=" mb-16">
          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 tracking-tight">
            Servicios <span className="text-blue-600 dark:text-blue-400">Especializados</span>
          </h2>
          <div className="text-justify w-24 h-1.5 mx-auto mb-6 bg-blue-500 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-6xl mx-auto">
            Desarrollo soluciones digitales a medida, robustas y fáciles de usar. Combino tecnología de punta con un enfoque práctico para crear sistemas que realmente resuelvan problemas. Mi código es limpio, seguro y mantenible - sin complicaciones innecesarias ni sorpresas. Trabajo contigo para entender tus necesidades y entregar resultados que agreguen valor desde el primer día.
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          <div className="overflow-hidden px-8">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {groupedServices.map((group, groupIdx) => (
                <div key={groupIdx} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {group.map((service, idx) => (
                      <div
                        key={`${groupIdx}-${idx}`}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-400/30 h-full"
                      >
                        <div className="flex items-start gap-5 mb-5">
                          <div className="p-3.5 bg-blue-100/50 dark:bg-gray-700 rounded-xl">
                            {service.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                              {service.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-3">
                              {service.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2.5 mt-6">
                          {service.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3.5 py-1.5 text-sm bg-blue-100/50 dark:bg-gray-700 text-blue-800 dark:text-blue-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={prevSlide}
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </Button>
          <Button
            onClick={nextSlide}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>

        <div className="flex justify-center mt-12 gap-3">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "bg-blue-600 dark:bg-blue-400 w-8"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};