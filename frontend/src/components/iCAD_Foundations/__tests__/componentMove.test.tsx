import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import FoundationComponentMove from '../FoundationComponentMove';
import { resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
afterEach(cleanup);
it.each(['en','ja'] as const)('renders four Move Component steps and the supplied assessment in %s', language => {
  const lesson=resolveFoundationLesson('foundation-component-move')!;
  render(<FoundationComponentMove text={lesson.content[language].sections![0].text} japanese={language==='ja'}/>);
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
  expect(screen.getAllByRole('button')).toHaveLength(4);
  const question=foundationKnowledgeQuestions(language,lesson.id)[0];
  expect(question.id).toBe('foundation-component-move-knowledge-check');
  expect(question.choices).toHaveLength(4);
  expect(question.choices.filter(choice=>choice.isCorrect).map(choice=>choice.label)).toEqual([language==='ja'?'B. 項目入力':'B. Item Entry']);
});
