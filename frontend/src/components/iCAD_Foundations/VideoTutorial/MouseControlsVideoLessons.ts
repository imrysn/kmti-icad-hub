import { panLessonConfig as basePanConfig } from '../../InteractiveVideoLesson/configs/panLesson';
import { rotateViewLessonConfig as baseRotateConfig } from '../../InteractiveVideoLesson/configs/rotateViewLesson';
import { zoomInOutLessonConfig as baseZoomConfig } from '../../InteractiveVideoLesson/configs/zoomInOutLesson';
import {
  PAN_WRITTEN_TUTORIAL_COPY,
  PAN_WRITTEN_TUTORIAL_STEPS,
  ROTATE_VIEW_WRITTEN_TUTORIAL_COPY,
  ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS,
  ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY,
  ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS,
} from '../WrittenTutorial/MouseControlsAndModelNavigation';
import { InteractiveVideoLessonConfig } from './types';

export const zoomInOutVideoLessonConfig: InteractiveVideoLessonConfig = {
  ...baseZoomConfig,
  writtenTutorialSteps: ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY,
};

export const panVideoLessonConfig: InteractiveVideoLessonConfig = {
  ...basePanConfig,
  writtenTutorialSteps: PAN_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: PAN_WRITTEN_TUTORIAL_COPY,
};

export const rotateViewVideoLessonConfig: InteractiveVideoLessonConfig = {
  ...baseRotateConfig,
  writtenTutorialSteps: ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: ROTATE_VIEW_WRITTEN_TUTORIAL_COPY,
};
