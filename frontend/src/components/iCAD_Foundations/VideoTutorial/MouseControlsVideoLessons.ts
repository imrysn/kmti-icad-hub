import panVideo from '../../../assets/3D_INTERACTIVE/pan.mp4';
import rotateViewVideo from '../../../assets/3D_INTERACTIVE/scroll.mp4';
import zoomInOutVideo from '../../../assets/3D_INTERACTIVE/zoomin_out.mp4';
import {
  PAN_WRITTEN_TUTORIAL_COPY,
  PAN_WRITTEN_TUTORIAL_STEPS,
  ROTATE_VIEW_WRITTEN_TUTORIAL_COPY,
  ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS,
  ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY,
  ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS,
} from '../WrittenTutorial/MouseControlsAndModelNavigation';
import type { InteractiveVideoLessonConfig } from './types';

/* ── Lesson 3.1: Zoom In and Zoom Out Video Tutorial ─────────────────────── */
export const zoomInOutVideoLessonConfig: InteractiveVideoLessonConfig = {
  id: 'lesson-3-1',
  title: 'Zoom In and Zoom Out',
  objective: 'Understand how Zoom In and Zoom Out work, and when to use each viewing action in iCAD.',
  videoSrc: zoomInOutVideo,
  videoLabel: 'iCAD Zoom In and Zoom Out demonstration',
  introSupportingText: 'Learn how to control your view while working with a model in iCAD.',
  introNarration: 'Welcome to this iCAD navigation lesson. In this lesson, you will learn how to zoom in and zoom out while viewing a model.',
  segments: [
    {
      id: 'zoom-in',
      label: 'Zoom In',
      startAt: 3,
      endAt: 11,
      narration: [
        "First, let's look at Zoom In. Position the mouse pointer over the area of the model that you want to inspect.",
        'Scroll the mouse wheel forward to zoom in.',
        'Notice how the model becomes larger as the view moves closer.',
        'Zoom In is useful when you need to inspect smaller features or details more closely.',
      ],
      overlayText: 'Mouse Wheel Forward ↑ = Zoom In',
      narrationCues: [
        {
          at: 3,
          narration: "First, let's look at Zoom In.",
        },
        {
          at: 6,
          narration: 'Position the mouse pointer over the area of the model that you want to inspect.',
        },
        {
          at: 7,
          narration: 'Scroll the mouse wheel forward to zoom in.',
          overlayText: 'Mouse Wheel Forward ↑ = Zoom In',
        },
        {
          at: 8,
          narration: 'Notice how the model becomes larger as the view moves closer.',
          showSubtitle: false,
        },
        {
          at: 11,
          narration: 'Zoom In is useful when you need to inspect smaller features or details more closely.',
        },
      ],
      checkpoint: {
        id: 'zoom-in-check',
        prompt: 'How do you zoom in on the model in iCAD?',
        choices: [
          { id: 'forward', label: 'Scroll the mouse wheel forward/up.', isCorrect: true, feedback: 'Correct! Scrolling the mouse wheel forward zooms in toward the area around your cursor.' },
          { id: 'backward', label: 'Scroll the mouse wheel backward/down.', isCorrect: false, feedback: 'Not quite. Scrolling the mouse wheel backward zooms out rather than zooming in.' },
          { id: 'right-click', label: 'Click the right mouse button.', isCorrect: false, feedback: 'Not quite. The zoom operation shown in this lesson uses the mouse wheel.' },
        ],
      },
    },
    {
      id: 'zoom-out',
      label: 'Zoom Out',
      startAt: 13,
      endAt: 18,
      narration: [
        "Now let's look at Zoom Out.",
        'Scroll the mouse wheel backward to move away from the model and see a larger area of the workspace.',
        'Notice how the model becomes smaller and more of the workspace becomes visible.',
        'Zoom Out is useful when you need a wider view of your drawing or model.',
      ],
      overlayText: 'Mouse Wheel Backward ↓ = Zoom Out',
      narrationCues: [
        {
          at: 13,
          narration: "Now let's look at Zoom Out.",
        },
        {
          at: 15,
          narration: 'Scroll the mouse wheel backward to move away from the model and see a larger area of the workspace.',
          overlayText: 'Mouse Wheel Backward ↓ = Zoom Out',
        },
        {
          at: 16,
          narration: 'Notice how the model becomes smaller and more of the workspace becomes visible.',
          showSubtitle: false,
        },
        {
          at: 18,
          narration: 'Zoom Out is useful when you need a wider view of your drawing or model.',
        },
      ],
      checkpoint: {
        id: 'zoom-out-check',
        prompt: 'What should you do to zoom out in iCAD?',
        choices: [
          { id: 'backward', label: 'Scroll the mouse wheel backward/down.', isCorrect: true, feedback: 'Correct! Scrolling the mouse wheel backward zooms out and lets you see a larger area of the workspace.' },
          { id: 'forward', label: 'Scroll the mouse wheel forward/up.', isCorrect: false, feedback: 'Not quite. Scrolling the mouse wheel forward zooms in.' },
          { id: 'double-click', label: 'Double-click the model.', isCorrect: false, feedback: 'Not quite. The zoom operation shown in this lesson uses the mouse wheel.' },
        ],
      },
    },
  ],
  conceptCheck: {
    id: 'zoom-concept-check',
    prompt: 'You need to inspect a small feature of the model more closely. Which action should you use?',
    choices: [
      { id: 'zoom-in', label: 'Zoom In', isCorrect: true, feedback: 'Correct! Zoom In gives you a closer view of a smaller area of the model.' },
      { id: 'zoom-out', label: 'Zoom Out', isCorrect: false, feedback: 'Zoom Out shows a larger area, so it is not the best choice when inspecting a small feature closely.' },
      { id: 'close-model', label: 'Close the model', isCorrect: false, feedback: 'Closing the model does not help you inspect the feature.' },
    ],
  },
  recapNarration: 'Great work. Remember: scroll the mouse wheel forward to zoom in, and scroll the mouse wheel backward to zoom out. Position your cursor near the area you want to focus on before zooming.',
  recapItems: [
    { action: 'Mouse Wheel Forward ↑', result: 'Zoom In' },
    { action: 'Mouse Wheel Backward ↓', result: 'Zoom Out' },
  ],
  completionText: 'You now understand how to zoom in and zoom out in iCAD.',
  writtenTutorialSteps: ZOOM_IN_OUT_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: ZOOM_IN_OUT_WRITTEN_TUTORIAL_COPY,
};

