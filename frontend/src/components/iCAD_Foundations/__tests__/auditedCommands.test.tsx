import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import FoundationOperationCommandIcon from '../FoundationOperationCommandIcon';
import FoundationCreationCommandIcon from '../FoundationCreationCommandIcon';
import FoundationBooleanLesson from '../FoundationBooleanLesson';
import { resolveFoundationLesson } from '../curriculum';

afterEach(cleanup);
it.each(['component-move','component-copy','component-mirror','component-rotate','component-repeat-copy','component-rotate-copy','component-mirror-copy','component-delete','intersect','separateSelected','separateAll'] as const)('renders reference paths for %s without a raster thumbnail',command=>{
 const {container}=render(<FoundationOperationCommandIcon command={command} title={command}/>);
 expect(container.querySelector('image,img,foreignObject')).toBeNull();
 expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
 expect(screen.getByRole('img')).toHaveAttribute('data-command-reference',command);
 expect(screen.getByRole('img')).toHaveAttribute('width','76');
});
it.each(['sectionExtrude','sectionRevolve','spiral','referenceMachinePart'] as const)('renders the dedicated creation reference %s',command=>{
 const {container}=render(<FoundationCreationCommandIcon command={command} title={command}/>);
 expect(container.querySelector('image,img,foreignObject')).toBeNull();
 expect(screen.getByRole('img')).toHaveAttribute('data-command-reference',command);
 expect(screen.getByRole('img')).toHaveAttribute('width','76');
});
it.each(['en','ja'] as const)('keeps Intersect procedure as section zero after removing duplicate sections in %s',lang=>{
 const sections=resolveFoundationLesson('foundation-boolean-intersect')!.content[lang].sections!;
 expect(sections).toHaveLength(1);
 render(<FoundationBooleanLesson kind="intersect" index={0} text={sections[0].text} japanese={lang==='ja'}/>);
 expect(screen.getAllByRole('listitem')).toHaveLength(3);
 expect(screen.getAllByRole('button')).toHaveLength(3);
 expect(screen.getAllByRole('listitem')[2]).toHaveTextContent(lang==='ja'?'元の要素は残ります':'The original entities remain');
});
it('retains the separate-selected menu reference in the existing fullscreen preview',()=>{
 HTMLDialogElement.prototype.showModal=vi.fn(function(this:HTMLDialogElement){this.open=true;});
 HTMLDialogElement.prototype.close=vi.fn(function(this:HTMLDialogElement){this.open=false;});
 const text=resolveFoundationLesson('foundation-boolean-separate')!.content.en.sections![0].text;
 render(<FoundationBooleanLesson kind="separate" index={0} text={text}/>);
 fireEvent.click(screen.getByRole('button',{name:'Enlarge: Separate Entity'}));
 expect(screen.getByRole('img',{name:'Full iCAD SX interface'})).toHaveAttribute('src',expect.stringContaining('boolean2_component.png'));
});
