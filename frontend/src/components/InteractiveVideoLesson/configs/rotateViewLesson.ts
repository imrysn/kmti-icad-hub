import rotateViewVideo from '../../../assets/3D_INTERACTIVE/scroll.mp4';
import type { InteractiveVideoLessonConfig } from '../types';

export const rotateViewLessonConfig: InteractiveVideoLessonConfig = {
  id: 'lesson-3-3',
  title: 'Rotate the 3D View',
  objective: 'Rotate your viewpoint around a 3D model without changing the model itself.',
  videoSrc: rotateViewVideo,
  videoLabel: 'iCAD Rotate the 3D View demonstration',
  introSupportingText: 'Learn how to inspect a 3D model from different viewing angles without changing its geometry.',
  introNarration: 'Welcome to the Rotate the 3D View lesson. In this lesson, you will learn how to inspect a model from different angles without changing the model itself.',
  segments: [
    {
      id: 'rotate-view',
      label: 'Rotate the 3D View',
      startAt: 1.5,
      endAt: 13.5,
      narration: [
        'View Rotation lets you inspect the model from different angles.',
        'Position the mouse cursor over the 3D model.',
        'Press and hold the middle mouse button, or scroll wheel, and the right mouse button at the same time.',
        'You can also hold the Alt key and use the left mouse button.',
        'Move the mouse slowly to rotate your viewpoint around the model.',
        'Release the mouse buttons when you reach the viewing angle you want.',
        'Rotate View changes where you are looking from. It does not change the actual orientation of the model.',
      ],
      overlayText: 'Middle Mouse Button + Right Mouse Button = Rotate View',
      narrationCues: [
        {
          at: 1.5,
          narration: 'View Rotation lets you inspect the model from different angles.',
        },
        {
          at: 3,
          narration: 'Position the mouse cursor over the 3D model.',
        },
        {
          at: 5,
          narration: 'Press and hold the middle mouse button, or scroll wheel, and the right mouse button at the same time.',
          overlayText: 'Middle Mouse Button + Right Mouse Button = Rotate View',
        },
        {
          at: 7,
          narration: 'You can also hold the Alt key and use the left mouse button.',
          overlayText: 'Alt + Left Mouse Button = Rotate View',
        },
        {
          at: 9,
          narration: 'Move the mouse slowly to rotate your viewpoint around the model.',
          overlayText: 'Move Mouse = Rotate Viewpoint',
        },
        {
          at: 11,
          narration: 'Release the mouse buttons when you reach the viewing angle you want.',
        },
        {
          at: 13.5,
          narration: 'Rotate View changes where you are looking from. It does not change the actual orientation of the model.',
        },
      ],
      checkpoint: {
        id: 'rotate-action-check',
        prompt: 'Which mouse action rotates the 3D view in iCAD SX?',
        choices: [
          { id: 'middle-right', label: 'Hold the middle and right mouse buttons, then move the mouse.', isCorrect: true, feedback: 'Correct! Holding the middle and right mouse buttons while moving the mouse rotates your viewpoint.' },
          { id: 'wheel-forward', label: 'Scroll the mouse wheel forward.', isCorrect: false, feedback: 'Not quite. Scrolling the wheel forward zooms in.' },
          { id: 'middle-drag', label: 'Hold only the middle mouse button and drag.', isCorrect: false, feedback: 'Not quite. Holding only the middle mouse button is used for Pan.' },
        ],
      },
    },
  ],
  conceptCheck: {
    id: 'rotate-concept-check',
    prompt: 'What happens to the model when you use Rotate View?',
    choices: [
      { id: 'viewpoint-only', label: 'Only your viewpoint changes; the model remains unchanged.', isCorrect: true, feedback: 'Correct! Rotate View changes where you are looking from without changing the model orientation.' },
      { id: 'model-rotates', label: 'The model is permanently rotated in CAD space.', isCorrect: false, feedback: 'Not quite. That describes rotating the component rather than rotating the view.' },
      { id: 'model-resizes', label: 'The model dimensions change.', isCorrect: false, feedback: 'Not quite. View Rotation does not modify model dimensions.' },
    ],
  },
  recapNarration: 'Great work. Remember: use the middle and right mouse buttons together, then move the mouse to rotate your view. Rotate View changes your viewpoint, not the actual model.',
  recapItems: [
    { action: 'Middle + Right Mouse Buttons', result: 'Start Rotate View' },
    { action: 'Move the Mouse', result: 'Change Viewing Angle' },
  ],
  completionText: 'You now understand how to rotate the 3D view and inspect a model from different angles.',
};
