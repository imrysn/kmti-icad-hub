import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import FoundationStretchSteps from '../FoundationStretchSteps';
import PartCreateArtwork from '../PartCreateArtwork';
import { resolveFoundationLesson, foundationNeighbors } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
afterEach(()=>{cleanup();vi.restoreAllMocks();});

it.each(['en','ja'] as const)('renders four part-creation steps with the requested information in %s',language=>{
 const lesson=resolveFoundationLesson('F21.1')!;
 expect(lesson.id).toBe('foundation-part-create');
 const sections=lesson.content[language].sections!;
 render(<FoundationStretchSteps text={sections[0].text} method={1} japanese={language==='ja'} customIcons={[0,1,2,3].map(step=><PartCreateArtwork key={step} step={step} japanese={language==='ja'}/>)}/>);
 const cards=screen.getAllByRole('listitem');
 expect(cards).toHaveLength(4);
 expect(cards[1]).toHaveTextContent(language==='ja'?'単一の要素':'single entity');
 expect(cards[1].textContent).not.toMatch(/GO|Enter|right-click/);
 for(const label of ['パーツ名','コメント','作成レイヤ','レイヤ引継','Enter']) expect(cards[2]).toHaveTextContent(label);
 expect(cards[2].querySelector('image')?.getAttribute('href')).toContain('part-create-information.png');
 expect(cards[3].querySelector('image')?.getAttribute('href')).toContain('part-create-result.png');
 const q=foundationKnowledgeQuestions(language,lesson.id)[0];
 expect(q.id).toBe('foundation-part-create-knowledge-check');
 expect(q.choices.filter(c=>c.isCorrect).map(c=>c.label)).toEqual([language==='ja'?'B. ツリービュー':'B. Tree View']);
 expect(foundationNeighbors('foundation-fairing-shell').next).toBe(lesson.id);
 expect(foundationNeighbors(lesson.id).next).toBe('foundation-part-material');
});

it('uses the third supplied image for the Step 2 fullscreen reference',()=>{
 Object.defineProperty(HTMLDialogElement.prototype,'showModal',{configurable:true,value:vi.fn()});
 Object.defineProperty(HTMLDialogElement.prototype,'close',{configurable:true,value:vi.fn()});
 const {container}=render(<PartCreateArtwork step={1} japanese={false}/>);
 fireEvent.click(screen.getByRole('button'));
 expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('part-create-selected.png');
 expect(container.querySelector('svg')).not.toBeNull();
});
