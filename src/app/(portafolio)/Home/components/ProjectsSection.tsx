import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";

type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  type: "design" | "development";
  gallery?: string[];
  projectUrl?: string; // Nuevo campo para URL de proyectos de desarrollo
  repoUrl?: string;   // Opcional: URL del repositorio
};

export const ProjectsSection = () => {
  const projects: ProjectItem[] = [
    // Proyectos de desarrollo (ahora con enlaces)
    {
      title: "Encriptador ONE",
      description: "Encriptado y desencriptado de texto",
      tags: ["HTML", "CSS", "JS"],
      image: "/images/project1.png",
      type: "development",
      projectUrl: "https://danielgalindodev.github.io/Desencriptador-ONE/",
      repoUrl: "https://github.com/DanielGalindoDev/Desencriptador-ONE"
    },
    {
      title: "Ecualización de Imágenes",
      description: "Aplicación logica, trabajo en paralelo y secuencial",
      tags: ["C", "stb_image", "git"],
      image: "/images/project2.jpg",
      type: "development",
      projectUrl: "/Home/ProyectEcualizer",
      repoUrl: "https://github.com/DanielGalindoDev/Desencriptador-ONE"
    },
    // Proyectos de diseño (sin cambios)
    {
      title: "Diseño Web Corporativo",
      description: "Landing page moderna con enfoque en experiencia de usuario",
      tags: ["Figma", "UI/UX", "Prototipado"],
      image: "/images/design1.jpg",
      type: "design",
      gallery: [
        "/images/design1-1.jpg",
        "/images/design1-2.jpg",
        "/images/design1-3.jpg"
      ]
    },
    {
      title: "Modelado 3D para Producto",
      description: "Diseño tridimensional para presentación de producto",
      tags: ["Blender", "Substance", "Render"],
      image: "/images/design2.jpg",
      type: "design",
      gallery: [
        "/images/design2-1.jpg",
        "/images/design2-2.jpg",
        "/images/design2-3.jpg",
        "/images/design2-4.jpg"
      ]
    }
  ];

  const designProjects = projects.filter(p => p.type === "design");
  const developmentProjects = projects.filter(p => p.type === "development");

  return (
    <section id="proyectos" className="py-20 bg-white dark:bg-slate-950">
      <div className="container px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white">
          Mi Trabajo
        </h2>
        
        <Tabs defaultValue="development" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-xs mx-auto mb-12">
            <TabsTrigger value="development">Desarrollos</TabsTrigger>
            <TabsTrigger value="design">Diseños</TabsTrigger>
          </TabsList>
          
          <TabsContent value="development">
            <div className="grid md:grid-cols-2 gap-8">
              {developmentProjects.map((project, index) => (
                <DevelopmentProjectCard key={`dev-${index}`} project={project} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="design">
            <div className="grid md:grid-cols-2 gap-8">
              {designProjects.map((project, index) => (
                <ProjectCard key={`design-${index}`} project={project} isDesign />
              ))}
            </div>
            
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-white">
                Galería de Diseños 3D
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={`3d-${i}`} className="aspect-square relative group overflow-hidden rounded-lg">
                    <Image
                      src={`/images/3d-design-${i+1}.jpg`}
                      alt={`Diseño 3D ${i+1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="bg-white/90 text-slate-900 px-4 py-2 rounded-full text-sm font-medium">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Link
            href="https://github.com/DanielGalindoDev"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Explorar todos los proyectos
          </Link>
        </div>
      </div>
    </section>
  );
};

// Componente específico para proyectos de desarrollo con enlaces
const DevelopmentProjectCard = ({ project }: { project: ProjectItem }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
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
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Enlaces del proyecto */}
        <div className="flex gap-3 mt-3">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center text-blue-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Ver proyecto
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center text-blue-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Código fuente
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente original para diseños (sin cambios)
const ProjectCard = ({ project, isDesign = false }: { project: ProjectItem, isDesign?: boolean }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-64">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        
        {isDesign && project.gallery && (
          <div className="absolute top-4 right-4 bg-white/90 text-slate-900 px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <span className="mr-1">📷</span> {project.gallery.length} imágenes
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-purple-200 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-medium flex items-center">
          Ver galería
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
};