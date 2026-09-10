import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LessonViewer } from '../../../views/mentor/components/LessonViewer';
import { createFoundationLessons } from '../curriculum';
import { foundationKnowledgeQuestions } from '../knowledgeCheck';

const state=vi.hoisted(()=>({post:vi.fn().mockResolvedValue({}), stop:vi.fn(), speak:vi.fn()}));
// jsdom does not implement element scrolling; the real browser does.
Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() });
Object.defineProperty(window, 'scrollTo', { configurable: true, value: vi.fn() });
HTMLDialogElement.prototype.showModal = vi.fn(function(this: HTMLDialogElement) { this.open = true; });
HTMLDialogElement.prototype.close = vi.fn(function(this: HTMLDialogElement) { this.open = false; });
vi.mock('../../../hooks/useLessonCore',()=>({useLessonCore:()=>({containerRef:{current:null},stop:state.stop,speak:state.speak,registerText:vi.fn(),isSpeaking:false,currentIndex:-1,currentCharIndex:0})}));
vi.mock('../../../hooks/useTTSAutoplay',()=>({useTTSAutoplay:vi.fn()}));
vi.mock('canvas-confetti',()=>({default:vi.fn()}));
vi.mock('../../../services/api',()=>({default:{post:state.post,get:vi.fn()}}));
vi.mock('../../../hooks/useAuth',()=>({useAuth:()=>({})}));
vi.mock('../../../context/TTSContext',()=>({useTTSContext:()=>({stop:state.stop,speak:state.speak,isSpeaking:false,currentIndex:-1,setCurrentIndex:vi.fn(),activeParagraphText:''})}));
vi.mock('../../../context/LanguageContext',()=>({useTranslation:()=>({language:'en',t:(s:string)=>s,translateContent:(s:string)=>s})}));
vi.mock('../../../services/authService',()=>({authService:{getStorageKey:(s:string)=>s}}));
vi.mock('../../../views/mentor/components/QuizModal',()=>({QuizModal:()=>null}));
vi.mock('../../3D_Modeling/3D_BasicOperation',()=>({default:({subLessonId,onNextLesson}:{subLessonId:string,onNextLesson:()=>void})=><button onClick={onNextLesson}>shape {subLessonId}</button>}));
vi.mock('../../PublicCourses/Foundations/DynamicFoundationsLesson',()=>({default:({lessonId,videoId,onNextLesson}:{lessonId:string,videoId:string,onNextLesson:()=>void})=><button onClick={onNextLesson}>{lessonId} {videoId}</button>}));

function viewer(id:string, next=vi.fn()) {
  return render(<LessonViewer is2DDrawingCourse={false} isFoundationsCourse courseId="foundations" activeLessonId={id}
    currentLessonIndex={0} allLessonIdsLength={60} goToNextLesson={next} goToPrevLesson={vi.fn()}
    getActiveLessonTitle={()=>id} lessons={createFoundationLessons()} completedLessons={[]} onLessonComplete={vi.fn()} />);
}

describe('Canonical Foundations lesson routing',()=>{
  afterEach(()=>{cleanup();vi.clearAllMocks();});
  it('preserves Box and requires the shared knowledge check before saving',async()=>{
    const next=vi.fn();viewer('F9.5',next);
    fireEvent.click(await screen.findByRole('button',{name:'shape basic-op-box'}));
    expect(state.post).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button',{name:'Start knowledge check'}));
    fireEvent.click(screen.getByLabelText(foundationKnowledgeQuestions('en','F9.5')[0].choices.find(c=>c.isCorrect)!.label));
    fireEvent.click(screen.getByRole('button',{name:'Check Answer'}));
    fireEvent.click(screen.getByRole('button',{name:'Next'}));
    await waitFor(()=>expect(next).toHaveBeenCalledOnce());
    expect(state.post).toHaveBeenCalledWith('/auth/submit-quiz',expect.objectContaining({lesson_id:'F9.5',score:100}));
  });
  it('passes original Move data to the dynamic player but persists canonical progress',async()=>{
    viewer('F9.9');
    fireEvent.click(await screen.findByRole('button',{name:'lesson-6-1 basicMove'}));
    expect(state.post).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button',{name:'Start knowledge check'}));
    fireEvent.click(screen.getByLabelText(foundationKnowledgeQuestions('en','F9.9')[0].choices.find(c=>c.isCorrect)!.label));
    fireEvent.click(screen.getByRole('button',{name:'Check Answer'}));
    fireEvent.click(screen.getByRole('button',{name:'Next'}));
    await waitFor(()=>expect(state.post).toHaveBeenCalledWith('/auth/submit-quiz',expect.objectContaining({lesson_id:'F9.9'})));
  });
  it('does not route an old advanced shape bookmark through the generic prefix router',async()=>{
    viewer('basic-op-cone');
    expect(await screen.findByRole('status')).toHaveTextContent('no longer part of Foundations');
    expect(screen.queryByRole('button',{name:'shape basic-op-cone'})).not.toBeInTheDocument();
    expect(state.post).not.toHaveBeenCalled();
  });
});
