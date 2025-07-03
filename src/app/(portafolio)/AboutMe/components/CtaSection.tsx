// components/about/sections/CtaSection.tsx
'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function CtaSection() {
  return (
    <div className="text-center pt-6 space-y-4">
      {/* Versión principal del botón de CV */}
      <Link
        href="/cv"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
      >
        <FileText className="w-5 h-5 mr-2" />
        Descargar CV Completo (PDF)
      </Link>

      {/* Versión alternativa reducida */}
      <div className="pt-2">
        <Link
          href="/cv"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          <FileText className="w-4 h-4 mr-1" />
          Ver versión resumida
        </Link>
      </div>

      {/* Enlace adicional a LinkedIn o portafolio */}
      <div className="pt-4">
        <Link
          href="https://linkedin.com/in/tu-perfil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
        >
          ¿Prefieres ver mi perfil profesional?
          <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}