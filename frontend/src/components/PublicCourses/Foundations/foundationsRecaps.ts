export interface FoundationsRecapContent {
  narration: string;
  items: Array<{ action: string; result: string }>;
}

const FOUNDATIONS_RECAPS: Record<string, FoundationsRecapContent> = {
  'lesson-1-1': {
    narration: 'Great work. Remember: iCAD SX supports precise engineering design through an organized workspace, guided commands, and dependable modeling tools.',
    items: [
      { action: 'Purpose', result: 'Create and inspect engineering geometry' },
      { action: 'Workflow', result: 'Follow the workspace and command guidance' },
    ],
  },
  'origin-projections': {
    narration: 'Great work. Remember: the origin is the zero reference point, and the X, Y, and Z axes describe position and orientation in three-dimensional space.',
    items: [
      { action: 'Origin', result: 'Use zero, zero, zero as the main reference' },
      { action: 'Axes', result: 'Read X, Y, and Z orientation' },
    ],
  },
  'origin-layout': {
    narration: 'Great work. Remember: use the layout controls and coordinate references to reposition the 3D part accurately, then verify the resulting orientation.',
    items: [
      { action: 'Choose the control', result: 'Start the required layout operation' },
      { action: 'Verify the result', result: 'Confirm position and orientation' },
    ],
  },
  'lesson-6-1': {
    narration: 'Great work. Remember: verify the highlighted object, face, or edge before starting any operation so only the intended geometry is changed.',
    items: [
      { action: 'Before an operation', result: 'Confirm the correct selection' },
      { action: 'Selection types', result: 'Distinguish objects, faces, and edges' },
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
  FOUNDATIONS_RECAPS[lessonId];
