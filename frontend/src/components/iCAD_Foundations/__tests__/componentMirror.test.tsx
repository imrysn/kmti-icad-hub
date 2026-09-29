import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import FoundationComponentMirror from '../FoundationComponentMirror';
import { resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
afterEach(cleanup);
it.each(['en','ja'] as const)('renders four Mirror Component steps and the supplied assessment in %s', language => {
  const lesson=resolveFoundationLesson('foundation-component-mirror')!;
  render(<FoundationComponentMirror text={lesson.content[language].sections![0].text} japanese={language==='ja'}/>);
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
  expect(screen.getAllByRole('button')).toHaveLength(4);
  for (const point of ['P1','P2','P3']) expect(screen.getByText(point)).toBeInTheDocument();
  const question=foundationKnowledgeQuestions(language,lesson.id)[0];
  expect(question.id).toBe('foundation-component-mirror-knowledge-check');
  expect(question.choices).toHaveLength(4);
  expect(question.choices.filter(choice=>choice.isCorrect).map(choice=>choice.label)).toEqual([language==='ja'?'A. 3点または面を選択する':'A. By selecting three points or a face']);
});
