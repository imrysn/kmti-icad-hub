import { describe, expect, it } from 'vitest';
import { boxOverlayLayout, boxTutorialSteps } from '../VideoTutorialData/basicOp1TutorialSteps';
import {
  buildAnswerFeedbackNarration,
  buildKnowledgeCheckNarration,
  buildTutorialStepNarration,
} from '../../../utils/quizNarration';

describe('Create Box video timing', () => {
  const overlays = new Map(
    boxTutorialSteps.flatMap((step) => step.overlays ?? []).map((overlay) => [overlay.id, overlay]),
  );

  it('waits for narration before every video segment and does not narrate step titles', () => {
    expect(boxTutorialSteps).not.toHaveLength(0);
    expect(boxTutorialSteps.every((step) => step.waitForNarrationBeforeVideo)).toBe(true);
    expect(boxTutorialSteps.every((step) => step.narrateTitle === false)).toBe(true);
  });

  it('introduces the box and its CAD uses before the source video starts', () => {
    const introduction = boxTutorialSteps[0];

    expect(introduction.videoStart).toBe(0);
    expect(introduction.customText).toContain('three-dimensional solid');
    expect(introduction.customText).toContain('six rectangular faces');
    expect(introduction.customText).toContain('In CAD, boxes are commonly used');
    expect(introduction.customText).toContain('width, depth, and height');
    expect(introduction.customText).not.toContain('zero, zero, zero');
  });

  it('uses source-video segments aligned to the frame-audited action transitions', () => {
    const expectedSegments = [
      ['box-1-shape-placement', 0, 2.233],
      ['box-2-place-box', 2.233, 4.817],
      ['box-3-front-view', 4.817, 8.333],
      ['box-4-command-options', 8.333, 12.5],
      ['box-5-width', 12.5, 16.667],
      ['box-6-depth', 16.667, 20.833],
      ['box-7-height', 20.833, 25],
      ['box-8-origin', 25, 29.883],
      ['box-9-result', 29.883, 33.017],
      ['box-10-explain', 33.017, 37.566],
    ] as const;

    expect(
      boxTutorialSteps
        .filter((step) => step.videoSrc)
        .map(({ id, videoStart, videoEnd }) => [id, videoStart, videoEnd]),
    ).toEqual(expectedSegments);
  });

  it('covers the observed toolbar clicks and command activation frames', () => {
    expect(overlays.get('box-shape-placement')?.startTime).toBeLessThanOrEqual(2.083);
    expect(overlays.get('box-shape-placement')?.endTime).toBeGreaterThanOrEqual(2.083);
    expect(overlays.get('box-place-box')?.startTime).toBeLessThanOrEqual(4.167);
    expect(overlays.get('box-place-box')?.endTime).toBe(4.817);
    expect(overlays.get('box-front-view')?.endTime).toBe(8.333);
    expect(overlays.get('box-opt-y-orient')?.endTime).toBe(12.5);
  });

  it('keeps every timed overlay inside its containing video segment', () => {
    for (const step of boxTutorialSteps) {
      for (const overlay of step.overlays ?? []) {
        expect(overlay.startTime, overlay.id).toBeGreaterThanOrEqual(step.videoStart ?? 0);
        expect(overlay.endTime, overlay.id).toBeLessThanOrEqual(step.videoEnd ?? Infinity);
        expect(overlay.endTime, overlay.id).toBeGreaterThan(overlay.startTime);
      }
    }
  });

  it('uses adjustable, normalized Create Box Item Entry geometry', () => {
    expect(overlays.get('box-item-entry')?.target).toEqual(boxOverlayLayout.itemEntryArea);

    const { x, y, width, height } = boxOverlayLayout.itemEntryArea;
    expect(x).toBeGreaterThanOrEqual(0);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    expect(x + width).toBeLessThanOrEqual(1);
    expect(y + height).toBeLessThanOrEqual(1);
  });

  it('places origin entry after the dimensions knowledge check', () => {
    const originStep = boxTutorialSteps.find((step) => step.id === 'box-8-origin')!;

    expect(originStep.customText).toContain('After the knowledge check');
    expect(originStep.customText).toContain('zero, zero, zero');
    expect(overlays.get('quiz-box-dimensions')?.endTime).toBeLessThanOrEqual(originStep.videoStart!);
  });

  it('narrates all Box quizzes, choices, and feedback without duplicate result words', () => {
    const quizzes = boxTutorialSteps
      .flatMap((step) => step.overlays ?? [])
      .filter((overlay) => overlay.type === 'quiz' && overlay.quizData);

    expect(quizzes).toHaveLength(4);
    for (const quiz of quizzes) {
      const data = quiz.quizData!;
      const questionNarration = buildKnowledgeCheckNarration(
        data.question,
        data.options.map((option) => option.text),
      );
      expect(questionNarration).toContain(data.question);
      expect(questionNarration).toContain('Choose one answer.');
      data.options.forEach((option, index) => {
        expect(questionNarration).toContain(`Choice ${index + 1}: ${option.text}.`);

        const feedbackNarration = buildAnswerFeedbackNarration(option.isCorrect, option.feedback);
        expect(feedbackNarration).not.toMatch(/not quite\.\s*(?:not quite|incorrect)/i);
        if (option.isCorrect) expect(feedbackNarration.match(/correct/gi)).toHaveLength(1);
      });
    }
  });

  it('ends the source video cleanly and follows it with a complete narrated recap', () => {
    const finalVideoStep = boxTutorialSteps.at(-2)!;
    const recap = boxTutorialSteps.at(-1)!;
    const narration = buildTutorialStepNarration(
      recap.customText ?? '',
      recap.quizData,
      recap.recapData,
      recap.narrateTitle === false ? '' : recap.title,
    );

    expect(finalVideoStep.id).toBe('box-10-explain');
    expect(finalVideoStep.advanceOnSourceVideoEnd).toBe(true);
    expect(recap.id).toBe('box-11-recap');
    expect(recap.videoSrc).toBeUndefined();
    expect(narration).toContain('width, depth, and height');
    expect(narration).toContain('zero, zero, zero');
  });
});
