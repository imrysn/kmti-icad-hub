import { describe, expect, it } from 'vitest';
import { ICAD_FOUNDATIONS_LESSONS } from '../../../../views/mentor/mentorConstants';
import { getFoundationsRecap } from '../foundationsRecaps';

const EMBEDDED_RECAP_LESSONS = new Set([
  'lesson-2-1',
  'lesson-3-1',
  'lesson-3-2',
  'lesson-3-3',
  'toolbars',
  'lesson-4-1',
  'lesson-4-2',
  'basic-op-cylinder',
  'basic-op-box',
  'basic-op-polygon',
  'basic-op-cone',
  'basic-op-torus',
]);

describe('iCAD Foundations recap coverage', () => {
  it('gives every Foundations lesson either an embedded or shared fallback recap', () => {
    const lessonIds = ICAD_FOUNDATIONS_LESSONS.flatMap((module) =>
      module.children?.map((lesson) => lesson.id) || [module.id],
    );

    expect(lessonIds).toHaveLength(24);

    const missing = lessonIds.filter(
      (lessonId) => !EMBEDDED_RECAP_LESSONS.has(lessonId) && !getFoundationsRecap(lessonId),
    );

    expect(missing).toEqual([]);
  });

  it('provides complete narration and user-friendly recap cards for every fallback recap', () => {
    const fallbackIds = ICAD_FOUNDATIONS_LESSONS
      .flatMap((module) => module.children?.map((lesson) => lesson.id) || [module.id])
      .filter((lessonId) => !EMBEDDED_RECAP_LESSONS.has(lessonId));

    for (const lessonId of fallbackIds) {
      const recap = getFoundationsRecap(lessonId);
      expect(recap?.narration, lessonId).toMatch(/^Great work\. Remember:/);
      expect(recap?.items.length, lessonId).toBeGreaterThanOrEqual(2);
      expect(recap?.items.every((item) => item.action && item.result), lessonId).toBe(true);
    }
  });
});

