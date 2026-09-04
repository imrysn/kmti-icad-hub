import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* ── Cylinder ────────────────────────────────────────────────────────────── */

export const CYLINDER_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Cylinder',
  description: 'is a three-dimensional solid with two parallel circular faces joined by a curved surface.',
  description2: 'In CAD, cylinders are commonly used as starting geometry for shafts, pins, rollers, bosses, and cylindrical holes.',
  moduleLabel: '',
  objective: 'By the end of this lesson, you will be able to create and position a cylinder in iCAD SX.',
  procedureTitle: 'How to Create a Cylinder',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Cylinder</b> → <b>Enter Size</b> → <b>Enter Position</b> → <b>Create</b>',
  completionText: 'Great job! You can now create and position a basic cylinder in iCAD SX.',
  inlineHeader: true,
};

export const CYLINDER_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'cyl-step-1',
    title: 'Select Cylinder',
    text: 'From the Icon Menu, open Shape Placement, then select Place Cylinder.',
    preserveText: true,
  },
  {
    id: 'cyl-step-2',
    title: 'Set the View',
    text: 'Select Front View from the 3D View toolbar. \n\n From the Command Menu, select:\n <b>Arrange Solid</b> > <b>Y Orientation</b> ',
    preserveText: true,
  },
  {
    id: 'cyl-step-3',
    title: 'Enter the Size',
    text: 'In Item Entry, enter the:\n\n<b>Diameter</b> – width of the cylinder\n<b>Height</b> – height of the cylinder \n\n <b>Example:</b> Diameter = 10, Height = 10.',
    preserveText: true,
  },
  {
    id: 'cyl-step-4',
    title: 'Enter the Position',
    text: 'In the Key Entry Area, enter the coordinates where the polygonal prism will be placed. \n <b>Example: 0, 0, 0</b> ',
    preserveText: true,
  },
  {
    id: 'cyl-step-5',
    title: 'Create the Cylinder',
    text: 'Confirm the values in the Item Entry area. Then, <b>click ENTER</b>. \nThe cylinder will appear in the workspace.',
    preserveText: true,
  },
];

/* ── Box ─────────────────────────────────────────────────────────────────── */

export const BOX_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Box',
  description: 'is a basic 3D shape used to create rectangular parts such as blocks, plates, bases, and supports.',
  description2: 'Use a box when a component has defined width, depth, and height.',
  moduleLabel: '',
  objective: 'By the end of this lesson, you will be able to create and position a box in iCAD SX.',
  procedureTitle: 'How to Create a Box',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Box</b> → <b>Enter Size</b> → <b>Enter Position</b> → <b>Create</b>',
  completionText: 'Great job! You have completed the Box lesson.',
  inlineHeader: true,
};

export const BOX_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'box-step-1',
    title: 'Select Box',
    text: 'From the Icon Menu, open Shape Placement, then select Place Box.',
    preserveText: true,
  },
  {
    id: 'box-step-2',
    title: 'Set the View',
    text: 'Select Front View from the 3D View toolbar. \n\n From the Command Menu, select:\n <b>Arrange Solid</b> > <b>Y Orientation</b> ',
    preserveText: true,
  },
  {
    id: 'box-step-3',
    title: 'Enter the Size',
    text: 'In Item Entry, enter the:\n\n<b>Depth</b> – length of the box.\n<b>Width</b> – width of the box\n<b>Height</b> – height of the box \n\n <b>Example:</b> Depth = 20, Width = 30, Height = 10.',
    preserveText: true,
  },
  {
    id: 'box-step-4',
    title: 'Enter the Position',
    text: 'In the Key Entry Area, enter the coordinates where the polygonal prism will be placed. \n <b>Example: 0, 0, 0</b> ',
    preserveText: true,
  },
  {
    id: 'box-step-5',
    title: 'Create the Box',
    text: 'Confirm the values in the Item Entry area. Then, <b>click ENTER</b>. \nThe box will appear in the workspace.',
    preserveText: true,
  },
];

/* ── Polygonal Prism ─────────────────────────────────────────────────────── */

export const POLYGON_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Polygonal Prism',
  description: 'is a 3D shape with multiple flat sides. It is useful for creating parts such as hexagonal blocks, nuts, and other multi-sided components.',
  moduleLabel: '',
  objective: 'By the end of this lesson, you will be able to create and position a polygonal prism in iCAD SX.',
  procedureTitle: 'How to Create a Polygonal Prism',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Polygonal Prism</b> → <b>Enter Size</b> → <b>Enter Position</b> → <b>Create</b>',
  completionText: 'Great job! You have completed the Polygonal Prism lesson.',
  inlineHeader: true,
};

