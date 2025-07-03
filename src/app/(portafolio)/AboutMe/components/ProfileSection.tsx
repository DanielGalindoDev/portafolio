// components/about/sections/ProfileSection.tsx
import Image from 'next/image';

export default function ProfileSection() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <Image
        src="/images/daniel.jpg"
        alt="Daniel Galindo"
        width={180}
        height={180}
        className="rounded-full border-4 border-blue-600 dark:border-blue-400 shadow-lg"
        priority
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Daniel Galindo</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Desarrollador frontend con experiencia en React, Next.js y diseño de interfaces responsivas. 
          Apasionado por crear soluciones web funcionales y accesibles.
        </p>
      </div>
    </div>
  );
}