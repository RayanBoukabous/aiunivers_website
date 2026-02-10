'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';

interface DepartmentCardProps {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  solutions: { slug: string; title: string }[];
  delay?: number;
}

export default function DepartmentCard({
  title,
  description,
  slug,
  coverImage,
  solutions,
  delay = 0,
}: DepartmentCardProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group h-full flex"
    >
      <Link
        href={`/departements/${slug}`}
        className="flex flex-col h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 rounded-2xl"
      >
        <div
          className={`flex flex-col h-full rounded-2xl border transition-all duration-300 overflow-hidden group-hover:-translate-y-0.5 ${
            theme === 'dark'
              ? 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]'
              : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]'
          }`}
        >
          {/* Header: icône + titre + description */}
          <div className="p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-emerald-500/15 ring-1 ring-white/10'
                    : 'bg-emerald-500/10 ring-1 ring-neutral-200/80'
                }`}
              >
                {coverImage ? (
                  <img src={coverImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <svg
                    className={`w-6 h-6 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h3
                  className={`font-semibold text-lg sm:text-xl tracking-tight mb-1.5 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed line-clamp-2 ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Liste des solutions */}
          {solutions.length > 0 && (
            <div
              className={`flex-1 min-h-0 px-6 sm:px-7 pb-4 border-t ${
                theme === 'dark' ? 'border-white/[0.06]' : 'border-neutral-100'
              }`}
            >
              <ul className="space-y-2.5 pt-4">
                {solutions.map((sol) => (
                  <li key={sol.slug} className="flex items-center gap-2.5">
                    <span
                      className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                        theme === 'dark' ? 'bg-emerald-400/80' : 'bg-emerald-500'
                      }`}
                    />
                    <span
                      className={`text-sm truncate ${
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    >
                      {sol.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA discret style Google */}
          <div
            className={`px-6 sm:px-7 py-4 flex items-center gap-2 text-sm font-medium ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            <span>Voir les solutions</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
