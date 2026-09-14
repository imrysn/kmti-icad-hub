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
  quickReviewText: "Front View → Cylinder → Y → Size → Position → Enter",
  completionText: 'Great job! You can now create and position a basic cylinder in iCAD SX.',
  inlineHeader: true,
};

export const CYLINDER_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    "id": "cyl-step-1",
    "title": "Select Front View",
    "text": "Select <b>Front View</b> from the <b>3D View toolbar</b>.",
    "preserveText": true
  },
  {
    "id": "cyl-step-2",
    "title": "Select Cylinder",
    "text": "In the <b>Icon Menu</b> on the right, open <b>Shape Placement</b> and select <b>Cylinder</b>.",
    "preserveText": true
  },
  {
    "id": "cyl-step-3",
    "title": "Select Y Orientation",
    "text": "After selecting Cylinder, find the orientation buttons in the <b>Command Menu on the left</b>. Select <b>Y</b> before entering the size.",
    "preserveText": true
  },
  {
    "id": "cyl-step-4",
    "title": "Enter the Size",
    "text": "In <b>Item Entry</b>, enter:\n<b>Diameter (直径): 10 mm</b>\n<b>Height (高さ): 10 mm</b>",
    "preserveText": true
  },
  {
    "id": "cyl-step-5",
    "title": "Enter the Position",
    "text": "In <b>Key Entry</b>, type <b>0 0 0</b>, with a space between each value, to position the Cylinder at the current origin.",
    "preserveText": true
  },
  {
    "id": "cyl-step-6",
    "title": "Create and Check",
    "text": "With <b>Key Entry</b> active, press <b>Enter</b>. Check that one Cylinder appears.",
    "preserveText": true
  }
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
  quickReviewText: "Front View → Box → Y → Size → Position → Enter",
  completionText: 'Great job! You have completed the Box lesson.',
  inlineHeader: true,
};

export const BOX_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    "id": "box-step-1",
    "title": "Select Front View",
    "text": "Select <b>Front View</b> from the <b>3D View toolbar</b>.",
    "preserveText": true
  },
  {
    "id": "box-step-2",
    "title": "Select Box",
    "text": "In the <b>Icon Menu</b> on the right, open <b>Shape Placement (形状配置)</b> and select <b>Box (直方体)</b>.",
    "preserveText": true
  },
  {
    "id": "box-step-3",
    "title": "Select Y Orientation",
    "text": "After selecting Box, the orientation buttons appear in the <b>Command Menu on the left</b>. Select <b>Y</b> before entering the size.",
    "preserveText": true
  },
  {
    "id": "box-step-4",
    "title": "Enter the Size",
    "text": "In <b>Item Entry</b>, enter:\n<b>Depth (length): 20 mm</b>\n<b>Width: 30 mm</b>\n<b>Height: 10 mm</b>",
    "preserveText": true
  },
  {
    "id": "box-step-5",
    "title": "Enter the Position",
    "text": "In <b>Key Entry</b>, type <b>0 0 0</b>, with a space between each value, to position the Box at the current origin.",
    "preserveText": true
  },
  {
    "id": "box-step-6",
    "title": "Create and Check",
    "text": "With <b>Key Entry</b> active, press <b>Enter</b> to create the Box. Check that one Box appears.",
    "preserveText": true
  }
];

/* ── Polygonal Prism ─────────────────────────────────────────────────────── */

export const POLYGON_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Polygonal Prism',
  description: 'is a 3D shape with multiple flat sides. It is useful for creating parts such as hexagonal blocks, nuts, and other multi-sided components.',
  moduleLabel: '',
  objective: 'By the end of this lesson, you will be able to create and position a polygonal prism in iCAD SX.',
  procedureTitle: 'How to Create a Polygonal Prism',
  quickReviewTitle: 'Quick Review',
  quickReviewText: "Front View → Polygonal Prism → Y → Size → Position → Enter",
  completionText: 'Great job! You have completed the Polygonal Prism lesson.',
  inlineHeader: true,
};

export const POLYGON_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    "id": "polygon-step-1",
    "title": "Select Front View",
    "text": "Select <b>Front View</b> from the <b>3D View toolbar</b>.",
    "preserveText": true
  },
  {
    "id": "polygon-step-2",
    "title": "Select Polygonal Prism",
    "text": "In the <b>Icon Menu</b> on the right, open <b>Shape Placement</b> and select <b>Polygonal Prism</b>.",
    "preserveText": true
  },
  {
    "id": "polygon-step-3",
    "title": "Select Y Orientation",
    "text": "After selecting Polygonal Prism, find the orientation buttons in the <b>Command Menu on the left</b>. Select <b>Y</b> before entering the size.",
    "preserveText": true
  },
  {
    "id": "polygon-step-4",
    "title": "Enter the Size",
    "text": "In <b>Item Entry</b>, enter:\n<b>Sides (頂点数): 6</b>\n<b>Diameter (直径): 10 mm</b>\n<b>Height (高さ): 10 mm</b>",
    "preserveText": true
  },
  {
    "id": "polygon-step-5",
    "title": "Enter the Position",
    "text": "In <b>Key Entry</b>, type <b>0 0 0</b>, with a space between each value, to position the Polygonal Prism at the current origin.",
    "preserveText": true
  },
  {
    "id": "polygon-step-6",
    "title": "Create and Check",
    "text": "With <b>Key Entry</b> active, press <b>Enter</b>. Check that one Polygonal Prism appears.",
    "preserveText": true
  }
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
    text: 'Select Front View from the 3D View Toolsbar. \n\n From the Command Menu, select:\n <b>Arrange Solid</b> > <b>Y Orientation</b> ',
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
    text: 'In the Key Entry Area, enter the coordinates where the cone will be placed.\n <b>Example: 0, 0, 0</b>',
    preserveText: true,
  },
  {
    id: 'cone-step-5',
    title: 'Create the Cone',
    text: 'Confirm the values in the Item Entry area. Then, <b>click ENTER</b>. \nThe cone will appear in the workspace.',
    preserveText: true,
  },
];

/* ── Torus ───────────────────────────────────────────────────────────────── */

export const TORUS_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Torus',
  description: 'is a ring-shaped 3D object. It is commonly used for parts such as O-rings, seals, rings, and curved tube-shaped components.',
  moduleLabel: '',
  objective: 'By the end of this lesson, you will be able to create and position a torus in iCAD SX.',
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
    text: 'Select Front View from the 3D View Toolsbar. \n\n From the Command Menu, select:\n <b>Arrange Solid</b> > <b>Y Orientation</b> ',
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
