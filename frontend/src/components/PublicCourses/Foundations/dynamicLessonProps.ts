import type { LessonVideoStep, TutorialOverlay } from '../../../types/tutorial';

export interface DynamicFoundationsLessonSource {
  id: string;
  title: string;
  content: string[];
  videoId?: string;
  videoOverlays?: TutorialOverlay[];
  videoSteps?: LessonVideoStep[];
  muteSourceVideoAudio?: boolean;
}

export const getDynamicFoundationsLessonProps = (lesson: DynamicFoundationsLessonSource) => ({
  lessonId: lesson.id,
  title: lesson.title,
  content: lesson.content,
  videoId: lesson.videoId,
  videoOverlays: lesson.videoOverlays,
  videoSteps: lesson.videoSteps,
  muteSourceVideoAudio: lesson.muteSourceVideoAudio,
});
