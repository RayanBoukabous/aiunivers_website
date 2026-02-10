'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useSolutions } from '../contexts/SolutionsContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { solutions } = useSolutions();

  return (
    <footer
      className={`relative border-t transition-colors duration-500 ${
        theme === 'dark'
          ? 'border-white/10 bg-emerald-950/30'
          : 'border-neutral-200 bg-neutral-200/85'
      }`}
    >
      {/* Gradient line on top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                <Image
                  src={theme === 'dark' ? '/logo/aiunivers- logo- blanc.png' : '/logo/aiunivers.png'}
                  alt="AIUNIVERS"
                  fill
                  className="object-contain transition-all duration-500 hover:scale-110"
                  priority
                />
              </div>
            </Link>
            <p
              className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {t('footer.description')}
            </p>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/aiunivers"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-400/60'
                  : 'bg-black/5 border border-black/10 hover:bg-black/10 hover:border-emerald-400/60'
              }`}
            >
              <svg
                className="w-5 h-5 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                LinkedIn
              </span>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className={`text-base font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/#solutions', label: t('nav.solutions') },
                { href: '/contact', label: t('nav.contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors duration-300 hover:text-emerald-400 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3
              className={`text-base font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {t('footer.solutions')}
            </h3>
            <ul className="space-y-3">
              {solutions.slice(0, 8).map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className={`text-sm transition-colors duration-300 hover:text-emerald-400 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className={`text-base font-semibold mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@aiunivers.ai"
                  className={`text-sm transition-colors duration-300 hover:text-emerald-400 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  contact@aiunivers.ai
                </a>
              </li>
              <li>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Alger, Algérie
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t transition-colors duration-300 ${
            theme === 'dark' ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p
              className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              © {new Date().getFullYear()} AIUNIVERS. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className={`text-sm transition-colors duration-300 hover:text-emerald-400 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {t('footer.legal')}
              </Link>
              <Link
                href="/contact"
                className={`text-sm transition-colors duration-300 hover:text-emerald-400 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
