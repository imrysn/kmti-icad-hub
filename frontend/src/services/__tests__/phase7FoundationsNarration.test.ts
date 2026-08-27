import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { FOUNDATIONS_NARRATION_PROFILE } from '../../config/foundationsNarration';
import {
  buildFoundationsNarrationUrl,
  createFoundationsBrowserUtterance,
} from '../foundationsNarrationService';
import { ICAD_FOUNDATIONS_LESSONS, type Lesson } from '../../views/mentor/mentorConstants';
import { TOOLBAR_TUTORIAL_STEPS } from '../../components/3D_Modeling/VideoTutorialData/ToolBarsTutorial';
import { TUTORIAL_STEPS as INTERFACE_TUTORIAL_STEPS } from '../../components/3D_Modeling/VideoTutorialData/iCadInterfaceTutorial';
import {
  boxTutorialSteps,
  coneTutorialSteps,
  cylinderTutorialSteps,
  polygonTutorialSteps,
  torusTutorialSteps,
} from '../../components/3D_Modeling/VideoTutorialData/basicOp1TutorialSteps';
import {
  buildAnswerFeedbackNarration,
  buildKnowledgeCheckNarration,
  buildTutorialStepNarration,
} from '../../utils/quizNarration';

const leafLessons = (lessons: Lesson[]): Lesson[] => lessons.flatMap((lesson) =>
  lesson.children?.length ? leafLessons(lesson.children) : [lesson],
);

const tutorialSteps = [
  ...INTERFACE_TUTORIAL_STEPS,
  ...TOOLBAR_TUTORIAL_STEPS,
  ...cylinderTutorialSteps,
  ...boxTutorialSteps,
  ...polygonTutorialSteps,
  ...coneTutorialSteps,
  ...torusTutorialSteps,
  ...leafLessons(ICAD_FOUNDATIONS_LESSONS).flatMap((lesson) => lesson.videoSteps || []),
];

const parseNarrationUrl = (value: string | null) => {
  expect(value).not.toBeNull();
  return new URL(value!, 'http://localhost');
};

describe('Phase 7 — every iCAD Foundations lesson narration profile', () => {
  beforeAll(() => {
    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text: string;
      rate = 1;
      pitch = 1;
      volume = 1;
      lang = '';

      constructor(text: string) {
        this.text = text;
      }
    });
  });

  afterAll(() => vi.unstubAllGlobals());

  beforeEach(() => localStorage.clear());

  it('covers the complete 24-lesson Foundations inventory in English and Japanese', () => {
    const lessons = leafLessons(ICAD_FOUNDATIONS_LESSONS);
    expect(lessons).toHaveLength(24);

    for (const lesson of lessons) {
      const sourceText = lesson.content?.find((text) => text.trim()) || lesson.title;
      const english = parseNarrationUrl(buildFoundationsNarrationUrl(sourceText, {
        language: FOUNDATIONS_NARRATION_PROFILE.englishLanguage,
      }));
      const japanese = parseNarrationUrl(buildFoundationsNarrationUrl(
        `日本語ナレーション。${sourceText}`,
        { language: FOUNDATIONS_NARRATION_PROFILE.japaneseLanguage },
      ));

      for (const request of [english, japanese]) {
        expect(request.pathname).toBe('/api/v1/tts/synthesize');
        expect(request.searchParams.get('voice'), lesson.id).toBe('openai://nova');
        expect(request.searchParams.get('speed'), lesson.id).toBe('1');
        expect(request.searchParams.get('text')?.trim(), lesson.id).toBeTruthy();
      }
      expect(english.searchParams.get('lang'), lesson.id).toBe('en-US');
      expect(japanese.searchParams.get('lang'), lesson.id).toBe('ja-JP');
      expect(japanese.searchParams.get('text'), lesson.id).toContain('日本語ナレーション');
    }
  });

  it('routes tutorial steps, quiz questions, choices, feedback, and recaps through Nova', () => {
    let quizCount = 0;
    let feedbackCount = 0;
    let recapCount = 0;

    for (const step of tutorialSteps) {
      if (step.narrationEnabled === false) continue;
      const stepText = (step.customText || ('text' in step ? step.text : '') || '').trim();
      const narration = buildTutorialStepNarration(stepText, step.quizData, step.recapData);
      if (narration) {
        const request = parseNarrationUrl(buildFoundationsNarrationUrl(narration));
        expect(request.searchParams.get('voice'), String(step.id)).toBe('openai://nova');
        expect(request.searchParams.get('speed'), String(step.id)).toBe('1');
      }

      if (step.quizData) {
        quizCount += 1;
        const quizNarration = buildKnowledgeCheckNarration(
          step.quizData.question,
          step.quizData.options.map((option) => option.text),
        );
        expect(quizNarration).toContain('Choose one answer.');
        step.quizData.options.forEach((option, index) => {
          expect(quizNarration).toContain(`Choice ${index + 1}: ${option.text}.`);
          const feedback = buildAnswerFeedbackNarration(option.isCorrect, option.feedback);
          const request = parseNarrationUrl(buildFoundationsNarrationUrl(feedback));
          expect(request.searchParams.get('voice')).toBe('openai://nova');
          expect(request.searchParams.get('speed')).toBe('1');
          feedbackCount += 1;
        });
      }

      if (step.recapData) {
        recapCount += 1;
        expect(narration).toBeTruthy();
      }
    }

    expect(quizCount).toBeGreaterThan(0);
    expect(feedbackCount).toBeGreaterThan(quizCount);
    expect(recapCount).toBeGreaterThan(0);
  });

  it('uses rate 1 and pitch 1 for browser fallback in both languages', () => {
    const english = createFoundationsBrowserUtterance('English fallback narration');
    const japanese = createFoundationsBrowserUtterance('日本語のフォールバック音声です。', {
      language: FOUNDATIONS_NARRATION_PROFILE.japaneseLanguage,
    });

    expect(english?.rate).toBe(1);
    expect(english?.pitch).toBe(1);
    expect(english?.lang).toBe('en-US');
    expect(japanese?.rate).toBe(1);
    expect(japanese?.pitch).toBe(1);
    expect(japanese?.lang).toBe('ja-JP');
  });

  it('never creates an endpoint request for empty narration in any category', () => {
    expect(buildFoundationsNarrationUrl('')).toBeNull();
    expect(buildFoundationsNarrationUrl('   ')).toBeNull();
    expect(buildFoundationsNarrationUrl('\u00a0')).toBeNull();
    expect(buildTutorialStepNarration('')).toBe('');
  });
});
