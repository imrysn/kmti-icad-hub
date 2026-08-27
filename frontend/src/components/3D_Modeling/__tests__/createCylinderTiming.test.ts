import { describe, expect, it } from 'vitest';
import { cylinderOverlayLayout, cylinderTutorialSteps } from '../VideoTutorialData/basicOp1TutorialSteps';
import { buildAnswerFeedbackNarration, buildKnowledgeCheckNarration, buildTutorialStepNarration } from '../../../utils/quizNarration';

describe('Create Cylinder video timing', () => {
  it('waits for every step narration before playing its video segment', () => {
    expect(cylinderTutorialSteps).not.toHaveLength(0);
    expect(cylinderTutorialSteps.every((step) => step.waitForNarrationBeforeVideo)).toBe(true);
  });

  it('does not repeat the visible step title in narration', () => {
    expect(cylinderTutorialSteps.every((step) => step.narrateTitle === false)).toBe(true);
    expect(cylinderTutorialSteps.every((step) => !step.customText?.toLowerCase().startsWith('arrange cylinder'))).toBe(true);
  });

  it('introduces the cylinder and its CAD uses before the first video segment', () => {
    const introduction = cylinderTutorialSteps[0];

    expect(introduction.videoStart).toBe(0);
    expect(introduction.waitForNarrationBeforeVideo).toBe(true);
    expect(introduction.customText).toContain('A cylinder is a three-dimensional solid');
    expect(introduction.customText).toContain('In CAD, cylinders are commonly used');
    expect(introduction.customText).toContain('Use a cylinder whenever');
    expect(introduction.customText).not.toContain('coordinates zero, zero, zero');
    expect(cylinderTutorialSteps[4].customText).toContain('After the knowledge check');
    expect(cylinderTutorialSteps[4].customText).toContain('zero, zero, zero');
  });

  it('uses the requested concise Item Entry subtitle and narration', () => {
    expect(cylinderTutorialSteps[3].customText).toBe(
      'In the Item Entry area, enter the cylinder diameter and height.',
    );
  });

  it('uses the adjustable Create Cylinder Item Entry highlight geometry', () => {
    const itemEntryOverlay = cylinderTutorialSteps
      .flatMap((step) => step.overlays ?? [])
      .find((overlay) => overlay.id === 'item-entry');

    expect(itemEntryOverlay?.target).toEqual(cylinderOverlayLayout.itemEntryArea);
    const { x, y, width, height } = cylinderOverlayLayout.itemEntryArea;
    expect(x).toBeGreaterThanOrEqual(0);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    expect(x + width).toBeLessThanOrEqual(1);
    expect(y + height).toBeLessThanOrEqual(1);
  });

  it('announces Correct exactly once for the cylinder knowledge check', () => {
    const correctFeedback = cylinderTutorialSteps[3].overlays
      ?.find((overlay) => overlay.id === 'quiz-cyl-1')
      ?.quizData?.options.find((option) => option.isCorrect)?.feedback ?? '';
    const narration = buildAnswerFeedbackNarration(true, correctFeedback);

    expect(narration).toBe('Correct! A cylinder requires diameter and height.');
    expect(narration.match(/correct/gi)).toHaveLength(1);
  });

  it('narrates both cylinder knowledge checks and their feedback cleanly', () => {
    const quizzes = cylinderTutorialSteps
      .flatMap((step) => step.overlays ?? [])
      .filter((overlay) => overlay.type === 'quiz' && overlay.quizData);

    expect(quizzes).toHaveLength(2);
    for (const quiz of quizzes) {
      const data = quiz.quizData!;
      const questionNarration = buildKnowledgeCheckNarration(
        data.question,
        data.options.map((option) => option.text),
      );
      expect(questionNarration).toContain(data.question);
      expect(questionNarration).toContain('Choose one answer.');

      for (const option of data.options) {
        const feedbackNarration = buildAnswerFeedbackNarration(option.isCorrect, option.feedback);
        expect(feedbackNarration).not.toMatch(/not quite\.\s*incorrect/i);
        if (option.isCorrect) expect(feedbackNarration.match(/correct/gi)).toHaveLength(1);
      }
    }
  });

  it('ends with a complete narrated recap after the video', () => {
    const finalVideoStep = cylinderTutorialSteps.at(-2)!;
    const recap = cylinderTutorialSteps.at(-1)!;
    const narration = buildTutorialStepNarration(
      recap.customText ?? '',
      recap.quizData,
      recap.recapData,
      recap.narrateTitle === false ? '' : recap.title,
    );

    expect(finalVideoStep.id).toBe('cyl-7-explain');
    expect(finalVideoStep.advanceOnSourceVideoEnd).toBe(true);
    expect(recap.id).toBe('cyl-8-recap');
    expect(recap.videoSrc).toBeUndefined();
    expect(narration).toContain('diameter and height');
    expect(narration).toContain('zero, zero, zero');
  });

  it('keeps each timed overlay inside the video segment that describes it', () => {
    for (const step of cylinderTutorialSteps) {
      for (const overlay of step.overlays ?? []) {
        expect(overlay.startTime, overlay.id).toBeGreaterThanOrEqual(step.videoStart ?? 0);
        expect(overlay.endTime, overlay.id).toBeLessThanOrEqual(step.videoEnd ?? Infinity);
        expect(overlay.endTime, overlay.id).toBeGreaterThan(overlay.startTime);
      }
    }
  });

  it('follows the action order observed in the 32.08-second source video', () => {
    const expectedSegments = [
      ['cyl-1-tool-selection', 0, 3.25],
      ['cyl-2-front-view', 3.25, 8.25],
      ['cyl-3-command-options', 8.25, 13.75],
      ['cyl-4-dimensions', 13.75, 20.83],
      ['cyl-5-origin', 20.83, 23.4],
      ['cyl-6-result', 23.4, 27],
      ['cyl-7-explain', 27, 32.08],
    ] as const;

    expect(
      cylinderTutorialSteps
        .filter((step) => step.videoSrc)
        .map(({ id, videoStart, videoEnd }) => [id, videoStart, videoEnd]),
    ).toEqual(expectedSegments);
  });

  it('does not show command settings or dimension cues before those controls are visible', () => {
    const overlays = new Map(
      cylinderTutorialSteps.flatMap((step) => step.overlays ?? []).map((overlay) => [overlay.id, overlay]),
    );

    expect(overlays.get('opt-cylinder')?.startTime).toBe(8.25);
    expect(overlays.get('item-entry')?.startTime).toBe(13.75);
    expect(overlays.get('input-dia')?.startTime).toBe(14.75);
    expect(overlays.get('input-height')?.startTime).toBe(17.25);
    expect(overlays.get('input-coords')?.startTime).toBe(20.83);
  });
});
