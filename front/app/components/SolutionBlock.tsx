'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';

interface SolutionBlockProps {
  title: string;
  description: string;
  slug: string;
  image: string;
  index: number;
}

// Hauteur alignée sur l'image : titre en haut, "En savoir plus" en bas
const contentMinHeight = 'min-h-[12rem] sm:min-h-[16rem] md:min-h-[20rem] lg:min-h-[24rem]';

export default function SolutionBlock({
  title,
  description,
  slug,
  image,
  index,
}: SolutionBlockProps) {
  const { theme } = useTheme();
  const isLeft = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px', amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'} ${isLeft ? 'pl-0' : 'pr-0'}`}
    >
      <Link
        href={`/solutions/${slug}`}
        className={`group flex flex-col sm:flex-row items-stretch sm:items-end gap-6 sm:gap-10 w-full max-w-4xl text-left ${
          isLeft ? '' : 'sm:flex-row-reverse'
        }`}
      >
        {/* Image : taille fixe pour aligner le bouton en bas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-full sm:w-auto"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden bg-emerald-500/10 border border-emerald-500/20">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Colonne contenu : même hauteur min que l'image, bouton poussé en bas */}
        <div
          className={`flex flex-1 flex-col min-w-0 ${contentMinHeight} sm:items-start`}
        >
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-1 text-base sm:text-lg md:text-xl leading-relaxed mb-5 min-h-0 line-clamp-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
            title={description}
          >
            {description}
          </motion.p>
          {/* Bouton toujours en bas (aligné bas de l'image), animation 100% CSS */}
          <span
            className={`mt-auto inline-flex w-fit items-center gap-2.5 rounded-full border-2 border-emerald-500/30 bg-emerald-500/5 px-5 py-2.5 text-sm font-semibold text-emerald-500 shadow-sm ${isLeft ? '' : 'sm:flex-row-reverse'} solution-more-btn ${
              theme === 'dark' ? 'solution-more-btn-dark' : 'solution-more-btn-light'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              En savoir plus
              <svg
                className={`w-4 h-4 solution-more-arrow ${isLeft ? '' : 'sm:rotate-180 solution-more-arrow-reverse'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
