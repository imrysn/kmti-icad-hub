import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const TOOLBARS_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'This lesson introduces the iCAD tool bars and the commands available in each section.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the iCAD Tool Bars lesson.',
};

export const TOOLBARS_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'tb-file',
    title: 'File',
    text: 'Contains new, open, save, print.',
    preserveText: true,
  },
  {
    id: 'tb-2d-view',
    title: '2D View',
    text: 'Contains Previous View, Switch Views, Next View.',
    preserveText: true,
  },
  {
    id: 'tb-switch-display',
    title: 'Switch Display',
    text: 'Contains Change Projection Method, Switch Dimensions.',
    preserveText: true,
  },
  {
    id: 'tb-screen-operations',
    title: 'Screen Operations',
    text: 'Contains Set Zoom Area, Zoom In, Zoom Out, Zoom to Fit, Re-Display, Previous Zoom.',
    preserveText: true,
  },
  {
    id: 'tb-3d-view',
    title: '3D View',
    text: 'Contains Top, Front, Right, Left, Back, Bottom, Set a Plane, Set using 3-Points.',
    preserveText: true,
  },
  {
    id: 'tb-user-views',
    title: 'User Views',
    text: 'Contains User View 1, 2, 3, 4 (ISOMETRIC VIEWS).',
    preserveText: true,
  },
  {
    id: 'tb-screen-memory',
    title: 'Screen Memory',
    text: 'Stores the currently displayed screen.',
    preserveText: true,
  },
  {
    id: 'tb-entry-control',
    title: 'Entry Control',
    text: 'The method for entity selection and coordinate entry can be specified.',
    preserveText: true,
  },
];
