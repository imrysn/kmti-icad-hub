import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 4.1: 3D View ─────────────────────────────────────────────────── */

export const STANDARD_3D_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: '3D View',
  description: 'tools allow you to view your 3D model from different directions without changing the actual model.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'ivl-objective',
  objective: 'By the end of this lesson, you will be able to change the viewing direction of a 3D model.',
  completionText: 'Great job! You have completed the 3D View lesson.',
  inlineHeader: true,
  renderAsObjective: true,
};

export const STANDARD_3D_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'view-step-1',
    title: '3D View Options',
    text: '\n* Top - View the model from above. \n* Front - View the model from the front. \n* Right - View the model from teh right side. \n* Left - View the model from the left side. \n* Back - View the model from behind. \n* Bottom - View the model from below.',
    preserveText: true,
  },
  {
    id: 'view-step-2',
    title: 'When to Use 3D View',
    text: '\n* check the model from a specific side. \n* See features that are difficult to view from the current angle. \n* Position the view before creating or editing a feature.',
    preserveText: true,
  },
];

/* ── Lesson 4.2: User View ───────────────────────────────────────────────── */

export const USER_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'User View',
  description: 'allows you to quickly display the 3D model from preset isometric viewing angles.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'ivl-objective',
  objective: 'By the end of this lesson, you will be able to use User View to inspect a 3D model from different isometric angles.',
  completionText: 'Great job! You have completed the User View lesson.',
  inlineHeader: true,
  renderAsObjective: true,
};

export const USER_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'user-view-step-1',
    title: 'User View Options',
    text: 'iCAD SX provides User View 1, 2, 3, and 4, which show the model from different isometric directions.',
    preserveText: true,
  },
  {
    id: 'user-view-step-2',
    title: 'When to Use User View',
    text: '\n* See multiple sides of the model at once. \n* Understand the overall 3D shape. \n* Quickly inspect the model from another angle.',
    preserveText: true,
  },
];
