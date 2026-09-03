import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const GETTING_STARTED_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Understand what iCAD is and how it is used in mechanical engineering design.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Engineering Workflow',
  completionText: 'Great job! You have completed the Getting Started with iCAD lesson.',
};

export const GETTING_STARTED_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'start-step-1',
    title: 'Create or Open Drawing',
    text: 'Start a new project or open an existing CAD document from the training directory.',
    preserveText: true,
  },
  {
    id: 'start-step-2',
    title: 'Create 2D Geometry',
    text: 'Sketch fundamental 2D wireframe profiles such as lines, circles, and rectangles.',
    preserveText: true,
  },
  {
    id: 'start-step-3',
    title: 'Build 3D Model',
    text: 'Transform 2D geometry into accurate 3D solid parts using extrusion and modeling features.',
    preserveText: true,
  },
  {
    id: 'start-step-4',
    title: 'Assemble Components',
    text: 'Position and combine multiple parts into complete mechanical assemblies.',
    preserveText: true,
  },
  {
    id: 'start-step-5',
    title: 'Prepare 2D Drawings',
    text: 'Generate manufacturing drawings with dimensions, tolerances, and annotations.',
    preserveText: true,
  },
  {
    id: 'start-step-6',
    title: 'Review and Save',
    text: 'Inspect the completed design for accuracy and save your work following file conventions.',
    preserveText: true,
  },
];
