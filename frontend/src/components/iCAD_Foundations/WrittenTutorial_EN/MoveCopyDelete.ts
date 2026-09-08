import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

/* =========================================================================
   1. MOVE (SELECTING GEOMETRY & MOVE)
   ========================================================================= */
export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Move',
  moduleLabel: 'About the Lesson',
  description:
    'The Move command is used to change the position of a 3D object without changing its size or shape.',
  procedureTitle: 'Procedure',
  objective:
    'By the end of this lesson, you will be able to select 3D geometry, confirm your selection with GO, and move components using the Move tool in iCAD SX.',
  quickReviewTitle: 'Quick Review',
  quickReviewText:
    '<b>Select Move</b> → <b>Select Object</b> → <b>Enter Movement Distance</b> → <b>Confirm</b>',
  completionText: 'Great job! You have mastered moving components in iCAD SX.',
  inlineHeader: true,
};

export const MOVE_WRITTEN_TUTORIAL_COPY = SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY;

export const SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'select-step-1',
    title: 'Select Move Tool',
    text: 'From the Icon Menu, select <b>Move</b>.',
    preserveText: true,
  },
  {
    id: 'select-step-2',
    title: 'Select the Object',
    text: 'Left-click the object you want to move.',
    preserveText: true,
  },
  {
    id: 'select-step-3',
    title: 'Enter Movement Distance',
    text: 'In the Item Entry, enter the movement distance for:\n* X-axis\n* Y-axis\n* Z-axis\n\nThen press <b>Enter</b> to move the object.\n\n<b>Example</b>:\n <b>X= 50mm</b>, <b>Y= 0mm</b>, <b>Z= 0mm</b>\n',
    preserveText: true,
  },
];

export const MOVE_WRITTEN_TUTORIAL_STEPS = SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS;

/* =========================================================================
   2. ROTATE
   ========================================================================= */
export const ROTATE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Rotate',
  moduleLabel: 'About the Lesson',
  description: 'The Rotate command is used to turn a 3D object around a selected axis without changing its size or shape.',
  procedureTitle: 'How to Rotate an Object',
  objectiveLabel: 'Learning Goal',
  objective: 'By the end of this lesson, you will be able to rotate a 3D object to the desired angle in iCAD SX.',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Rotate</b> → <b>Select Object</b> → <b>Set Axis</b> → <b>Enter Angle</b> → <b>Confirm</b>',
  completionText: 'Great job! You have mastered rotating 3D objects in iCAD SX.',
  inlineHeader: true,
};

export const ROTATE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'rotate-step-1',
    title: 'Select Rotate',
    text: 'From the Icon Menu, select Rotate.',
    preserveText: true,
  },
  {
    id: 'rotate-step-2',
    title: 'Select the Object',
    text: 'Left-click the object you want to rotate.',
    preserveText: true,
  },
  {
    id: 'rotate-step-3',
    title: 'Set the Rotation Axis',
    text: 'Select 2 points to define the axis where the object will rotate.',
    preserveText: true,
  },
  {
    id: 'rotate-step-4',
    title: 'Enter the Rotation Angle',
    text: 'In the Item Entry, enter the desired rotation angle.\n\nExample: 90°\n\nPress Enter to complete the rotation.',
    preserveText: true,
  },
  {
    id: 'rotate-step-5',
    title: 'When to Use Rotate',
    text: 'Use Rotate when you need to:\n* Change the orientation of a part.\n* Position a component correctly.\n* Turn an object to a specific angle.',
    hideStepNumber: true,
    preserveText: true,
  },
];

/* =========================================================================
   3. MIRROR
   ========================================================================= */
export const MIRROR_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Mirror',
  moduleLabel: 'About the Lesson',
  description: 'The Mirror command is used to create a mirrored copy of a 3D object across a selected plane.',
  procedureTitle: 'How to Mirror an Object',
  objectiveLabel: 'Learning Goal',
  objective: 'By the end of this lesson, you will be able to mirror a 3D object to the opposite side in iCAD SX.',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Mirror</b> → <b>Select Object</b> → <b>Set Mirror Plane</b> → <b>Confirm</b>',
  completionText: 'Great job! You have mastered mirroring 3D objects in iCAD SX.',
  inlineHeader: true,
};

