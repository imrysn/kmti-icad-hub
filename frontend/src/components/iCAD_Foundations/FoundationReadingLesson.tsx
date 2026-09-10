import { useEffect, useMemo, useState, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { useTranslation } from '../../context/LanguageContext';
import { useLessonCore } from '../../hooks/useLessonCore';
import { useTTSAutoplay } from '../../hooks/useTTSAutoplay';
import WrittenTutorialPanel from './WrittenTutorial_EN/WrittenTutorialPanel';
import LessonQuestionPanel from '../LessonQuestionPanel';
import { KaraokeLessonText } from '../KaraokeLessonText';
import { foundationReadingText, type FoundationLesson } from './curriculum';
import { foundationKnowledgeQuestions } from './knowledgeCheck';
import FoundationQuizModal from './FoundationQuizModal';
import { standardLessonContent } from './standardLessonContent';
import FoundationUsesCards from './FoundationUsesCards';
import FoundationStartingSteps from './FoundationStartingSteps';
import FoundationHelpSteps from './FoundationHelpSteps';
import FoundationScreenAreas from './FoundationScreenAreas';
import FoundationInterfaceContent from './FoundationInterfaceContent';
import FoundationMouseControls from './FoundationMouseControls';
import FoundationRotationControls from './FoundationRotationControls';
import FoundationViewExamples from './FoundationViewExamples';
import FoundationStandardViewSteps from './FoundationStandardViewSteps';
import FoundationKeyboardContent from './FoundationKeyboardContent';
import FoundationCoordinateAxes from './FoundationCoordinateAxes';
import FoundationPartLayoutSteps from './FoundationPartLayoutSteps';
import FoundationViewComparison from './FoundationViewComparison';
import '../3D_Modeling/CourseLesson.css';
import '../PublicCourses/Foundations/FoundationsLesson.css';
import '../../styles/iCAD_Foundations/WrittenTutorial/WrittenTutorialPanel.css';
import './FoundationStandardLayout.css';

interface Props {
  lesson: FoundationLesson;
  onComplete: () => Promise<void>;
  onNext: () => void;
  onPrevious?: () => void;
  isLast: boolean;
  tutorial?: ReactNode;
}

/** Shared reading, tutorial and knowledge-check structure for every Foundations lesson. */
export default function FoundationReadingLesson({ lesson, onComplete, onNext, onPrevious, isLast, tutorial }: Props) {
  const { language } = useTranslation();
  const lang = language === 'ja' ? 'ja' : 'en';
  const ja = lang === 'ja';
  const content = useMemo(() => standardLessonContent(lesson, lang), [lesson, lang]);
  const title = lesson.title[lang];
  const text = useMemo(() => [title, ...foundationReadingText(content)], [title, content]);
  const { containerRef, scrollProgress, speak, stop, registerText, isSpeaking, currentIndex, currentCharIndex } = useLessonCore(lesson.id);
  const [stage, setStage] = useState<'reading' | 'quiz'>('reading');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choice, setChoice] = useState('');
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isWorkflow = lesson.id === 'F1.3';
  const isStarting = lesson.id === 'F1.4';
  const isClosing = lesson.id === 'F1.5';
  const isHelp = lesson.id === 'F1.6';
  const questions = useMemo(() => foundationKnowledgeQuestions(lang, lesson.id), [lang, lesson.id]);
  const question = questions[questionIndex];

  useEffect(() => { registerText(text, 0); }, [text, registerText]);
  useEffect(() => { stop(); setStage('reading'); setQuestionIndex(0); setChoice(''); setChecked(false); }, [lesson.id, lang, stop]);

  const narrateQuestion = (index: number) => {
    const q = questions[index];
    const introduction = ja ? '理解度チェックを始めましょう。' : "Now, let's do a knowledge check. ";
    const instruction = ja ? '回答を一つ選んでください。' : ' Choose one answer. ';
    const choices = q.choices.map((item, i) => `${ja ? '選択肢' : 'Choice '}${i + 1}: ${item.label}.`).join(' ');
    speak([`${introduction}${q.prompt}${instruction}${choices}`], 0);
  };
  const finishReading = () => {
    stop();
    setStage('quiz'); narrateQuestion(0);
  };
  useTTSAutoplay(isSpeaking, currentIndex, 'reading', stage === 'reading' ? text.length : 0,
    [{ id: 'reading' }], finishReading, speak, stage === 'reading' ? text : [], 0);

  const finish = async () => {
    if (saving) return;
    stop(); setSaving(true); setError('');
    try { await onComplete(); onNext(); }
    catch { setError(ja ? '保存できませんでした。もう一度お試しください。' : 'Completion could not be saved. Please try again.'); }
    finally { setSaving(false); }
  };

  return <div ref={containerRef} className="course-lesson-container foundations-standard-intro foundations-video-reading-lesson foundations-consistent-lesson">
    <>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className={`foundations-video-reading-layout${content.sections ? ' foundations-authored-reading' : ''}${isWorkflow ? ' foundations-workflow' : ''}`}>
            <WrittenTutorialPanel title={title} description={content.explanation}
              stepsContent={lesson.id === 'F3.6' ? <FoundationRotationControls sections={content.sections || []} /> : lesson.id === 'F3.5' ? <FoundationMouseControls sections={content.sections || []} pan /> : lesson.id === 'F3.3' ? <FoundationMouseControls sections={content.sections || []} zoom /> : lesson.id === 'F3.1' ? <FoundationMouseControls sections={content.sections || []} /> : lesson.id === 'F2.9' ? <FoundationInterfaceContent japanese={ja} sections={content.sections?.slice(0, 13)} why={content.sections?.[13]} /> : lesson.id === 'F2.1' ? <FoundationInterfaceContent japanese={ja} why={content.sections?.[1]} /> : isHelp ? <FoundationHelpSteps sections={content.sections || []} /> : isStarting || isClosing ? <>
                <FoundationStartingSteps sections={(content.sections || []).slice(0, 4)} japanese={ja} closing={isClosing} />
                {isClosing && content.sections?.[4] && <div className="written-tutorial-panel__quick-review">
                  <h4 className="section-title">{content.sections[4].title}</h4><p>{content.sections[4].text}</p>
                </div>}
              </> : undefined}
              renderStepText={lesson.id === 'F5.6' ? (step,index) => index === 1 ? <FoundationPartLayoutSteps text={step.text} /> : undefined : lesson.id === 'F5.4' ? (step,index) => index < 2 ? <FoundationCoordinateAxes text={step.text} origin={index===1} /> : undefined : lesson.id === 'F5.1' ? (step,index) => index < 2 ? <FoundationKeyboardContent text={step.text} inputFlow={index===1} /> : undefined : lesson.id === 'F1.1' ? (step, index) => index === 1 ? <FoundationViewComparison text={step.text} designEnvironments /> : undefined : ['F4.1','F4.6','F4.12'].includes(lesson.id) ? (step, index) => index === 0 ? <FoundationViewExamples text={step.text} commands userViews={lesson.id === 'F4.6'} shading={lesson.id === 'F4.12'} /> : index === 1 ? <FoundationStandardViewSteps text={step.text} japanese={ja} /> : undefined : lesson.id === 'F2.1' ? (step, index) => index === 0 ? <FoundationScreenAreas text={step.text} /> : undefined : lesson.id === 'F1.2' ? (step, index) => index === 0 ? <FoundationUsesCards text={step.text} /> : undefined : undefined}
              copy={{ objectiveLabel: ja ? '学習目標' : 'Learning objective', objective: content.practice,
                description2: content.description2,
                hideStepNumbers: Boolean(content.sections) && !isWorkflow,
                procedureTitle: lesson.id === 'F3.6' ? (ja ? '3D ビューを回転する方法' : 'How to Rotate the 3D View') : lesson.id === 'F3.5' ? (ja ? 'パンの方法' : 'How to Pan') : lesson.id === 'F3.1' ? (ja ? '基本的なマウス操作' : 'Basic Mouse Controls') : lesson.id === 'F2.9' ? (ja ? 'iCAD SX の主なツールバー' : 'Main iCAD SX Toolbars') : lesson.id === 'F2.1' ? (ja ? 'iCAD SX の画面の主な領域' : 'Main Areas of the iCAD SX Screen') : isHelp ? (ja ? 'iCAD SX ヘルプの使い方' : 'Using iCAD SX Help') : isClosing ? (ja ? 'iCAD SX の終了' : 'Closing iCAD SX') : isStarting ? (ja ? 'iCAD SX の起動' : 'Starting iCAD SX') : isWorkflow ? (ja ? '基本的な流れ' : 'Basic Workflow') : content.sections ? '' : ja ? '説明と練習' : 'Explanation and practice',
                completionText: ja ? '理解度チェックへ進みましょう。' : 'Continue to the knowledge check.',
                quickReviewTitle: ja ? '確認' : 'Quick Review', quickReviewText: content.quickReview || content.explanation }}
              steps={content.sections ? content.sections.map((section, index) => ({ ...section, id: index + 1, preserveText: true })) :
                [{ id: 1, title: ja ? '理解する' : 'Understand', text: content.explanation, preserveText: true },
                { id: 2, title: ja ? 'やってみる' : 'Try it', text: content.practice, preserveText: true }]} />
            {tutorial && <div className="foundations-preserved-tutorial">{tutorial}</div>}
          </div>
          {isSpeaking && <KaraokeLessonText text={text[currentIndex] || ''} isActive currentCharIndex={currentCharIndex} />}
          <div className="lesson-navigation">
            {onPrevious && <button className="nav-button" onClick={() => { stop(); onPrevious(); }}>{ja ? '前へ' : 'Previous'}</button>}
            <button className="nav-button next" onClick={finishReading}>{ja ? '理解度チェックを開始' : 'Start knowledge check'}</button>
          </div>
        </div>
      </div>
    </>
    {stage === 'quiz' && <FoundationQuizModal><div className="foundations-knowledge-check"><LessonQuestionPanel question={question} selectedChoice={choice} answerChecked={checked}
      continueLabel={questionIndex === questions.length - 1 ? (saving ? (ja ? '保存中…' : 'Saving…') : error ? (ja ? '保存を再試行' : 'Retry saving') : isLast ? (ja ? '閉じる' : 'Close') : (ja ? '次へ' : 'Next')) : undefined}
      onSelectChoice={setChoice} onCheckAnswer={() => {
        const selected = question.choices.find(item => item.id === choice);
        if (!selected) return;
        setChecked(true);
        if (selected.isCorrect) confetti({ particleCount: 70, spread: 60 });
        speak([selected.isCorrect ? `${ja ? '正解です。' : 'Correct! '}${selected.feedback}` :
          `${ja ? '違います。' : 'Not quite. '}${selected.feedback}${ja ? 'もう一度お試しください。' : ' Please try again.'}`], 0);
      }}
      onRetry={() => { setChecked(false); setChoice(''); narrateQuestion(questionIndex); }}
      onContinue={() => {
        if (!checked || !question.choices.find(item => item.id === choice)?.isCorrect) return;
        if (questionIndex === questions.length - 1) void finish();
        else { setQuestionIndex(questionIndex + 1); setChoice(''); setChecked(false); narrateQuestion(questionIndex + 1); }
      }} />{error && <div role="alert" className="foundations-knowledge-check__error">{error}</div>}</div></FoundationQuizModal>}
  </div>;
}









