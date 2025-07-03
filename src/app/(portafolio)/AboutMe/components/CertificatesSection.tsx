// components/about/sections/CertificatesSection.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Award, FileText } from 'lucide-react'
import { CERTIFICATES } from './certificatesData'

export default function CertificatesSection() {
  return (
    <div className="space-y-6">
      {/* Encabezado con icono */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Certificados
      </h3>

      {/* Grid de certificados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTIFICATES.map((cert) => (
          <div 
            key={cert.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            {/* Imagen del certificado con efecto hover */}
            <Image
              src={cert.image}
              alt={cert.alt}
              width={400}
              height={300}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              quality={85}
            />
            
            {/* Overlay con título */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-medium text-sm md:text-base">
                {cert.title}
              </span>
            </div>

            {/* Badge de verificación (opcional) */}
            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Enlace a credenciales externas */}
      <Link 
        href="https://www.credly.com/users/daniel-adrian-galindo-reyes"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline transition-colors"
      >
        <FileText className="w-4 h-4 mr-1" />
        Ver todas mis credenciales verificadas →
      </Link>
    </div>
  )
}