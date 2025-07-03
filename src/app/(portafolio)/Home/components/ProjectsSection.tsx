'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button} from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExternalLink, Github, Image as ImageIcon, ArrowLeft, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const PROJECTS_DATA = [{
      title: "Ecualización de Imágenes",
      description: "Algoritmo de procesamiento de imágenes en C++ con versión paralela (OpenMP)",
      tags: ["C++", "OpenMP", "STB Image"],
      image: "/images/Desarrollos/project2.jpg",
      type: "development",
      projectUrl: "/Home/ProyectEcualizer",
      repoUrl: "https://github.com/DanielGalindoDev/EcualizadorDeImagenes"
    },
    {
      title: "Encriptador ONE",
      description: "Aplicación web para encriptar/desencriptar texto usando algoritmos",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "/images/Desarrollos/project1.png",
      type: "development",
      projectUrl: "https://danielgalindodev.github.io/Desencriptador-ONE/",
      repoUrl: "https://github.com/DanielGalindoDev/Desencriptador-ONE"
    },
    {
      title: "Conversor ONE",
      description: "Conversor de divisas utilizando Java con POO, para el programa Oracle Next Education",
      tags: ["Java", "Oracle","POO"],
      image: "/images/Desarrollos/project3.png",
      type: "development",
      repoUrl: "https://github.com/DanielGalindoDev/ConversorONE",
      imageClasses:'dark:filter dark:brightness-0 dark:invert'
    },
    {
      title: "Modelos 3D",
      description: "Modelado y renderizado profesional de objetos 3D con texturas avanzadas",
      tags: ["Blender", "Substance", "Cycles"],
      image: "/images/Disenos/Models/1.png",
      type: "design",
      gallery: Array.from({ length: 12 }, (_, i) => `/images/Disenos/Models/${i+1}.png`),
      featured: true
    },
    {
      title: "Diseño Web Corporativo SIDECU",
      description: "Proyecto de gestión de personal y equipo de cómputo",
      tags: ["Figma", "UI/UX", "Prototipado"],
      repoUrl: "https://github.com/DanielGalindoDev/SIDECU",
      projectUrl: "https://www.figma.com/design/2WhnPI4R89XAVAe1pWfu6v/SIDECU-Prototipo?node-id=0-1&t=X7dTEjW3F3vkrHaU-0",
      image: "/images/Disenos/SIDECU/1.png",
      type: "design",
      gallery: Array.from({ length: 12 }, (_, i) => `/images/Disenos/SIDECU/${i+1}.png`)
    },
    {
      title: "Diseño Web PUMAGUA",
      description: "Sistema de gestión hidráulica para servicio social",
      tags: ["Figma", "UI/UX", "Prototipado"],
      image: "/images/Disenos/PUMAGUA/1.png",
      type: "design",
      gallery: Array.from({ length: 10 }, (_, i) => `/images/Disenos/PUMAGUA/${i+1}.png`)
    }
  ];

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState('development')
  const [currentGallery, setCurrentGallery] = useState<{
    projectTitle: string
    images: string[]
    currentIndex: number
  } | null>(null)
  const [current3DIndex, setCurrent3DIndex] = useState(0)
  
  useEffect(() => {
    // Usa directamente PROJECTS_DATA
    const interval = setInterval(() => {
      const featuredProject = PROJECTS_DATA.find(p => p.featured);
      if (featuredProject?.gallery) {
        setCurrent3DIndex(prev => (prev + 1) % featuredProject.gallery!.length)
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []); // <- Sin dependencias necesarias

  const featured3DProject =  PROJECTS_DATA.find(p => p.featured)
  const designProjects =  PROJECTS_DATA.filter(p => p.type === 'design' && !p.featured)
  const developmentProjects =  PROJECTS_DATA.filter(p => p.type === 'development')

  const openGallery = (projectTitle: string, images: string[], index = 0) => {
    setCurrentGallery({
      projectTitle,
      images,
      currentIndex: index
    })
  }

  // Clases de botones corregidas para ambos temas
  const buttonClasses = {
    primary: cn(
      'bg-blue-600 text-white hover:bg-blue-700',
      'dark:bg-blue-700 dark:hover:bg-blue-800',
      'transition-colors duration-200'
    ),
    secondary: cn(
      'bg-gray-100 text-gray-900 hover:bg-gray-200',
      'dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
      'border border-gray-300 dark:border-gray-600',
      'transition-colors duration-200'
    ),
    outline: cn(
      'border border-gray-300 text-gray-700 hover:bg-gray-50',
      'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
      'transition-colors duration-200'
    ),
    ghost: cn(
      'hover:bg-gray-100 text-gray-700',
      'dark:hover:bg-gray-800 dark:text-gray-300',
      'transition-colors duration-200'
    )
  }

  return (
    <section id="proyectos" className="py-12 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto max-w-5xl">
        {/* Carrusel 3D destacado */}
        {featured3DProject && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Mis Modelos 3D Destacados
            </h2>
            <div 
              className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer group"
              onClick={() => openGallery(featured3DProject.title, featured3DProject.gallery!, current3DIndex)}
            >
              <div className="relative aspect-video">
                <Image
                  src={featured3DProject.gallery![current3DIndex]}
                  alt={`Modelado 3D - ${current3DIndex + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between items-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white">{featured3DProject.title}</h3>
                    <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {featured3DProject.description}
                    </p>
                  </div>
                  <Button 
                    className={cn(
                      buttonClasses.secondary,
                      'flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300'
                    )}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Ver Galería</span>
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                {featured3DProject.gallery!.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrent3DIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === current3DIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Ir a la imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pestañas de proyectos */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-xs mx-auto mb-8 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="development" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 transition-colors"
            >
              Desarrollo
            </TabsTrigger>
            <TabsTrigger 
              value="design" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 transition-colors"
            >
              Diseño
            </TabsTrigger>
          </TabsList>

          <TabsContent value="development">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developmentProjects.map((project, index) => (
                <div 
                  key={index}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow dark:border-gray-800 group"
                >
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover ${project.imageClasses || ''} group-hover:scale-105 transition-transform duration-300`}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag, i) => (
                        <Badge 
                          key={i} 
                          className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      {project.projectUrl && (
                        <Link
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonClasses.outline,
                            'flex items-center px-4 py-2 text-sm rounded-md'
                          )}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </Link>
                      )}
                      {project.repoUrl && (
                        <Link
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonClasses.outline,
                            'flex items-center px-4 py-2 text-sm rounded-md'
                          )}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Código
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="design">
            <div className="grid md:grid-cols-2 gap-6">
              {designProjects.map((project, index) => (
                <div 
                  key={index}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow dark:border-gray-800 group"
                >
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.gallery && (
                      <Button
                        onClick={() => openGallery(project.title, project.gallery!)}
                        className={cn(
                          buttonClasses.secondary,
                          'absolute top-2 right-2 rounded-full p-2 h-10 w-10',
                          'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        )}
                        aria-label="Abrir galería"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag, i) => (
                        <Badge 
                          key={i} 
                          className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      {project.projectUrl && (
                        <Link
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonClasses.outline,
                            'flex items-center px-4 py-2 text-sm rounded-md'
                          )}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Ver
                        </Link>
                      )}
                      {project.repoUrl && (
                        <Link
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            buttonClasses.outline,
                            'flex items-center px-4 py-2 text-sm rounded-md'
                          )}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Detalles
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de Galería */}
        {currentGallery && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button 
                onClick={() => setCurrentGallery(null)}
                className={cn(
                  buttonClasses.ghost,
                  'absolute -top-10 right-0 text-white hover:text-white',
                  'p-2 rounded-full'
                )}
                aria-label="Cerrar galería"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <Image
                  src={currentGallery.images[currentGallery.currentIndex]}
                  alt={`${currentGallery.projectTitle} - ${currentGallery.currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <div className="flex justify-between mt-4">
                <Button 
                  className={"bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}
                  onClick={() => setCurrentGallery(prev => ({
                    ...prev!,
                    currentIndex: (prev!.currentIndex - 1 + prev!.images.length) % prev!.images.length
                  }))}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                
                <span className="text-sm text-white self-center">
                  {currentGallery.currentIndex + 1} / {currentGallery.images.length}
                </span>
                
                <Button 
                  className={"bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}
                  onClick={() => setCurrentGallery(prev => ({
                    ...prev!,
                    currentIndex: (prev!.currentIndex + 1) % prev!.images.length
                  }))}
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}