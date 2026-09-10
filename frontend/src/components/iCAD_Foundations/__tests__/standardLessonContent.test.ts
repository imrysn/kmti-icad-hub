import { describe, it, expect } from 'vitest';
import { FOUNDATION_LESSONS, resolveFoundationLesson } from '../curriculum';
import { standardLessonContent } from '../standardLessonContent';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

describe('Course-wide content preservation', () => {
  it.each(['en', 'ja'] as const)('preserves the original instructions in %s', language => {
    for (const id of ['F4.6','F5.4','F9.5','F9.6','F9.7','F9.9','F9.10','F9.11']) {
      const content = standardLessonContent(resolveFoundationLesson(id)!, language);
      expect(content.sections.length, id).toBeGreaterThan(1);
      expect(content.sections.every(section => Boolean(section.title && section.text)), id).toBe(true);
      expect(content.quickReview, id).toBeTruthy();
    }
  });
  it.each(['en', 'ja'] as const)('gives every lesson a valid localized question in %s', language => {
    for (const lesson of FOUNDATION_LESSONS) {
      const questions = foundationKnowledgeQuestions(language, lesson.id);
      expect(questions.length, lesson.id).toBeGreaterThan(0);
      for (const question of questions) {
        expect(question.choices.filter(choice => choice.isCorrect), lesson.id).toHaveLength(1);
        expect(new Set(question.choices.map(choice => choice.label)).size, lesson.id).toBe(question.choices.length);
      }
    }
  });
});