export const MIRROR_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'mirror-step-1',
    title: 'Select Mirror',
    text: 'From the Icon Menu, select Mirror.',
    preserveText: true,
  },
  {
    id: 'mirror-step-2',
    title: 'Select the Object',
    text: 'Left-click the object you want to mirror.',
    preserveText: true,
  },
  {
    id: 'mirror-step-3',
    title: 'Set the Mirror Plane',
    text: 'Choose one method to define the mirror plane:\n* Select 3 points to define the plane, or\n* Left-click any flat face on the model.',
    preserveText: true,
  },
  {
    id: 'mirror-step-4',
    title: 'Confirm',
    text: 'Confirm the selection to create the mirrored result.',
    preserveText: true,
  },
  {
    id: 'mirror-step-5',
    title: 'When to Use Mirror',
    text: 'Use Mirror when you need to:\n* Create symmetrical parts.\n* Repeat features on the opposite side.\n* Save time instead of creating the same feature again.',
    hideStepNumber: true,
    preserveText: true,
  },
];

/* =========================================================================
   4. COPY
   ========================================================================= */
export const COPY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Copy',
  moduleLabel: 'About the Lesson',
  description: 'The Copy command is used to create one or more duplicates of a 3D object while keeping the original object.',
  procedureTitle: 'How to Use Copy',
  objectiveLabel: 'Learning Goal',
  objective: 'By the end of this lesson, you will be able to copy a 3D object and place the copies at a specified distance.',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Copy</b> → <b>Select Object</b> → <b>Enter X, Y, Z Distance</b> → <b>Enter Number of Copies</b> → <b>Confirm</b>',
  completionText: 'Great job! You have mastered copying 3D objects in iCAD SX.',
  inlineHeader: true,
};

export const COPY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'copy-step-1',
    title: 'Select Copy',
    text: 'From the Icon Menu, select Copy.',
    preserveText: true,
  },
  {
    id: 'copy-step-2',
    title: 'Select the Object',
    text: 'Left-click the object you want to copy.',
    preserveText: true,
  },
  {
    id: 'copy-step-3',
    title: 'Enter the Copy Distance',
    text: 'In the Item Entry, enter the movement distance for:\n* X-axis\n* Y-axis\n* Z-axis\n\nEnter the number of copies, then press Enter to complete.',
    preserveText: true,
  },
  {
    id: 'copy-step-4',
    title: 'When to Use Copy',
    text: 'Use Copy when you need to:\n* Create repeated parts.\n* Duplicate the same object.\n* Place several identical objects at a fixed distance.',
    hideStepNumber: true,
    preserveText: true,
  },
];

/* =========================================================================
   5. ROTATE COPY
   ========================================================================= */
export const ROTATE_COPY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Rotate Copy',
  moduleLabel: 'About the Lesson',
  description: 'The Rotate Copy command works like the Rotate tool, but it creates a rotated duplicate while keeping the original object.',
  procedureTitle: 'How to Use Rotate Copy',
  objectiveLabel: 'Learning Goal',
  objective: 'By the end of this lesson, you will be able to create a rotated copy of a 3D object in iCAD SX.',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Rotate Copy</b> → <b>Select Object</b> → <b>Set Axis</b> → <b>Enter Angle</b> → <b>Confirm</b>',
  completionText: 'Great job! You have mastered creating rotated copies of 3D objects in iCAD SX.',
  inlineHeader: true,
};

