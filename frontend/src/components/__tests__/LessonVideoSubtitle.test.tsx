import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LessonVideoSubtitle from '../LessonVideoSubtitle';

vi.mock('../../context/LanguageContext', () => ({
  useTranslation: () => ({ translateContent: (text: string) => text }),
}));

describe('shared Foundations narration captions', () => {
  it('uses one caption layout without adding a heading or changing its text', () => {
    render(<LessonVideoSubtitle text="Enter the box height in the Item Entry area." />);
    expect(screen.getByRole('status')).toHaveClass('lesson-video-subtitle');
    expect(screen.getByRole('status').querySelector('p')).toHaveClass('lesson-video-subtitle__text');
    expect(screen.getByRole('status')).toHaveTextContent('Enter the box height in the Item Entry area.');
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('preserves the spoken, active, and upcoming word states', () => {
    const { container } = render(<LessonVideoSubtitle text="Enter the height." currentCharIndex={6} />);
    expect(container.querySelector('.karaoke-lesson-text__spoken')).toHaveTextContent('Enter');
    expect(container.querySelector('.karaoke-lesson-text__active')).toHaveTextContent('the');
    expect(container.querySelector('.karaoke-lesson-text__upcoming')).toHaveTextContent('height.');
  });

  it('preserves the text when narration is inactive', () => {
    const { container } = render(<LessonVideoSubtitle text="Select Front View." isActive={false} currentCharIndex={7} />);
    expect(screen.getByRole('status')).toHaveTextContent('Select Front View.');
    expect(container.querySelector('.karaoke-lesson-text__active')).toBeNull();
  });

  it('does not render an empty caption', () => {
    const { container } = render(<LessonVideoSubtitle text="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