export const zoomInOutLessonConfig = zoomInOutVideoLessonConfig;

/* ── Lesson 3.2: Pan Video Tutorial ───────────────────────────────────────── */
export const panVideoLessonConfig: InteractiveVideoLessonConfig = {
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
        prompt: 'How do you pan the view in iCAD?',
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
  completionText: 'You now understand how to pan across the iCAD workspace without moving the model.',
  writtenTutorialSteps: PAN_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: PAN_WRITTEN_TUTORIAL_COPY,
};

export const panLessonConfig = panVideoLessonConfig;

/* ── Lesson 3.3: Rotate the 3D View Video Tutorial ─────────────────────────── */
export const rotateViewVideoLessonConfig: InteractiveVideoLessonConfig = {
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
        'Alternatively, hold the Alt key while dragging with the left mouse button.',
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
          narration: 'Alternatively, hold the Alt key while dragging with the left mouse button.',
          overlayText: 'Alternative: Alt + Left-Button Drag',
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
        prompt: 'Which mouse action rotates the 3D view in iCAD?',
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
  recapNarration: 'Great work. Remember: use the middle and right mouse buttons together, then move the mouse to rotate your view. Alternatively, hold the Alt key while dragging with the left mouse button. Rotate View changes your viewpoint, not the actual model.',
  recapItems: [
    { action: 'Middle + Right Mouse Buttons', result: 'Start Rotate View' },
    { action: 'Alt + Left-Button Drag', result: 'Alternative Rotate Method' },
    { action: 'Move the Mouse', result: 'Change Viewing Angle' },
  ],
  completionText: 'You now understand how to rotate the 3D view and inspect a model from different angles.',
  writtenTutorialSteps: ROTATE_VIEW_WRITTEN_TUTORIAL_STEPS,
  writtenTutorialCopy: ROTATE_VIEW_WRITTEN_TUTORIAL_COPY,
};

export const rotateViewLessonConfig = rotateViewVideoLessonConfig;
