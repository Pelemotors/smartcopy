'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('he');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'he' || savedLanguage === 'ru')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage and update document attributes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'he' ? 'he' : 'ru';
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    }
  };

  // Update document attributes when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'he' ? 'he' : 'ru';
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'he',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

