'use client'

import Image from 'next/image'
import { FiDownload, FiBook, FiAward } from 'react-icons/fi'

export default function BecarioDGAPASection() {
  const manuales = [
    {
      id: 1,
      titulo: "Manual de instalación de Ubuntu",
      año: "2023",
      descripcion: "Guía paso a paso para instalar y configurar Ubuntu como sistema base.",
      archivo: "/manuales/Ubuntu.pdf",
      portada: "/manuales/Ubuntu.png"
    },
    {
      id: 2,
      titulo: "Manual de instalación de Apache",
      año: "2023",
      descripcion: "Configuración de servidor web Apache en entornos Linux.",
      archivo: "/manuales/Apache_compressed.pdf",
      portada: "/manuales/Apache_compressed.png"
    },
    {
      id: 3,
      titulo: "Manual de NextCloud",
      año: "2024",
      descripcion: "Instrucciones detalladas para desplegar una nube privada con NextCloud.",
      archivo: "/manuales/NextCloud.pdf",
      portada: "/manuales/NextCloud.png"
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800/50 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FiAward className="text-2xl text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Experiencia como Becario DGAPA
          </h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-10 leading-relaxed text-base">
          Como parte del proyecto PAPIME del programa de becas DGAPA-UNAM, desarrollé tres manuales técnicos
          que documentan procesos de instalación y administración de software libre en sistemas Linux. 
          Estos documentos sirvieron como apoyo en actividades académicas y administrativas.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {manuales.map(manual => (
            <div 
              key={manual.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 overflow-hidden"
            >
              {/* Imagen de portada */}
              <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                <Image
                  src={manual.portada}
                  alt={`Portada ${manual.titulo}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <FiBook className="text-blue-500 dark:text-blue-400 text-xl" />
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {manual.titulo}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Año: {manual.año}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {manual.descripcion}
                </p>
                <a
                  href={manual.archivo}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded text-sm font-medium transition"
                >
                  <FiDownload />
                  Descargar manual
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Material desarrollado como parte del programa PAPIME – DGAPA – UNAM.</p>
        </div>
      </div>
    </section>
  )
}
