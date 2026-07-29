import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../services/api';
import { dictionaries, enTranslations, jaTranslations } from '../config/translations';

export type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateContent: (content: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const englishContentToKey = new Map(
  Object.entries(enTranslations).map(([key, value]) => [value, key])
);
const japaneseContentToKey = new Map(
  Object.entries(jaTranslations).map(([key, value]) => [value, key])
);
const twoDimensionalTranslationEntries = Object.entries(enTranslations)
  .filter(([key]) => key.startsWith('2d.'))
  .map(([key, english]) => ({
    english,
    japanese: jaTranslations[key]
  }))
  .filter((entry): entry is { english: string; japanese: string } => Boolean(entry.japanese));

const normalizeContent = (value: string) => value
  .trim()
  .replace(/^[0-9]+\.\s*/, '')
  .replace(/[.:：]$/, '')
  .trim()
  .toLocaleLowerCase();

// A few legacy 2D lessons split an instruction across nested HTML elements or
// contain a prefixed symbol with damaged source encoding.  Translate their
// visible phrase directly without changing the technical illustration itself.
const legacyTwoDimensionalPhraseTranslations: Record<string, string> = {
  'Compared to grooving of flat surfaces, radius 2 cannot achieve on actual. But the surface should be smooth finish ': '平面部の油溝と比べ、実際の加工で R2 を実現することはできません。ただし、表面は滑らかに仕上げる必要があります。',
  'Sample Drawing': '参考図',
  'Tolerance for Collar': 'カラーの公差',
  'There are four (4) steps to show the detail on the template': 'テンプレートに詳細を表示する手順は 4 つあります。',
  'Choose required template (Relief process detail)': '必要なテンプレート（逃げ加工詳細）を選択します。',
  'Click OK': 'OK をクリックします。',
  'Designated location of relief process detail is on the global view of the drawing.': '逃げ加工詳細の指定位置は、図面の全体ビュー上です。'
};

const translateTwoDimensionalContentVariant = (value: string): string | undefined => {
  const normalizedValue = normalizeContent(value);
  if (!normalizedValue) return undefined;

  for (const entry of twoDimensionalTranslationEntries) {
    const englishParts = entry.english.split(/(?<=[.!?:])\s+/);
    const japaneseParts = entry.japanese.split(/(?<=[。！？])\s*/).filter(Boolean);

    for (let index = 0; index < englishParts.length; index += 1) {
      if (normalizeContent(englishParts[index]) === normalizedValue) {
        return japaneseParts[index] || entry.japanese;
      }
    }
  }

  return undefined;
};

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

  const translateContent = (content: string): string => {
    const match = content.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match || !match[2]) return content;

    const [, leadingWhitespace, value, trailingWhitespace] = match;
    if (language === 'ja') {
      const legacyTranslation = Object.entries(legacyTwoDimensionalPhraseTranslations)
        .reduce((result, [english, japanese]) => result.replaceAll(english, japanese), value);
      if (legacyTranslation !== value) {
        return `${leadingWhitespace}${legacyTranslation}${trailingWhitespace}`;
      }
    }
    const key = language === 'ja'
      ? englishContentToKey.get(value)
      : japaneseContentToKey.get(value);
    const translatedValue = key
      ? dictionaries[language][key]
      : language === 'ja'
        ? translateTwoDimensionalContentVariant(value)
        : undefined;

    return translatedValue
      ? `${leadingWhitespace}${translatedValue}${trailingWhitespace}`
      : content;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateContent }}>
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
      t: (key: string) => enTranslations[key] || key,
      translateContent: (content: string) => content
    };
  }
  return context;
};
