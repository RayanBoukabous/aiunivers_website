'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Navbar from '../../components/Navbar';
import ParticleBackground from '../../components/ParticleBackground';
import GradientOrb from '../../components/GradientOrb';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { useSolutionQuery } from '../../lib/queries';
import { mapSolutionDetail } from '../../lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const router = useRouter();
  const { data: solData, isLoading: solLoading } = useSolutionQuery(slug);
  const solution = solData ? mapSolutionDetail(solData, language) : null;
  const galleryImages = solution?.media?.filter((m) => m.type === 'image') ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!solLoading && !solData) {
      router.push('/');
    }
  }, [solData, solLoading, router]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  if (solLoading || !solution) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <ParticleBackground />
        <GradientOrb />
        <Navbar />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Chargement...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ParticleBackground />
      <GradientOrb />
      <Navbar />

      <main className="relative z-10 min-h-screen py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Breadcrumb — aligné à gauche, design fil d'Ariane */}
          <div className="mb-8 sm:mb-10 -ml-4 sm:-ml-6 lg:-ml-8 pl-4 sm:pl-6 lg:pl-8">
            <Breadcrumb
              items={[
                { label: t('nav.home'), href: '/' },
                { label: t('nav.solutions'), href: '/#solutions' },
                { label: solution.title },
              ]}
            />
          </div>

          {/* Hero: image de couverture à gauche, titre + description à droite */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-14 lg:mb-20 items-start"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border shadow-xl border-white/10 dark:border-white/10">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
            <div className="lg:col-span-3 flex flex-col justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                {solution.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`text-base sm:text-lg md:text-xl leading-relaxed transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {solution.fullDescription}
              </motion.p>
            </div>
          </motion.div>

          {/* Avantages, Fonctionnalités, Cas d'usage — 3 colonnes, style unifié */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-12 sm:mb-16"
          >
            {/* Avantages Clés */}
            {solution.advantages && solution.advantages.length > 0 && (
              <div className="flex flex-col">
                <h3 className={`text-base font-semibold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  Avantages Clés
                </h3>
                <p className={`text-xs mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Les bénéfices principaux de cette solution
                </p>
                <ul className="space-y-2.5 flex-1">
                  {solution.advantages.map((advantage, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-2.5 text-sm sm:text-base transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fonctionnalités Principales */}
            {solution.features && solution.features.length > 0 && (
              <div className="flex flex-col">
                <h3 className={`text-base font-semibold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {t('solutions.features')}
                </h3>
                <p className={`text-xs mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {t('solutions.features.description')}
                </p>
                <ul className="space-y-2.5 flex-1">
                  {solution.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-2.5 text-sm sm:text-base transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cas d'Usage */}
            {solution.useCases && solution.useCases.length > 0 && (
              <div className="flex flex-col">
                <h3 className={`text-base font-semibold uppercase tracking-wider mb-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {t('solutions.usecases')}
                </h3>
                <p className={`text-xs mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {t('solutions.usecases.description')}
                </p>
                <ul className="space-y-2.5 flex-1">
                  {solution.useCases.map((useCase, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-2.5 text-sm sm:text-base transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Vidéo démo — avant la galerie */}
          {solution.media?.filter((m) => m.type === 'video').length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12 sm:mb-16"
            >
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 px-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                {t('solutions.demos')}
              </h2>
              <div className="space-y-6 sm:space-y-8">
                {solution.media
                  .filter((item) => item.type === 'video')
                  .slice(0, 1)
                  .map((item, index) => (
                    <motion.div
                      key={`vid-main-${index}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 shadow-xl"
                    >
                      <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/20">
                        <video src={item.url} controls className="w-full h-full object-cover" poster={undefined}>
                          Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                      </div>
                    </motion.div>
                  ))}
                {solution.media.filter((item) => item.type === 'video').length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {solution.media
                      .filter((item) => item.type === 'video')
                      .slice(1)
                      .map((item, index) => (
                        <motion.div
                          key={`vid-${index}`}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                          className="relative rounded-xl overflow-hidden border border-white/10 dark:border-white/10"
                        >
                          <div className="relative w-full aspect-video bg-black/10 rounded-xl overflow-hidden">
                            <video src={item.url} controls className="w-full h-full object-cover" poster={undefined}>
                              Votre navigateur ne supporte pas la lecture de vidéos.
                            </video>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Galerie Quick Preview — images cliquables pour agrandir, scroll dans la lightbox */}
          {galleryImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12 sm:mb-16"
            >
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 px-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                {t('solutions.preview')}
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory">
                {galleryImages.map((item, index) => (
                  <motion.button
                    type="button"
                    key={`img-${index}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                    onClick={() => setLightboxIndex(index)}
                    className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 aspect-video rounded-xl overflow-hidden border border-white/10 dark:border-white/10 shadow-lg hover:ring-2 hover:ring-emerald-500/50 hover:scale-[1.02] transition-all duration-200 snap-start focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <img src={item.url} alt={item.title || solution.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10 text-left">
                      <p className="text-sm font-medium text-white drop-shadow-md">
                        {item.title || `${t('solutions.preview')} ${index + 1}`}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2 rounded-full bg-black/40 p-1.5 pointer-events-none">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>
              <p className={`mt-3 text-sm px-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                Cliquez sur une image pour l’agrandir · Faites défiler pour voir les autres
              </p>
            </motion.div>
          )}

          {/* Lightbox — agrandissement + scroll entre les images */}
          <AnimatePresence>
            {lightboxIndex !== null && galleryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                onClick={() => setLightboxIndex(null)}
              >
                <button
                  type="button"
                  aria-label="Fermer"
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  onClick={() => setLightboxIndex(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Image précédente"
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((i) => (i === null ? 0 : (i - 1 + galleryImages.length) % galleryImages.length));
                      }}
                    >
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Image suivante"
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryImages.length));
                      }}
                    >
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                <div
                  className="relative max-w-[95vw] max-h-[85vh] w-full flex items-center justify-center px-12 sm:px-16"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.img
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    src={galleryImages[lightboxIndex]?.url}
                    alt={galleryImages[lightboxIndex]?.title || solution?.title || ''}
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  />
                </div>

                {galleryImages.length > 1 && (
                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                    {lightboxIndex + 1} / {galleryImages.length}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-center mb-12"
          >
            <Card
              className={`${
                theme === 'dark'
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-emerald-500/20 bg-emerald-500/5'
              }`}
            >
              <CardHeader>
                <CardTitle className={theme === 'dark' ? 'text-white' : 'text-black'}>
                  Intéressé par cette solution ?
                </CardTitle>
                <CardDescription>
                  Contactez-nous pour discuter de vos besoins spécifiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <button
                    className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:from-emerald-500 hover:to-emerald-400'
                        : 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:from-emerald-500 hover:to-emerald-400'
                    }`}
                  >
                    Demander un devis
                  </button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="flex justify-center"
          >
            <Link href="/#solutions">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-emerald-400/60'
                    : 'bg-black/5 border border-black/10 text-black hover:bg-black/10 hover:border-emerald-400/60'
                }`}
              >
                {t('solutions.back')}
              </button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
