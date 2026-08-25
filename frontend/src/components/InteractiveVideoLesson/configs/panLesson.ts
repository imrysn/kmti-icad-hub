import panVideo from '../../../assets/3D_INTERACTIVE/pan.mp4';
import type { InteractiveVideoLessonConfig } from '../types';

export const panLessonConfig: InteractiveVideoLessonConfig = {
  id: 'lesson-3-2',
  title: 'Pan',
  objective: 'Move your view to another area without moving the actual model.',
  videoSrc: panVideo,
  videoLabel: 'iCAD Pan demonstration',
  introSupportingText: 'Learn how to move your view across the workspace without changing the model position.',
  introNarration: 'Welcome to the Pan lesson. In this lesson, you will learn how to move your view across the workspace without moving the actual model.',
  segments: [
    {
      id: 'pan-view',
      label: 'Pan the View',
      startAt: 1,
      endAt: 7.5,
      narration: [
        'Move the mouse pointer into the workspace.',
        'Press and hold the middle mouse button, or scroll wheel.',
        'While holding the middle mouse button, drag the mouse left, right, up, or down to move the view.',
        'Release the middle mouse button when the area you want to see is visible.',
        'The model appears to move across the screen, but its actual CAD position remains unchanged.',
      ],
      overlayText: 'Hold Middle Mouse Button + Drag = Pan',
      narrationCues: [
        {
          at: 1,
          narration: 'Move the mouse pointer into the workspace.',
        },
        {
          at: 2.5,
          narration: 'Press and hold the middle mouse button, or scroll wheel.',
          overlayText: 'Hold Middle Mouse Button = Start Pan',
        },
        {
          at: 4,
          narration: 'While holding the middle mouse button, drag the mouse left, right, up, or down to move the view.',
          overlayText: 'Drag Left, Right, Up, or Down = Pan View',
        },
        {
          at: 6,
          narration: 'Release the middle mouse button when the area you want to see is visible.',
        },
        {
          at: 7.5,
          narration: 'The model appears to move across the screen, but its actual CAD position remains unchanged.',
        },
      ],
      checkpoint: {
        id: 'pan-action-check',
        prompt: 'How do you pan the view in iCAD SX?',
        choices: [
          { id: 'middle-drag', label: 'Hold the middle mouse button and drag.', isCorrect: true, feedback: 'Correct! Holding the middle mouse button while dragging moves your view across the workspace.' },
          { id: 'wheel-scroll', label: 'Scroll the mouse wheel forward.', isCorrect: false, feedback: 'Not quite. Scrolling the wheel forward zooms in rather than panning.' },
          { id: 'left-click', label: 'Click the model with the left mouse button.', isCorrect: false, feedback: 'Not quite. A left click selects geometry; it does not pan the view.' },
        ],
      },
    },
  ],
  conceptCheck: {
    id: 'pan-concept-check',
    prompt: 'What changes when you use Pan?',
    choices: [
      { id: 'viewpoint', label: 'Your viewpoint moves, while the model position stays unchanged.', isCorrect: true, feedback: 'Correct! Pan changes the area you are viewing without moving the model in CAD space.' },
      { id: 'model-position', label: 'The model moves to a new CAD position.', isCorrect: false, feedback: 'Not quite. That describes moving the model, not panning the view.' },
      { id: 'model-size', label: 'The model dimensions become larger.', isCorrect: false, feedback: 'Not quite. Pan does not modify the model dimensions.' },
    ],
  },
  recapNarration: 'Great work. Remember: hold the middle mouse button and drag to pan across the workspace. Pan moves your view, not the actual model position.',
  recapItems: [
    { action: 'Hold Middle Mouse Button', result: 'Start Pan' },
    { action: 'Drag the Mouse', result: 'Move the View' },
  ],
  completionText: 'You now understand how to pan across the iCAD SX workspace without moving the model.',
};
