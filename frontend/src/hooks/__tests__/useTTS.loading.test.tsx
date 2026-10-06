import { StrictMode, type ReactNode } from 'react';
import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { api } from '../../services/api';
import { useTTS } from '../useTTS';

vi.mock('../../services/api', () => ({ api: { get: vi.fn() } }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function browserSpeech() {
  const speech = Object.assign(new EventTarget(), {
    getVoices: vi.fn(() => [{voiceURI:'browser://en',name:'Browser English',lang:'en-US',localService:true,default:true}]),
    cancel: vi.fn(),
  });
  vi.stubGlobal('speechSynthesis', speech);
  return speech;
}

it('publishes browser voices immediately and shares startup requests without refetching on voice events', async () => {
  const speech=browserSpeech();
  let resolve!: (value: any) => void;
  vi.mocked(api.get).mockReset().mockReturnValue(new Promise(done => {resolve=done;}));
  const {result,unmount}=renderHook(()=>useTTS(),{wrapper:({children}:{children:ReactNode})=><StrictMode>{children}</StrictMode>});
  expect(result.current.voices.some(v=>v.voiceURI==='browser://en')).toBe(true);
  expect(api.get).toHaveBeenCalledTimes(1);
  act(()=>speech.dispatchEvent(new Event('voiceschanged')));
  expect(api.get).toHaveBeenCalledTimes(1);
  await act(async()=>resolve({data:[{id:'openai://nova',name:'Nova',lang:'en-US'}]}));
  act(()=>speech.dispatchEvent(new Event('voiceschanged')));
  expect(result.current.voices.some(v=>v.voiceURI==='openai://nova')).toBe(true);
  expect(api.get).toHaveBeenCalledTimes(1);
  unmount();
  speech.getVoices.mockClear();
  act(()=>speech.dispatchEvent(new Event('voiceschanged')));
  expect(speech.getVoices).not.toHaveBeenCalled();
});

it('keeps browser voices usable when premium voice discovery times out', async () => {
  browserSpeech();
  vi.spyOn(console,'warn').mockImplementation(()=>{});
  let reject!: (reason: Error) => void;
  vi.mocked(api.get).mockReset().mockReturnValue(new Promise((_done,fail)=>{reject=fail;}));
  const {result}=renderHook(()=>useTTS());
  await act(async()=>reject(new Error('timeout')));
  expect(result.current.voices.some(v=>v.voiceURI==='browser://en')).toBe(true);
});