export const POLYGON_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'poly-step-1',
    title: 'Select Polygonal Prism',
    text: 'From the Icon Menu, open Shape Placement, then select Place Polygonal Prism.',
    preserveText: true,
  },
  {
    id: 'poly-step-2',
    title: 'Set the View',
    text: 'Select Front View from the 3D View toolbar. \n\n From the Command Menu, select:\n <b>Arrange Solid</b> > <b>Y Orientation</b> ',
    preserveText: true,
  },
  {
    id: 'poly-step-3',
    title: 'Enter the Size',
    text: 'In Item Entry, enter the: \n\n <b>Numbers of Sides</b> - contorls how many sides the polygon has. \n <b>Diameter</b> - controls the overall size of the polygon. \n <b>Height</b> - contols how tall the prism is.\n\n <b>Example:</b> Sides = 6, Diameter = 10, Height = 10.',
    preserveText: true,
  },
  {
    id: 'poly-step-4',
    title: 'Enter the Position',
    text: 'In the Key Entry Area, enter the coordinates where the polygonal prism will be placed. \n <b>Example: 0, 0, 0</b> ',
    preserveText: true,
  },
  {
    id: 'poly-step-5',
    title: 'Create the Polygonal Prism',
    text: 'Confirm the values in the Item Entry area. Then, <b>click ENTER</b>. \nThe polygonal prism will appear in the workspace.',
    preserveText: true,
  },
];

/* ── Cone ────────────────────────────────────────────────────────────────── */

export const CONE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Cone',
  description: 'is a 3D shape with a circular base that becomes smaller toward the top. It is useful for creating tapered parts, nozzles, funnels, and similar components.',
  moduleLabel: '',
  objective: 'By the end of this lesson, you will be able to create and position a cone in iCAD SX.',
  procedureTitle: 'How to Create a Cone',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Cone</b> → <b>Enter Size</b> → <b>Enter Position</b> → <b>Create</b>',
  completionText: 'Great job! You have completed the Cone lesson.',
  inlineHeader: true,
};

export const CONE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'cone-step-1',
    title: 'Select Cone',
    text: 'From the Icon Menu, open Shape Placement, then select Place Cone.',
    preserveText: true,
  },
  {
    id: 'cone-step-2',
    title: 'Set the View',
    text: 'Select Front View from the 3D View toolbar. \n\n From the Command Menu, select:\n <b>Arrange Solid</b> > <b>Y Orientation</b> ',
    preserveText: true,
  },
  {
    id: 'cone-step-3',
    title: 'Enter the Size',
    text: 'In Item Entry, enter the:\n\n<b>Base Diameter</b> – size of the bottom face\n<b>Top Face Diameter </b> – size of the top face  \n <b>Height</b> - height of the cone\n\n <b>Example:</b> Base Diameter = 80, Top Face Diameter = 40, Height = 100.',
    preserveText: true,
  },
  {
    id: 'cone-step-4',
    title: 'Enter the Position',
    text: 'In the Key Entry Area, enter the coordinates where the cylinder will be placed.\n <b>Example: 0, 0, 0</b>',
    preserveText: true,
  },
  {
    id: 'cone-step-5',
    title: 'Create the Cone',
    text: 'Confirm the values in the Item Entry area. Then, <b>click ENTER</b>. \nThe cylinder will appear in the workspace.',
    preserveText: true,
  },
];

/* ── Torus ───────────────────────────────────────────────────────────────── */

export const TORUS_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Torus',
  description: 'is a ring-shaped 3D object. It is commonly used for parts such as O-rings, seals, rings, and curved tube shaped.',
  moduleLabel: '',
  objective: 'By the end of this lesson, you will be able to create and position a torus in iCAD  SX.',
  procedureTitle: 'How to Create a Torus',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Torus</b> → <b>Enter Size</b> → <b>Enter Position</b> → <b>Create</b>',
  completionText: 'Great job! You have completed the Torus lesson.',
  inlineHeader: true,
};

export const TORUS_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'torus-step-1',
    title: 'Select Torus',
    text: 'From the Icon Menu, open Shape Placement, then select Place Torus.',
    preserveText: true,
  },
  {
    id: 'torus-step-2',
    title: 'Set the View',
    text: 'Select Front View from the 3D View toolbar. \n\n From the Command Menu, select:\n <b>Arrange Solid</b> > <b>Y Orientation</b> ',
    preserveText: true,
  },
  {
    id: 'torus-step-3',
    title: 'Enter the Size',
    text: 'In Item Entry, enter the:\n\n<b>Section Diameter</b> - thickness of the torus. \n<b>Path Radius</b> - controls the overall radius of the ring. \n<b>Turn Angle</b> - controls how much of the torus is created. \n\n <b>Example:</b> Section Diameter = 10, Path Radius = 50, Turn Angle = 180.',
    preserveText: true,
  },
  {
    id: 'torus-step-4',
    title: 'Enter the Position',
    text: 'In the Key Entry Area, enter the coordinates where the torus will be placed. \n <b>Example: 0, 0, 0</b> ',
    preserveText: true,
  },
  {
    id: 'torus-step-5',
    title: 'Create the Torus',
    text: 'Confirm the values in the Item Entry area. Then, <b>click ENTER</b>. \n The torus will appear in the workspace.',
    preserveText: true,
  },
];
