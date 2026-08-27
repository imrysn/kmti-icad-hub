import { afterAll,beforeAll,beforeEach,describe,expect,it,vi } from 'vitest';
import {
  buildFoundationsNarrationUrl,
  createFoundationsBrowserUtterance,
  createFoundationsNarrationAudio,
  getFoundationsNarrationRate,
  getFoundationsNarrationLanguage,
  normalizeFoundationsNarrationText,
  saveFoundationsNarrationRate,
} from '../foundationsNarrationService';

describe('Foundations narration service', () => {
  beforeAll(() => {
    vi.stubGlobal('Audio', class {
      src: string;
      muted = false;
      volume = 1;

      constructor(src: string) {
        this.src = src;
      }
    });
    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text: string;
      rate = 1;
      pitch = 1;
      volume = 1;
      lang = '';

      constructor(text: string) {
        this.text = text;
      }
    });
  });

  afterAll(() => vi.unstubAllGlobals());

  beforeEach(() => localStorage.clear());

  it('builds every request with Nova and rejects empty narration', () => {
    const url = buildFoundationsNarrationUrl('  iCAD lesson  ', { rate: 1 });
    expect(url).toContain('voice=openai%3A%2F%2Fnova');
    expect(url).toContain('text=eye+cad+lesson');
    expect(url).toContain('speed=1');
    expect(buildFoundationsNarrationUrl('   ')).toBeNull();
  });

  it('uses the profile rate when stored data is missing or invalid', () => {
    expect(getFoundationsNarrationRate()).toBe(1);
    localStorage.setItem('tts_rate', 'not-a-number');
    expect(getFoundationsNarrationRate()).toBe(1);
  });

  it('migrates the legacy 0.8 default once, then preserves explicit choices', () => {
    localStorage.setItem('tts_rate', '0.8');
    expect(getFoundationsNarrationRate()).toBe(1);
    expect(localStorage.getItem('tts_rate')).toBe('1');

    expect(saveFoundationsNarrationRate(1.2)).toBe(1.2);
    expect(getFoundationsNarrationRate()).toBe(1.2);
  });

  it('applies the shared browser fallback profile', () => {
    const utterance = createFoundationsBrowserUtterance('Narrate this', {
      rate: 1,
      volume: 0.5,
    });
    expect(utterance?.rate).toBe(1);
    expect(utterance?.pitch).toBe(1);
    expect(utterance?.volume).toBe(0.5);
    expect(utterance?.lang).toBe('en-US');
  });

  it('creates configured backend audio through the same request builder', () => {
    const audio = createFoundationsNarrationAudio('Quiz question', {
      rate: 1,
      volume: 0.4,
      muted: false,
    });
    expect(audio?.src).toContain('voice=openai%3A%2F%2Fnova');
    expect(audio?.src).toContain('text=Quiz+question');
    expect(audio?.volume).toBe(0.4);
    expect(audio?.muted).toBe(false);
  });

  it('normalizes the product name consistently', () => {
    expect(normalizeFoundationsNarrationText('i CAD and ICAD')).toBe('eye cad and eye cad');
  });

  it('selects Japanese for Japanese browser fallback text', () => {
    expect(getFoundationsNarrationLanguage('正面図を選択してください。')).toBe('ja-JP');
    expect(getFoundationsNarrationLanguage('Select the front view.')).toBe('en-US');
    expect(createFoundationsBrowserUtterance('正面図を選択してください。')?.lang).toBe('ja-JP');
  });
});
