import { describe, expect, it } from 'vitest';
import { torusTutorialSteps } from '../VideoTutorialData/basicOp1TutorialSteps';
import { buildAnswerFeedbackNarration, buildKnowledgeCheckNarration } from '../../../utils/quizNarration';

describe('Torus lesson alignment', () => {
  const videoSteps = torusTutorialSteps.filter((step) => step.videoSrc && !step.holdVideo);
  const overlays = new Map(
    videoSteps.flatMap((step) => step.overlays ?? []).map((overlay) => [overlay.id, overlay]),
  );

  it('uses narration-first playback through the end of the source video', () => {
    expect(videoSteps.every((step) => step.waitForNarrationBeforeVideo)).toBe(true);
    expect(torusTutorialSteps.every((step) => step.narrateTitle === false)).toBe(true);
    expect(videoSteps[0].videoStart).toBe(0);
    expect(videoSteps.at(-1)?.videoEnd).toBe(33.616667);
    expect(videoSteps.at(-1)?.advanceOnSourceVideoEnd).toBe(true);
  });

  it('follows the established shape-lesson sequence', () => {
    expect(torusTutorialSteps.map((step) => step.id)).toEqual([
      'torus-0-introduction',
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

  it('shows the tool-selection instruction after the introduction', () => {
    expect(torusTutorialSteps[0].holdVideo).toBe(true);
    expect(torusTutorialSteps[0].customText).not.toContain('To begin');
    expect(torusTutorialSteps[1].customText).toBe('From the Icon Menu, open Shape Placement, then select Place Torus.');
  });

  it('highlights the source-observed controls and all Item Entry parameters', () => {
    ['torus-shape-arrangement', 'torus-place-torus', 'torus-front-view', 'torus-opt-torus', 'torus-opt-placement',
      'torus-opt-y-orientation', 'torus-item-entry', 'torus-input-section',
      'torus-input-path', 'torus-input-angle', 'torus-input-origin'].forEach((id) => {
        expect(overlays.get(id)?.type, id).toBe('highlight');
      });
    expect(overlays.has('torus-opt-dimension')).toBe(false);
  });

  it('shows Shape Arrangement before the Torus icon after the introduction narration', () => {
    const shapeArrangement = overlays.get('torus-shape-arrangement');
    const torusIcon = overlays.get('torus-place-torus');

    expect(torusTutorialSteps[0].waitForNarrationBeforeVideo).toBe(true);
    expect(shapeArrangement?.startTime).toBeLessThan(torusIcon?.startTime ?? -Infinity);
    expect(shapeArrangement?.endTime).toBeLessThanOrEqual(torusIcon?.startTime ?? -Infinity);
    expect(shapeArrangement?.target?.x).toBeGreaterThan(0.9);
    expect(torusIcon?.target?.x).toBeGreaterThan(0.9);
  });

  it('does not skip Y Orientation before proceeding to the parameter step', () => {
    const commandStep = torusTutorialSteps.find((step) => step.id === 'torus-3-command-options')!;
    const parameterStep = torusTutorialSteps.find((step) => step.id === 'torus-4-dimensions')!;
    const yOrientation = overlays.get('torus-opt-y-orientation')!;
    const commandQuiz = overlays.get('quiz-torus-command')!;
    const itemEntry = overlays.get('torus-item-entry')!;

    expect(yOrientation.startTime).toBeGreaterThan(overlays.get('torus-opt-placement')?.endTime ?? Infinity);
    expect(commandQuiz.startTime).toBeGreaterThanOrEqual(yOrientation.endTime);
    expect(commandQuiz.endTime).toBe(commandStep.videoEnd);
    expect(commandStep.videoEnd).toBe(parameterStep.videoStart);
    expect(itemEntry.startTime).toBe(parameterStep.videoStart);
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
    expect(overlays.get('torus-dim-section')?.startTime).toBe(30.5);
    expect(overlays.get('torus-dim-path')?.startTime).toBe(31.5);
    expect(overlays.get('torus-dim-angle')?.startTime).toBe(32.5);
    expect(overlays.get('torus-dim-section')?.label).toBe('Section Diameter (断面直径)');
    expect(overlays.get('torus-dim-path')?.label).toBe('Path Radius (経路半径)');
    expect(overlays.get('torus-dim-angle')?.label).toBe('Turn Angle (回転角)');
    expect(overlays.get('torus-dim-section')?.dimensionType).toBe('vertical');
    expect(overlays.get('torus-dim-path')?.dimensionType).toBe('diagonal');
    expect(overlays.get('torus-dim-angle')?.dimensionType).toBe('arc');
    const turnAngleArc = overlays.get('torus-dim-angle')?.arc;
    expect(turnAngleArc).toBeDefined();
    expect((turnAngleArc?.endAngle ?? 0) - (turnAngleArc?.startAngle ?? 0)).toBeGreaterThan(180);
  });

  it('keeps every overlay from the command step onward inside its containing segment', () => {
    for (const step of videoSteps.slice(2)) {
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
