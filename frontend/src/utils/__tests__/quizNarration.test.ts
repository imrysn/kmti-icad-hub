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
    expect(buildAnswerFeedbackNarration(true, '')).toBe('Correct.');
    expect(buildAnswerFeedbackNarration(false, 'That tool creates geometry.'))
      .toBe('Not quite. That tool creates geometry. Please try again.');
  });

  it('uses quizData.question when a tutorial quiz step has empty text', () => {
    expect(buildTutorialStepNarration('', {
      question: 'Where do you enter precise coordinates manually?',
      options: [{ text: 'Item Entry' }, { text: 'Key Entry Area' }, { text: 'Command Menu' }],
    })).toContain('Where do you enter precise coordinates manually?');
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
});
