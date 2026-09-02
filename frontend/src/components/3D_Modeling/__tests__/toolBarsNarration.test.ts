import { describe, expect, it } from 'vitest';
import { buildTutorialStepNarration } from '../../../utils/quizNarration';
import { TOOLBAR_TUTORIAL_STEPS } from '../VideoTutorialData/ToolBarsTutorial';
import { localizeToolbarTutorialSteps } from '../3D_ToolBars';

describe('iCAD Tool Bars title narration', () => {
  it('starts the introduction directly with its text', () => {
    const intro = TOOLBAR_TUTORIAL_STEPS.find((step) => step.id === 'intro');

    expect(intro?.narrateTitle).toBe(false);
    expect(buildTutorialStepNarration(
      intro?.text || '',
      intro?.quizData,
      intro?.recapData,
      intro?.narrateTitle === false ? '' : intro?.title,
    )).toBe('Welcome to the Tool Bars tutorial! In this guide, we will walk through the various quick-access menus at the top of the workspace and explore what each section does.');
  });

  it('includes other normal visible step titles before their descriptions', () => {
    const normalSteps = TOOLBAR_TUTORIAL_STEPS.filter(
      (step) => !step.quizData && !step.recapData && step.narrationEnabled !== false && step.narrateTitle !== false,
    );

    expect(normalSteps.length).toBeGreaterThan(0);

    for (const step of normalSteps) {
      const narration = buildTutorialStepNarration(
        step.customText || step.text || '',
        step.quizData,
        step.recapData,
        step.title,
      );
      expect(narration, String(step.id)).toMatch(new RegExp(`^${step.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[.!?]`));
    }
  });

  it('narrates the 3D View title and its complete description', () => {
    const step = TOOLBAR_TUTORIAL_STEPS.find((candidate) => candidate.id === '3d-view');
    expect(step).toBeDefined();

    const narration = buildTutorialStepNarration(
      step?.text || '',
      step?.quizData,
      step?.recapData,
      step?.title,
    );

    expect(narration).toBe('3D View. Contains Top, Front, Right, Left, Back, Bottom, Set a Plane, Set using 3-Points.');
  });

  it('does not expose missing translation keys in recap content', () => {
    const translateWithMissingKeyFallback = (key: string) => key;
    const steps = localizeToolbarTutorialSteps(translateWithMissingKeyFallback);
    const recap = steps.find((step) => step.id === 'recap-tb');

    expect(recap?.title).toBe('Review');
    expect(recap?.text).toBe('');
    expect(recap?.text).not.toContain('tutorial.toolbars');
  });

  it('uses translations when a Tool Bars translation exists', () => {
    const steps = localizeToolbarTutorialSteps((key) => {
      if (key === 'tutorial.toolbars.3d-view.title') return '3Dビュー';
      if (key === 'tutorial.toolbars.3d-view.text') return '標準表示方向が含まれています。';
      return key;
    });
    const viewStep = steps.find((step) => step.id === '3d-view');

    expect(viewStep?.title).toBe('3Dビュー');
    expect(viewStep?.text).toBe('標準表示方向が含まれています。');
  });

  it('keeps Tool Bars Quiz 2 narration aligned with the displayed question and choices', () => {
    const step = TOOLBAR_TUTORIAL_STEPS.find((candidate) => candidate.id === 'quiz-tb-2');
    expect(step?.quizData).toBeDefined();

    const narration = buildTutorialStepNarration(
      'stale text that is not displayed',
      step?.quizData,
      step?.recapData,
      step?.title,
    );

    expect(narration).toBe(
      "Now, let's do a knowledge check. Which toolbar section is used to switch between Shading and Wireframe displays? "
      + 'Choose one answer. A: Shading. B: Switch Display. C: 3D View.',
    );
  });

  it('uses the same localized nested quiz data for display and narration', () => {
    const translateContent = (text: string) => ({
      'Which toolbar section is used to switch between Shading and Wireframe displays?': 'シェーディング表示とワイヤーフレーム表示を切り替えるツールバーはどれですか。',
      Shading: 'シェーディング',
      'Switch Display': '表示切り替え',
      '3D View': '3Dビュー',
    }[text] || text);
    const steps = localizeToolbarTutorialSteps((key) => key, translateContent);
    const quiz = steps.find((step) => step.id === 'quiz-tb-2')?.quizData;

    const narration = buildTutorialStepNarration('', quiz);
    expect(quiz?.question).toBe('シェーディング表示とワイヤーフレーム表示を切り替えるツールバーはどれですか。');
    expect(quiz?.options.map((option) => option.text)).toEqual(['シェーディング', '表示切り替え', '3Dビュー']);
    expect(narration).toContain(quiz?.question);
    for (const option of quiz?.options || []) expect(narration).toContain(option.text);
  });
});
