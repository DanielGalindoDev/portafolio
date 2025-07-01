import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 py-6 px-4 text-sm text-white/70">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Texto */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} TuNombre. Hecho con 💜 y Next.js.
        </p>

        {/* Íconos sociales */}
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/DanielGalindoDev"
            target="_blank"
            aria-label="GitHub"
            className="hover:text-white transition-colors"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/danielgalindoreyes/"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href="mailto:mseragonf@gmail.com"
            aria-label="Email"
            className="hover:text-white transition-colors"
          >
            <Mail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
