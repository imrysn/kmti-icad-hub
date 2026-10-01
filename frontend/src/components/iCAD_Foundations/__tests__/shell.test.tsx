import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import FoundationStretchSteps from '../FoundationStretchSteps';
import ShellArtwork from '../ShellArtwork';
import { resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

afterEach(cleanup);
it.each(['en','ja'] as const)('preserves Shell selection, confirmation sequence, and answer in %s', language=>{
 const lesson=resolveFoundationLesson('F20.3')!;
 expect(lesson.id).toBe('foundation-fairing-shell');
 const sections=lesson.content[language].sections!;
 render(<FoundationStretchSteps text={sections[0].text} method={1} japanese={language==='ja'} customIcons={[0,1,2,3].map(step=><ShellArtwork key={step} step={step} japanese={language==='ja'}/>)}/>);
 const cards=screen.getAllByRole('listitem');
 expect(cards).toHaveLength(4);
 expect(screen.getAllByRole('button')).toHaveLength(4);
 expect(cards[1]).toHaveTextContent(language==='ja'?'2つの端面':'two end faces');
 expect(cards[1]).toHaveTextContent('GO');
 expect(cards[2]).toHaveTextContent(language==='ja'?'GO（右クリック）を2回':'GO twice');
 expect(cards[2]).toHaveTextContent('共通の厚さ');
 expect(cards[3].querySelector('svg')).not.toBeNull();
 expect(cards[1].querySelector('image')).toBeNull();
 expect(cards[3].querySelector('image')).toBeNull();
 expect(cards[2].querySelector('svg')).toHaveTextContent('4.5');
 expect(sections).toHaveLength(1);
 expect(sections[0].text).toContain(language==='ja'?'右クリック':'right-click');
 expect(JSON.stringify(lesson.content[language])).not.toMatch(/press(?:ing)? Enter|Enterキー|COMMNTHICK|4\.5/i);
 const question=foundationKnowledgeQuestions(language,lesson.id)[0];
 expect(question.id).toBe('foundation-fairing-shell-knowledge-check');
 expect(question.choices.filter(c=>c.isCorrect).map(c=>c.label)).toEqual([language==='ja'?'C. 肉厚':'C. Wall thickness']);
});

