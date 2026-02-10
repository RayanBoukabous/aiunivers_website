'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, Language } from '../contexts/LanguageContext';

const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none ${
          theme === 'dark'
            ? 'text-white/80 hover:text-white hover:bg-white/5'
            : 'text-black/80 hover:text-black hover:bg-black/5'
        }`}
        aria-label="Select language"
      >
        <div className="flex items-center gap-2">
          <FaGlobe className={`w-4 h-4 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`} />
          <span className="text-sm font-medium hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-2xl overflow-hidden ${
              theme === 'dark'
                ? 'backdrop-blur-2xl bg-black/80 border border-white/10'
                : 'backdrop-blur-2xl bg-white/80 border border-black/10'
            }`}
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {/* Gradient line on top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="relative z-10 p-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    theme === 'dark'
                      ? 'hover:bg-white/5'
                      : 'hover:bg-black/5'
                  } ${
                    language === lang.code
                      ? theme === 'dark'
                        ? 'bg-emerald-500/10 border border-emerald-500/20'
                        : 'bg-emerald-500/10 border border-emerald-500/20'
                      : ''
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold ${
                      language === lang.code
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : theme === 'dark'
                          ? 'bg-white/10 text-gray-400'
                          : 'bg-black/5 text-gray-600'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </span>
                  <span
                    className={`flex-1 text-sm font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  >
                    {lang.name}
                  </span>
                  {language === lang.code && (
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
