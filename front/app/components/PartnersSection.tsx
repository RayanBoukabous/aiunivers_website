'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';

const partners = [
  {
    name: 'Ericsson',
    logo: '/partenaire/Ericsson_logo.svg.png',
  },
  {
    name: 'Huawei',
    logo: '/partenaire/Huawei_Standard_logo.svg.png',
  },
];

export default function PartnersSection() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Dupliquer pour un défilement continu
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section
      className={`relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        theme === 'dark' ? 'bg-black/25' : 'bg-neutral-100/70'
      }`}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          theme === 'dark' ? 'opacity-[0.01]' : 'opacity-[0.005]'
        }`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${
            theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
          } 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-4 sm:mb-6"
          >
            <span
              className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
              }`}
            >
              {t('home.partners')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight px-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {t('home.partners')}
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
            {t('home.partners.description')}
          </motion.p>
        </motion.div>

        {/* Partners Marquee */}
        <div className="relative w-full overflow-hidden py-8 sm:py-12">
          {/* Gradient Overlays for fade effect - dégradés doux pour ne pas masquer le contenu */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-6 sm:w-12 md:w-20 lg:w-32 z-10 pointer-events-none ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-black/60 via-black/20 to-transparent'
                : 'bg-gradient-to-r from-white/60 via-white/20 to-transparent'
            }`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-6 sm:w-12 md:w-20 lg:w-32 z-10 pointer-events-none ${
              theme === 'dark'
                ? 'bg-gradient-to-l from-black/60 via-black/20 to-transparent'
                : 'bg-gradient-to-l from-white/60 via-white/20 to-transparent'
            }`}
          />

          {/* Marquee Container */}
          <div className="relative flex">
            <motion.div
              className="flex gap-16 sm:gap-20 md:gap-24 lg:gap-32 items-center"
              animate={{
                x: [0, -1200],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`partner-${index}`}
                  className="flex items-center justify-center flex-shrink-0"
                >
                  <div
                    className={`relative h-12 sm:h-16 md:h-20 lg:h-24 w-auto px-8 sm:px-12 md:px-16 transition-all duration-300 focus:outline-none ${
                      theme === 'dark'
                        ? 'opacity-70 hover:opacity-100 brightness-0 invert'
                        : 'opacity-60 hover:opacity-90'
                    } hover:scale-110`}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
                      style={{
                        imageRendering: 'crisp-edges',
                      }}
                    />
                  </div>
                  {/* Separator */}
                  {index < duplicatedPartners.length - 1 && (
                    <span
                      className={`mx-8 sm:mx-12 text-2xl sm:text-3xl ${
                        theme === 'dark' ? 'text-gray-700' : 'text-gray-300'
                      }`}
                    >
                      •
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
