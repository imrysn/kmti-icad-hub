import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const INTRO_TO_3D_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Create your first 3D rectangular solid model (100 × 60 × 20 mm) from a 2D profile.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Your First 3D Model lesson.',
};

export const INTRO_TO_3D_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'block-step-1',
    title: 'Prepare 2D Profile',
    text: 'Create a rectangular sketch profile with Length: 100 mm and Width: 60 mm.',
    preserveText: true,
  },
  {
    id: 'block-step-2',
    title: 'Select Profile',
    text: 'Highlight and select the closed rectangular wireframe in the viewport.',
    preserveText: true,
  },
  {
    id: 'block-step-3',
    title: 'Start 3D Creation / Extrusion',
    text: 'Activate the Extrude or 3D Part creation command from the modeling toolbar.',
    preserveText: true,
  },
  {
    id: 'block-step-4',
    title: 'Enter Extrusion Height',
    text: 'Enter Height: 20 mm in the dimension input field.',
    preserveText: true,
  },
  {
    id: 'block-step-5',
    title: 'Confirm 3D Solid',
    text: 'Preview the resulting solid block and confirm the command to render your 3D part.',
    preserveText: true,
  },
];
