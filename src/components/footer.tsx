import { Github, Linkedin, Mail, Code, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Clases reutilizables para los botones/links
  const socialLinkClass = cn(
    "p-2 rounded-full border border-gray-200 dark:border-gray-700",
    "bg-white/5 hover:bg-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-700/70",
    "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
    "transition-all duration-300 ease-in-out",
    "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
  );

  return (
    <footer className="border-t border-gray-200/20 bg-white dark:bg-gray-900/95 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Información */}
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Daniel Galindo
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Desarrollador Full Stack y diseñador 3D apasionado por crear soluciones innovadoras.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Todos los derechos reservados.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                Proyectos
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#proyectos" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    Desarrollo
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#proyectos" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    Diseño
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#proyectos" 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    3D Destacados
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                Recursos
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="https://github.com/DanielGalindoDev?tab=repositories" 
                    target="_blank"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    Repositorios
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/AboutMe" 
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    CV
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-8" />

        {/* Pie inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Tecnologías */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left">
            Desarrollado con Next.js, TypeScript y Tailwind CSS
          </p>

          {/* Redes sociales */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/DanielGalindoDev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={socialLinkClass}
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/danielgalindoreyes/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={socialLinkClass}
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:mseragonf@gmail.com"
              aria-label="Email"
              className={socialLinkClass}
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}