export const ROTATE_COPY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'rotate-copy-step-1',
    title: 'Select Rotate Copy',
    text: 'From the Icon Menu, select Rotate Copy.',
    preserveText: true,
  },
  {
    id: 'rotate-copy-step-2',
    title: 'Select the Object',
    text: 'Left-click the object you want to copy and rotate.',
    preserveText: true,
  },
  {
    id: 'rotate-copy-step-3',
    title: 'Set the Rotation Axis',
    text: 'Select 2 points to define the axis of rotation.',
    preserveText: true,
  },
  {
    id: 'rotate-copy-step-4',
    title: 'Enter the Rotation Angle',
    text: 'In the Item Entry, enter the desired angle.\n\nExample: 90°\n\nPress Enter to create the rotated copy.',
    preserveText: true,
  },
  {
    id: 'rotate-copy-step-5',
    title: 'When to Use Rotate Copy',
    text: 'Use Rotate Copy when you need to:\n* Create repeated parts around an axis.\n* Make a duplicate at a different angle.\n* Keep the original object while creating another rotated version.',
    hideStepNumber: true,
    preserveText: true,
  },
];

/* =========================================================================
   6. MIRROR COPY
   ========================================================================= */
export const MIRROR_COPY_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Mirror Copy',
  moduleLabel: 'About the Lesson',
  description: 'The Mirror Copy command works like the Mirror tool, but it creates a mirrored duplicate while keeping the original object.',
  procedureTitle: 'How to Use Mirror Copy',
  objectiveLabel: 'Learning Goal',
  objective: 'By the end of this lesson, you will be able to create a mirrored copy of a 3D object in iCAD SX.',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Mirror Copy</b> → <b>Select Object</b> → <b>Set Mirror Plane</b> → <b>Confirm</b>',
  completionText: 'Great job! You have mastered creating mirrored copies of 3D objects in iCAD SX.',
  inlineHeader: true,
};

export const MIRROR_COPY_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'mirror-copy-step-1',
    title: 'Select Mirror Copy',
    text: 'From the Icon Menu, select Mirror Copy.',
    preserveText: true,
  },
  {
    id: 'mirror-copy-step-2',
    title: 'Select the Object',
    text: 'Left-click the object you want to copy and mirror.',
    preserveText: true,
  },
  {
    id: 'mirror-copy-step-3',
    title: 'Set the Mirror Plane',
    text: 'Choose one method to define the mirror plane:\n* Select 3 points to define the plane, or\n* Left-click any flat face on the model.',
    preserveText: true,
  },
  {
    id: 'mirror-copy-step-4',
    title: 'Confirm',
    text: 'Confirm the selection to create the mirrored copy.',
    preserveText: true,
  },
  {
    id: 'mirror-copy-step-5',
    title: 'When to Use Mirror Copy',
    text: 'Use Mirror Copy when you need to:\n* Create symmetrical parts.\n* Duplicate a feature on the opposite side.\n* Keep the original object while creating its mirrored version.',
    hideStepNumber: true,
    preserveText: true,
  },
];

/* =========================================================================
   7. DELETE
   ========================================================================= */
export const DELETE_WRITTEN_TUTORIAL_COPY: WrittenTutorialCopy = {
  title: 'Delete',
  moduleLabel: 'About the Lesson',
  description: 'The Delete command is used to remove an unwanted object from the 3D model.',
  procedureTitle: 'How to Use Delete',
  objectiveLabel: 'Learning Goal',
  objective: 'By the end of this lesson, you will be able to delete a selected object in iCAD SX.',
  quickReviewTitle: 'Quick Review',
  quickReviewText: '<b>Select Delete</b> → <b>Select Object</b> → <b>Confirm</b>',
  completionText: 'Great job! You have mastered deleting objects in iCAD SX.',
  inlineHeader: true,
};

export const DELETE_WRITTEN_TUTORIAL_STEPS: WrittenTutorialStep[] = [
  {
    id: 'delete-step-1',
    title: 'Select Delete',
    text: 'From the Icon Menu, select Delete.',
    preserveText: true,
  },
  {
    id: 'delete-step-2',
    title: 'Select the Object',
    text: 'Left-click the object you want to remove.',
    preserveText: true,
  },
  {
    id: 'delete-step-3',
    title: 'Confirm',
    text: 'Confirm the selection to delete the object.',
    preserveText: true,
  },
  {
    id: 'delete-step-4',
    title: 'When to Use Delete',
    text: 'Use Delete when you need to:\n* Remove an incorrect object.\n* Remove an unwanted part or feature.\n* Clean up the model.',
    hideStepNumber: true,
    preserveText: true,
  },
];

export default SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS;
