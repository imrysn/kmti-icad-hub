import { describe, expect, it } from 'vitest';
import { buildAnswerFeedbackNarration, buildKnowledgeCheckNarration, buildTutorialStepNarration } from '../quizNarration';

describe('Foundations quiz narration standard', () => {
  it('narrates the transition, question, instruction, and every choice in order', () => {
    expect(buildKnowledgeCheckNarration('Which view is correct?', ['Front', 'Top', 'Left']))
      .toBe("Now, let's do a knowledge check. Which view is correct? Choose one answer. Choice 1: Front. Choice 2: Top. Choice 3: Left.");
  });

  it('uses consistent correct and retry feedback', () => {
    expect(buildAnswerFeedbackNarration(true, 'Correct! The Key Entry Area is for precise coordinates.'))
      .toBe('Correct! The Key Entry Area is for precise coordinates.');
    expect(buildAnswerFeedbackNarration(true, 'Correct! Correct! A cylinder requires diameter and height.'))
      .toBe('Correct! A cylinder requires diameter and height.');
    expect(buildAnswerFeedbackNarration(true, '')).toBe('Correct!');
    expect(buildAnswerFeedbackNarration(false, 'That tool creates geometry.'))
      .toBe('Not quite. That tool creates geometry. Please try again.');
  });

  it('uses quizData.question when a tutorial quiz step has empty text', () => {
    expect(buildTutorialStepNarration('', {
      question: 'Where do you enter precise coordinates manually?',
      options: [{ text: 'Item Entry' }, { text: 'Key Entry Area' }, { text: 'Command Menu' }],
    })).toContain('Where do you enter precise coordinates manually?');
  });

  it('always narrates the exact displayed quiz question instead of stale step text', () => {
    const narration = buildTutorialStepNarration('tutorial.toolbars.quiz-tb-2.text', {
      question: 'Which toolbar section is used to switch between Shading and Wireframe displays?',
      options: [{ text: 'Shading' }, { text: 'Switch Display' }, { text: '3D View' }],
    });

    expect(narration).toContain('Which toolbar section is used to switch between Shading and Wireframe displays?');
    expect(narration).not.toContain('tutorial.toolbars.quiz-tb-2.text');
    expect(narration).toContain('Choice 1: Shading. Choice 2: Switch Display. Choice 3: 3D View.');
  });

  it('narrates the recap title and every item when recap step text is empty', () => {
    const narration = buildTutorialStepNarration('', undefined, {
      title: 'Interface Overview Complete',
      items: ['The Workspace is where modeling takes place.', 'The Tree View organizes parts.'],
    });

    expect(narration).toContain("Let's review what you learned.");
    expect(narration).toContain('Interface Overview Complete');
    expect(narration).toContain('The Workspace is where modeling takes place.');
    expect(narration).toContain('The Tree View organizes parts.');
  });

  it('narrates a normal tutorial title before its description', () => {
    expect(buildTutorialStepNarration(
      'Contains Top, Front, Right, Left, Back, and Bottom.',
      undefined,
      undefined,
      '3D View',
    )).toBe('3D View. Contains Top, Front, Right, Left, Back, and Bottom.');
  });

  it('does not repeat a title already present at the start of the narration', () => {
    expect(buildTutorialStepNarration(
      '3D View. Contains the standard viewing directions.',
      undefined,
      undefined,
      '3D View',
    )).toBe('3D View. Contains the standard viewing directions.');
  });

  it('keeps quiz narration focused on the knowledge-check sequence', () => {
    const narration = buildTutorialStepNarration(
      '',
      { question: 'Which toolbar controls the view?', options: [{ text: '3D View' }] },
      undefined,
      'Knowledge Check',
    );

    expect(narration).toBe("Now, let's do a knowledge check. Which toolbar controls the view? Choose one answer. Choice 1: 3D View.");
    expect(narration.match(/knowledge check/gi)).toHaveLength(1);
  });
});
