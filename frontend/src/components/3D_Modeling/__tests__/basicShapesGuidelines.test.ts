import { describe, expect, it } from 'vitest';
import {
  boxTutorialSteps,
  coneTutorialSteps,
  cylinderTutorialSteps,
  polygonTutorialSteps,
  torusTutorialSteps,
} from '../VideoTutorialData/basicOp1TutorialSteps';
import { buildTutorialStepNarration } from '../../../utils/quizNarration';

const lessons = [
  { name: 'Cylinder', steps: cylinderTutorialSteps, duration: 32.08 },
  { name: 'Box', steps: boxTutorialSteps, duration: 37.566 },
  { name: 'Polygon', steps: polygonTutorialSteps, duration: 33.4 },
  { name: 'Cone', steps: coneTutorialSteps, duration: 30.866667 },
  { name: 'Torus', steps: torusTutorialSteps, duration: 33.616667 },
] as const;

describe('Basic Shapes iCAD lesson guideline compliance', () => {
  it.each(lessons)('$name uses narration-first playback with non-empty narration', ({ steps }) => {
    for (const step of steps) {
      expect(step.waitForNarrationBeforeVideo, String(step.id)).toBe(true);
      expect(step.narrateTitle, String(step.id)).toBe(false);
      expect(buildTutorialStepNarration(
        step.customText ?? step.text,
        step.quizData,
        step.recapData,
        '',
      ).trim(), String(step.id)).not.toBe('');
      expect(`${step.customText ?? ''}${step.text ?? ''}`, String(step.id)).not.toMatch(/tutorial\.[\w.-]+/);
    }
  });

  it.each(lessons)('$name keeps every cue inside its segment and source duration', ({ steps, duration }) => {
    for (const step of steps.filter((candidate) => candidate.videoSrc)) {
      expect(step.videoStart, String(step.id)).toBeGreaterThanOrEqual(0);
      expect(step.videoEnd, String(step.id)).toBeLessThanOrEqual(duration);
      expect(step.videoEnd, String(step.id)).toBeGreaterThan(step.videoStart ?? -1);
      for (const overlay of step.overlays ?? []) {
        expect(overlay.startTime, overlay.id).toBeGreaterThanOrEqual(step.videoStart ?? 0);
        expect(overlay.endTime, overlay.id).toBeLessThanOrEqual(step.videoEnd ?? duration);
        expect(overlay.endTime, overlay.id).toBeGreaterThan(overlay.startTime);
      }
    }
  });

  it.each(lessons)('$name gives every interactive highlight a pulse and label', ({ steps }) => {
    const highlights = steps.flatMap((step) => step.overlays ?? []).filter((overlay) => overlay.type === 'highlight');
    expect(highlights.length).toBeGreaterThan(0);
    for (const highlight of highlights) {
      expect(highlight.animation, highlight.id).toBe('pulse');
      expect(highlight.label?.trim(), highlight.id).not.toBe('');
      expect(highlight.target, highlight.id).toBeDefined();
      if (highlight.target) {
        expect(highlight.target.x, highlight.id).toBeGreaterThanOrEqual(0);
        expect(highlight.target.y, highlight.id).toBeGreaterThanOrEqual(0);
        expect(highlight.target.x + highlight.target.width, highlight.id).toBeLessThanOrEqual(1);
        expect(highlight.target.y + highlight.target.height, highlight.id).toBeLessThanOrEqual(1);
      }
    }
  });

  it.each(lessons)('$name includes dimension annotations and compliant knowledge checks', ({ steps }) => {
    const overlays = steps.flatMap((step) => step.overlays ?? []);
    const dimensions = overlays.filter((overlay) => overlay.type === 'dimensionAnnotation');
    const quizzes = overlays.filter((overlay) => overlay.type === 'quiz' && overlay.quizData);
    expect(dimensions.length).toBeGreaterThanOrEqual(2);
    expect(quizzes.length).toBeGreaterThanOrEqual(2);
    for (const quiz of quizzes) {
      expect(quiz.quizData?.question.trim(), quiz.id).not.toBe('');
      expect(quiz.quizData?.options, quiz.id).toHaveLength(3);
      expect(quiz.quizData?.options.filter((option) => option.isCorrect), quiz.id).toHaveLength(1);
      for (const option of quiz.quizData?.options ?? []) {
        expect(option.feedback.trim(), `${quiz.id}: ${option.text}`).not.toBe('');
      }
    }
  });

  it.each(lessons)('$name ends with exactly one standalone lesson-specific narrated recap', ({ name, steps }) => {
    const recaps = steps.filter((step) => step.recapData);
    expect(recaps).toHaveLength(1);
    expect(steps.at(-1)).toBe(recaps[0]);
    expect(recaps[0].videoSrc).toBeUndefined();
    expect(recaps[0].recapData?.title).toContain(name);
    expect(recaps[0].recapData?.items.length).toBeGreaterThanOrEqual(3);
    expect(recaps[0].customText?.trim()).not.toBe('');
  });
});
