import { GithubIcon, LinkedinIcon, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200/20 bg-black/95 py-8 px-6 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Texto */}
        <div className="text-center md:text-left">
          <p className="mb-1">© {currentYear} Daniel Adrian Galindo Reyes. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-500">Desarrollado con Next.js y TypeScript</p>
        </div>

        {/* Íconos sociales */}
        <div className="flex items-center space-x-6">
          <Link
            href="https://github.com/DanielGalindoDev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            <GithubIcon size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/danielgalindoreyes/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            <LinkedinIcon size={20} />
          </Link>
          <Link
            href="mailto:mseragonf@gmail.com"
            aria-label="Email"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            <Mail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}