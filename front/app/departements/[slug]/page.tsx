'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Navbar from '../../components/Navbar';
import ParticleBackground from '../../components/ParticleBackground';
import GradientOrb from '../../components/GradientOrb';
import Footer from '../../components/Footer';
import SolutionBlock from '../../components/SolutionBlock';
import Breadcrumb from '../../components/Breadcrumb';
import { useDepartementQuery } from '../../lib/queries';
import { mapDepartmentDetail } from '../../lib/utils';

export default function DepartementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const router = useRouter();
  const { data, isLoading, isError } = useDepartementQuery(slug);
  const department = data ? mapDepartmentDetail(data, language) : null;

  useEffect(() => {
    if (isError || (!isLoading && !data)) {
      router.push('/#solutions');
    }
  }, [isError, data, isLoading, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading || !department) {
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
                { label: t('nav.departments'), href: '/#departements' },
                { label: department.title },
              ]}
            />
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight px-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {department.title}
            </motion.h1>
            {department.fullDescription && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {department.fullDescription}
              </motion.p>
            )}
          </motion.div>

          {/* Solutions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2
              className={`text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {t('sectors.solutions')}
            </h2>
            {department.solutions.length === 0 ? (
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Aucune solution dans ce département pour le moment.
              </p>
            ) : (
              <div className="w-full space-y-20 sm:space-y-24 md:space-y-28 -ml-4 sm:-ml-6 lg:-ml-8">
                {department.solutions.map((solution, index) => (
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
          </motion.div>

          {/* Back */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex justify-center"
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
