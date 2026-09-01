import { describe, expect, it } from 'vitest';
import {
  polygonOverlayLayout,
  polygonTutorialSteps,
} from '../VideoTutorialData/basicOp1TutorialSteps';
import {
  buildAnswerFeedbackNarration,
  buildKnowledgeCheckNarration,
  buildTutorialStepNarration,
} from '../../../utils/quizNarration';

describe('Create Polygon video timing', () => {
  const videoSteps = polygonTutorialSteps.filter((step) => step.videoSrc);
  const overlays = new Map(
    videoSteps.flatMap((step) => step.overlays ?? []).map((overlay) => [overlay.id, overlay]),
  );

  it('gates every source segment behind its narration', () => {
    expect(videoSteps).not.toHaveLength(0);
    expect(videoSteps.every((step) => step.waitForNarrationBeforeVideo)).toBe(true);
    expect(polygonTutorialSteps.every((step) => step.narrateTitle === false)).toBe(true);
  });

  it('covers the complete 33.4-second source with contiguous audited segments', () => {
    expect(videoSteps.map(({ id, videoStart, videoEnd }) => [id, videoStart, videoEnd])).toEqual([
      ['poly-1-tool-selection', 0, 4.8],
      ['poly-2-front-view', 4.8, 7.8],
      ['poly-3-command-options', 7.8, 15],
      ['poly-4-dimensions', 15, 22.3],
      ['poly-5-origin', 22.3, 26.5],
      ['poly-6-result', 26.5, 28.3],
      ['poly-7-explain', 28.3, 33.4],
    ]);

    for (let index = 1; index < videoSteps.length; index += 1) {
      expect(videoSteps[index - 1].videoEnd).toBe(videoSteps[index].videoStart);
    }
  });

  it('aligns highlights with each observed action transition', () => {
    expect(overlays.get('poly-shape-placement')?.startTime).toBe(0.75);
    expect(overlays.get('poly-shape-placement')?.endTime).toBe(2.2);
    expect(overlays.get('poly-place-polygon')?.startTime).toBe(2.2);
    expect(overlays.get('poly-place-polygon')?.endTime).toBe(4.8);
    expect(overlays.get('poly-front-view')?.startTime).toBe(5);
    expect(overlays.get('poly-front-view')?.endTime).toBe(7.8);
    expect(overlays.get('poly-opt-prism')?.startTime).toBe(7.8);
    expect(overlays.get('poly-opt-placement')?.startTime).toBe(9.4);
    expect(overlays.get('poly-opt-dimension')?.startTime).toBe(11);
    expect(overlays.get('poly-opt-y-orientation')?.startTime).toBe(12.75);
    expect(overlays.get('poly-opt-y-orientation')?.endTime).toBe(14.75);
    expect(overlays.get('poly-item-entry')?.startTime).toBe(15);
    expect(overlays.get('poly-input-origin')?.startTime).toBeGreaterThanOrEqual(22.3);
  });

  it('keeps every timed overlay inside its containing segment', () => {
    for (const step of videoSteps) {
      for (const overlay of step.overlays ?? []) {
        expect(overlay.startTime, overlay.id).toBeGreaterThanOrEqual(step.videoStart ?? 0);
        expect(overlay.endTime, overlay.id).toBeLessThanOrEqual(step.videoEnd ?? Infinity);
        expect(overlay.endTime, overlay.id).toBeGreaterThan(overlay.startTime);
      }
    }
  });

  it('uses adjustable normalized Item Entry geometry', () => {
    expect(overlays.get('poly-item-entry')?.target).toEqual(polygonOverlayLayout.itemEntryArea);
    const { x, y, width, height } = polygonOverlayLayout.itemEntryArea;
    expect(x).toBeGreaterThanOrEqual(0);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    expect(x + width).toBeLessThanOrEqual(1);
    expect(y + height).toBeLessThanOrEqual(1);
  });

  it('shows each knowledge check only after the related action finishes', () => {
    expect(overlays.get('quiz-poly-command')?.startTime).toBeGreaterThanOrEqual(
      overlays.get('poly-opt-y-orientation')?.endTime ?? Infinity,
    );
    expect(overlays.get('quiz-poly-dimensions')?.startTime).toBeGreaterThanOrEqual(
      overlays.get('poly-input-height')?.endTime ?? Infinity,
    );
    expect(overlays.get('quiz-poly-origin')?.startTime).toBeGreaterThan(26.5);
  });

  it('keeps the command subtitle aligned with the four highlighted controls', () => {
    const commandStep = polygonTutorialSteps.find((step) => step.id === 'poly-3-command-options')!;

    expect(commandStep.customText).toBe(
      'In the Command Menu, confirm Polygonal Prism, Placement, and Dimension Specification, then select Y Orientation.',
    );
  });

  it('uses a direct origin instruction after the second knowledge check', () => {
    const originStep = polygonTutorialSteps.find((step) => step.id === 'poly-5-origin')!;

    expect(originStep.customText).toBe(
      'In the Key Entry Area, enter 0, 0, 0 to position the polygonal prism at the model origin.',
    );
    expect(overlays.get('quiz-poly-dimensions')?.endTime).toBeLessThanOrEqual(
      originStep.videoStart ?? -Infinity,
    );
  });

  it('explains and annotates all three polygonal-prism size parameters', () => {
    const result = polygonTutorialSteps.find((step) => step.id === 'poly-6-result')!;
    const explanation = polygonTutorialSteps.find((step) => step.id === 'poly-7-explain')!;

    expect(result.customText).toBe(
      'The polygonal prism is now created using the specified number of sides, path diameter, height, and origin position.',
    );
    expect(explanation.customText).toContain('Number of sides');
    expect(explanation.customText).toContain('Path diameter');
    expect(explanation.customText).toContain('Height');
    expect(overlays.get('poly-dim-sides')?.type).toBe('polygonOutline');
    expect(overlays.get('poly-dim-sides')?.label).toBe('Number of Sides (頂点数)');
    expect(overlays.get('poly-dim-sides')?.points).toHaveLength(6);
    expect(overlays.get('poly-dim-diameter')?.type).toBe('dimensionAnnotation');
    expect(overlays.get('poly-dim-height')?.type).toBe('dimensionAnnotation');
    expect(overlays.get('poly-dim-sides')?.startTime).toBe(30);
    expect(overlays.get('poly-dim-diameter')?.startTime).toBe(31);
    expect(overlays.get('poly-dim-height')?.startTime).toBe(32);
    expect(overlays.get('poly-dim-sides')?.endTime).toBe(33.4);
    expect(overlays.get('poly-dim-diameter')?.endTime).toBe(33.4);
    expect(overlays.get('poly-dim-height')?.endTime).toBe(33.4);
  });

  it('uses three-option quizzes with complete narration and non-duplicated feedback', () => {
    const quizzes = videoSteps
      .flatMap((step) => step.overlays ?? [])
      .filter((overlay) => overlay.type === 'quiz' && overlay.quizData);

    expect(quizzes).toHaveLength(3);
    for (const quiz of quizzes) {
      const data = quiz.quizData!;
      expect(data.options).toHaveLength(3);
      expect(data.options.filter((option) => option.isCorrect)).toHaveLength(1);

      const narration = buildKnowledgeCheckNarration(
        data.question,
        data.options.map((option) => option.text),
      );
      expect(narration).toContain(data.question);
      expect(narration).toContain('Choose one answer.');
      data.options.forEach((option, index) => {
        expect(narration).toContain(`Choice ${index + 1}: ${option.text}.`);
        const feedback = buildAnswerFeedbackNarration(option.isCorrect, option.feedback);
        expect(feedback).not.toMatch(/not quite\.\s*(?:not quite|incorrect)/i);
        if (option.isCorrect) expect(feedback.match(/correct/gi)).toHaveLength(1);
      });
    }
  });

  it('finishes the source before presenting one complete narrated recap', () => {
    const finalVideoStep = polygonTutorialSteps.at(-2)!;
    const recap = polygonTutorialSteps.at(-1)!;
    const narration = buildTutorialStepNarration(
      recap.customText ?? '',
      recap.quizData,
      recap.recapData,
      recap.narrateTitle === false ? '' : recap.title,
    );

    expect(finalVideoStep.id).toBe('poly-7-explain');
    expect(finalVideoStep.videoEnd).toBe(33.4);
    expect(finalVideoStep.advanceOnSourceVideoEnd).toBe(true);
    expect(recap.id).toBe('poly-8-recap');
    expect(recap.videoSrc).toBeUndefined();
    expect(polygonTutorialSteps.filter((step) => step.recapData)).toHaveLength(1);
    expect(narration).toContain('number of sides, path diameter, and height');
    expect(narration).toContain('zero, zero, zero');
  });
});
