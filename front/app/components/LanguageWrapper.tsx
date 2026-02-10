'use client';

import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    // Mettre à jour la direction du document pour l'arabe
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}
