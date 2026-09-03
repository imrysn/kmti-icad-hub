import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export const TOOLBARS_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Tool Bars',
  description: 'provide quick access to commonly used iCAD SX commands. They help you navigate the workspace, control the view, edit your work, and perform modelingoperations',
  moduleLabel: '',
  procedureTitle: 'ivl-objective',
  objective: 'By the end of this lesson, you will be able to identify the main iCAD SX tool bars and understand their basic functions.',
  completionText: 'Great job! You have completed the iCAD SX Tool Bars lesson.',
  inlineHeader: true,
  renderAsObjective: true,
};

export const TOOLBARS_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'tb-file',
    title: 'File',
    text: 'New, Open, Save, and Print.',
    preserveText: true,
  },
  {
    id: 'tb-2d-view',
    title: '2D View',
    text: 'Previous View, Switch Views, and Next View.',
    preserveText: true,
  },
  {
    id: 'tb-switch-display',
    title: 'Switch Display',
    text: 'Changes projection method and dimension display.',
    preserveText: true,
  },
  {
    id: 'tb-screen-operations',
    title: 'Screen Operations',
    text: 'Set Zoom Area, Zoom In, Zoom Out, Zoom to Fit, Re-display, and Previous Zoom.',
    preserveText: true,
  },
  {
    id: 'tb-3d-view',
    title: '3D View',
    text: 'View the model from Top, Front, Right, Left, Back, or Bottom.',
    preserveText: true,
  },
  {
    id: 'tb-user-views',
    title: 'User Views',
    text: 'Access User View 1, 2, 3, 4 (ISOMETRIC VIEWS).',
    preserveText: true,
  },
  {
    id: 'tb-edit',
    title: 'Edit',
    text: 'Undo and Redo.',
    preserveText: true,
  },
  {
    id: 'tb-shading',
    title: 'Shading',
    text: 'Change how the 3D model is displayed.',
    preserveText: true,
  },
  {
    id: 'tb-section-display',
    title: 'Section Display',
    text: 'View model sections.',
    preserveText: true,
  },
  {
    id: 'tb-2d-standard-screen',
    title: '2D Standard Screen',
    text: 'Control the standard drawing screen.',
    preserveText: true,
  },
  {
    id: 'tb-system-information',
    title: 'System Information',
    text: 'Set information or attributes for created entities.',
    preserveText: true,
  },
  {
    id: 'tb-screen-memory',
    title: 'Screen Memory',
    text: 'Save the currently displayed screen.',
    preserveText: true,
  },
  {
    id: 'tb-entry-control',
    title: 'Entry Control',
    text: 'Control entity selection and coordinate entry.',
    preserveText: true,
  },
];
