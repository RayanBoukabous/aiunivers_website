/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ReactNode } from 'react';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const defaultIcon = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

interface SolutionCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
  slug: string;
  image: string;
}

export default function SolutionCard({
  title,
  description,
  icon = defaultIcon,
  delay = 0,
  slug,
  image,
}: SolutionCardProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: 'easeOut',
      }}
      className="group h-full"
    >
      <Link href={`/solutions/${slug}`}>
        <Card
          className={`relative mx-auto w-full h-full flex flex-col overflow-hidden border transition-all duration-500 cursor-pointer ${
            theme === 'dark'
              ? 'border-white/10 bg-white/[0.02] hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.28)]'
              : 'border-black/5 bg-white hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.22)]'
          }`}
        >
          {/* Image */}
          <div className="relative w-full aspect-video overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/10 to-transparent opacity-70 mix-blend-soft-light dark:from-black/60 dark:via-black/40 dark:to-transparent pointer-events-none" />
            <img
              src={image}
              alt={title}
              className="relative z-20 w-full h-full object-cover brightness-95 transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <CardHeader className="flex-1 flex flex-col relative z-30 px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
            <div
              className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border text-emerald-400 shadow-sm shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${
                theme === 'dark'
                  ? 'border-emerald-500/30 bg-emerald-500/10'
                  : 'border-emerald-500/20 bg-emerald-500/5'
              }`}
            >
              <div className="h-5 w-5 sm:h-6 sm:w-6 text-current">{icon}</div>
            </div>
          </div>

          <CardTitle
            className={`mb-2 sm:mb-3 text-lg sm:text-xl ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {title}
          </CardTitle>
          <CardDescription
            className={`text-sm sm:text-base line-clamp-3 sm:line-clamp-4 ${
              theme === 'dark'
                ? 'text-gray-300/80'
                : 'text-gray-600'
            }`}
          >
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="mt-auto relative z-30 px-4 sm:px-6 pb-4 sm:pb-6">
          <span
            className="w-full inline-flex items-center justify-center h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm rounded-full font-medium transition-colors duration-300 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_30px_rgba(5,150,105,0.4)] group-hover:from-emerald-500 group-hover:to-emerald-400 group-hover:shadow-[0_0_40px_rgba(5,150,105,0.5)]"
          >
            En savoir plus
          </span>
        </CardFooter>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + 0.2,
            ease: 'easeOut',
          }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] origin-center bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
        />
        </Card>
      </Link>
    </motion.div>
  );
}
