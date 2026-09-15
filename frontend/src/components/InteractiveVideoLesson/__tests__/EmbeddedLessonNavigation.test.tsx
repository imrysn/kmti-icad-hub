import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PanInteractiveLesson from '../PanInteractiveLesson';
import RotateViewInteractiveLesson from '../RotateViewInteractiveLesson';

vi.mock('../../../context/LanguageContext', () => ({
  useTranslation: () => ({
    language: 'en',
    t: (key: string) => (key === 'lesson.next_lesson' ? 'Next Lesson' : key === 'common.previous' ? 'Previous' : key),
    translateContent: (text: string) => text,
  }),
}));
vi.mock('../../../hooks/useLessonCore', () => ({
  useLessonCore: () => ({ containerRef: { current: null }, speak: vi.fn(), stop: vi.fn(), registerText: vi.fn(), isSpeaking: false, currentIndex: -1, currentCharIndex: 0 }),
}));
vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('interactive navigation lesson buttons', () => {
  afterEach(cleanup);

  // Foundations F3.2 Pan and F3.3 Rotate embed these lessons without handlers; the host lesson owns navigation.
  it.each([['Pan', PanInteractiveLesson], ['Rotate', RotateViewInteractiveLesson]] as const)('shows no Previous or Next Lesson button when %s is embedded', (_, Lesson) => {
    render(<Lesson />);
    expect(screen.queryByRole('button', { name: /^Next Lesson/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Previous/ })).not.toBeInTheDocument();
  });

  it('keeps working navigation buttons for a standalone lesson', () => {
    const next = vi.fn();
    const previous = vi.fn();
    render(<PanInteractiveLesson onNextLesson={next} onPrevLesson={previous} />);
    fireEvent.click(screen.getByRole('button', { name: /^Next Lesson/ }));
    fireEvent.click(screen.getByRole('button', { name: /^Previous/ }));
    expect(next).toHaveBeenCalledOnce();
    expect(previous).toHaveBeenCalledOnce();
  });
});
