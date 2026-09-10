import { foundationRecap } from '../../iCAD_Foundations/curriculum';

export interface FoundationsRecapContent {
  narration: string;
  items: Array<{ action: string; result: string }>;
}

const FOUNDATIONS_RECAPS: Record<string, FoundationsRecapContent> = {
  'lesson-1-1': {
    narration: 'Great work. Remember: iCAD SX is specialized for machine and equipment design, handling 1 million parts in 0.2 seconds and unifying mechanical, electrical, and control engineering.',
    items: [
      { action: 'Performance', result: 'Processes data 200x faster (1M parts in 0.2s)' },
      { action: 'Pre-Verification', result: 'Verify assembly, safety, and operation before manufacturing' },
      { action: 'Unified CAD', result: 'Integrates mechanical, electrical, and control design' },
    ],
  },
  'origin-projections': {
    narration: 'Great work. Remember: the origin is the zero reference point, and the X, Y, and Z axes describe position and orientation in three-dimensional space.',
    items: [
      { action: 'Origin', result: 'Use zero, zero, zero as the main reference' },
      { action: 'Axes', result: 'Read X, Y, and Z orientation' },
    ],
  },
  'lesson-6-1': {
    narration: 'Great work. Remember: select Move from the Icon Menu, select the object, enter the movement distance for X, Y, and Z axes, and press Enter to move the object.',
    items: [
      { action: 'Select Move', result: 'From the Icon Menu, select Move' },
      { action: 'Select Object', result: 'Left-click the object you want to move' },
      { action: 'Enter Movement Distance', result: 'In Item Entry, enter X, Y, Z distance and press Enter' },
    ],
  },
  'move': {
    narration: 'Great work. Remember: select Move from the Icon Menu, select the object, enter the movement distance for X, Y, and Z axes, and press Enter to move the object.',
    items: [
      { action: 'Select Move', result: 'From the Icon Menu, select Move' },
      { action: 'Select Object', result: 'Left-click the object you want to move' },
      { action: 'Enter Movement Distance', result: 'In Item Entry, enter X, Y, Z distance and press Enter' },
    ],
  },
  'lesson-6-2': {
    narration: 'Great work. Remember: select Rotate from the Icon Menu, select the object, define the rotation axis with two points, and enter the angle to rotate.',
    items: [
      { action: 'Select Rotate', result: 'From the Icon Menu, select Rotate' },
      { action: 'Select Object', result: 'Left-click the object you want to rotate' },
      { action: 'Set Axis', result: 'Select 2 points to define the rotation axis' },
      { action: 'Enter Angle', result: 'In Item Entry, enter angle (e.g. 90°) and press Enter' },
    ],
  },
  'rotate': {
    narration: 'Great work. Remember: select Rotate from the Icon Menu, select the object, define the rotation axis with two points, and enter the angle to rotate.',
    items: [
      { action: 'Select Rotate', result: 'From the Icon Menu, select Rotate' },
      { action: 'Select Object', result: 'Left-click the object you want to rotate' },
      { action: 'Set Axis', result: 'Select 2 points to define the rotation axis' },
      { action: 'Enter Angle', result: 'In Item Entry, enter angle (e.g. 90°) and press Enter' },
    ],
  },
  'lesson-6-3': {
    narration: 'Great work. Remember: select Mirror from the Icon Menu, select the object, define the mirror plane with 3 points or a face, and confirm to mirror.',
    items: [
      { action: 'Select Mirror', result: 'From the Icon Menu, select Mirror' },
      { action: 'Select Object', result: 'Left-click the object you want to mirror' },
      { action: 'Select Mirror Plane', result: 'Select 3 points or click a face' },
      { action: 'Confirm', result: 'Confirm to create the mirrored result' },
    ],
  },
  'mirror': {
    narration: 'Great work. Remember: select Mirror from the Icon Menu, select the object, define the mirror plane with 3 points or a face, and confirm to mirror.',
    items: [
      { action: 'Select Mirror', result: 'From the Icon Menu, select Mirror' },
      { action: 'Select Object', result: 'Left-click the object you want to mirror' },
      { action: 'Select Mirror Plane', result: 'Select 3 points or click a face' },
      { action: 'Confirm', result: 'Confirm to create the mirrored result' },
    ],
  },
  'lesson-6-4': {
    narration: 'Great work. Remember: select Copy from the Icon Menu, select the object, enter the X, Y, Z movement distance and number of copies, then press Enter to confirm.',
    items: [
      { action: 'Select Copy', result: 'From the Icon Menu, select Copy' },
      { action: 'Select Object', result: 'Left-click the object you want to copy' },
      { action: 'Enter Distance & Copies', result: 'Enter X, Y, Z distance and copy count' },
      { action: 'Confirm', result: 'Press Enter to complete the command' },
    ],
  },
  'copy': {
    narration: 'Great work. Remember: select Copy from the Icon Menu, select the object, enter the X, Y, Z movement distance and number of copies, then press Enter to confirm.',
    items: [
      { action: 'Select Copy', result: 'From the Icon Menu, select Copy' },
      { action: 'Select Object', result: 'Left-click the object you want to copy' },
      { action: 'Enter Distance & Copies', result: 'Enter X, Y, Z distance and copy count' },
      { action: 'Confirm', result: 'Press Enter to complete the command' },
    ],
  },
  'lesson-6-5': {
    narration: 'Great work. Remember: select Rotate Copy from the Icon Menu, select the object, set 2 points for the axis, enter the angle and count, then press Enter to confirm.',
    items: [
      { action: 'Select Rotate Copy', result: 'From the Icon Menu, select Rotate Copy' },
      { action: 'Select Object', result: 'Left-click the object you want to copy and rotate' },
      { action: 'Set Rotation Axis', result: 'Select 2 points to define the axis' },
      { action: 'Enter Angle & Count', result: 'Enter the desired angle and count' },
      { action: 'Confirm', result: 'Press Enter to create the rotated copy' },
    ],
  },
  'rotate-copy': {
    narration: 'Great work. Remember: select Rotate Copy from the Icon Menu, select the object, set 2 points for the axis, enter the angle and count, then press Enter to confirm.',
    items: [
      { action: 'Select Rotate Copy', result: 'From the Icon Menu, select Rotate Copy' },
      { action: 'Select Object', result: 'Left-click the object you want to copy and rotate' },
      { action: 'Set Rotation Axis', result: 'Select 2 points to define the axis' },
      { action: 'Enter Angle & Count', result: 'Enter the desired angle and count' },
      { action: 'Confirm', result: 'Press Enter to create the rotated copy' },
    ],
  },
  'lesson-6-6': {
    narration: 'Great work. Remember: select Mirror Copy from the Icon Menu, select the object, define the mirror plane with 3 points or a face, and confirm to mirror copy.',
    items: [
      { action: 'Select Mirror Copy', result: 'From the Icon Menu, select Mirror Copy' },
      { action: 'Select Object', result: 'Left-click the object you want to copy and mirror' },
      { action: 'Set Mirror Plane', result: 'Select 3 points or a face' },
      { action: 'Confirm', result: 'Confirm the selection to create the mirrored copy' },
    ],
  },
  'mirror-copy': {
    narration: 'Great work. Remember: select Mirror Copy from the Icon Menu, select the object, define the mirror plane with 3 points or a face, and confirm to mirror copy.',
    items: [
      { action: 'Select Mirror Copy', result: 'From the Icon Menu, select Mirror Copy' },
      { action: 'Select Object', result: 'Left-click the object you want to copy and mirror' },
      { action: 'Set Mirror Plane', result: 'Select 3 points or a face' },
      { action: 'Confirm', result: 'Confirm the selection to create the mirrored copy' },
    ],
  },
  'lesson-6-7': {
    narration: 'Great work. Remember: select Delete from the Icon Menu, select the object, and confirm to remove it from the model.',
    items: [
      { action: 'Select Delete', result: 'From the Icon Menu, select Delete' },
      { action: 'Select Object', result: 'Left-click the object you want to remove' },
      { action: 'Confirm', result: 'Confirm the selection to delete the object' },
    ],
  },
  'delete': {
    narration: 'Great work. Remember: select Delete from the Icon Menu, select the object, and confirm to remove it from the model.',
    items: [
      { action: 'Select Delete', result: 'From the Icon Menu, select Delete' },
      { action: 'Select Object', result: 'Left-click the object you want to remove' },
      { action: 'Confirm', result: 'Confirm the selection to delete the object' },
    ],
  },
  'lesson-7-1': {
    narration: 'Great work. Remember: start the Line command, specify the start and end points, then confirm the operation using the command guidance.',
    items: [
      { action: 'Line start', result: 'Specify the first point' },
      { action: 'Line end', result: 'Specify the second point and confirm' },
    ],
  },
  'lesson-7-2': {
    narration: 'Great work. Remember: circles require a center and size, while rectangles require two corners or the requested dimensions.',
    items: [
      { action: 'Circle', result: 'Set the center and radius or diameter' },
      { action: 'Rectangle', result: 'Set opposite corners or dimensions' },
    ],
  },
  'lesson-8-1': {
    narration: 'Great work. Remember: create a dimensioned rectangular profile, use it to form the solid, enter the required height, preview, and confirm.',
    items: [
      { action: '2D profile', result: 'Create a 100 by 60 millimeter rectangle' },
      { action: '3D result', result: 'Create and confirm a 20 millimeter-high block' },
    ],
  },
  'lesson-9-1': {
    narration: 'Great work. Remember: inspect a model using zoom, pan, rotation, standard and User Views, then verify faces and edges through selection.',
    items: [
      { action: 'Navigate', result: 'Zoom, pan, rotate, and change views' },
      { action: 'Inspect', result: 'Select the required face and edge' },
    ],
  },
  'lesson-10-1': {
    narration: 'Great work. Remember: save regularly, use the required folder and filename, and always follow company revision and file-management rules.',
    items: [
      { action: 'Save correctly', result: 'Use the required folder and filename' },
      { action: 'Protect records', result: 'Follow revision and overwrite procedures' },
    ],
  },
  'lesson-11-1': {
    narration: 'Great work. Remember: use Fit to Screen when the model is lost, verify the active command and selection, and follow the message-area guidance.',
    items: [
      { action: 'Lost model', result: 'Use Fit or Fit to Screen' },
      { action: 'Unexpected behavior', result: 'Check selection and command guidance' },
    ],
  },
  'lesson-12-1': {
    narration: 'Great work. Remember: complete the navigation, standard-view, selection, geometry, 3D creation, inspection, and file-saving tasks independently.',
    items: [
      { action: 'Demonstrate', result: 'Navigation, views, selection, and geometry' },
      { action: 'Complete', result: 'Create, inspect, and save the model' },
    ],
  },
  'lesson-13-1': {
    narration: 'Great work. Remember: the practical assessment confirms that you can navigate iCAD, create and inspect geometry, and save the completed work independently.',
    items: [
      { action: 'Core skills', result: 'Navigate, create, and inspect' },
      { action: 'Final workflow', result: 'Complete and save the assigned model' },
    ],
  },
};

export const getFoundationsRecap = (lessonId: string): FoundationsRecapContent | undefined =>
  FOUNDATIONS_RECAPS[lessonId] || foundationRecap(lessonId);
