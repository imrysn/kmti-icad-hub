import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 3.1: Zoom In and Zoom Out ────────────────────────────────────── */

export const ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Zoom In and Zoom Out',
  description: 'are used to change how closely you view your drawing or 3D model without changing its actual size.',
  moduleLabel: '',
  procedureTitle: 'ivl-objective',
  objective: 'By the end of this lesson, you will be able to adjust the view using Zoom In and Zoom Out.',
  completionText: 'Great job! You have completed the Zoom In and Zoom Out lesson.',
  inlineHeader: true,
  hideStepNumbers: false,
  renderAsObjective: true,
};

export const ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'zoom-step-1',
    title: 'Use Zoom In when you want to :',
    text: '\n* Checking small details. \n* Working on a specific part of the model. \n* Viewing features more clearly.',
    preserveText: true,
  },
  {
    id: 'zoom-step-2',
    title: 'Use Zoom Out when you want to :',
    text: '\n* Viewing the overall model, \n* Working with large drawings or assemblies. \n* Finding other areas of the workspace.',
    preserveText: true,
  },

];

/* ── Lesson 3.2: Pan ─────────────────────────────────────────────────────── */

export const PAN_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Pan',
  description: 'is used to to move the drawing or 3D model accross the screen withouth changing its size or position in the model.',
  procedureTitle: 'ivl-objective',
  objective: 'By the end of this lesson, you will be able to move the view around the workspace using Pan.',
  completionText: 'Great job! You have completed the Pan lesson.',
  inlineHeader: true,
  renderAsObjective: true,
};

export const PAN_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'pan-step-1',
    title: 'Use Pan when you want to :',
    text: '\n* View another area of the model.\n* Reposition the model on your screen.\n* Navigate around a large drawing or assembly.',
    preserveText: true,
  },

];

/* ── Lesson 3.3: Rotate the 3D View ──────────────────────────────────────── */

export const ROTATE_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Rotate View',
  description: 'allows to view a 3D model from different angles without changing the actual model.',
  procedureTitle: 'ivl-objective',
  objective: 'By the end of this lesson, you will be able to rotate a 3D model and inspect it from different directions.',
  completionText: 'Great job! You have completed the Rotate the 3D View lesson.',
  inlineHeader: true,
  renderAsObjective: true,
};

export const ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'rotate-step-1',
    title: 'Use Rotate View when you want to :',
    text: '\n* See the model from different angle.\n* Inspect hidden or hard-to-see-areas.\n* Better understand the models 3D shape. ',
    preserveText: true,
  },

];
