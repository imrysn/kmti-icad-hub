import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FoundationVisualContext } from '../FoundationVisualContext';
import FoundationOperationPreview from '../FoundationOperationPreview';
import FoundationCreationCommandIcon from '../FoundationCreationCommandIcon';
import FoundationExtrudePreview from '../FoundationExtrudePreview';
import FoundationSketchPreview from '../FoundationSketchPreview';

beforeEach(() => {
  HTMLDialogElement.prototype.showModal=vi.fn(function(this:HTMLDialogElement){this.open=true;});
  HTMLDialogElement.prototype.close=vi.fn(function(this:HTMLDialogElement){this.open=false;});
});
afterEach(cleanup);

describe('Foundation command visuals',()=>{
  it.each(['sketch','extrude','extrudeBoth','revolve','stretch','machinePart'] as const)('renders %s as an individual native vector',command=>{
    const {container}=render(<FoundationCreationCommandIcon command={command} title={command}/>);
    expect(container.querySelector('svg')).toHaveAttribute('viewBox','0 0 32 32');
    expect(container.querySelector('svg')).toHaveAttribute('preserveAspectRatio','xMidYMid meet');
    expect(container.querySelector('image,img,foreignObject,text')).toBeNull();
    expect(container.querySelectorAll('path,polygon,ellipse,circle').length).toBeGreaterThan(0);
  });
  it.each([0,1,2,3])('matches Mirror Copy thumbnails to fullscreen sources for step %s',index=>{
    const title='Mirror step '+index;
    const {container,unmount}=render(<FoundationOperationPreview topic="mirrorCopy" index={index} title={title}/>);
    const previousThumbnail=container.querySelector('button svg image')?.getAttribute('href');
    unmount();
    const updated=render(<FoundationVisualContext.Provider value><FoundationOperationPreview topic="mirrorCopy" index={index} title={title}/></FoundationVisualContext.Provider>);
    if (index===0) expect(updated.container.querySelector('button svg image')?.getAttribute('href')).toBe(previousThumbnail);
    else expect(updated.container.querySelector('button svg image')?.getAttribute('href')).toContain(index===3 ? 'mirror-copy-output.png' : 'mirror-copy-selection.png');
    fireEvent.click(screen.getByRole('button',{name:'Enlarge: '+title}));
    const dialog=screen.getByRole('dialog');
    expect(within(dialog).getByRole('img',{name:'Full iCAD SX interface'})).toHaveAttribute('src',expect.stringContaining(['mirror-copy-command.png','mirror-copy-selection.png','mirror-copy-selection.png','mirror-copy-output.png'][index]));
    fireEvent.load(within(dialog).getByRole('img',{name:'Full iCAD SX interface'}));
    fireEvent.click(within(dialog).getByRole('button',{name:'Show location'}));
    expect(dialog).toHaveAttribute('data-phase','moving');
    expect(dialog.querySelector('.foundation-interface-icon-dialog__location')).toHaveStyle({borderColor:'#0087ef'});
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
  it('keeps the original Professional screenshot',()=>{
    render(<FoundationOperationPreview topic="mirrorCopy" index={0} title="Professional"/>);
    fireEvent.click(screen.getByRole('button',{name:'Enlarge: Professional'}));
    expect(screen.getByRole('img',{name:'Full iCAD SX interface'})).toHaveAttribute('src',expect.stringContaining('/professional/mirrorCopy-2.png'));
  });
  it('uses a single Sketch command only on Foundation step 1',()=>{
    const {container,rerender}=render(<FoundationVisualContext.Provider value><FoundationSketchPreview index={0} title="Sketch" japanese={false}/></FoundationVisualContext.Provider>);
    expect(container.querySelector('.foundation-single-command')).not.toBeNull();
    rerender(<FoundationVisualContext.Provider value><FoundationSketchPreview index={1} title="Line" japanese={false}/></FoundationVisualContext.Provider>);
    expect(container.querySelector('.foundation-single-command')).toBeNull();
  });
  it.each([{bothSides:false,revolve:false},{bothSides:true,revolve:false},{bothSides:false,revolve:true}])('isolates the creation command from its menu: %j',props=>{
    const {container}=render(<FoundationVisualContext.Provider value><FoundationExtrudePreview {...props} index={0} title="Create" japanese={false}/></FoundationVisualContext.Provider>);
    expect(container.querySelector('.foundation-single-command')).not.toBeNull();
    expect(container.querySelector('svg text, svg image')).toBeNull();
  });
});
