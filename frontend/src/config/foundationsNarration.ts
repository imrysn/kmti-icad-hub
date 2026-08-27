/**
 * Single source of truth for narration used by iCAD Foundations lessons.
 *
 * `rate` is the effective speed sent unchanged to every narration engine.
 */
export const FOUNDATIONS_NARRATION_PROFILE = Object.freeze({
  provider: 'openai' as const,
  voiceURI: 'openai://nova',
  voiceCode: 'nova',
  englishLanguage: 'en-US',
  japaneseLanguage: 'ja-JP',
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
});

export const isFoundationsNarrationVoice = (voiceURI: string): boolean =>
  voiceURI === FOUNDATIONS_NARRATION_PROFILE.voiceURI;
