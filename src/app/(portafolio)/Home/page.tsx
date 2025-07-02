import MainLayout from '@/components/MainLayout';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactCTA } from './components/ContactCTA';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactCTA />
    </MainLayout>
  );
}