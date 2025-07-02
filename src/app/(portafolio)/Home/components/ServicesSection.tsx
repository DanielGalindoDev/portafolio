import { Code, Cpu, Globe, Smartphone } from "lucide-react";
import { ServiceItem } from "./types";

export const ServicesSection = () => {
  const services: ServiceItem[] = [
    {
      icon: <Code className="w-8 h-8 text-blue-500" />,
      title: "Desarrollo Web",
      description: "Aplicaciones modernas con React, Next.js y tecnologías de vanguardia"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
      title: "Mobile First",
      description: "Diseños responsivos que funcionan perfectamente en todos los dispositivos"
    },
    {
      icon: <Cpu className="w-8 h-8 text-blue-500" />,
      title: "Backend Robustos",
      description: "APIs escalables con Node.js, Express y bases de datos optimizadas"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "Soluciones Cloud",
      description: "Despliegue y arquitectura en la nube para máxima disponibilidad"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white">
          Lo que puedo ofrecer
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};