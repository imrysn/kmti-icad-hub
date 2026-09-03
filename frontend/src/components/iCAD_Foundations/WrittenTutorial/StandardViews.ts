import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 4.1: 3D View ─────────────────────────────────────────────────── */

export const STANDARD_3D_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Display a model from standard engineering viewing directions for clear inspection.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the 3D View lesson.',
};

export const STANDARD_3D_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'view-step-1',
    title: 'Locate 3D View Toolbar',
    text: 'Find the standard view icons in the 3D View toolbar at the top of the interface.',
    preserveText: true,
  },
  {
    id: 'view-step-2',
    title: 'Select Front View',
    text: 'Click Front View to align your sightline directly with the front face of the model.',
    preserveText: true,
  },
  {
    id: 'view-step-3',
    title: 'Select Top View',
    text: 'Click Top View to inspect geometry and hole patterns from directly above.',
    preserveText: true,
  },
  {
    id: 'view-step-4',
    title: 'Select Side & Bottom Views',
    text: 'Click Right, Left, or Bottom View to inspect remaining aligned faces.',
    preserveText: true,
  },
];

/* ── Lesson 4.2: User View ───────────────────────────────────────────────── */

export const USER_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Use User View (Isometric) to inspect multiple faces and 3D dimensions simultaneously.',
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
