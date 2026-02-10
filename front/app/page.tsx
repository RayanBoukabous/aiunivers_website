'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import { useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import GradientOrb from './components/GradientOrb';
import TypewriterText from './components/TypewriterText';
import DepartmentsSection from './components/DepartmentsSection';
import SolutionsSection from './components/SolutionsSection';
import TechMarquee from './components/TechMarquee';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';

export default function Home() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <GradientOrb />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content - Hero (style Apple/Google: fond très léger) */}
      <main
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 ${
          theme === 'dark' ? 'bg-emerald-950/10' : 'bg-white/70'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center text-center space-y-8 sm:space-y-10 md:space-y-12">
            {/* Title with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Titre : bloc fixe pour éviter tout décalage au passage titre → sous-titre */}
              <h1 className="relative px-1 sm:px-2 w-full max-w-full overflow-hidden min-h-[1.2em]">
                {!titleComplete ? (
                  <TypewriterText
                    text="AIUNIVERS"
                    speed={55}
                    delay={280}
                    className="font-extrabold tracking-[-0.02em] sm:tracking-[-0.03em] md:tracking-[-0.04em] block leading-[0.9] sm:leading-[0.95] text-[clamp(1.75rem,9vw,8rem)]"
                    useGradient={true}
                    onComplete={() => {
                      setTitleComplete(true);
                      setTimeout(() => setShowSubtitle(true), 180);
                    }}
                  />
                ) : (
                  <span
                    className={`font-extrabold tracking-[-0.02em] sm:tracking-[-0.03em] md:tracking-[-0.04em] block leading-[0.9] sm:leading-[0.95] text-[clamp(1.75rem,9vw,8rem)] ${
                      theme === 'dark'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-700'
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800'
                    }`}
                  >
                    AIUNIVERS
                    {/* Garde l’espace du curseur pour ne pas décaler */}
                    <span className="inline-block w-[2px] sm:w-[3px] h-0 ml-0.5 overflow-hidden opacity-0 select-none pointer-events-none" aria-hidden />
                  </span>
                )}
              </h1>

              {/* Zone sous-titre : hauteur réservée pour éviter reflow quand le sous-titre apparaît */}
              <div className="min-h-[3.5rem] sm:min-h-[4rem] flex flex-col items-center justify-center mt-6 sm:mt-8">
                <AnimatePresence>
                  {showSubtitle && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto px-4 text-center w-full transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white/70' : 'text-black/70'
                      }`}
                    >
                      <TypewriterText
                        text="L'avenir de l'intelligence artificielle commence ici"
                        speed={26}
                        delay={120}
                      />
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CTA Button - Same design as scroll indicator */}
            <motion.a
              href="#solutions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 sm:mt-8 flex flex-col items-center gap-2 cursor-pointer group"
            >
              <motion.svg
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'text-white/60 group-hover:text-white/80'
                    : 'text-black/60 group-hover:text-black/80'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'text-white/50 group-hover:text-white/70'
                    : 'text-black/50 group-hover:text-black/70'
                }`}
              >
                {t('home.discover')}
              </span>
            </motion.a>
          </div>

          {/* Tech Marquee - Au milieu vertical entre Découvrir et Scroll Indicator */}
          <div className="absolute left-0 right-0 bottom-12 sm:bottom-16 md:bottom-20">
            <TechMarquee />
        </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-5 h-8 sm:w-6 sm:h-10 border-2 rounded-full p-1.5 sm:p-2 flex justify-center transition-colors duration-300 ${
                  theme === 'dark' ? 'border-white/30' : 'border-black/30'
                }`}
              >
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
                    theme === 'dark' ? 'bg-white/60' : 'bg-black/60'
                  }`}
                />
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white/50' : 'text-black/50'
                }`}
              >
                {t('home.scroll')}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Grid Background */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.015]'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px),
              linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </main>

      {/* Nos départements (cards) */}
      <DepartmentsSection />

      {/* Nos solutions (cards) */}
      <SolutionsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
