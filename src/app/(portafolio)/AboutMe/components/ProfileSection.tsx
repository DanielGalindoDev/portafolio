'use client'

import Image from 'next/image'

export default function ProfileSection() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <Image
        src="/images/Daniel.png"
        alt="Daniel Galindo"
        width={160}
        height={160}
        className="rounded-full border-4 border-blue-600 dark:border-blue-400 shadow-lg"
        priority
      />
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Daniel Galindo</h2>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          Desarrollador frontend con enfoque en React y Next.js. Me gusta crear interfaces limpias, funcionales y adaptadas a distintos dispositivos.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-3">
          Estudiante de Ingeniería en Computación (UNAM), con experiencia en proyectos reales, control de versiones y despliegue. También manejo backend básico, servidores Linux y redes (CCNA).
        </p>
      </div>
    </div>
  )
}
