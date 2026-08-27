import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LessonVideoStep, TutorialOverlay } from '../../../../types/tutorial';
import DynamicFoundationsLesson from '../DynamicFoundationsLesson';

const viewerSpy = vi.fn();

vi.mock('../../../3D_Modeling/VideoTutorialViewer', () => ({
  default: (props: { steps: Array<{ text: string; customText?: string; overlays?: TutorialOverlay[] }>; muteSourceVideoAudio?: boolean }) => {
    viewerSpy(props);
    return <div data-testid="video-tutorial-viewer" />;
  },
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

describe('DynamicFoundationsLesson', () => {
  beforeEach(() => viewerSpy.mockClear());

  it('passes configured overlays to VideoTutorialViewer', () => {
    const overlays: TutorialOverlay[] = [
      {
        id: 'standard-views-recap',
        type: 'recap',
        startTime: 19,
        endTime: 20,
        recapData: { title: 'Standard Views', items: ['Select a standard orientation.'] },
      },
    ];

    render(
      <DynamicFoundationsLesson
        lessonId="lesson-4-1"
        title="Standard Views"
        content={['Inspect the model from standard directions.']}
        videoId="lesson4.1"
        videoOverlays={overlays}
      />,
    );

    expect(screen.getByTestId('video-tutorial-viewer')).toBeInTheDocument();
    expect(viewerSpy).toHaveBeenCalled();
    const renderedStep = viewerSpy.mock.calls.at(-1)?.[0].steps[0];
    expect(renderedStep.overlays).toBe(overlays);
    expect(renderedStep.text).toBe('Inspect the model from standard directions.');
    expect(renderedStep.customText).toBe(renderedStep.text);
  });

  it('falls back to the lesson title when content has no narratable text', () => {
    render(
      <DynamicFoundationsLesson
        lessonId="lesson-4-1"
        title="Standard Views"
        content={['Learning Objective:']}
        videoId="lesson4.1"
      />,
    );

    const renderedStep = viewerSpy.mock.calls.at(-1)?.[0].steps[0];
    expect(renderedStep.text).toBe('Standard Views');
  });

  it('passes synchronized narration steps and source-audio muting to the viewer', () => {
    const videoSteps: LessonVideoStep[] = [{
      id: 'standard-view-directions',
      title: 'Choose a standard direction',
      customText: 'Select a standard view.',
      videoStart: 0,
      videoEnd: 4.45,
    }];

    render(
      <DynamicFoundationsLesson
        lessonId="lesson-4-1"
        title="Standard Views"
        content={['Use standard engineering views.']}
        videoId="lesson4.1"
        videoSteps={videoSteps}
        muteSourceVideoAudio
      />,
    );

    const viewerProps = viewerSpy.mock.calls.at(-1)?.[0];
    expect(viewerProps.muteSourceVideoAudio).toBe(true);
    expect(viewerProps.steps[0]).toMatchObject({
      customText: 'Select a standard view.',
      text: 'Select a standard view.',
      videoStart: 0,
      videoEnd: 4.45,
    });
  });
});
