import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const INSPECT_MODEL_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Apply navigation, standard-view, and entity-selection skills to inspect a 3D model.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  quickReviewTitle: 'Quick Review',
  quickReviewText:
    '<b>Zoom & Orbit</b> → <b>Cycle Standard Views</b> → <b>Return to User View</b> → <b>Select Faces & Edges</b>',
  completionText: 'Great job! You have completed the Inspection Practice lesson.',
};

export const INSPECT_MODEL_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'inspect-step-1',
    title: 'Zoom Inspection',
    text: 'Zoom in close to inspect the block edges, then zoom out to view the full model.',
    preserveText: true,
  },
  {
    id: 'inspect-step-2',
    title: 'Pan and Orbit',
    text: 'Pan across the workspace and orbit the model using the middle and right mouse buttons.',
    preserveText: true,
  },
  {
    id: 'inspect-step-3',
    title: 'Switch Standard Views',
    text: 'Cycle through Front View, Top View, and Right Side View using the 3D View toolbar.',
    preserveText: true,
  },
  {
    id: 'inspect-step-4',
    title: 'Return to User View',
    text: 'Switch back to User View 1 to re-orient the part in isometric 3D perspective.',
    preserveText: true,
  },
  {
    id: 'inspect-step-5',
    title: 'Select Faces and Edges',
    text: 'Practice selecting the top planar face, a side face, and an individual corner edge.',
    preserveText: true,
  },
];
