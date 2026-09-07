import { WrittenTutorialCopy, WrittenTutorialStep } from './types';
import originAxesImage from '../../../assets/icad-foundations/origin.png';

/* ── Lesson 5: Origin ────────────────────────────────────────────────────── */

export const ORIGIN_AXES_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Origin',
  description:
    'A point where the coordinates of the X,Y and Z-axis are (0, 0, 0). It also sets the layout/orientation of views of an object/entity. Origin location is a case-by-case basis. It depends on the shape/structure of the part.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'ivl-objective',
  objective:
    'By the end of this lesson, you will understand the concept of Origin, identify the X, Y, and Z coordinate axes, and know how to anchor the first 3D object at the origin using the Key Entry Area (0, 0, 0).',
  quickReviewTitle: 'Quick Review',
  quickReviewText:
    '<b>Locate Origin (0, 0, 0)</b> → <b>Identify X, Y, Z Axes</b> → <b>Key Entry Area: 0, 0, 0</b> → <b>Anchor First Object</b>',
  completionText: 'Great job! You have completed the Origin lesson.',
  inlineHeader: true,
  renderAsObjective: true,
};

export const ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'origin-step-1',
    title: 'What is the Origin? (0, 0, 0)',
    text: '\n* <b>Zero Reference Point</b> - A point where the coordinates of the X, Y, and Z-axis are <b>(0, 0, 0)</b>.\n* <b>View Orientation</b> - It sets the baseline layout and orientation of views for an object or entity.\n* <b>Case-by-Case Basis</b> - The position of the origin depends on the shape and mechanical structure of the part.',
    preserveText: true,
  },
  {
    id: 'origin-step-2',
    title: 'The Coordinate Axes (X, Y, Z)',
    text: '\n* <b>X-Axis (Red)</b> - Represents the horizontal direction.\n* <b>Y-Axis (Blue)</b> - Represents the vertical height axis.\n* <b>Z-Axis (Yellow)</b> - Represents the depth direction in 3D space.',
    preserveText: true,
    image: originAxesImage,
    imageAlt: 'The Coordinate Axes (X, Y, Z)',
  },
  {
    id: 'origin-step-3',
    title: 'Setting Origin for the First Object',
    text: '\n* <b>Initial Placement</b> - In order to set the origin in your workspace, the first placed object or basic shape must be positioned at <b>(0, 0, 0)</b>.\n* <b>Key Entry Area</b> - Enter <b>0, 0, 0</b> in the Key Entry Area when placing the shape to anchor it directly at the origin point.',
    preserveText: true,
  },
  {
    id: 'origin-step-4',
    title: 'Important Modeling Guidelines',
    text: '\n* <b>2D and 3D Consistency</b> - The origin must be in the exact same relative position in both 3D and 2D.\n* <b>Spatial Awareness</b> - The coordinate triad indicator rotates as you rotate your viewpoint to maintain orientation.',
    preserveText: true,
  },
];

/* ── Lesson 5.2: Change 3D Part Layout ───────────────────────────────────── */

export const ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Change 3D Part Layout',
  description: 'Use this tool to set the location of origin.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  objective: 'By the end of this lesson, you will be able to relocate the origin and define the orientation of the X and Y axes using the Change 3D Part Layout tool.',
  quickReviewTitle: 'Quick Review',
  quickReviewText:
    '<b>Change 3D Part Layout</b> → <b>Right-click: Current Origin</b> → <b>Point 1: New Origin</b> → <b>Point 2: X-Axis</b> → <b>Point 3: Y-Axis (Front View)</b>',
  completionText: 'Great job! You have completed the Change 3D Part Layout lesson.',
  inlineHeader: true,
};

export const ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'layout-step-1',
    title: 'Select Change 3D Part Layout',
    text: 'From the icon menu, navigate to <b>パーツ (3D PARTS )</b> → <b>パーツのレイアウトを変更する</b> (Change 3D Part Layout).',
    preserveText: true,
  },
  {
    id: 'layout-step-2',
    title: 'Show Current Origin',
    text: '<b>Right-click</b> to display the current position of the origin on the model.',
    preserveText: true,
  },
  {
    id: 'layout-step-3',
    title: 'Set New Origin (Point 1)',
    text: '<b>Left-click</b> on the desired new location of the origin (<b>Point 1</b>).',
    preserveText: true,
  },
  {
    id: 'layout-step-4',
    title: 'Set X-Axis (Point 2)',
    text: '<b>Left-click</b> on a second point to establish the <b>X-axis</b> direction (<b>Point 2</b>).',
    preserveText: true,
  },
  {
    id: 'layout-step-5',
    title: 'Set Y-Axis & Front View (Point 3)',
    text: '<b>Left-click</b> on a third point to define the <b>Y-axis</b> (<b>Point 3</b>). The resulting <b>XY-plane</b> becomes the front view.',
    preserveText: true,
  },
];


