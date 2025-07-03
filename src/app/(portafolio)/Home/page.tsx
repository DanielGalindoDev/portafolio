'use client'

import { useEffect } from 'react'
import { HeroSection } from './components/HeroSection'
import { ServicesSection } from './components/ServicesSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactCTA } from './components/ContactCTA'

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100) // breve delay para asegurar que los componentes estén montados
      }
    }
  }, [])

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactCTA />
    </>
  )
}
