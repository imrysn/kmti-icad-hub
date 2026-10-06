import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import InterferenceListArtwork from '../InterferenceListArtwork';
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
it.each(['en','ja'] as const)('shows three list steps and answer C in %s', language => {
 const lesson = resolveFoundationLesson('F26.2')!;
 render(<FoundationStretchSteps text={lesson.content[language].sections![0].text} method={1} japanese={language==='ja'} customIcons={[0,1,2].map(step=><InterferenceListArtwork key={step} step={step} japanese={language==='ja'} />)} />);
 expect(screen.getAllByRole('listitem')).toHaveLength(3);
 expect(screen.getAllByRole('button')).toHaveLength(3);
 expect(screen.getByText('GO')).toBeInTheDocument();
 const q = foundationKnowledgeQuestions(language,'F26.2')[0];
 expect(q.choices.map(c=>c.isCorrect)).toEqual([false,false,true,false]);
 expect(q.choices[2].label).toBe(language==='ja' ? 'C. 対応する干渉箇所が自動的に表示される' : 'C. The corresponding interference area automatically appears');
});
it.each([[0,'list-command-interface'],[1,'list-display-window'],[2,'list-display-window']] as const)('opens the correct source for step %s', (step,file) => {
 Object.defineProperty(HTMLDialogElement.prototype,'showModal',{configurable:true,value:vi.fn()});
 Object.defineProperty(HTMLDialogElement.prototype,'close',{configurable:true,value:vi.fn()});
 render(<InterferenceListArtwork step={step} japanese={false} />);
 fireEvent.click(screen.getByRole('button'));
 expect(document.querySelector('.foundation-interface-icon-dialog__screen')?.getAttribute('src')).toContain(file+'.png');
});
