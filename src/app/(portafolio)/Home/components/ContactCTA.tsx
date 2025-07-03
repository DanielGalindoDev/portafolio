'use client'

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { ContactParticles } from "@/app/(portafolio)/Contact/componets/ContactParticles"
import { ContactHeader } from "@/app/(portafolio)/Contact/componets/ContactHeader"
import { ContactButtons } from "@/app/(portafolio)/Contact/componets/ContactButtons"
import { ContactForm } from "@/app/(portafolio)/Contact/componets/ContactForm"
import { COLORS } from "@/app/(portafolio)/Contact/componets/constants"
import { cn } from "@/lib/utils"

export const ContactCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Efecto para manejar el montaje del componente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determina el tema actual considerando el sistema
  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light'
  const currentColors = COLORS[currentTheme === 'dark' ? 'dark' : 'light']

  // Evita renderizar hasta que el componente esté montado
  if (!mounted) {
    return null
    // O puedes devolver un loader:
    // return <div className="h-[400px] w-full"></div>
  }

  return (
    <section 
      id="contacto" 
      className={cn(
        "py-20 relative overflow-hidden transition-colors duration-300",
        `bg-gradient-to-br ${currentColors.primary}`
      )}
    >
      <ContactParticles />
      
      <div className="container px-6 mx-auto text-center relative z-10">
        {!isFormOpen ? (
          <>
            <ContactHeader currentColors={currentColors} />
            <ContactButtons 
              currentColors={currentColors} 
              onOpenForm={() => setIsFormOpen(true)} 
            />
          </>
        ) : (
          <ContactForm 
            onCancel={() => setIsFormOpen(false)}
            currentColors={currentColors}
          />
        )}
      </div>
    </section>
  )
}