import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../services/api';
import { dictionaries, enTranslations } from '../config/translations';

export type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('kmti_lang');
    return (saved === 'ja' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    localStorage.setItem('kmti_lang', lang);
    axios.defaults.headers.common['Accept-Language'] = lang;
    if (api && api.defaults && api.defaults.headers) {
      api.defaults.headers.common['Accept-Language'] = lang;
    }
  };

  useEffect(() => {
    axios.defaults.headers.common['Accept-Language'] = language;
    if (api && api.defaults && api.defaults.headers) {
      api.defaults.headers.common['Accept-Language'] = language;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('kmti-global-refresh'));
    }
  }, [language]);

  const t = (key: string): string => {
    return dictionaries[language][key] || dictionaries['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => enTranslations[key] || key
    };
  }
  return context;
};
