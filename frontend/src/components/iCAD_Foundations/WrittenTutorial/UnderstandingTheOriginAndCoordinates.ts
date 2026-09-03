import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 5.1: The Origin & Axes ───────────────────────────────────────── */

export const ORIGIN_AXES_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Identify the global Origin and the X, Y, and Z coordinate axes in 3D space.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Origin and Axes lesson.',
};

export const ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'origin-step-1',
    title: 'Open Training Workspace',
    text: 'Open the coordinate system training workspace in iCAD.',
    preserveText: true,
  },
  {
    id: 'origin-step-2',
    title: 'Locate Coordinate Indicator',
    text: 'Identify the coordinate axis indicator showing the model origin (0, 0, 0).',
    preserveText: true,
  },
  {
    id: 'origin-step-3',
    title: 'Identify X, Y, and Z Axes',
    text: 'Observe the red X horizontal axis, green Y axis, and blue Z height axis.',
    preserveText: true,
  },
  {
    id: 'origin-step-4',
    title: 'Rotate View & Observe Indicator',
    text: 'Rotate your viewpoint and observe how the triad indicator rotates to maintain spatial awareness.',
    preserveText: true,
  },
];

/* ── Lesson 5.2: Change 3D Part Layout ───────────────────────────────────── */

export const ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Understand and modify the 3D part layout relative to the global origin coordinate system.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Change 3D Part Layout lesson.',
};

export const ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'layout-step-1',
    title: 'Select Component',
    text: 'Select the 3D part whose coordinate placement you want to adjust.',
    preserveText: true,
  },
  {
    id: 'layout-step-2',
    title: 'Open Layout Command',
    text: 'Activate the Change Part Layout command from the Assembly/Part menu.',
    preserveText: true,
  },
  {
    id: 'layout-step-3',
    title: 'Specify Alignment Point',
    text: 'Select the reference point or face on the component to align with the target coordinate.',
    preserveText: true,
  },
  {
    id: 'layout-step-4',
    title: 'Confirm New Placement',
    text: 'Enter coordinate offsets or pick the reference origin point to lock the part into place.',
    preserveText: true,
  },
];
