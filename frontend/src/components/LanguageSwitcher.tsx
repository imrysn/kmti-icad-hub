import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTTSContext } from '../context/TTSContext';

/**
 * LanguageSwitcher.tsx
 *
 * Compact EN | JP toggle button for the app header.
 * - Switches the UI language via i18next
 * - Persists the preference to localStorage('app-language')
 * - Automatically selects a matching TTS voice when switching to Japanese
 */
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { voices, setSelectedVoiceURI } = useTTSContext();

  const isJapanese = i18n.language === 'ja';

  const toggle = useCallback(() => {
    const nextLang = isJapanese ? 'en' : 'ja';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('app-language', nextLang);

    // Auto-sync TTS voice when switching language
    if (nextLang === 'ja') {
      const jaVoice = voices.find(v => v.lang.toLowerCase().startsWith('ja'));
      if (jaVoice) {
        setSelectedVoiceURI(jaVoice.voiceURI);
      }
    } else {
      const enVoice =
        voices.find(v => v.voiceURI === 'kokoro://af_sarah') ||
        voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
        voices.find(v => v.lang.startsWith('en'));
      if (enVoice) {
        setSelectedVoiceURI(enVoice.voiceURI);
      }
    }
  }, [i18n, isJapanese, voices, setSelectedVoiceURI]);

  return (
    <button
      className="theme-toggle-btn language-switcher-btn"
      onClick={toggle}
      title={isJapanese ? 'Switch to English' : '日本語に切り替え'}
      aria-label={isJapanese ? 'Switch to English' : 'Switch to Japanese'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        background: 'transparent',
        border: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        lineHeight: 1,
      }}
    >
      <span
        style={{
          color: isJapanese ? 'var(--text-muted)' : 'var(--primary)',
          fontWeight: isJapanese ? 500 : 700,
          transition: 'color 0.2s',
        }}
      >
        EN
      </span>
      <span style={{ color: 'var(--border-color)', margin: '0 2px' }}>|</span>
      <span
        style={{
          color: isJapanese ? 'var(--primary)' : 'var(--text-muted)',
          fontWeight: isJapanese ? 700 : 500,
          transition: 'color 0.2s',
        }}
      >
        JP
      </span>
    </button>
  );
};

export default LanguageSwitcher;
