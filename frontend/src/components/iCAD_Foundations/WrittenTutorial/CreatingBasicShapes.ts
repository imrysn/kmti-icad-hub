import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Cylinder ────────────────────────────────────────────────────────────── */

export const CYLINDER_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Cylinder',
  description: 'a cylinder is a basic 3D shape with a circular base and height. It is commonly used to create parts such as shafts, pins, pipes, bushings, and spacers.',
  moduleLabel: 'Introduction',
  procedureTitle: 'How to Create a Cylinder',
  completionText: 'Great job! You can now create and position a basic cylinder in iCAD SX.',
  inlineHeader: true,
};

export const CYLINDER_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'cyl-step-1',
    title: 'Set the View',
    text: 'Start with the Front View.\nSelect Arrange Solid → Y Orientation.',
    preserveText: true,
  },
  {
    id: 'cyl-step-2',
    title: 'Select Cylinder',
    text: 'From the Icon Menu, select Arrange Cylinder.',
    preserveText: true,
  },
  {
    id: 'cyl-step-3',
    title: 'Enter the Size',
    text: 'In Item Entry, enter the:\n\nDiameter – width of the cylinder\nHeight – height of the cylinder',
    preserveText: true,
  },
  {
    id: 'cyl-step-4',
    title: 'Enter the Position',
    text: 'In the Key Entry Area, enter the origin coordinates, such as 0, 0, 0.',
    preserveText: true,
  },
  {
    id: 'cyl-step-5',
    title: 'Create the Cylinder',
    text: 'Confirm the values. The cylinder will appear in the workspace.',
    preserveText: true,
  },
];

/* ── Box ─────────────────────────────────────────────────────────────────── */

export const BOX_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Box',
  description: 'Create and position a box by entering its width, depth, and height, then placing it accurately at the origin.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Box lesson.',
};

export const BOX_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'box-step-1',
    title: 'Select Box Tool',
    text: 'Open Shape Placement, then select Place Box.',
    preserveText: true,
  },
  {
    id: 'box-step-2',
    title: 'Set Front View',
    text: 'Select Front View from the 3D View toolbar.',
    preserveText: true,
  },
  {
    id: 'box-step-3',
    title: 'Confirm Settings',
    text: 'In the Command Menu, confirm Box, Placement, and Y Orientation.',
    preserveText: true,
  },
  {
    id: 'box-step-4',
    title: 'Enter Dimensions',
    text: 'In the Item Entry area, enter width, depth, and height.',
    preserveText: true,
  },
  {
    id: 'box-step-5',
    title: 'Position Box at Origin',
    text: 'Enter coordinates 0, 0, 0 in Key Entry to position the box at the model origin, then press Enter.',
    preserveText: true,
  },
];

/* ── Polygonal Prism ─────────────────────────────────────────────────────── */

export const POLYGON_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Polygonal Prism',
  description: 'Create and position a polygonal prism by defining its number of sides, path diameter, and height.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Polygonal Prism lesson.',
};

export const POLYGON_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'poly-step-1',
    title: 'Select Polygonal Prism Tool',
    text: 'Open Shape Placement, then select Place Polygonal Prism.',
    preserveText: true,
  },
  {
    id: 'poly-step-2',
    title: 'Set Front View',
    text: 'Select Front View from the 3D View toolbar.',
    preserveText: true,
  },
  {
    id: 'poly-step-3',
    title: 'Confirm Settings',
    text: 'In the Command Menu, confirm Polygon, Placement, and Y Orientation.',
    preserveText: true,
  },
  {
    id: 'poly-step-4',
    title: 'Enter Parameters',
    text: 'In the Item Entry area, specify the number of sides, path diameter, and height.',
    preserveText: true,
  },
  {
    id: 'poly-step-5',
    title: 'Position Polygon at Origin',
    text: 'Enter coordinates 0, 0, 0 in Key Entry to place the polygonal prism at the model origin, then press Enter.',
    preserveText: true,
  },
];

/* ── Cone ────────────────────────────────────────────────────────────────── */

export const CONE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Cone',
  description: 'Create and position a cone by defining its base diameter, top face diameter, and height.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Cone lesson.',
};

export const CONE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'cone-step-1',
    title: 'Select Cone Tool',
    text: 'Open Shape Placement, then select Place Cone.',
    preserveText: true,
  },
  {
    id: 'cone-step-2',
    title: 'Set Front View',
    text: 'Select Front View from the 3D View toolbar.',
    preserveText: true,
  },
  {
    id: 'cone-step-3',
    title: 'Confirm Settings',
    text: 'In the Command Menu, confirm Cone, Placement, and Y Orientation.',
    preserveText: true,
  },
  {
    id: 'cone-step-4',
    title: 'Enter Dimensions',
    text: 'In the Item Entry area, enter base diameter, top face diameter, and height.',
    preserveText: true,
  },
  {
    id: 'cone-step-5',
    title: 'Position Cone at Origin',
    text: 'Enter coordinates 0, 0, 0 in Key Entry to place the cone at the model origin, then press Enter.',
    preserveText: true,
  },
];

/* ── Torus ───────────────────────────────────────────────────────────────── */

export const TORUS_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Torus',
  description: 'Create and position a torus by defining its section diameter, path radius, and turn angle.',
  moduleLabel: 'About the Lesson',
  procedureTitle: 'Procedure',
  completionText: 'Great job! You have completed the Torus lesson.',
};

export const TORUS_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'torus-step-1',
    title: 'Select Torus Tool',
    text: 'Open Shape Placement, then select Place Torus.',
    preserveText: true,
  },
  {
    id: 'torus-step-2',
    title: 'Set Front View',
    text: 'Select Front View from the 3D View toolbar.',
    preserveText: true,
  },
  {
    id: 'torus-step-3',
    title: 'Confirm Settings',
    text: 'In the Command Menu, confirm Torus, Placement, and Y Orientation.',
    preserveText: true,
  },
  {
    id: 'torus-step-4',
    title: 'Enter Parameters',
    text: 'In the Item Entry area, specify section diameter, path radius, and turn angle.',
    preserveText: true,
  },
  {
    id: 'torus-step-5',
    title: 'Position Torus at Origin',
    text: 'Enter coordinates 0, 0, 0 in Key Entry to position the torus at the model origin, then press Enter.',
    preserveText: true,
  },
];
