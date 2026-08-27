import { FOUNDATIONS_NARRATION_PROFILE } from '../config/foundationsNarration';
import { api } from './api';

export interface FoundationsNarrationOptions {
  rate?: number;
  volume?: number;
  muted?: boolean;
  language?: string;
}

const NARRATION_RATE_STANDARD_KEY = 'tts_rate_standard';
const NARRATION_RATE_STANDARD_VERSION = 'foundations-effective-speed-1.0-v1';

const getStoredRate = (): number => {
  if (typeof window === 'undefined') return FOUNDATIONS_NARRATION_PROFILE.rate;
  if (window.localStorage.getItem(NARRATION_RATE_STANDARD_KEY) !== NARRATION_RATE_STANDARD_VERSION) {
    window.localStorage.setItem('tts_rate', String(FOUNDATIONS_NARRATION_PROFILE.rate));
    window.localStorage.setItem(NARRATION_RATE_STANDARD_KEY, NARRATION_RATE_STANDARD_VERSION);
    return FOUNDATIONS_NARRATION_PROFILE.rate;
  }
  const candidate = Number.parseFloat(window.localStorage.getItem('tts_rate') || '');
  return Number.isFinite(candidate) && candidate > 0
    ? candidate
    : FOUNDATIONS_NARRATION_PROFILE.rate;
};

export const getFoundationsNarrationRate = (rate?: number): number =>
  Number.isFinite(rate) && Number(rate) > 0 ? Number(rate) : getStoredRate();

export const saveFoundationsNarrationRate = (rate: number): number => {
  const normalizedRate = getFoundationsNarrationRate(rate);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('tts_rate', String(normalizedRate));
    window.localStorage.setItem(NARRATION_RATE_STANDARD_KEY, NARRATION_RATE_STANDARD_VERSION);
  }
  return normalizedRate;
};

export const normalizeFoundationsNarrationText = (text: string): string =>
  text.trim().replace(/i\s*CAD/ig, 'eye cad');

export const getFoundationsNarrationLanguage = (text: string, language?: string): string => {
  if (language?.trim()) return language.trim();
  return /[\u3040-\u30ff\u3400-\u9fff\u3000-\u303f]/.test(text)
    ? FOUNDATIONS_NARRATION_PROFILE.japaneseLanguage
    : FOUNDATIONS_NARRATION_PROFILE.englishLanguage;
};

export const buildFoundationsNarrationUrl = (
  text: string,
  options: FoundationsNarrationOptions = {},
): string | null => {
  const normalizedText = normalizeFoundationsNarrationText(text);
  if (!normalizedText) return null;

  const params = new URLSearchParams({
    text: normalizedText,
    voice: FOUNDATIONS_NARRATION_PROFILE.voiceURI,
    speed: String(getFoundationsNarrationRate(options.rate)),
  });
  if (options.language) params.set('lang', options.language);

  return `${api.defaults.baseURL || ''}/api/v1/tts/synthesize?${params.toString()}`;
};

export const createFoundationsNarrationAudio = (
  text: string,
  options: FoundationsNarrationOptions = {},
): HTMLAudioElement | null => {
  const url = buildFoundationsNarrationUrl(text, options);
  if (!url || typeof Audio === 'undefined') return null;

  const audio = new Audio(url);
  audio.muted = options.muted === true;
  audio.volume = options.muted
    ? 0
    : Math.min(1, Math.max(0, options.volume ?? FOUNDATIONS_NARRATION_PROFILE.volume));
  return audio;
};

export const createFoundationsBrowserUtterance = (
  text: string,
  options: FoundationsNarrationOptions = {},
): SpeechSynthesisUtterance | null => {
  const normalizedText = normalizeFoundationsNarrationText(text);
  if (!normalizedText || typeof SpeechSynthesisUtterance === 'undefined') return null;

  const utterance = new SpeechSynthesisUtterance(normalizedText);
  utterance.rate = getFoundationsNarrationRate(options.rate);
  utterance.pitch = FOUNDATIONS_NARRATION_PROFILE.pitch;
  utterance.lang = getFoundationsNarrationLanguage(normalizedText, options.language);
  utterance.volume = options.muted
    ? 0
    : Math.min(1, Math.max(0, options.volume ?? FOUNDATIONS_NARRATION_PROFILE.volume));
  return utterance;
};
