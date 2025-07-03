// components/about/AboutPage.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProfileSection from './components/ProfileSection';
import ExperienceSection from './components/ExperienceSection';
import CertificatesSection from './components/CertificatesSection';
import CtaSection from './components/CtaSection';

export default function AboutPage() {
  return (
    <section className="min-h-screen px-4 py-10 md:py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Botón volver */}
        <div>
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver al inicio
          </Link>
        </div>

        <ProfileSection />
        <ExperienceSection />
        <CertificatesSection />
        <CtaSection />
      </div>
    </section>
  );
}