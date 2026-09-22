import { fireEvent, render, screen, waitFor, cleanup, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FoundationReadingLesson from '../FoundationReadingLesson';
import FoundationInterfaceContent from '../FoundationInterfaceContent';
import { FOUNDATION_LESSON_IDS, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';
import confetti from 'canvas-confetti';
import { professionalRenderLesson } from '../../iCAD_Professional/curriculum';

const state = vi.hoisted(() => ({language:'en', speak:vi.fn(), stop:vi.fn(), register:vi.fn()}));
vi.mock('../../../context/LanguageContext', () => ({useTranslation: () => ({language:state.language, t:(s:string)=>s, translateContent:(s:string)=>s})}));
vi.mock('../../../hooks/useLessonCore', () => ({useLessonCore: () => ({containerRef:{current:null}, speak:state.speak, stop:state.stop,
  registerText:state.register, isSpeaking:false, currentIndex:-1, currentCharIndex:0})}));
vi.mock('../../../hooks/useTTSAutoplay', () => ({useTTSAutoplay: vi.fn()}));
vi.mock('canvas-confetti', () => ({default:vi.fn()}));

describe('Foundations written completion and knowledge check', () => {
  beforeEach(() => {
    state.language='en'; vi.clearAllMocks();
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) { this.open = true; });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) { this.open = false; });
  });
  afterEach(cleanup);

  it.each(['P8.1','P8.2','P8.3','P8.4','P8.5','P8.6','P8.7'])('renders the Professional operation palette through the real %s lesson mapping', id => {
    const {container}=render(<FoundationReadingLesson lesson={professionalRenderLesson(id)!} onComplete={vi.fn()} onNext={vi.fn()} isLast={false}/>);
    expect(container.querySelector('.foundations-use-card__icon-frame .foundation-operation-menu')).not.toBeNull();
    if(id!=='P8.1') {
      const previews=container.querySelectorAll('.foundation-operation-preview button');
      expect(previews).toHaveLength(id==='P8.7'?3:4);
      fireEvent.click(previews[0]);
      const topic=({'P8.2':'copy','P8.3':'rotate','P8.4':'rotateCopy','P8.5':'mirror','P8.6':'mirrorCopy','P8.7':'delete'} as Record<string,string>)[id];
      expect(within(screen.getByRole('dialog')).getByRole('img',{name:'Full iCAD SX interface'})).toHaveAttribute('src',expect.stringContaining(`/professional/${topic}-2.png`));
    }
    if(id==='P8.1') {
      expect(container.querySelectorAll('.foundation-move-preview button')).toHaveLength(4);
      fireEvent.click(screen.getByRole('button',{name:'Enlarge: Select Move'}));
      expect(within(screen.getByRole('dialog')).getByRole('img',{name:'Full iCAD SX interface'})).toHaveAttribute('src',expect.stringContaining('/professional/move.png'));
    }
  });

  it.each(['en', 'ja'] as const)('shows the F10 review as a ten-topic checklist in %s', language => {
    state.language = language;
    const { container } = render(<FoundationReadingLesson lesson={resolveFoundationLesson('F10.1')!} onComplete={vi.fn()} onNext={vi.fn()} isLast={false} />);
    const list = container.querySelector('.quick-review-checklist')!;
    expect(list.querySelectorAll('li')).toHaveLength(10);
    expect(list.textContent).not.toContain('→');
  });

  it('uses two SVG file controls and locates each on the new-menu screenshot', () => {
    render(<FoundationReadingLesson lesson={resolveFoundationLesson('F8.1')!} onComplete={vi.fn()} onNext={vi.fn()} isLast={false} />);
    expect(document.querySelectorAll('.foundation-create-item-cards .foundations-use-card')).toHaveLength(2);
    for (const title of ['File (F)', 'New (N)']) {
      const button = screen.getByRole('button', {name: 'Enlarge: ' + title});
      expect(button.querySelector('svg')).not.toBeNull();
      expect(button.querySelector('img')).toBeNull();
      fireEvent.click(button);
      const dialog = screen.getByRole('dialog', {name: title});
      const image = within(dialog).getByRole('img', {name: 'Full iCAD SX interface'});
      expect(image).toHaveAttribute('src', expect.stringContaining('file-new-menu.png'));
      fireEvent.load(image);
      fireEvent.click(within(dialog).getByRole('button', {name: 'Show location'}));
      expect(dialog).toHaveAttribute('data-phase', 'moving');
      fireEvent.click(dialog);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    }
  });

  it('renders six authored Cylinder cards while keeping the tutorial available', () => {
    const { container } = render(<FoundationReadingLesson lesson={resolveFoundationLesson('F9.6')!} onComplete={vi.fn()} onNext={vi.fn()} isLast={false} tutorial={<div>Preserved cylinder video</div>} />);
    expect(container.querySelectorAll('.foundation-modeling-process .foundations-use-card')).toHaveLength(6);
    expect(screen.getByRole('heading', { name: 'Select Cylinder' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Enter the Size' })).toBeVisible();
    expect(container.querySelector('.foundation-modeling-size-fields')).toHaveTextContent('直径');
    expect(container.querySelector('.foundation-modeling-size-fields')).toHaveTextContent('10');
    expect(screen.getByText('Preserved cylinder video')).toBeInTheDocument();
  });

  it.each(['en', 'ja'] as const)('renders authored F9 procedures and practice in %s without legacy duplication', language => {
    state.language = language;
    for (const id of ['F9.1', 'F9.5', 'F9.6', 'F9.7', 'F9.9', 'F9.10', 'F9.11']) {
      const lesson = resolveFoundationLesson(id)!;
      expect(lesson.content.ja.sections?.length).toBe(lesson.content.en.sections?.length);
      const { container, unmount } = render(<FoundationReadingLesson lesson={lesson} onComplete={vi.fn()} onNext={vi.fn()} isLast={false} tutorial={<div>Existing tutorial</div>} />);
      expect(container.querySelectorAll('.foundation-modeling-process .foundations-use-card')).toHaveLength(['F9.5','F9.6','F9.7'].includes(id) ? 6 : 4);
      expect(screen.getByRole('heading', { name: language === 'ja' ? 'やってみましょう' : 'Try It' })).toBeVisible();
      expect(screen.getByText('Existing tutorial')).toBeInTheDocument();
      expect(container.querySelectorAll('.foundation-modeling-process')).toHaveLength(1);
      unmount();
    }
  });

  it.each(['en', 'ja'] as const)('keeps all four F7 lessons and their examples aligned in %s', language => {
    state.language = language;
    for (const [id, cardCount] of [['F7.1', 3], ['F7.3', 4], ['F7.6', 2], ['F7.8', 2]] as const) {
      const lesson = resolveFoundationLesson(id)!;
      expect(lesson.content.ja.sections?.length).toBe(lesson.content.en.sections?.length);
      const { container, unmount } = render(<FoundationReadingLesson lesson={lesson} onComplete={vi.fn()} onNext={vi.fn()} isLast={false} />);
      expect(container.querySelectorAll('.foundations-use-card, .foundations-starting-step')).toHaveLength(cardCount);
      if (id === 'F7.1' || id === 'F7.3') {
        fireEvent.click(screen.getByRole('button', { name: language === 'ja' ? '画像を全画面表示' : 'View image fullscreen' }));
        expect(screen.getByRole('dialog', { name: language === 'ja' ? '全画面の実例' : 'Full-size example' })).toBeVisible();
        fireEvent.click(screen.getByRole('button', { name: language === 'ja' ? '画像を閉じる' : 'Close image' }));
      }
      if (id === 'F7.8') expect(container.textContent).toContain(language === 'ja' ? '同じ設計を異なる方法で表します' : 'describe the same design in different ways');
      unmount();
    }
  });

  it('shows native interface vectors and opens their full detail', () => {
    const {container}=render(<FoundationInterfaceContent japanese={false}/>);
    expect(container.querySelector('svg image')).toBeNull();
    fireEvent.click(screen.getByRole('button',{name:'Enlarge: Icon Menu'}));
    const viewer=screen.getByRole('dialog',{name:'Icon Menu'});
    expect(within(viewer).getByRole('img',{name:'Icon Menu'})).toHaveAttribute('viewBox','0 0 173 365');
    expect(viewer.querySelector('image')).toBeNull();
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(within(viewer).getByRole('button',{name:'Close enlarged icon'}));
    expect(screen.queryByRole('dialog',{name:'Icon Menu'})).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it.each(FOUNDATION_LESSON_IDS.filter(id => id !== 'F10.6'))('replaces %s recap with its question and saves only after a correct answer', async (id) => {
    const complete = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined);
    const next = vi.fn();
    render(<FoundationReadingLesson lesson={resolveFoundationLesson(id)!} onComplete={complete} onNext={next} isLast={false} />);
    expect(screen.queryByRole('button', { name: 'Review lesson' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start knowledge check' }));
    const modal = document.querySelector<HTMLDialogElement>('dialog[open]')!;
    expect(modal.open).toBe(true);
    expect(modal.parentElement).toBe(document.body);
    expect(document.body.style.overflow).toBe('hidden');
    const cancel = new Event('cancel', { cancelable: true });
    fireEvent(modal, cancel);
    expect(cancel.defaultPrevented).toBe(true);
    expect(document.querySelector('dialog[open]')).toBe(modal);
    expect(complete).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Return to lesson' })).not.toBeInTheDocument();
    expect(modal.querySelector('.foundations-knowledge-check__header')).toBeNull();
    const question = foundationKnowledgeQuestions('en', id)[0];
    expect(screen.getByRole('heading', { name: question.prompt, level: 3 })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    fireEvent.click(screen.getByLabelText(question.choices.find(c => !c.isCorrect)!.label));
    fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));
    expect(screen.queryByRole('button', { name: 'Complete lesson' })).not.toBeInTheDocument();
    expect(complete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    const correct = question.choices.find(c => c.isCorrect)!;
    fireEvent.click(screen.getByLabelText(correct.label));
    fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));
    expect(within(modal).getByRole('status')).toHaveTextContent(`Correct Answer: ${correct.label}`);
    fireEvent.click(screen.getByRole('button', { name: 'Complete lesson' }));
    await screen.findByRole('alert');
    expect(next).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Retry saving' }));
    await waitFor(() => expect(document.querySelector('dialog[open]')).toBeNull());
    expect(complete).toHaveBeenCalledTimes(2);
    expect(next).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Start knowledge check' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next lesson' }));
    expect(next).toHaveBeenCalledOnce();
    expect(screen.queryByText('Lesson Recap')).not.toBeInTheDocument();
  });

  it('blocks continuation on wrong answers and narrates every question, feedback before saving', async () => {
    const complete=vi.fn().mockResolvedValue(undefined); const next=vi.fn();
    render(<FoundationReadingLesson lesson={resolveFoundationLesson('F10.6')!} onComplete={complete} onNext={next} isLast />);
    fireEvent.click(screen.getByRole('button',{name:'Start knowledge check'}));
    const questions=foundationKnowledgeQuestions('en');
    expect(screen.getByText('Question 1 of 12')).toBeVisible();
    fireEvent.click(screen.getByLabelText(questions[0].choices.find(c=>!c.isCorrect)!.label));
    fireEvent.click(screen.getByRole('button',{name:'Check Answer'}));
    expect(screen.queryByRole('button',{name:'Next question'})).not.toBeInTheDocument();
    expect(state.speak).toHaveBeenLastCalledWith([expect.stringContaining('Not quite.')],0);
    fireEvent.click(screen.getByRole('button',{name:'Retry'}));
    for(const question of questions) {
      expect(screen.getByText(`Question ${questions.indexOf(question) + 1} of 12`)).toBeVisible();
      expect(state.speak).toHaveBeenLastCalledWith([expect.stringContaining(question.prompt)],0);
      expect(state.speak.mock.lastCall![0][0].includes("Now, let's do a knowledge check")).toBe(question === questions[0]);
      fireEvent.click(screen.getByLabelText(question.choices.find(c=>c.isCorrect)!.label));
      fireEvent.click(screen.getByRole('button',{name:'Check Answer'}));
      expect(state.speak).toHaveBeenLastCalledWith([expect.stringContaining('Correct!')],0);
      expect(confetti).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button',{name:question === questions[questions.length - 1] ? 'Complete course' : 'Next question'}));
    }
    await waitFor(()=>expect(document.querySelector('dialog[open]')).toBeNull());
    expect(complete).toHaveBeenCalledOnce();
    expect(confetti).toHaveBeenCalledOnce();
    expect(next).not.toHaveBeenCalled();
    expect(screen.getByRole('button',{name:'Course complete'})).toBeDisabled();
  });

  it('renders Japanese reading and knowledge check without falling back to English', () => {
    state.language='ja';
    const lesson=resolveFoundationLesson('F4.8')!;
    render(<FoundationReadingLesson lesson={lesson} onComplete={vi.fn()} onNext={vi.fn()} isLast={false} />);
    expect(screen.getByText(lesson.title.ja)).toBeInTheDocument();
    expect(screen.queryByText(lesson.title.en)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button',{name:'理解度チェックを開始'}));
    expect(state.speak).toHaveBeenLastCalledWith([expect.stringContaining(foundationKnowledgeQuestions('ja', lesson.id)[0].prompt)],0);
  });

  it('shows Next lesson immediately for a lesson completed earlier', () => {
    const next = vi.fn();
    render(<FoundationReadingLesson lesson={resolveFoundationLesson('F2.1')!} onComplete={vi.fn()} onNext={next} isLast={false} completed />);
    expect(screen.queryByRole('button', { name: 'Start knowledge check' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next lesson' }));
    expect(next).toHaveBeenCalledOnce();
    expect(document.querySelector('dialog[open]')).toBeNull();
  });

  it('uses Japanese completion labels and has no return button', async () => {
    state.language = 'ja';
    const lesson = resolveFoundationLesson('F1.1')!;
    render(<FoundationReadingLesson lesson={lesson} onComplete={vi.fn().mockResolvedValue(undefined)} onNext={vi.fn()} isLast={false} />);
    fireEvent.click(screen.getByRole('button', { name: '理解度チェックを開始' }));
    expect(screen.queryByRole('button', { name: 'レッスンに戻る' })).not.toBeInTheDocument();
    const correct = foundationKnowledgeQuestions('ja', lesson.id)[0].choices.find(c => c.isCorrect)!;
    fireEvent.click(screen.getByLabelText(correct.label));
    fireEvent.click(screen.getByRole('button', { name: '回答を確認' }));
    fireEvent.click(screen.getByRole('button', { name: 'レッスンを完了' }));
    expect(await screen.findByRole('button', { name: '次のレッスン' })).toBeInTheDocument();
  });

  it('disables completion while saving and clears a save error when the lesson changes', async () => {
    let resolveSave!: () => void;
    const complete = vi.fn().mockReturnValueOnce(new Promise<void>(resolve => { resolveSave = resolve; })).mockRejectedValueOnce(new Error('offline'));
    const props = { onComplete: complete, onNext: vi.fn(), isLast: false };
    const answer = (id: string) => {
      fireEvent.click(screen.getByRole('button', { name: 'Start knowledge check' }));
      fireEvent.click(screen.getByLabelText(foundationKnowledgeQuestions('en', id)[0].choices.find(c => c.isCorrect)!.label));
      fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));
      fireEvent.click(screen.getByRole('button', { name: 'Complete lesson' }));
    };
    const { rerender } = render(<FoundationReadingLesson lesson={resolveFoundationLesson('F1.1')!} {...props} />);
    answer('F1.1');
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled();
    resolveSave();
    await screen.findByRole('button', { name: 'Next lesson' });
    rerender(<FoundationReadingLesson lesson={resolveFoundationLesson('F1.2')!} {...props} />);
    answer('F1.2');
    await screen.findByRole('alert');
    rerender(<FoundationReadingLesson lesson={resolveFoundationLesson('F1.3')!} {...props} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start knowledge check' })).toBeInTheDocument();
  });
});














