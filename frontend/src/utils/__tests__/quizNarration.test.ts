import { describe, expect, it } from 'vitest';
import { buildAnswerFeedbackNarration, buildKnowledgeCheckNarration } from '../quizNarration';

describe('Foundations quiz narration standard', () => {
  it('narrates the transition, question, instruction, and every choice in order', () => {
    expect(buildKnowledgeCheckNarration('Which view is correct?', ['Front', 'Top', 'Left']))
      .toBe("Now, let's do a knowledge check. Which view is correct? Choose one answer. Choice 1: Front. Choice 2: Top. Choice 3: Left.");
  });

  it('uses consistent correct and retry feedback', () => {
    expect(buildAnswerFeedbackNarration(true, 'Unused feedback')).toBe('Correct.');
    expect(buildAnswerFeedbackNarration(false, 'That tool creates geometry.'))
      .toBe('Not quite. That tool creates geometry. Please try again.');
  });
});
