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
  description: 'Use User View (Isometric) to inspect multiple faces and 3D dimensions simultaneously.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the User View lesson.',
};

export const USER_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'user-view-step-1',
    title: 'Locate User View Controls',
    text: 'Find the User View buttons (User View 1, 2, 3, 4) in the 3D View toolbar.',
    preserveText: true,
  },
  {
    id: 'user-view-step-2',
    title: 'Select User View 1',
    text: 'Click User View 1 to display the standard isometric viewpoint showing width, depth, and height.',
    preserveText: true,
  },
  {
    id: 'user-view-step-3',
    title: 'Switch Viewing Angles',
    text: 'Click User View 2, 3, or 4 to inspect alternate isometric angles without moving the part geometry.',
    preserveText: true,
  },
  {
    id: 'user-view-step-4',
    title: 'Confirm Model Orientation',
    text: 'Verify overall 3D geometry and proportion from your chosen isometric view.',
    preserveText: true,
  },
];
