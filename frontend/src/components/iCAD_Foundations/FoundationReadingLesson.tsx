import { FoundationVisualContext } from './FoundationVisualContext';
import './FoundationCommandIcons.css';
import FoundationDraftingElementsTable from './FoundationDraftingElementsTable';
import FoundationShowHideSteps from './FoundationShowHideSteps';
import FoundationShowHideCommands from './FoundationShowHideCommands';
import FoundationStretchSteps from './FoundationStretchSteps';
import FoundationResizeSteps from './FoundationResizeSteps';
import FoundationShapeSteelLesson from './FoundationShapeSteelLesson';
import FoundationSaveSteps from './FoundationSaveSteps';
import FoundationModelingProcess from './FoundationModelingProcess';
import FoundationSaveComparison from './FoundationSaveComparison';
import FoundationCreateItemSteps from './FoundationCreateItemSteps';
import FoundationDrawingComparison from './FoundationDrawingComparison';
import FoundationPlateExample from './FoundationPlateExample';
import FoundationPartExamples from './FoundationPartExamples';
import FoundationDrawingStructure from './FoundationDrawingStructure';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { useTranslation } from '../../context/LanguageContext';
import { useLessonCore } from '../../hooks/useLessonCore';
import { useTTSAutoplay } from '../../hooks/useTTSAutoplay';
import WrittenTutorialPanel from './WrittenTutorial_EN/WrittenTutorialPanel';
import LessonQuestionPanel from '../LessonQuestionPanel';
import { KaraokeLessonText } from '../KaraokeLessonText';
import { foundationReadingText, type FoundationLesson } from './curriculum';
import { sourceKnowledgeQuestions as foundationKnowledgeQuestions } from './knowledgeCheck';
import FoundationQuizModal from './FoundationQuizModal';
import { standardLessonContent } from './standardLessonContent';
import FoundationUsesCards from './FoundationUsesCards';
import FoundationStartingSteps from './FoundationStartingSteps';
import FoundationHelpSteps from './FoundationHelpSteps';

import FoundationInterfaceContent from './FoundationInterfaceContent';
import FoundationMouseControls from './FoundationMouseControls';
import FoundationRotationControls from './FoundationRotationControls';
import FoundationViewExamples from './FoundationViewExamples';
import FoundationStandardViewSteps from './FoundationStandardViewSteps';
import FoundationKeyboardContent from './FoundationKeyboardContent';
import FoundationCoordinateAxes from './FoundationCoordinateAxes';
import FoundationElementCards from './FoundationElementCards';
import FoundationSelectionSteps from './FoundationSelectionSteps';
import FoundationSelectionTypes from './FoundationSelectionTypes';
import FoundationPartLayoutSteps from './FoundationPartLayoutSteps';
import FoundationOriginViews from './FoundationOriginViews';
import FoundationPlacementComparison from './FoundationPlacementComparison';

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
  /** True when saved progress already marks this lesson complete. */
  completed?: boolean;
}

