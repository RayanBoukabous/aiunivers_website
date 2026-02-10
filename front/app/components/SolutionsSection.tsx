'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSolutions } from '../contexts/SolutionsContext';
import SolutionBlock from './SolutionBlock';

export default function SolutionsSection() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { solutions, loading, error, refetch } = useSolutions();

  return (
    <section
      id="solutions"
      className={`relative py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        theme === 'dark' ? 'bg-emerald-950/15' : 'bg-white/60'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.06]'
          }`}
          style={{
            backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.12)'} 1px, transparent 1px),
                              linear-gradient(90deg, ${theme === 'dark' ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.12)'} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28 flex flex-col items-center text-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
              }`}
            >
              {t('home.solutions.badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight px-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {t('nav.solutions')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('home.sectors.description')}
          </motion.p>
        </motion.div>

        <div className="w-full flex justify-center">
          {loading ? (
            <div className={`py-16 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Chargement des solutions...
            </div>
          ) : error ? (
            <div className="py-16 flex flex-col items-center gap-4 text-center">
              <p className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
              <button
                onClick={() => refetch()}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    : 'bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30'
                }`}
              >
                Réessayer
              </button>
            </div>
          ) : solutions.length === 0 ? (
            <div className={`py-16 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Aucune solution disponible.
            </div>
          ) : (
            <div className="w-full space-y-20 sm:space-y-24 md:space-y-28 -ml-4 sm:-ml-6 lg:-ml-8">
              {solutions.map((solution, index) => (
                <SolutionBlock
                  key={solution.slug}
                  title={solution.title}
                  description={solution.description}
                  slug={solution.slug}
                  image={solution.image}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
