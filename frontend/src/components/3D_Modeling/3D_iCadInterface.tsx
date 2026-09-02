import { ChevronLeft, ChevronRight, Monitor } from 'lucide-react';
import React from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import './CourseLesson.css';
import '../LessonIntroPanel.css';
import VideoTutorialViewer from "./VideoTutorialViewer";
import FoundationsVideoReadingLayout from '../FoundationsVideoReadingLayout';

interface IcadInterfaceLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
  showFoundationsIntro?: boolean;
}

import { useTranslation } from '../../context/LanguageContext';

import { TUTORIAL_STEPS } from "./VideoTutorialData/iCadInterfaceTutorial";

export const INTERFACE_WRITTEN_TUTORIAL_COPY = {
  title: 'This lesson introduces the main parts of the iCAD SX interface and their basic function.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'iCAD Main Parts',
  completionText: 'Great job! You have completed the iCAD Interface lesson.',
};

export const INTERFACE_WRITTEN_TUTORIAL_STEPS = [
  {
    id: 'interface-title-bar',
    title: 'Title Bar',
    text: 'Displays the name of the program and typically the name of the currently active document.',
  },
  {
    id: 'interface-menu-bar',
    title: 'Menu Bar',
    text: 'Contains drop-down menus such as File, View, Information, Set, Tool, Window, and Help.',
  },
  {
    id: 'interface-command-menu',
    title: 'Command Menu',
    text: 'Contains sets of available commands associated with different functions. Preferably used in 2D.',
  },
  {
    id: 'interface-tree-view',
    title: 'Tree View',
    text: 'Displays the 3D parts and groups for the drawing currently being worked on.',
  },
  {
    id: 'interface-workspace',
    title: 'Workspace',
    text: 'Area where 3D Modeling and Assembly operations are done.',
  },
  {
    id: 'interface-icon-menu',
    title: 'Icon Menu',
    text: 'Contains commands for performing 3D Modeling operations. Other options can be found in the Command Menu.',
  },
  {
    id: 'interface-item-entry',
    title: 'Item Entry',
    text: 'Used for entering the values and characters necessary for command execution.',
  },
  {
    id: 'interface-key-entry',
    title: 'Key Entry',
    text: 'Coordinates and other values can be entered from the Key Entry Area.',
  },
  {
    id: 'interface-tool-bar',
    title: 'Tool Bar',
    text: 'Contains a set of tool bars that can be displayed or hidden.',
  },
  {
    id: 'interface-message-pane',
    title: 'Message Pane',
    text: 'Displays messages related to operations. Messages displayed in red are error messages.',
  },
].map(step => ({ ...step, preserveText: true }));

const IcadInterfaceLesson: React.FC<IcadInterfaceLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel, showFoundationsIntro = false }) => {
  const { t } = useTranslation();

  const INTERFACE_STEPS = React.useMemo(() => [
    t('icad.step0'),
    t('icad.step1'),
    t('icad.step2'),
    t('icad.step3'),
    t('icad.step4'),
    t('icad.step5'),
    t('icad.step6'),
    t('icad.step7'),
    t('icad.step8'),
    t('icad.step9'),
    t('icad.step10'),
    t('icad.step11')
  ], [t]);

  const localizedTutorialSteps = React.useMemo(() => TUTORIAL_STEPS.map((step) => {
    const titleKey = `tutorial.icad.${step.id}.title`;
    const textKey = `tutorial.icad.${step.id}.text`;
    const translatedTitle = t(titleKey);
    const translatedText = t(textKey);

    return {
      ...step,
      title: translatedTitle === titleKey ? step.title : translatedTitle,
      text: translatedText === textKey ? step.text : translatedText,
      narrateTitle: false,
    };
  }), [t]);

  const {
    scrollProgress,
    containerRef,
    currentIndex } = useLessonCore('interface', INTERFACE_STEPS);

  return (
    <div className="course-lesson-container foundations-standard-intro foundations-video-reading-lesson" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Main Interactive Stage */}
      <div className="lesson-grid interactive-layout single-card">
        <div className={`lesson-card tab-content fade-in ${currentIndex >= 0 ? 'reading-active' : ''}`}
          data-reading-index={currentIndex >= 0 && currentIndex <= 11 ? "0" : undefined}
          style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>

          <div className="interactive-stage-container">
            <FoundationsVideoReadingLayout
              title={INTERFACE_WRITTEN_TUTORIAL_COPY.title}
              writtenTutorialCopy={INTERFACE_WRITTEN_TUTORIAL_COPY}
              steps={INTERFACE_WRITTEN_TUTORIAL_STEPS.map(step => ({ ...step }))}
            >
              <VideoTutorialViewer
                steps={localizedTutorialSteps}
                introPanel={showFoundationsIntro ? {
                  icon: Monitor,
                  eyebrow: "Interactive screen tour",
                  title: "Explore the iCAD Interface",
                  description: "Take a guided tour of the workspace and learn where to find the main screen areas used throughout your iCAD training."
                } : undefined}
              />
            </FoundationsVideoReadingLayout>
          </div>

          <div className="lesson-navigation">
            {onPrevLesson && (
              <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
            )}
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IcadInterfaceLesson;
