import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import FoundationStretchSteps from '../FoundationStretchSteps';
import FoundationViewComparison from '../FoundationViewComparison';
import ChangeColorArtwork, {ChangeColorPreview} from '../ChangeColorArtwork';
import {resolveFoundationLesson,foundationNeighbors} from '../curriculum';
import {foundationKnowledgeQuestions} from '../knowledgeCheck';

afterEach(cleanup);
it.each(['en','ja'] as const)('preserves the Entity/Face distinction in %s',lang=>{
 const lesson=resolveFoundationLesson('F23.1')!;
 const sections=lesson.content[lang].sections!;
 const ja=lang==='ja';
 const {container}=render(<><FoundationStretchSteps text={sections[0].text} method={1} japanese={ja} customIcons={[0,1,2].map(step=><ChangeColorArtwork key={step} step={step} japanese={ja}/>)}/><FoundationViewComparison text={sections[1].text} customIcons={[<ChangeColorPreview key="e"/>,<ChangeColorPreview key="f" faceOnly/>]}/></>);
 expect(screen.getAllByRole('listitem')).toHaveLength(3);
 expect(container.querySelectorAll('.foundation-view-comparison__card')).toHaveLength(2);
 expect(container.querySelector('[data-command-reference="change-color"] image')).toBeNull();
 const text=sections[0].text;
 const entity=text.split(ja?'**要素**':'**Entity「要素」**')[1].split(ja?'**面**':'**Face「面」**')[0];
 const face=text.split(ja?'**面**':'**Face「面」**')[1].split(ja?'**ステップ 3':'**Step 3')[0];
 expect(entity.match(/^\d\./gm)).toHaveLength(3);expect(entity).not.toContain('GO');
 expect(face.match(/^\d\./gm)).toHaveLength(4);expect(face).toContain('GO');
 const question=foundationKnowledgeQuestions(lang,lesson.id)[0];
 expect(question.id).toBe('foundation-properties-change-color-knowledge-check');
 expect(question.choices.map(c=>c.isCorrect)).toEqual([false,true,false,false]);
 expect(foundationNeighbors(lesson.id)).toEqual({previous:'foundation-material-unlisted',next:'foundation-properties-change-layer'});
});
it('opens the supplied Face screenshot through the shared preview',()=>{
 HTMLDialogElement.prototype.showModal=vi.fn(function(this:HTMLDialogElement){this.open=true;});
 HTMLDialogElement.prototype.close=vi.fn(function(this:HTMLDialogElement){this.open=false;});
 render(<ChangeColorPreview faceOnly/>);
 fireEvent.click(screen.getByRole('button'));
 expect(document.querySelector('dialog img')?.getAttribute('src')).toContain('change-color-face.png');
});
