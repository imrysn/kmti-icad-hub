import { describe, expect, it } from 'vitest';
import type { LessonVideoStep, TutorialOverlay } from '../../../../types/tutorial';
import { getDynamicFoundationsLessonProps } from '../dynamicLessonProps';

describe('getDynamicFoundationsLessonProps', () => {
  it('preserves configured video overlays when routing a Foundations lesson', () => {
    const overlays: TutorialOverlay[] = [
      {
        id: 'standard-view-check',
        type: 'quiz',
        startTime: 14,
        endTime: 15,
        quizData: {
          question: 'Which toolbar changes the model view?',
          options: [
            { text: '3D View', isCorrect: true, feedback: 'Correct.' },
            { text: 'File', isCorrect: false, feedback: 'File manages documents.' },
            { text: 'Edit', isCorrect: false, feedback: 'Edit contains history commands.' },
          ],
        },
      },
    ];

    const props = getDynamicFoundationsLessonProps({
      id: 'lesson-4-1',
      title: 'Standard Views',
      content: ['Use standard engineering views.'],
      videoId: 'lesson4.1',
      videoOverlays: overlays,
    });

    expect(props.videoOverlays).toBe(overlays);
    expect(props.lessonId).toBe('lesson-4-1');
  });

  it('preserves synchronized steps and source-video mute settings', () => {
    const videoSteps: LessonVideoStep[] = [{
      id: 'isometric-view',
      title: 'Isometric view',
      customText: 'See multiple model faces.',
      videoStart: 0,
      videoEnd: 6.9,
    }];

    const props = getDynamicFoundationsLessonProps({
      id: 'lesson-4-2',
      title: 'Isometric View',
      content: ['Inspect multiple sides.'],
      videoId: 'lesson4.2',
      videoSteps,
      muteSourceVideoAudio: true,
      videoIntroTitle: 'Explore the Isometric View',
      videoIntroDescription: 'See multiple faces together.',
      videoIntroEyebrow: 'Interactive view tour',
    });

    expect(props.videoSteps).toBe(videoSteps);
    expect(props.muteSourceVideoAudio).toBe(true);
    expect(props.videoIntroTitle).toBe('Explore the Isometric View');
    expect(props.videoIntroDescription).toBe('See multiple faces together.');
    expect(props.videoIntroEyebrow).toBe('Interactive view tour');
  });
});
