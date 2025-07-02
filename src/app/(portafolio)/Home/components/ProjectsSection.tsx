import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProjectItem } from "./types";


export const ProjectsSection = () => {
  const projects: ProjectItem[] = [
    {
      title: "Plataforma E-learning",
      description: "Sistema completo de cursos online con dashboard interactivo",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/images/project1.jpg"
    },
    {
      title: "App de Gestión",
      description: "Aplicación empresarial para administración de recursos",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      image: "/images/project2.jpg"
    }
  ];

  return (
    <section id="proyectos" className="py-20 bg-white dark:bg-slate-950">
      <div className="container px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white">
          Proyectos Destacados
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-xl">
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-blue-200 mb-4">{project.description}</p>
                <div className="flex gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/proyectos"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Ver todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  );
};