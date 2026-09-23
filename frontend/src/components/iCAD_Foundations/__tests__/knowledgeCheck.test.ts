import { describe, expect, it } from 'vitest';
import { FOUNDATION_LESSON_IDS } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

const cases = (['en', 'ja'] as const).flatMap(language => FOUNDATION_LESSON_IDS.map(id => [language, id] as const));

describe('Foundations knowledge check data', () => {
  it.each(cases)('%s %s has one well-formed question set', (language, id) => {
    const questions = foundationKnowledgeQuestions(language, id);
    expect(questions).toHaveLength(id === 'F16.2' ? 12 : 1);
    expect(new Set(questions.map(q => q.id)).size).toBe(questions.length);
    for (const question of questions) {
      expect(question.prompt.trim()).not.toBe('');
      expect(question.choices).toHaveLength(4);
      expect(new Set(question.choices.map(c => c.id)).size).toBe(4);
      expect(new Set(question.choices.map(c => c.label)).size).toBe(4);
      expect(question.choices.filter(c => c.isCorrect)).toHaveLength(1);
      question.choices.forEach(c => expect(c.feedback.trim()).not.toBe(''));
      if (id !== 'F16.2') {
        const index = question.choices.findIndex(c => c.isCorrect);
        question.choices.forEach((c, i) => expect(c.label.startsWith(`${'ABCD'[i]}. `)).toBe(true));
        expect(question.choices[index].feedback).toContain(`${'ABCD'[index]}. `);
      }
    }
  });
});
