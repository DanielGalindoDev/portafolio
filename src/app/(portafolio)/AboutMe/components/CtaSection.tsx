'use client'

import { FiDownload} from 'react-icons/fi'
import { useState, useEffect } from 'react'

export default function CVSection() {
  const [fileSize, setFileSize] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Obtener tamaño del archivo
    fetch('/documents/Daniel_Galindo_CV.pdf')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar el PDF')
        return res.blob()
      })
      .then(blob => {
        const sizeInMB = (blob.size / (1024 * 1024)).toFixed(1)
        setFileSize(`${sizeInMB} MB`)
        setIsLoading(false)
      })
      .catch(() => {
        setError(true)
        setIsLoading(false)
      })
  }, [])
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Currículum Vitae
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Desarrollador Full Stack | React Specialist
          </p>
        </div>

        {/* Visor de PDF con estados */}
        <div className="w-full h-[80vh] border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-gray-500 dark:text-gray-400">
                Cargando CV...
              </div>
            </div>
          )}

          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-red-500 mb-4 text-lg">
                Error al cargar el documento
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Por favor intenta descargarlo o verlo en otra pestaña
              </p>
              <a
                href="/documents/Daniel_Galindo_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Abrir CV directamente
              </a>
            </div>
          ) : (
            <iframe
              src={`/documents/Daniel_Galindo_CV.pdf#toolbar=0&navpanes=0&view=FitH`}
              title="Daniel Galindo CV"
              className={`w-full h-full transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => setError(true)}
            />
          )}
        </div>

        {/* Acciones mejoradas */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/documents/Daniel_Galindo_CV.pdf"
            download="Daniel_Galindo_CV.pdf"
            className="flex items-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <FiDownload className="text-lg" />
            <span>Descargar PDF</span>
            {fileSize && (
              <span className="text-xs opacity-80 ml-1">({fileSize})</span>
            )}
          </a>
        </div>

        {/* Información adicional */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>Última actualización: {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</p>
          <p>Formato: PDF - Optimizado para impresión</p>
        </div>
      </div>
    </section>
  )
}