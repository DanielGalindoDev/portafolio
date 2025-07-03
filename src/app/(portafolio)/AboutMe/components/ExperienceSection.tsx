// components/about/sections/ExperienceSection.tsx
import Image from 'next/image';
import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from './experienceData';

export default function ExperienceSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Experiencia
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex gap-4">
              <Image 
                src={exp.image} 
                alt={exp.alt}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{exp.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}