import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Apply foundational navigation, view, selection, 2D, 3D, and file management skills.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  quickReviewTitle: 'Quick Review',
  quickReviewText:
    '<b>Navigate Viewport</b> → <b>Standard Views</b> → <b>Select Geometry</b> → <b>2D Sketch & 3D Extrusion</b> → <b>Save File</b>',
  completionText: 'Great job! You have completed the Final Guided Exercise.',
};

export const FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'challenge-step-1',
    title: 'Perform Navigation Cycle',
    text: 'Execute Zoom In, Zoom Out, Pan Left/Right, Rotate View, and Fit to Screen.',
    preserveText: true,
  },
  {
    id: 'challenge-step-2',
    title: 'Switch All Standard Views',
    text: 'Display Front View, Top View, Side View, and return smoothly to User View 1.',
    preserveText: true,
  },
  {
    id: 'challenge-step-3',
    title: 'Perform Entity Selection',
    text: 'Select the component body, one planar face, and one boundary edge.',
    preserveText: true,
  },
  {
    id: 'challenge-step-4',
    title: 'Create 2D Sketch & 3D Block',
    text: 'Sketch a rectangular profile, extrude the assigned 3D solid, and save the exercise file.',
    preserveText: true,
  },
];