/** Shared reading, tutorial and knowledge-check structure for every Foundations lesson. */
export default function FoundationReadingLesson({ lesson: canonicalLesson, onComplete, onNext, onPrevious, isLast, tutorial, completed = false }: Props) {
  const lesson = useMemo(() => canonicalLesson.presentationId ? { ...canonicalLesson, id: canonicalLesson.presentationId, moduleId: canonicalLesson.presentationModuleId || canonicalLesson.moduleId } : canonicalLesson, [canonicalLesson]);
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
  const [passed, setPassed] = useState(false);
  const done = completed || passed;
  const isWorkflow = lesson.id === 'F1.3';
  const isStarting = lesson.id === 'F1.4';
  const isClosing = lesson.id === 'F1.5';
  const isHelp = lesson.id === 'F1.6';
  // iCAD Professional P7 lessons use their own shape screenshots (copied lessons keep sourceLessonId).
  const isProfessionalShape = lesson.moduleId === 'P7' || ('sourceLessonId' in lesson && ['F9.5', 'F9.6', 'F9.7'].includes(lesson.id));
  const isProfessionalOperation = lesson.moduleId === 'P8' || ('sourceLessonId' in lesson && ['F9.9', 'F9.10', 'F9.11'].includes(lesson.id));
  const questions = useMemo(() => foundationKnowledgeQuestions(lang, lesson.id), [lang, lesson.id]);
  const question = questions[questionIndex];
  const textKey = useMemo(() => text.join('\u0001'), [text]);
  const registerTextRef = useRef(registerText);
  registerTextRef.current = registerText;

  useEffect(() => { registerTextRef.current(text, 0); }, [textKey]);
  useEffect(() => { stop(); setStage('reading'); setQuestionIndex(0); setChoice(''); setChecked(false); setError(''); setPassed(false); }, [lesson.id, lang, stop]);

  const narrateQuestion = (index: number) => {
    const q = questions[index];
    const introduction = index > 0 ? '' : ja ? '理解度チェックを始めましょう。' : "Now, let's do a knowledge check. ";
    const instruction = ja ? '回答を一つ選んでください。' : ' Choose one answer. ';
    const choices = q.choices.map((item, i) => `${ja ? '選択肢' : 'Choice '}${i + 1}: ${item.label}.`).join(' ');
    speak([`${introduction}${q.prompt}${instruction}${choices}`], 0);
  };
  const finishReading = () => {
    stop();
    if (done || !questions.length) return;
    setStage('quiz'); narrateQuestion(questionIndex);
  };
  useTTSAutoplay(isSpeaking, currentIndex, 'reading', stage === 'reading' ? text.length : 0,
    [{ id: 'reading' }], finishReading, speak, stage === 'reading' ? text : [], 0);

  const finish = async () => {
    if (saving) return;
    stop(); setSaving(true); setError('');
    try { await onComplete(); if (lesson.id === 'F16.2') confetti({ particleCount: 70, spread: 60 }); setPassed(true); setStage('reading'); }
    catch { setError(ja ? '保存できませんでした。もう一度お試しください。' : 'Completion could not be saved. Please try again.'); }
    finally { setSaving(false); }
  };

  return <FoundationVisualContext.Provider value={Boolean(canonicalLesson.sourceProfessionalLessonId)}><div ref={containerRef} className={`course-lesson-container foundations-standard-intro foundations-video-reading-lesson foundations-consistent-lesson${['F9', 'P7', 'P8', 'P9', 'P10'].includes(lesson.moduleId) ? ' foundations-modeling-lesson' : ''}`}>
    <>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <div className={`foundations-video-reading-layout${content.sections ? ' foundations-authored-reading' : ''}${isWorkflow ? ' foundations-workflow' : ''}`}>
            <WrittenTutorialPanel title={title} description={content.explanation}
              afterDescription={lesson.id === 'F1.1' ? <p className="foundation-product-link"><a href="https://dipro.jp.fujitsu.com/product/icadsx" target="_blank" rel="noopener noreferrer">{ja ? 'iCAD SX の詳細 — 公式製品ページ（日本語・新しいタブで開きます）' : 'Learn more about iCAD SX — Official product page (Japanese, opens in a new tab)'}</a></p> : undefined}
              stepsContent={lesson.id === 'F7.1' && content.sections?.length === 5 ? <FoundationDrawingStructure sections={content.sections} japanese={ja} /> : lesson.id === 'F3.6' ? <FoundationRotationControls sections={content.sections || []} /> : lesson.id === 'F3.5' ? <FoundationMouseControls sections={content.sections || []} pan /> : lesson.id === 'F3.1' ? <FoundationMouseControls sections={content.sections || []} /> : lesson.id === 'F2.9' ? <FoundationInterfaceContent toolbar japanese={ja} sections={content.sections?.slice(0, 13)} why={content.sections?.[13]} /> : lesson.id === 'F2.1' ? <FoundationInterfaceContent japanese={ja} sections={content.sections?.slice(0, 10)} why={content.sections?.[10]} /> : isHelp ? <FoundationHelpSteps sections={content.sections || []} /> : isStarting || isClosing ? <>
                <FoundationStartingSteps sections={(content.sections || []).slice(0, 4)} japanese={ja} closing={isClosing} />
                {isClosing && content.sections?.[4] && <div className="written-tutorial-panel__quick-review">
                  <h4 className="section-title">{content.sections[4].title}</h4><p>{content.sections[4].text}</p>
                </div>}
              </> : undefined}
              renderStepText={lesson.id === 'P13.1' ? (step,index) => index === 0 ? <FoundationShapeSteelLesson text={step.text} profiles japanese={ja}/> : index === 1 ? <FoundationShapeSteelLesson text={step.text} japanese={ja}/> : undefined : lesson.id === 'P8.8' ? (step,index) => index === 0 ? <FoundationResizeSteps text={step.text} japanese={ja}/> : undefined : lesson.id === 'P12.1' ? (step,index) => index === 1 || index === 2 ? <FoundationStretchSteps text={step.text} method={index === 1 ? 1 : 2} japanese={ja}/> : undefined : lesson.id === 'P11.2' ? (step,index) => index < 2 ? <FoundationShowHideSteps text={step.text} command={index} japanese={ja}/> : undefined : lesson.id === 'P11.3' ? (step,index) => index === 0 ? <FoundationDraftingElementsTable japanese={ja}/> : index === 1 || index === 2 ? <FoundationShowHideSteps text={step.text} command={index+1} japanese={ja}/> : undefined : lesson.id === 'P11.4' ? (step,index) => index === 0 ? <FoundationShowHideSteps text={step.text} command={4} japanese={ja}/> : undefined : lesson.id === 'P11.1' ? (step,index) => index === 0 ? <FoundationShowHideCommands text={step.text} japanese={ja} /> : index === 1 ? <FoundationDraftingElementsTable japanese={ja}/> : undefined : lesson.id === 'P10.2' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} revolve professional japanese={ja} /> : undefined : lesson.id === 'P10.1' ? (step,index) => index < 2 ? <FoundationModelingProcess text={step.text} extrude extrudeBoth={index===1} professional japanese={ja} /> : undefined : lesson.id === 'P9.1' ? (step,index) => index === 2 ? <FoundationModelingProcess text={step.text} sketch professional japanese={ja} /> : undefined : lesson.id === 'P8.6' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} mirrorCopy professional japanese={ja} /> : undefined : lesson.id === 'P8.5' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} mirror professional japanese={ja} /> : undefined : lesson.id === 'P8.4' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} rotateCopy professional japanese={ja} /> : undefined : lesson.id === 'P8.3' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} rotate professional japanese={ja} /> : undefined : lesson.id === 'P7.5' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} torus professional japanese={ja} /> : undefined : lesson.id === 'P7.4' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} cone professional japanese={ja} /> : undefined : (lesson.id === 'F9.11' || lesson.id === 'P8.7') ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} deleting professional={isProfessionalOperation} japanese={ja} /> : undefined : (lesson.id === 'F9.10' || lesson.id === 'P8.2') ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} copy professional={isProfessionalOperation} japanese={ja} /> : undefined : (lesson.id === 'F9.9' || lesson.id === 'P8.1') ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} move professional={isProfessionalOperation} japanese={ja} /> : undefined : lesson.id === 'F9.7' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} polygon professional={isProfessionalShape} japanese={ja} /> : undefined : lesson.id === 'F9.6' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} cylinder professional={isProfessionalShape} japanese={ja} /> : undefined : lesson.id === 'F9.5' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} inputAreas box professional={isProfessionalShape} japanese={ja} /> : undefined : lesson.id === 'F9.1' ? (step,index) => index === 0 ? <FoundationModelingProcess text={step.text} inputAreas japanese={ja} /> : undefined : lesson.id === 'F8.5' ? (step,index) => index === 0 ? <FoundationCreateItemSteps text={step.text} closing japanese={ja} /> : undefined : lesson.id === 'F8.3' ? (step,index) => index < 2 ? <FoundationSaveSteps text={step.text} saveAs={index === 1} japanese={ja}/> : index === 2 ? <FoundationSaveComparison text={step.text} /> : undefined : lesson.id === 'F8.1' ? (step,index) => index === 0 ? <FoundationCreateItemSteps text={step.text} japanese={ja} /> : undefined : lesson.id === 'F7.8' ? (step,index) => index === 2 ? <FoundationDrawingComparison text={step.text} /> : undefined : lesson.id === 'F7.6' ? (step,index) => index === 2 ? <FoundationStandardViewSteps text={step.text} japanese={ja} comparison /> : undefined : lesson.id === 'F7.3' ? (step,index) => index === 0 ? <FoundationPartExamples text={step.text} /> : index === 2 ? <FoundationPlateExample text={step.text} japanese={ja} /> : undefined : lesson.id === 'F6.7' ? (step,index) => index === 0 ? <FoundationSelectionTypes text={step.text} /> : index === 1 ? <FoundationStandardViewSteps text={step.text} japanese={ja} /> : undefined : lesson.id === 'F6.4' ? (step,index) => index === 2 ? <FoundationStandardViewSteps text={step.text} japanese={ja} comparison /> : index === 3 ? <FoundationSelectionSteps text={step.text} /> : undefined : lesson.id === 'F6.2' ? (step,index) => index === 0 ? <FoundationElementCards text={step.text} japanese={ja} /> : index === 1 ? <FoundationStandardViewSteps text={step.text} japanese={ja} /> : undefined : lesson.id === 'F5.6' ? (step,index) => index === 0 ? <FoundationPartLayoutSteps text={step.text} placement /> : index === 2 ? <><p>{step.text}</p><FoundationOriginViews japanese={ja} /></> : index === 1 ? <FoundationPartLayoutSteps text={step.text} /> : undefined : lesson.id === 'F5.4' ? (step,index) => index < 2 ? <FoundationCoordinateAxes text={step.text} origin={index===1} /> : index === 2 ? <FoundationPlacementComparison text={step.text} japanese={ja} /> : undefined : lesson.id === 'F5.1' ? (step,index) => index < 2 ? <FoundationKeyboardContent text={step.text} inputFlow={index===1} /> : undefined : lesson.id === 'F1.1' ? (step, index) => index === 0 ? <FoundationViewComparison text={step.text} designEnvironments /> : undefined : ['F4.1','F4.6','F4.12'].includes(lesson.id) ? (step, index) => index === 0 ? <FoundationViewExamples text={step.text} commands userViews={lesson.id === 'F4.6'} shading={lesson.id === 'F4.12'} /> : index === 1 ? <FoundationStandardViewSteps text={step.text} japanese={ja} /> : undefined : lesson.id === 'F1.2' ? (step, index) => index === 0 ? <FoundationUsesCards text={step.text} /> : undefined : undefined}
              copy={{ objectiveLabel: ja ? '学習目標' : 'Learning objective', objective: content.practice,
                description2: content.description2,
                hideStepNumbers: Boolean(content.sections) && !isWorkflow,
                procedureTitle: lesson.id === 'F3.6' ? (ja ? '3D ビューを回転する方法' : 'How to Rotate the 3D View') : lesson.id === 'F3.5' ? (ja ? 'パンの方法' : 'How to Pan') : lesson.id === 'F3.1' ? (ja ? '基本的なマウス操作' : 'Basic Mouse Controls') : lesson.id === 'F2.9' ? (ja ? 'iCAD SX の主なツールバー' : 'Main iCAD SX Toolbars') : lesson.id === 'F2.1' ? (ja ? 'iCAD SX の画面の主な領域' : 'Main Areas of the iCAD SX Screen') : isHelp ? (ja ? 'iCAD SX ヘルプの使い方' : 'Using iCAD SX Help') : isClosing ? (ja ? 'iCAD SX を終了する方法' : 'How to Close iCAD SX') : isStarting ? (ja ? 'iCAD SX を起動する方法' : 'How to Start iCAD SX') : isWorkflow ? (ja ? '基本的な流れ' : 'Basic Workflow') : content.sections ? '' : ja ? '説明と練習' : 'Explanation and practice',
                completionText: ja ? '理解度チェックへ進みましょう。' : 'Continue to the knowledge check.',
                quickReviewTitle: ja ? '確認' : 'Quick Review', quickReviewText: content.quickReview || content.explanation }}
              steps={content.sections ? content.sections.map((section, index) => ({ ...section, id: index + 1, preserveText: true })) :
                [{ id: 1, title: ja ? '理解する' : 'Understand', text: content.explanation, preserveText: true },
                { id: 2, title: ja ? 'やってみる' : 'Try it', text: content.practice, preserveText: true }]} />
            {!['P9.1', 'P10.1', 'P10.2'].includes(lesson.id) && content.connection && <p className="foundations-lesson-connection">{content.connection}</p>}
            {!['P9.1', 'P10.1', 'P10.2'].includes(lesson.id) && tutorial && <div className="foundations-preserved-tutorial">{tutorial}</div>}
          </div>
          {isSpeaking && <KaraokeLessonText text={text[currentIndex] || ''} isActive currentCharIndex={currentCharIndex} />}
          <div className="lesson-navigation">
            {onPrevious && <button className="nav-button" onClick={() => { stop(); onPrevious(); }}>{ja ? '前へ' : 'Previous'}</button>}
            {!done ? <button className="nav-button next" onClick={finishReading} disabled={!questions.length}>{!questions.length ? (ja ? 'レッスン内容の準備中' : 'Lesson content pending') : ja ? '理解度チェックを開始' : 'Start knowledge check'}</button>
              : isLast ? <button className="nav-button next" disabled>{ja ? 'コース完了' : 'Course complete'}</button>
              : <button className="nav-button next" onClick={() => { stop(); onNext(); }}>{ja ? '次のレッスン' : 'Next lesson'}</button>}
          </div>
        </div>
      </div>
    </>
    {stage === 'quiz' && <FoundationQuizModal><div className="foundations-knowledge-check">
      <LessonQuestionPanel embedded header={questions.length > 1 ? <div className="foundations-knowledge-check__header">
      <p className="foundations-knowledge-check__progress" aria-live="polite">{ja ? `全${questions.length}問中 ${questionIndex + 1}問目` : `Question ${questionIndex + 1} of ${questions.length}`}</p>
</div> : undefined} question={question} selectedChoice={choice} answerChecked={checked}
      continueLabel={questionIndex === questions.length - 1 ? (saving ? (ja ? '保存中…' : 'Saving…') : error ? (ja ? '保存を再試行' : 'Retry saving') : isLast ? (ja ? 'コースを完了' : 'Complete course') : (ja ? 'レッスンを完了' : 'Complete lesson')) : (ja ? '次の問題' : 'Next question')}
      continueDisabled={saving}
      onSelectChoice={setChoice} onCheckAnswer={() => {
        const selected = question.choices.find(item => item.id === choice);
        if (!selected) return;
        setChecked(true);
        if (selected.isCorrect && lesson.id !== 'F16.2') confetti({ particleCount: 70, spread: 60 });
        speak([selected.isCorrect ? `${ja ? '正解です。' : 'Correct! '}${selected.feedback}` :
          `${ja ? '違います。' : 'Not quite. '}${selected.feedback}${ja ? 'もう一度お試しください。' : ' Please try again.'}`], 0);
      }}
      onRetry={() => { setChecked(false); setChoice(''); narrateQuestion(questionIndex); }}
      onContinue={() => {
        if (!checked || !question.choices.find(item => item.id === choice)?.isCorrect) return;
        if (questionIndex === questions.length - 1) void finish();
        else { setQuestionIndex(questionIndex + 1); setChoice(''); setChecked(false); narrateQuestion(questionIndex + 1); }
      }} />{error && <div role="alert" className="foundations-knowledge-check__error">{error}</div>}</div></FoundationQuizModal>}
  </div></FoundationVisualContext.Provider>;
}























