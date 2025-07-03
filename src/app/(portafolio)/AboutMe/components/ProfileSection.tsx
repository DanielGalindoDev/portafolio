'use client'

import Image from 'next/image'
import { FiGithub, FiLinkedin, FiMail, FiChevronDown, FiChevronUp, FiGlobe, FiServer, FiCpu } from 'react-icons/fi'
import { useState } from 'react'

export default function ProfileSection() {
  const [showFullInfo, setShowFullInfo] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-200/80 dark:border-gray-700/50">
      
      {/* Avatar profesional */}
      <div className="relative group mx-auto md:mx-0">
        <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-md group-hover:blur-lg transition-all duration-500" />
        <Image
          src="/images/Daniel.png"
          alt="Daniel Galindo - Ingeniero en Computación"
          width={160}
          height={160}
          className="relative z-10 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-xl group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-400/20 transition-all duration-300"
          priority
        />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 space-y-4 w-full">
        {/* Encabezado */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300">
            Daniel Galindo
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
            <FiCpu className="text-blue-500 dark:text-blue-400" />
            <span>Desarrollador Frontend | Ingeniería en Computación - UNAM</span>
          </div>
        </div>

        {/* Resumen profesional */}
        <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
          Mi nombre es Daniel Adrian Galindo Reyes, soy estudiante de 9° semestre de Ingeniería en Computación en la Facultad de ingenieria (UNAM). Apasionado por el desarrollo frontend con React y Next.js, con experiencia real en proyectos educativos, documentación técnica, despliegue y mantenimiento de sistemas. Con conocimiento en redes (CCNA) y metodologías ágiles como Scrum.
        </p>

        {/* Información expandible */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFullInfo ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="pt-2 space-y-4 text-gray-600 dark:text-gray-300/90 border-t border-gray-200 dark:border-gray-700/50 mt-2">
            
            {/* Experiencia laboral */}
            <div>
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <FiServer className="text-lg" />
                Experiencia Profesional
              </h3>
              <ul className="mt-2 space-y-3 pl-5">
                <li className="relative before:absolute before:left-[-15px] before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
                  <span className="font-medium">Servicio Social - Instituto de Ingeniería UNAM (2024-Actual)</span>
                  <p className="text-sm">Desarrollo frontend y backend, despliegue en producción, documentación técnica y diseño de base de datos.</p>
                </li>
                <li className="relative before:absolute before:left-[-15px] before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
                  <span className="font-medium">Becario DGAPA - Proyecto PAPIME UNAM (2024)</span>
                  <p className="text-sm">Desarrollo de manuales y proyectos educativos en TI y electrónica.</p>
                </li>
                <li className="relative before:absolute before:left-[-15px] before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
                  <span className="font-medium">Voluntariado PCPuma (2023)</span>
                  <p className="text-sm">Pruebas de red e identificación de problemas en infraestructura universitaria.</p>
                </li>
              </ul>
            </div>

            {/* Educación */}
            <div>
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <FiGlobe className="text-lg" />
                Formación Académica y Certificaciones
              </h3>
              <ul className="mt-2 space-y-2 pl-5">
                <li className="relative before:absolute before:left-[-15px] before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
                  <span className="font-medium">Ingeniería en Computación</span> - UNAM (2018-2025)
                </li>
                <li className="relative before:absolute before:left-[-15px] before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
                  CCNA: Enterprise Networking, Routing & Switching (2025) - Cisco
                </li>
                <li className="relative before:absolute before:left-[-15px] before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
                  Scrum Fundamentals - ScrumStudy
                </li>
                <li className="relative before:absolute before:left-[-15px] before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500">
                  Oracle Next Education (ONE) - 2023
                </li>
              </ul>
            </div>

            {/* Habilidades técnicas */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="font-medium text-sm">Frontend</h4>
                <p className="text-sm">React.js, Next.js, Tailwind CSS, TypeScript, HTML/CSS</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Backend</h4>
                <p className="text-sm">Node.js, Express, SQL, Oracle, MySQL</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">DevOps / Sistemas</h4>
                <p className="text-sm">Linux (Debian, Fedora), Apache, NGINX, Docker</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Redes</h4>
                <p className="text-sm">CCNA, TCP/IP, Routing, VLANs, Seguridad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/DanielGalindoDev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full text-sm font-medium transition-all">
              <FiGithub />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/danielgalindoreyes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-all">
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
            <a href="mailto:mseragonf@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium transition-all">
              <FiMail />
              <span>Contacto</span>
            </a>
          </div>

          <button 
            onClick={() => setShowFullInfo(!showFullInfo)}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full text-sm font-medium transition-all"
          >
            {showFullInfo ? (
              <>
                <FiChevronUp />
                <span>Mostrar menos</span>
              </>
            ) : (
              <>
                <FiChevronDown />
                <span>Ver resumen de CV</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
