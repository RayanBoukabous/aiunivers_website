'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const { theme } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Fil d'Ariane"
      className={`relative flex items-center gap-0 ${className}`}
    >
      {/* Ligne verticale accent à gauche */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full ${
          theme === 'dark' ? 'bg-emerald-500/50' : 'bg-emerald-500/60'
        }`}
      />
      <div className="flex items-center gap-1.5 sm:gap-2 pl-3 text-xs sm:text-sm tracking-wide">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-1.5 sm:gap-2">
              {i > 0 && (
                <span
                  className={`select-none ${
                    theme === 'dark' ? 'text-white/20' : 'text-black/20'
                  }`}
                  aria-hidden
                >
                  ›
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 hover:text-emerald-400 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`font-medium ${
                    isLast
                      ? theme === 'dark'
                        ? 'text-emerald-400'
                        : 'text-emerald-600'
                      : theme === 'dark'
                        ? 'text-gray-400'
                        : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </motion.nav>
  );
}
