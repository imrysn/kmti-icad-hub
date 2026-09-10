import { fireEvent, render, screen, waitFor, cleanup, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FoundationReadingLesson from '../FoundationReadingLesson';
import FoundationScreenAreas from '../FoundationScreenAreas';
import { FOUNDATION_LESSON_IDS, resolveFoundationLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

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

  it('opens a screen image full-screen, zooms, resets, and closes', () => {
    render(<FoundationScreenAreas text={resolveFoundationLesson('F2.1')!.content.en.sections![0].text} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open full-screen image: Menu Bar' }));
    const viewer = screen.getByRole('dialog', { name: 'Menu Bar' });
    expect(viewer.parentElement).toBe(document.body);
    expect(within(viewer).getByRole('img')).toHaveAttribute('src', expect.stringContaining('menu-bar.jpg'));
    fireEvent.click(within(viewer).getByRole('button', { name: 'Zoom in' }));
    expect(within(viewer).getByRole('status')).toHaveTextContent('150%');
    fireEvent.click(within(viewer).getByRole('button', { name: 'Zoom out' }));
    expect(within(viewer).getByRole('status')).toHaveTextContent('100%');
    fireEvent.click(within(viewer).getByRole('button', { name: 'Zoom in' }));
    fireEvent.click(within(viewer).getByRole('button', { name: 'Reset zoom' }));
    expect(within(viewer).getByRole('status')).toHaveTextContent('100%');
    fireEvent.click(within(viewer).getByRole('button', { name: 'Close image' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it.each(FOUNDATION_LESSON_IDS.filter(id => id !== 'F10.6'))('replaces %s recap with its question and saves only after a correct answer', async (id) => {
    const complete = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined);
    const next = vi.fn();
    render(<FoundationReadingLesson lesson={resolveFoundationLesson(id)!} onComplete={complete} onNext={next} isLast={false} />);
    expect(screen.queryByRole('button', { name: 'Review lesson' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start knowledge check' }));
    const modal = document.querySelector('dialog')!;
    expect(modal.open).toBe(true);
    expect(modal.parentElement).toBe(document.body);
    expect(document.body.style.overflow).toBe('hidden');
    const cancel = new Event('cancel', { cancelable: true });
    modal.dispatchEvent(cancel);
    expect(cancel.defaultPrevented).toBe(true);
    const question = foundationKnowledgeQuestions('en', id)[0];
    expect(screen.getByRole('heading', { name: question.prompt, level: 3 })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    fireEvent.click(screen.getByLabelText(question.choices.find(c => !c.isCorrect)!.label));
    fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(complete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    const correct = question.choices.find(c => c.isCorrect)!;
    fireEvent.click(screen.getByLabelText(correct.label));
    fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));
    expect(within(modal).getByRole('status')).toHaveTextContent(`Correct Answer: ${correct.label}`);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await screen.findByRole('alert');
    expect(next).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Retry saving' }));
    await waitFor(() => expect(next).toHaveBeenCalledOnce());
    expect(complete).toHaveBeenCalledTimes(2);
    expect(screen.queryByText('Lesson Recap')).not.toBeInTheDocument();
  });

  it('blocks continuation on wrong answers and narrates every question, feedback before saving', async () => {
    const complete=vi.fn().mockResolvedValue(undefined); const next=vi.fn();
    render(<FoundationReadingLesson lesson={resolveFoundationLesson('F10.6')!} onComplete={complete} onNext={next} isLast />);
    fireEvent.click(screen.getByRole('button',{name:'Start knowledge check'}));
    const questions=foundationKnowledgeQuestions('en');
    fireEvent.click(screen.getByLabelText(questions[0].choices.find(c=>!c.isCorrect)!.label));
    fireEvent.click(screen.getByRole('button',{name:'Check Answer'}));
    expect(screen.queryByRole('button',{name:'Continue Lesson'})).not.toBeInTheDocument();
    expect(state.speak).toHaveBeenLastCalledWith([expect.stringContaining('Not quite.')],0);
    fireEvent.click(screen.getByRole('button',{name:'Retry'}));
    for(const question of questions) {
      expect(state.speak).toHaveBeenLastCalledWith([expect.stringContaining(question.prompt)],0);
      fireEvent.click(screen.getByLabelText(question.choices.find(c=>c.isCorrect)!.label));
      fireEvent.click(screen.getByRole('button',{name:'Check Answer'}));
      expect(state.speak).toHaveBeenLastCalledWith([expect.stringContaining('Correct!')],0);
      fireEvent.click(screen.getByRole('button',{name:question === questions[questions.length - 1] ? 'Close' : 'Continue Lesson'}));
    }
    await waitFor(()=>expect(next).toHaveBeenCalledOnce());
    expect(complete).toHaveBeenCalledOnce();
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
});












