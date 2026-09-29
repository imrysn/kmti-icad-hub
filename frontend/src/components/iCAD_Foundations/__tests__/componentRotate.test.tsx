import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import FoundationStretchSteps from '../FoundationStretchSteps';
import ComponentRotateArtwork from '../ComponentRotateArtwork';
import { resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
afterEach(cleanup);
it.each(['en','ja'] as const)('renders five Rotate steps with a two-point axis and correct assessment in %s', language => {
 const lesson=resolveFoundationLesson('foundation-component-rotate')!;
 render(<FoundationStretchSteps text={lesson.content[language].sections![0].text} method={1} japanese={language==='ja'} customIcons={[0,1,2,3,4].map(step=><ComponentRotateArtwork key={step} step={step} japanese={language==='ja'}/>)}/>);
 expect(screen.getAllByRole('listitem')).toHaveLength(5);
 expect(screen.getAllByRole('button')).toHaveLength(5);
 expect(screen.getByText('P1')).toBeInTheDocument();
 expect(screen.getByText('P2')).toBeInTheDocument();
 expect(screen.queryByText('P3')).not.toBeInTheDocument();
 const question=foundationKnowledgeQuestions(language,lesson.id)[0];
 expect(question.id).toBe('foundation-component-rotate-knowledge-check');
 expect(question.choices.filter(choice=>choice.isCorrect).map(choice=>choice.label)).toEqual([language==='ja'?'B. 2点':'B. Two points']);
});
