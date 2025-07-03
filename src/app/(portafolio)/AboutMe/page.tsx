// components/about/AboutPage.tsx
'use client';

import ProfileSection from './components/ProfileSection';
import ExperienceSection from './components/ExperienceSection';
import CertificatesSection from './components/CertificatesSection';
import CtaSection from './components/CtaSection';

export default function AboutPage() {
  return (
    <section className="min-h-screen px-4 py-10 md:py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto space-y-12">
        <ProfileSection />
        <ExperienceSection />
        <CertificatesSection />
        <CtaSection />
      </div>
    </section>
  );
}