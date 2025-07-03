'use client'

import { HeroSection } from './components/HeroSection'
import { ServicesSection } from './components/ServicesSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactCTA } from './components/ContactCTA'
export default function Home() {
  return (
    <>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactCTA />
    </>
  )
}
