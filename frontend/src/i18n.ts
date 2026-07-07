import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import ja from './locales/ja/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: localStorage.getItem('app-language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already handles XSS
    },
  });

export default i18n;
