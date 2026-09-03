import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Correctly select 3D objects, individual faces, and edges before executing operations.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Selecting Geometry lesson.',
};

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'select-step-1',
    title: 'Select an Object',
    text: 'Move your pointer over the desired 3D part and left-click to select the entire object.',
    preserveText: true,
  },
  {
    id: 'select-step-2',
    title: 'Verify Highlight',
    text: 'Confirm the object boundary highlights, indicating the active target for modification.',
    preserveText: true,
  },
  {
    id: 'select-step-3',
    title: 'Select Individual Faces',
    text: 'Position the pointer over a planar or curved surface and left-click to select only that face.',
    preserveText: true,
  },
  {
    id: 'select-step-4',
    title: 'Select Model Edges',
    text: 'Move the pointer directly over the intersection boundary between two faces to select the edge.',
    preserveText: true,
  },
];
