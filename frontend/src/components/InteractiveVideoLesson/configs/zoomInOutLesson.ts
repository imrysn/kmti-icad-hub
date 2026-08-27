import zoomInOutVideo from '../../../assets/3D_INTERACTIVE/zoomin_out.mp4';
import type { InteractiveVideoLessonConfig } from '../types';

export const zoomInOutLessonConfig: InteractiveVideoLessonConfig = {
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
};
