'use client';

import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/Navbar';
import ParticleBackground from '../../components/ParticleBackground';
import GradientOrb from '../../components/GradientOrb';

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ParticleBackground />
      <GradientOrb />
      <Navbar />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1
            className={`text-6xl sm:text-7xl font-bold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            404
          </h1>
          <p
            className={`text-xl mb-8 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Département non trouvé
          </p>
          <Link href="/#solutions">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/20'
              }`}
            >
              Retour aux départements
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
