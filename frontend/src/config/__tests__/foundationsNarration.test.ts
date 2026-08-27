import { describe,expect,it } from 'vitest';
import {
  FOUNDATIONS_NARRATION_PROFILE,
  isFoundationsNarrationVoice,
} from '../foundationsNarration';

describe('iCAD Foundations narration profile', () => {
  it('defines Nova as the only approved narration voice', () => {
    expect(FOUNDATIONS_NARRATION_PROFILE.voiceURI).toBe('openai://nova');
    expect(FOUNDATIONS_NARRATION_PROFILE.voiceCode).toBe('nova');
    expect(isFoundationsNarrationVoice('openai://nova')).toBe(true);
    expect(isFoundationsNarrationVoice('openai://alloy')).toBe(false);
    expect(isFoundationsNarrationVoice('kokoro://jf_teatime')).toBe(false);
  });

  it('defines one set of language and playback defaults', () => {
    expect(FOUNDATIONS_NARRATION_PROFILE.englishLanguage).toBe('en-US');
    expect(FOUNDATIONS_NARRATION_PROFILE.japaneseLanguage).toBe('ja-JP');
    expect(FOUNDATIONS_NARRATION_PROFILE.rate).toBe(1);
    expect(FOUNDATIONS_NARRATION_PROFILE.pitch).toBe(1);
    expect(FOUNDATIONS_NARRATION_PROFILE.volume).toBe(1);
  });
});
