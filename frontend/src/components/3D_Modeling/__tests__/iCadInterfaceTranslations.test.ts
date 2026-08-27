import { describe, expect, it } from 'vitest';
import { en_3d_icad_tutorial } from '../../../config/translations/en/3d/icad_tutorial';
import { ja_3d_icad_tutorial } from '../../../config/translations/ja/3d/icad_tutorial';
import { TUTORIAL_STEPS } from '../VideoTutorialData/iCadInterfaceTutorial';

describe('iCAD interface tutorial translations', () => {
  it.each([
    ['English', en_3d_icad_tutorial],
    ['Japanese', ja_3d_icad_tutorial],
  ])('defines title and text keys for every step in %s', (_language, translations) => {
    for (const step of TUTORIAL_STEPS) {
      expect(translations).toHaveProperty(`tutorial.icad.${step.id}.title`);
      expect(translations).toHaveProperty(`tutorial.icad.${step.id}.text`);
    }
  });
});
