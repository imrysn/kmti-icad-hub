import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const playerFiles = [
  'src/components/3D_Modeling/VideoTutorialModal.tsx',
  'src/components/3D_Modeling/VideoTutorialViewer.tsx',
  'src/components/InteractiveVideoLesson/InteractiveVideoLesson.tsx',
  'src/components/PublicCourses/Foundations/DynamicFoundationsLesson.tsx',
  'src/hooks/useLessonCore.ts',
  'src/hooks/useTTS.ts',
  'src/context/TTSContext.tsx',
  'src/components/ReadAloudButton.tsx',
];

describe('Foundations narration player compliance', () => {
  it.each(playerFiles)('%s uses the shared narration service without profile bypasses', (relativeFile) => {
    const source = fs.readFileSync(path.resolve(process.cwd(), relativeFile), 'utf8');

    expect(source).not.toContain('/api/v1/tts/synthesize');
    expect(source).not.toMatch(/localStorage\.getItem\(['"]tts_voice_uri['"]\)/);
    expect(source).not.toMatch(/\.rate\s*=\s*[^;]*\*/);
  });
});
