import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DynamicFoundationsLesson from '../DynamicFoundationsLesson';
import { enTranslations, jaTranslations } from '../../../../config/translations';

let currentLanguage = 'en';

vi.mock('../../../../context/LanguageContext', () => ({
  useTranslation: () => ({
    language: currentLanguage,
    setLanguage: (lang: string) => { currentLanguage = lang; },
    t: (key: string) => {
      const dict = currentLanguage === 'ja' ? jaTranslations : enTranslations;
      return dict[key] || key;
    },
    translateContent: (s: string) => s,
  }),
}));

vi.mock('../../../3D_Modeling/VideoTutorialViewer', () => ({
  default: () => <div data-testid="video-tutorial-viewer" />,
}));

vi.mock('../../../../hooks/useLessonCore', () => ({
  useLessonCore: () => ({
    scrollProgress: 0,
    containerRef: { current: null },
    speak: vi.fn(),
    stop: vi.fn(),
    isSpeaking: false,
    currentIndex: -1,
    currentCharIndex: 0,
    registerText: vi.fn(),
  }),
}));

vi.mock('../../../../hooks/useTTSAutoplay', () => ({ useTTSAutoplay: vi.fn() }));

describe('Foundations Language Mode', () => {
  it('translates lesson titles properly in dictionaries', () => {
    expect(enTranslations['lesson.title.lesson-1-1']).toBe('Lesson 1.1 — What is iCAD?');
    expect(jaTranslations['lesson.title.lesson-1-1']).toBe('レッスン 1.1 — iCAD とは？');
    expect(jaTranslations['lesson.title.module-1']).toBe('モジュール 1 - iCAD の概要');
    expect(jaTranslations['lesson.title.lesson-3-1']).toBe('レッスン 3.1 — ズームインとズームアウト');
    expect(jaTranslations['lesson.title.lesson-4-1']).toBe('レッスン 4.1 — 3D ビュー');
    expect(jaTranslations['lesson.title.module-basic-shapes']).toBe('基本形状の作成');
    expect(jaTranslations['lesson.title.basic-op-cylinder']).toBe('円柱');
    expect(jaTranslations['lesson.title.basic-op-box']).toBe('直方体');
    expect(jaTranslations['lesson.title.basic-op-polygon']).toBe('多角柱');
    expect(jaTranslations['lesson.title.lesson-3-2']).toBe('レッスン 3.2 — パン');
    expect(jaTranslations['lesson.title.basic-op-cone']).toBe('円錐');
    expect(jaTranslations['lesson.title.basic-op-torus']).toBe('円環体');
    expect(enTranslations['lesson.title.module-basic-shapes']).toBe('Creating Basic Shapes');
    expect(enTranslations['lesson.title.basic-op-cylinder']).toBe('Cylinder');
  });

  it('correctly strips lesson and module prefixes for sidebar and banner in both EN and JA', async () => {
    const { formatSidebarLessonTitle } = await import('../../../../views/mentor/components/MentorSidebar');
    const stripBannerPrefix = (title: string) =>
      title.replace(/^(?:module|lesson|モジュール|レッスン)\s*[\d\.]*\s*(?:—|-|–|:)\s*/i, '').trim();

    // English
    expect(formatSidebarLessonTitle('Lesson 2.1 — Understanding iCAD SX Interface')).toBe('Understanding iCAD SX Interface');
    expect(formatSidebarLessonTitle('Module 1 - Getting Started with iCAD')).toBe('Getting Started with iCAD');
    expect(stripBannerPrefix('Lesson 2.1 — Understanding iCAD SX Interface')).toBe('Understanding iCAD SX Interface');

    // Japanese - no extra prefixes left
    expect(formatSidebarLessonTitle('レッスン 2.1 — iCAD SX インターフェースの理解')).toBe('iCAD SX インターフェースの理解');
    expect(formatSidebarLessonTitle('モジュール 1 - iCAD の概要')).toBe('iCAD の概要');
    expect(stripBannerPrefix('レッスン 2.1 — iCAD SX インターフェースの理解')).toBe('iCAD SX インターフェースの理解');
    expect(stripBannerPrefix('レッスン 5.1 — 原点と軸')).toBe('原点と軸');
  });

  it('renders English written tutorial when language is en', () => {
    currentLanguage = 'en';
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-1-1"
        title="Lesson 1.1 — What is iCAD?"
        content={['What is iCAD?']}
      />
    );

    expect(screen.getByText('Engineering Workflow')).toBeInTheDocument();
    expect(screen.getByText('Create or Open Drawing')).toBeInTheDocument();
    expect(screen.getByText(/Understand what iCAD is and how it is used/i)).toBeInTheDocument();
  });

  it('renders Japanese written tutorial when language is ja', () => {
    currentLanguage = 'ja';
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-1-1"
        title="Lesson 1.1 — What is iCAD?"
        content={['What is iCAD?']}
      />
    );

    expect(screen.getByText('エンジニアリングワークフロー')).toBeInTheDocument();
    expect(screen.getByText('図面の新規作成または開く')).toBeInTheDocument();
    expect(screen.getByText(/iCAD の概要と、機械設計・エンジニアリングにおける活用方法を理解します。/i)).toBeInTheDocument();
    expect(screen.getByText('クイックレビュー')).toBeInTheDocument();
  });

  it('translates course title and LessonIntroPanel start button', async () => {
    expect(jaTranslations['course.title_foundations']).toBe('iCAD 基礎');
    expect(enTranslations['course.title_foundations']).toBe('iCAD Foundations');

    const { default: LessonIntroPanel } = await import('../../../LessonIntroPanel');
    const { Play } = await import('lucide-react');

    currentLanguage = 'en';
    const { unmount } = render(
      <LessonIntroPanel
        icon={Play}
        eyebrow="Interactive view tour"
        title="Cylinder"
        description="Take a tour"
        onStart={() => {}}
      />
    );
    expect(screen.getByText('Start lesson')).toBeInTheDocument();
    unmount();

    currentLanguage = 'ja';
    render(
      <LessonIntroPanel
        icon={Play}
        eyebrow="視図ツアー"
        title="円柱"
        description="円柱コマンドのツアー"
        onStart={() => {}}
      />
    );
    expect(screen.getByText('レッスンを開始')).toBeInTheDocument();
  });
});
