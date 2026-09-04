import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Lesson 7.1: Create a Line ───────────────────────────────────────────── */

export const CREATE_LINE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Create your first simple 2D line geometry in the iCAD workspace.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Line Tool</b> → <b>Start Point</b> → <b>End Point</b> → <b>Confirm</b>',
  completionText: 'Great job! You have completed the Create a Line lesson.',
};

export const CREATE_LINE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'line-step-1',
    title: 'Open 2D Operation',
    text: 'Switch to the 2D sketch/drawing environment or activate 2D mode.',
    preserveText: true,
  },
  {
    id: 'line-step-2',
    title: 'Select Line Command',
    text: 'Click the Line command in the 2D geometry toolbar or Command Menu.',
    preserveText: true,
  },
  {
    id: 'line-step-3',
    title: 'Specify Starting Point',
    text: 'Click in the graphics area or enter coordinates to place the line start point.',
    preserveText: true,
  },
  {
    id: 'line-step-4',
    title: 'Specify Ending Point',
    text: 'Move the cursor to the target endpoint position and click to complete the line entity.',
    preserveText: true,
  },
];

/* ── Lesson 7.2: Create Circle & Rectangle ───────────────────────────────── */

export const CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Create basic circle and rectangular profile geometry using standard iCAD commands.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Circle: Center + Radius</b> │ <b>Rectangle: Corner 1 + Corner 2 (Width × Height)</b>',
  completionText: 'Great job! You have completed the Circle & Rectangle lesson.',
};

export const CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'circle-rect-step-1',
    title: 'Select Circle Command',
    text: 'Click the Circle tool, specify the center point, and enter the required radius or diameter.',
    preserveText: true,
  },
  {
    id: 'circle-rect-step-2',
    title: 'Confirm Circle Entity',
    text: 'Confirm the circle dimensions to place the circular curve on the working plane.',
    preserveText: true,
  },
  {
    id: 'circle-rect-step-3',
    title: 'Select Rectangle Command',
    text: 'Activate the Rectangle command from the 2D geometry menu.',
    preserveText: true,
  },
  {
    id: 'circle-rect-step-4',
    title: 'Define Corners & Dimensions',
    text: 'Click the first corner, drag diagonally, and enter width and height values to generate the rectangle.',
    preserveText: true,
  },
];
