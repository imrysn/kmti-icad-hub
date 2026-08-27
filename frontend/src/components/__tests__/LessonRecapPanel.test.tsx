import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LessonRecapPanel from '../LessonRecapPanel';
import { panLessonConfig } from '../InteractiveVideoLesson/configs/panLesson';
import { rotateViewLessonConfig } from '../InteractiveVideoLesson/configs/rotateViewLesson';
import { zoomInOutLessonConfig } from '../InteractiveVideoLesson/configs/zoomInOutLesson';

describe('shared iCAD Foundations lesson recap', () => {
  it('renders the Zoom-style recap structure and advances with Next', () => {
    const onAction = vi.fn();
    render(
      <LessonRecapPanel
        title="Zoom In and Zoom Out Recap"
        summary="Review the important lesson actions."
        items={[
          { action: 'Mouse Wheel Forward', result: 'Zoom In' },
          { action: 'Mouse Wheel Backward', result: 'Zoom Out' },
        ]}
        actionLabel="Next lesson"
        onAction={onAction}
      />,
    );

    expect(screen.getByText('Lesson recap')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Zoom In and Zoom Out Recap' })).toBeInTheDocument();
    expect(screen.getByText('Review the important lesson actions.')).toHaveClass('ivl-recap-summary');
    expect(screen.getByText('Zoom In')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /next lesson/i }));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('provides Close when the recap is the end of the available flow', () => {
    render(
      <LessonRecapPanel
        title="Final recap"
        items={[{ text: 'The model geometry does not move.' }]}
        actionLabel="Close"
        actionType="close"
        onAction={() => undefined}
      />,
    );

    expect(screen.getByRole('button', { name: /close/i })).toBeEnabled();
  });

  it('can keep the narrated introduction audio-only', () => {
    render(
      <LessonRecapPanel
        items={[{ action: 'Mouse Wheel Forward', result: 'Zoom In' }]}
        actionLabel="Next"
        onAction={() => undefined}
      />,
    );

    expect(screen.queryByText('Remember')).not.toBeInTheDocument();
    expect(screen.queryByText(/Great work/i)).not.toBeInTheDocument();
    expect(screen.getByText('Lesson recap')).toBeInTheDocument();
    expect(screen.getByText('Zoom In')).toBeInTheDocument();
  });

  it('globally suppresses Great work and Remember when passed as visible content', () => {
    render(
      <LessonRecapPanel
        title="Remember"
        summary="Great work. Remember: scroll forward to zoom in."
        items={[{ action: 'Mouse Wheel Forward', result: 'Zoom In' }]}
        actionLabel="Next"
        onAction={() => undefined}
      />,
    );

    expect(screen.queryByText('Remember')).not.toBeInTheDocument();
    expect(screen.queryByText(/Great work/i)).not.toBeInTheDocument();
    expect(screen.getByText('Scroll forward to zoom in.')).toHaveClass('ivl-recap-summary');
  });

  it('preserves Great work and Remember in every navigation recap narration', () => {
    for (const config of [zoomInOutLessonConfig, panLessonConfig, rotateViewLessonConfig]) {
      expect(config.recapNarration, config.id).toMatch(/^Great work\. Remember:/);
      expect(config.recapNarration.trim().length, config.id).toBeGreaterThan(30);
    }
  });
});
