'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from './translations';

type LanguageContextType = {
  language: keyof typeof translations;
  setLanguage: (lang: keyof typeof translations) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<keyof typeof translations>('EN');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}