import {cleanup,render,screen,fireEvent} from '@testing-library/react';
import {afterEach,it,expect,vi} from 'vitest';
import {resolveFoundationLesson,foundationNeighbors} from '../curriculum';
import {foundationKnowledgeQuestions} from '../knowledgeCheck';
import FoundationStretchSteps from '../FoundationStretchSteps';
import MaterialSetArtwork from '../MaterialSetArtwork';
afterEach(()=>{cleanup();vi.restoreAllMocks();});
it.each(['en','ja'] as const)('renders Set Material in %s',language=>{
 const lesson=resolveFoundationLesson('F22.1')!;
 render(<FoundationStretchSteps text={lesson.content[language].sections![0].text} method={1} japanese={language==='ja'} customIcons={[0,1,2,3].map(step=><MaterialSetArtwork key={step} step={step} japanese={language==='ja'}/>)}/>);
 const cards=screen.getAllByRole('listitem');expect(cards).toHaveLength(4);
 expect(cards[1]).toHaveTextContent('GO');expect(cards[1]).toHaveTextContent(language==='ja'?'複数':'one or more');
 for(const label of ['材質名','材料記号','比重','材質色','WHITE','OK'])expect(cards[2]).toHaveTextContent(label);
 expect(cards[3]).toHaveTextContent('OK');
 expect(foundationKnowledgeQuestions(language,lesson.id)[0].choices.map(c=>c.isCorrect)).toEqual([false,true,false,false]);
 expect(lesson.completionId).toBe('foundations-v3:material-set');
 expect(foundationNeighbors(lesson.id)).toEqual({previous:'foundation-part-change-name',next:'foundation-material-unlisted'});
});
it.each(['command','selected','list','confirm'])('opens supplied %s screenshot',name=>{
 const step=['command','selected','list','confirm'].indexOf(name);
 Object.defineProperty(HTMLDialogElement.prototype,'showModal',{configurable:true,value:vi.fn()});
 Object.defineProperty(HTMLDialogElement.prototype,'close',{configurable:true,value:vi.fn()});
 render(<MaterialSetArtwork step={step} japanese={false}/>);fireEvent.click(screen.getByRole('button'));
 expect(document.querySelector('dialog img')?.getAttribute('src')).toContain(`material-set-${name}.png`);
});
