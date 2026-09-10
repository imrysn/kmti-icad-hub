import * as en from './WrittenTutorial_EN';
import * as ja from './WrittenTutorial_JP';
import type { FoundationLesson, FoundationLanguage } from './curriculum';
import type { WrittenTutorialStep, WrittenTutorialCopy } from './WrittenTutorial_EN/types';

const originalSteps: Record<string, string> = {
  'F9.5': 'BOX', 'F9.6': 'CYLINDER', 'F9.7': 'POLYGON',
  'F9.9': 'SELECTING_GEOMETRY', 'F9.10': 'COPY', 'F9.11': 'DELETE',
};

/** Keep the original instructions while presenting every lesson in the same shell. */
export function standardLessonContent(lesson: FoundationLesson, language: FoundationLanguage) {
  const content = lesson.content[language];
  const source = (language === 'ja' ? ja : en) as unknown as Record<string, WrittenTutorialStep[]>;
  const preserved = source[`${originalSteps[lesson.id]}_WRITTEN_TUTORIAL_STEPS`];
  const originalCopy = (language === 'ja' ? ja : en) as unknown as Record<string, WrittenTutorialCopy>;
  const copy = originalCopy[`${originalSteps[lesson.id]}_WRITTEN_TUTORIAL_COPY`];
  return {
    ...content,
    description2: content.description2 || (copy ? [copy.description, copy.description2].filter(Boolean).join('\n\n') : undefined),
    practice: copy?.objective || content.practice,
    sections: preserved ? [...preserved.map(step => ({ ...step, preserveText: true })), ...(content.sections || [])] : content.sections || [
      { title: language === 'ja' ? '実践' : 'Practice', text: content.practice },
    ],
    quickReview: content.quickReview || copy?.quickReviewText || content.explanation,
  };
}
