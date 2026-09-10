import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import VideoTutorialViewer, { type TutorialStep } from '../../3D_Modeling/VideoTutorialViewer';
import { FoundationCompletionContext } from '../FoundationCompletionContext';

vi.mock('../../../services/foundationsNarrationService',()=>({
  createFoundationsBrowserUtterance:()=>null, createFoundationsNarrationAudio:()=>null,
  getFoundationsNarrationRate:()=>1, normalizeFoundationsNarrationText:(s:string)=>s,
}));
const recap: TutorialStep = {id:'recap',title:'Box recap',text:'You created a box.',recapData:{title:'Box recap',items:['Check the width.','Check the position.']},
  zoom:'1',origin:'center',spotlight:{top:'0',left:'0',width:'0',height:'0',opacity:0},subtitlePos:{}};

describe('Preserved player course completion hook',()=>{
  afterEach(cleanup);
  it('keeps the recap on failure and saves before advancing when retry succeeds',async()=>{
    const complete=vi.fn().mockRejectedValueOnce(Error('offline')).mockResolvedValue(undefined);
    const advance=vi.fn();
    render(<FoundationCompletionContext.Provider value={{complete,advance,nextLabel:'Next'}}><VideoTutorialViewer steps={[recap]} /></FoundationCompletionContext.Provider>);
    fireEvent.click(await screen.findByRole('button',{name:'Next'}));
    await screen.findByText('Completion could not be saved. Please try again.');
    expect(advance).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button',{name:'Next'}));
    await waitFor(()=>expect(advance).toHaveBeenCalledOnce());
    expect(complete).toHaveBeenCalledTimes(2);
  });
});
