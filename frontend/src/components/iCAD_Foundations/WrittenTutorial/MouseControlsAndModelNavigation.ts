import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 3.1: Zoom In and Zoom Out ────────────────────────────────────── */

export const ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Understand how Zoom In and Zoom Out work, and when to use each viewing action in iCAD.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Zoom In and Zoom Out lesson.',
};

export const ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'zoom-step-1',
    title: 'Position Mouse Pointer',
    text: 'Move the mouse cursor over the area of the model or drawing you want to inspect.',
    preserveText: true,
  },
  {
    id: 'zoom-step-2',
    title: 'Zoom In',
    text: 'Scroll the mouse wheel forward (up) to zoom in closer to the target details.',
    preserveText: true,
  },
  {
    id: 'zoom-step-3',
    title: 'Zoom Out',
    text: 'Scroll the mouse wheel backward (down) to zoom out and view a broader area.',
    preserveText: true,
  },
  {
    id: 'zoom-step-4',
    title: 'Inspect Target Geometry',
    text: 'Combine cursor repositioning and wheel scrolling to focus on exact design features.',
    preserveText: true,
  },
];

/* ── Lesson 3.2: Pan ─────────────────────────────────────────────────────── */

export const PAN_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Move your view across the workspace without changing the model actual position.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Pan lesson.',
};

export const PAN_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'pan-step-1',
    title: 'Move Cursor into Workspace',
    text: 'Place the mouse cursor inside the main 3D workspace.',
    preserveText: true,
  },
  {
    id: 'pan-step-2',
    title: 'Press and Hold Middle Mouse Button',
    text: 'Press and hold down the middle mouse button (scroll wheel).',
    preserveText: true,
  },
  {
    id: 'pan-step-3',
    title: 'Drag View to Desired Position',
    text: 'Drag the mouse in any direction (left, right, up, or down) to slide the viewpoint.',
    preserveText: true,
  },
  {
    id: 'pan-step-4',
    title: 'Release to Settle View',
    text: 'Release the middle mouse button once the desired geometry is centered in view.',
    preserveText: true,
  },
];

/* ── Lesson 3.3: Rotate the 3D View ──────────────────────────────────────── */

export const ROTATE_VIEW_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Rotate your viewpoint around a 3D model without changing the model orientation in space.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Rotate the 3D View lesson.',
};

export const ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'rotate-step-1',
    title: 'Position Cursor over 3D Model',
    text: 'Move the mouse pointer over the 3D model in the workspace.',
    preserveText: true,
  },
  {
    id: 'rotate-step-2',
    title: 'Press Middle and Right Buttons',
    text: 'Press and hold down the middle mouse button and right mouse button simultaneously (or hold Alt and left-click).',
    preserveText: true,
  },
  {
    id: 'rotate-step-3',
    title: 'Move Mouse to Orbit View',
    text: 'Move your mouse smoothly to rotate your angle of inspection around the 3D part.',
    preserveText: true,
  },
  {
    id: 'rotate-step-4',
    title: 'Release at Desired Angle',
    text: 'Release the mouse buttons once you reach your preferred inspection orientation.',
    preserveText: true,
  },
];
