import { describe, expect, it } from 'vitest';
import { coneOverlayLayout, coneTutorialSteps } from '../VideoTutorialData/basicOp1TutorialSteps';
import { buildAnswerFeedbackNarration, buildKnowledgeCheckNarration } from '../../../utils/quizNarration';

describe('Create Cone lesson alignment', () => {
  const videoSteps = coneTutorialSteps.filter((step) => step.videoSrc);
  const overlays = new Map(
    videoSteps.flatMap((step) => step.overlays ?? []).map((overlay) => [overlay.id, overlay]),
  );

  it('uses narration-first playback throughout the complete source', () => {
    expect(videoSteps.every((step) => step.waitForNarrationBeforeVideo)).toBe(true);
    expect(coneTutorialSteps.every((step) => step.narrateTitle === false)).toBe(true);
    expect(videoSteps[0].videoStart).toBe(0);
    expect(videoSteps.at(-1)?.videoEnd).toBe(30.866667);
    expect(videoSteps.at(-1)?.advanceOnSourceVideoEnd).toBe(true);
    for (let index = 1; index < videoSteps.length; index += 1) {
      expect(videoSteps[index - 1].videoEnd).toBe(videoSteps[index].videoStart);
    }
  });

  it('follows the established shape-lesson sequence', () => {
    expect(coneTutorialSteps.map((step) => step.id)).toEqual([
      'cone-1-tool-selection',
      'cone-2-front-view',
      'cone-3-command-options',
      'cone-4-dimensions',
      'cone-5-origin',
      'cone-6-result',
      'cone-7-explain',
      'cone-8-recap',
    ]);
  });

  it('highlights every command setting and parameter named by the subtitle', () => {
    expect(overlays.get('cone-shape-arrangement')?.type).toBe('highlight');
    expect(overlays.get('cone-shape-arrangement')?.target).toEqual({
      x: 0.908,
      y: 0.123,
      width: 0.071,
      height: 0.028,
    });
    expect(overlays.get('cone-shape-arrangement')?.startTime).toBe(0.75);
    expect(overlays.get('cone-shape-arrangement')?.endTime).toBe(1.6);
    expect(overlays.get('cone-place-cone')?.startTime).toBe(1.6);
    expect(overlays.get('cone-place-cone')?.target).toEqual({
      x: 0.91,
      y: 0.173,
      width: 0.02,
      height: 0.035,
    });
    ['cone-opt-cone', 'cone-opt-placement', 'cone-opt-y-orientation'].forEach((id) => {
      expect(overlays.get(id)?.type, id).toBe('highlight');
    });
    expect(overlays.has('cone-opt-diameter')).toBe(false);
    ['cone-input-base', 'cone-input-top', 'cone-input-height'].forEach((id) => {
      expect(overlays.get(id)?.type, id).toBe('highlight');
    });
    expect(overlays.has('cone-input-sides')).toBe(false);
    expect(overlays.get('cone-item-entry')?.target).toEqual(coneOverlayLayout.itemEntryArea);
  });

  it('starts highlights before the frame-observed pointer arrives', () => {
    expect(overlays.get('cone-front-view')?.startTime).toBeLessThanOrEqual(3.5);
    expect(overlays.get('cone-opt-cone')?.startTime).toBeLessThanOrEqual(6.5);
    expect(overlays.get('cone-opt-cone')?.startTime).toBeGreaterThan(6.25);
    expect(overlays.get('cone-opt-placement')?.startTime).toBeLessThanOrEqual(7.5);
    expect(overlays.get('cone-opt-y-orientation')?.startTime).toBeGreaterThanOrEqual(9.5);
    expect(overlays.get('cone-opt-y-orientation')?.startTime).toBeLessThanOrEqual(10.0);
    expect(overlays.get('cone-input-base')?.startTime).toBeLessThanOrEqual(12.0);
    expect(overlays.get('cone-input-top')?.startTime).toBeLessThanOrEqual(16.5);
    expect(overlays.get('cone-input-height')?.startTime).toBeLessThanOrEqual(19.5);
  });

  it('places the completed-result segment after coordinate confirmation', () => {
    const result = coneTutorialSteps.find((step) => step.id === 'cone-6-result')!;
    expect(result.videoStart).toBe(24.75);
    expect(result.customText).toContain('cone is now created');
    expect(result.customText).toContain('base diameter');
    expect(result.customText).toContain('top face diameter');
    expect(result.customText).not.toContain('number of sides');
  });

  it('reveals the three size annotations progressively like the other shape lessons', () => {
    expect(overlays.get('cone-dim-base')?.type).toBe('dimensionAnnotation');
    expect(overlays.get('cone-dim-base')?.startTime).toBe(27.25);
    expect(overlays.get('cone-dim-top')?.type).toBe('dimensionAnnotation');
    expect(overlays.get('cone-dim-top')?.startTime).toBe(28.25);
    expect(overlays.get('cone-dim-height')?.type).toBe('dimensionAnnotation');
    expect(overlays.get('cone-dim-height')?.startTime).toBe(29.25);
    expect(overlays.get('cone-dim-base')?.endTime).toBe(30.866667);
    expect(overlays.get('cone-dim-top')?.endTime).toBe(30.866667);
    expect(overlays.get('cone-dim-height')?.endTime).toBe(30.866667);
  });

  it('keeps all overlays inside their containing segments', () => {
    for (const step of videoSteps) {
      for (const overlay of step.overlays ?? []) {
        expect(overlay.startTime, overlay.id).toBeGreaterThanOrEqual(step.videoStart ?? 0);
        expect(overlay.endTime, overlay.id).toBeLessThanOrEqual(step.videoEnd ?? Infinity);
        expect(overlay.endTime, overlay.id).toBeGreaterThan(overlay.startTime);
      }
    }
  });

  it('uses three narrated quizzes with three choices and one correct answer', () => {
    const quizzes = videoSteps
      .flatMap((step) => step.overlays ?? [])
      .filter((overlay) => overlay.type === 'quiz' && overlay.quizData);
    expect(quizzes).toHaveLength(3);

    for (const quiz of quizzes) {
      const data = quiz.quizData!;
      expect(data.options).toHaveLength(3);
      expect(data.options.filter((option) => option.isCorrect)).toHaveLength(1);
      const narration = buildKnowledgeCheckNarration(data.question, data.options.map((option) => option.text));
      expect(narration).toContain(data.question);
      expect(narration).toContain('Choose one answer.');
      data.options.forEach((option) => {
        const feedback = buildAnswerFeedbackNarration(option.isCorrect, option.feedback);
        if (option.isCorrect) expect(feedback.match(/correct/gi)).toHaveLength(1);
      });
    }
  });

  it('ends with one standalone narrated recap', () => {
    const recap = coneTutorialSteps.at(-1)!;
    expect(recap.id).toBe('cone-8-recap');
    expect(recap.videoSrc).toBeUndefined();
    expect(coneTutorialSteps.filter((step) => step.recapData)).toHaveLength(1);
    expect(recap.customText).toContain('zero, zero, zero');
  });
});
