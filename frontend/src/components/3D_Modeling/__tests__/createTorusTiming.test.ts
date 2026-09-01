import { describe, expect, it } from 'vitest';
import { torusTutorialSteps } from '../VideoTutorialData/basicOp1TutorialSteps';
import { buildAnswerFeedbackNarration, buildKnowledgeCheckNarration } from '../../../utils/quizNarration';

describe('Create Torus lesson alignment', () => {
  const videoSteps = torusTutorialSteps.filter((step) => step.videoSrc);
  const overlays = new Map(
    videoSteps.flatMap((step) => step.overlays ?? []).map((overlay) => [overlay.id, overlay]),
  );

  it('uses narration-first playback across the complete source video', () => {
    expect(videoSteps.every((step) => step.waitForNarrationBeforeVideo)).toBe(true);
    expect(torusTutorialSteps.every((step) => step.narrateTitle === false)).toBe(true);
    expect(videoSteps[0].videoStart).toBe(0);
    expect(videoSteps.at(-1)?.videoEnd).toBe(33.616667);
    expect(videoSteps.at(-1)?.advanceOnSourceVideoEnd).toBe(true);
    for (let index = 1; index < videoSteps.length; index += 1) {
      expect(videoSteps[index - 1].videoEnd).toBe(videoSteps[index].videoStart);
    }
  });

  it('follows the established shape-lesson sequence', () => {
    expect(torusTutorialSteps.map((step) => step.id)).toEqual([
      'torus-1-tool-selection',
      'torus-2-front-view',
      'torus-3-command-options',
      'torus-4-dimensions',
      'torus-5-origin',
      'torus-6-result',
      'torus-7-explain',
      'torus-8-recap',
    ]);
  });

  it('highlights the source-observed controls and all Item Entry parameters', () => {
    ['torus-place-torus', 'torus-front-view', 'torus-opt-torus', 'torus-opt-placement',
      'torus-opt-y-orientation', 'torus-item-entry', 'torus-input-section',
      'torus-input-path', 'torus-input-angle', 'torus-input-origin'].forEach((id) => {
      expect(overlays.get(id)?.type, id).toBe('highlight');
    });
    expect(overlays.has('torus-opt-dimension')).toBe(false);
  });

  it('keeps quizzes after their related actions and outside the subtitles', () => {
    expect(overlays.get('quiz-torus-command')?.startTime).toBeGreaterThanOrEqual(
      overlays.get('torus-opt-y-orientation')?.endTime ?? Infinity,
    );
    expect(overlays.get('quiz-torus-parameters')?.startTime).toBeGreaterThanOrEqual(
      overlays.get('torus-input-angle')?.endTime ?? Infinity,
    );
    expect(overlays.get('quiz-torus-origin')?.startTime).toBeGreaterThanOrEqual(
      overlays.get('torus-input-origin')?.endTime ?? Infinity,
    );
  });

  it('progressively reveals the three torus parameter annotations', () => {
    expect(overlays.get('torus-dim-section')?.startTime).toBe(28.5);
    expect(overlays.get('torus-dim-path')?.startTime).toBe(29.5);
    expect(overlays.get('torus-dim-angle')?.startTime).toBe(30.5);
    expect(overlays.get('torus-dim-section')?.label).toBe('Section Diameter (断面直径)');
    expect(overlays.get('torus-dim-path')?.label).toBe('Path Radius (経路半径)');
    expect(overlays.get('torus-dim-angle')?.label).toBe('Turn Angle (回転角)');
  });

  it('keeps every overlay inside its containing video segment', () => {
    for (const step of videoSteps) {
      for (const overlay of step.overlays ?? []) {
        expect(overlay.startTime, overlay.id).toBeGreaterThanOrEqual(step.videoStart ?? 0);
        expect(overlay.endTime, overlay.id).toBeLessThanOrEqual(step.videoEnd ?? Infinity);
        expect(overlay.endTime, overlay.id).toBeGreaterThan(overlay.startTime);
      }
    }
  });

  it('uses three narrated quizzes with three choices and non-duplicated feedback', () => {
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
    const recap = torusTutorialSteps.at(-1)!;
    expect(recap.id).toBe('torus-8-recap');
    expect(recap.videoSrc).toBeUndefined();
    expect(torusTutorialSteps.filter((step) => step.recapData)).toHaveLength(1);
    expect(recap.customText).toContain('zero, zero, zero');
  });
});
