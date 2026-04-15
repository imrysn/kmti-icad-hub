export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type Quiz = {
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export type Lesson = {
  id: string;
  title: string;
  isCompleted?: boolean;
  children?: Lesson[];
  quiz?: Quiz;
  content?: string[];
};

export const ICAD_3D_LESSONS: Lesson[] = [ // cspell:disable-line
  {
    id: 'interface',
    title: 'iCAD Interface',
    content: ['Window Structure', 'Command menus', 'Hierarchical tree view', '3D viewport', 'UI placement', 'modeling environment', 'software layout'],
    children: [
      { id: 'interface', title: 'iCAD Window Interface', content: ['hotspots', 'interactive diagram', 'functional areas', 'navigation'] },
    ],
    quiz: {
      title: 'iCAD Interface Competency',
      description: 'Verify your knowledge of the iCAD modeling environment and UI placement based on the manual.',
      questions: [
        { id: 'q1', text: 'Where is the main drawing/modeling area located in iCAD?', options: ['Left Sidebar', 'Center Window', 'Bottom Status Bar', 'Top Ribbon'], correctAnswer: 1, explanation: 'The Center Window is the primary workspace for modeling.' },
        { id: 'q2', text: 'Which UI element displays the history of created features (e.g., holes, extrusions)?', options: ['Toolbar', 'Command Prompt', 'Tree view / Parts List', 'View Cube'], correctAnswer: 2, explanation: 'The Tree view or Parts List maintains the feature history and hierarchy.' },
        { id: 'q3', text: 'What is the primary function of the "Message Pane" (Item Entry) at the bottom left?', options: ['System settings', 'Guidance for steps and numerical input (Value > GO)', 'File management', 'Chat with support'], correctAnswer: 1, explanation: 'The Message Pane / Item Entry provides guidance for every command step.' },
        { id: 'q4', text: 'Based on the manual, where can you access the "Zoom" commands if the icons are missing?', options: ['File Menu', 'Edit Menu', 'View Menu', 'Help Menu'], correctAnswer: 2, explanation: 'The View Menu contains all display and zoom controls.' },
        { id: 'q5', text: 'Technical: What does "RCS" stand for in the iCAD coordinate system?', options: ['Random Coordinate System', 'Relative Coordinate System', 'Root Control System', 'Rear Coordinate Space'], correctAnswer: 1, explanation: 'RCS (Relative Coordinate System) allows you to define a local 0,0,0 point.' },
        { id: 'q6', text: 'Technical: Which axis is represented by the RED line in the default coordinate system?', options: ['X-Axis', 'Y-Axis', 'Z-Axis', 'W-Axis'], correctAnswer: 0, explanation: 'Standard color coding in iCAD: Red=X, Green=Y, Blue=Z.' },
        { id: 'q7', text: 'What is the "ACS" in iCAD modeling?', options: ['Active Color Scheme', 'Absolute Coordinate System', 'Auto Command Selector', 'Area Calculation System'], correctAnswer: 1, explanation: 'ACS is the fixed, absolute zero point of the workspace.' },
        { id: 'q8', text: 'Where can you find the specific coordinates of your cursor in real-time?', options: ['Title bar', 'View Cube', 'Status Bar (Bottom)', 'Parts List'], correctAnswer: 2, explanation: 'The Status Bar at the bottom displays live X, Y, Z coordinates.' },
        { id: 'q9', text: 'How do you identify which command is currently active?', options: ['The screen turns red', 'Look at the Message Pane/Item Entry instructions', 'Check the printer', 'It is not shown'], correctAnswer: 1, explanation: 'The Message Pane always shows the current step of the active command.' },
        { id: 'q10', text: 'What is the purpose of the icons numbered 1 to 10 in the lesson interface diagram?', options: ['They are keyboard shortcuts', 'They label the specific UI zones (Toolbar, Menu, Tree, etc.)', 'They are part names', 'They are file versions'], correctAnswer: 1, explanation: 'The lesson uses these labels to identify the different functional areas of the iCAD screen.' }
      ]
    }
  },
  {
    id: 'toolbars',
    title: 'Tool Bars',
    content: ['File', 'New', 'Open', 'Save', 'Print', '2D View', 'Previous View', 'Switch Views', 'Next View', 'Switch Display', 'Projection Method', 'Switch Dimensions', 'Screen Operations', 'Zoom Area', 'Zoom In/Out', 'Zoom to Fit', 'Re-Display', '3D View', 'Top', 'Front', 'Right', 'Left', 'Back', 'Bottom', 'Plane', 'Isometric', 'User Views', 'Edit', 'Undo', 'Redo', 'Shading', 'Frame', 'Hidden Lines', 'Wireframe', 'Section Display', 'Open Work Plane', 'Switch Section Display', '2D Standard Screen', 'Standard Range', 'System Information', 'Line Type', 'Color', 'Layer', 'Scale', 'Grid', 'Screen Memory', 'Entry Control', 'Entity Selection', 'Coordinate Entry', 'AP', 'Magnet Tools'],
    children: [
      { id: 'toolbars', title: 'iCAD Toolbars', content: ['toolbar explorer', 'functional groups', 'quick access'] },
    ],
    quiz: {
      title: 'Tool Bars Mastery',
      description: 'Test your ability to identify and locate essential iCAD toolsets based on specific icon groups.',
      questions: [
        { id: 't1', text: 'Which toolbar contains the "Feature" commands like Hole, Revolve, and Boolean?', options: ['Standard Toolbar', 'IronCAD/iCAD Feature Toolbar', 'View Toolbar', 'Dimension Toolbar'], correctAnswer: 1, explanation: 'The Feature Toolbar is central to all solid modeling operations.' },
        { id: 't2', text: 'Where can you find the "Create 3D Part" and "Change 3D Part Name" icons?', options: ['On the Part Toolbar', 'On the Standard Toolbar', 'Inside the Help Menu', 'On the View Toolbar'], correctAnswer: 0, explanation: 'Part management commands are grouped together in the Part toolbar area.' },
        { id: 't3', text: 'Situational: You need to measure the distance between two points. Which icon group should you look for?', options: ['Dimensioning', 'Inquiry / Analysis', 'Drawing', 'Rendering'], correctAnswer: 1, explanation: 'Inquiry tools provide spatial data like distance and coordinates.' },
        { id: 't4', text: 'Technical: What indicated a "Fly-out" menu in the iCAD toolbar?', options: ['The icon turns blue', 'A small black arrow at the bottom-right of the icon', 'The icon disappears', 'A popup window'], correctAnswer: 1, explanation: 'Black arrows indicate hidden related commands in a sub-menu.' },
        { id: 't5', text: 'Where is the "Set Material" icon located?', options: ['Standard Toolbar', 'Material/Property Toolbar', 'Drawing Toolbar', 'View Toolbar'], correctAnswer: 1, explanation: 'Material settings are part of the property management toolset.' },
        { id: 't6', text: 'Situational: You want to hide a specific layer. Which icon represents "Layer Control"?', options: ['A paint bucket', 'Stacked planes/sheets icon', 'A trash bin', 'A magnifying glass'], correctAnswer: 1, explanation: 'The stacked sheets icon represents layer and level management.' },
        { id: 't7', text: 'Technical: How can you identify a command\'s name before clicking it?', options: ['Right-click it', 'Hover the mouse over the icon to see the Tooltip', 'Check the manual for every icon', 'Guess based on the color'], correctAnswer: 1, explanation: 'Tooltips display the command name on hover.' },
        { id: 't8', text: 'Which toolbar is essential for switching between the 3D space and the 2D drawing environment?', options: ['Environment Switcher / Standard Toolbar', 'View Toolbar', 'Boolean Toolbar', 'Part Toolbar'], correctAnswer: 0, explanation: 'The Standard Toolbar contains buttons to toggle between 3D and 2D modes.' },
        { id: 't9', text: 'Situational: You are looking for "Redo" and "Undo". Which toolbar are they in?', options: ['Standard Toolbar', 'Feature Toolbar', 'Edit Toolbar', 'View Toolbar'], correctAnswer: 0, explanation: 'Undo/Redo are standard system operations.' },
        { id: 't10', text: 'What does the "Eye" icon typically represent in iCAD toolbars?', options: ['Visibility / View settings', 'Delete', 'Save', 'Print'], correctAnswer: 0, explanation: 'The Eye icon is used for toggling visibility of elements like origins or workplanes.' }
      ]
    }
  },
  {
    id: 'origin',
    title: 'Origin',
    content: ['X axis', 'Y axis', 'Z axis', '0,0,0', 'Projections', 'Layout', 'orientation', 'Change 3D Part Layout', 'Front view', 'XY-plane', 'relative origin', 'absolute origin'],
    children: [
      { id: 'origin', title: 'Origin Control', content: ['coordinates', 'view orientation', 'alignment'] },
    ],
    quiz: {
      title: 'Coordinate Systems & iCAD Mapping',
      description: 'Understanding the mathematical center and its relation to views in iCAD.',
      questions: [
        { id: 'o1', text: 'What is the default mapping for the XY Plane in iCAD based on the manual?', options: ['Top View', 'Front View', 'Side View', 'Bottom View'], correctAnswer: 1, explanation: 'In iCAD, the XY plane is mapped to the Front View.' },
        { id: 'o2', text: 'Technical: Which view does the XZ Plane represent?', options: ['Top View', 'Front View', 'Side View', 'Isometric View'], correctAnswer: 0, explanation: 'The XZ plane (Horizontal) is the Top View.' },
        { id: 'o3', text: 'Technical: Which view does the YZ Plane represent?', options: ['Top View', 'Front View', 'Side View', 'Isometric View'], correctAnswer: 2, explanation: 'The YZ plane is the Side View.' },
        { id: 'o4', text: 'What are the numerical coordinates of the Absolute Origin?', options: ['(1,1,1)', '(0,0,0)', '(100,100,100)', '(-1,-1,-1)'], correctAnswer: 1, explanation: 'The Absolute Origin is the fixed zero point (0,0,0).' },
        { id: 'o5', text: 'How do you create a localized origin for a specific part feature?', options: ['Move the absolute origin', 'Define a Relative Coordinate System (RCS)', 'Draw a point and guess', 'It is not possible'], correctAnswer: 1, explanation: 'RCS allows for flexible, local coordinate management.' },
        { id: 'o6', text: 'Technical: What is the purpose of the "G-System" button on the coordinate toolbar?', options: ['Go to origin', 'Toggle between Global and Local coordinates', 'Gravity settings', 'Green color selector'], correctAnswer: 1, explanation: 'The G-System toggle switches view/input between absolute and relative frames.' },
        { id: 'o7', text: 'Situational: You need to model a part on an angle. Should you move the Absolute Origin?', options: ['Yes', 'No, create an RCS at the required angle', 'Yes, but save a backup', 'Move the whole model instead'], correctAnswer: 1, explanation: 'Always keep the Absolute Origin fixed; use RCS for angled work.' },
        { id: 'o8', text: 'What color is the Z-Axis by default in the iCAD compass?', options: ['Red', 'Green', 'Blue', 'Yellow'], correctAnswer: 2, explanation: 'Standard axis colors: X=Red, Y=Green, Z=Blue.' },
        { id: 'o9', text: 'Technical: What does an "Offset Origin" command do?', options: ['Rotates the world', 'Creates a reference point at a specific distance from an existing origin', 'Deletes the origin', 'Changes the scale'], correctAnswer: 1, explanation: 'Offsetting creates a new point at a precise X, Y, Z distance from a reference.' },
        { id: 'o10', text: 'Situational: When designing a symmetrical assembly, where is the best place to put the origin?', options: ['In a corner', 'At the center of symmetry', 'At the bottom-left of the floor', 'In the part note'], correctAnswer: 1, explanation: 'Placing the origin at the center simplifies mirroring and assembly alignment.' }
      ]
    }
  },
  {
    id: 'basic-op',
    title: 'Basic Operation',
    content: ['Creating Basic Shapes', 'Move', 'Rotate', 'Copy', 'Mirror', 'Delete', 'Cylinder', 'Box', 'Polygon', 'Cone', 'Torus', 'prism', 'coordinate entry', 'angle of rotation', 'mirror plane'],
    children: [
      { id: 'basic-op-1', title: 'Basic Operation (1)', content: ['Cylinder', 'Box', 'Polygon', 'Cone', 'Torus'] },
      { id: 'basic-op-2', title: 'Basic Operation (2)', content: ['Move', 'Rotate', 'Mirror', 'Copy', 'Rotate Copy', 'Mirror Copy', 'Delete'] },
      { id: 'basic-op-3', title: 'Basic Operation (3)', content: ['Move', 'Rotate', 'Mirror', 'Copy'] },
      { id: 'basic-op-4', title: 'Basic Operation (4)', content: ['Delete'] },
    ],
    quiz: {
      title: 'Basic iCAD Operations',
      description: 'Test your understanding of the standard workflow for creating and modifying solids in iCAD.',
      questions: [
        { id: 'bo1', text: 'What is the standard sequence for using a modeling command in iCAD?', options: ['Click GO > Select Part', 'Select Target > Enter Value in Item Entry > Click GO', 'Enter Value > Click GO', 'Value > Select Part'], correctAnswer: 1, explanation: 'The standard iCAD workflow is Target Selection -> Numerical Input -> GO.' },
        { id: 'bo2', text: 'How do you finalize or exit a command loop in iCAD?', options: ['Press Escape 10 times', 'Right-click the workspace and select "OK/End" or press Enter', 'Close iCAD', 'Deleting the part'], correctAnswer: 1, explanation: 'Right-click or Enter is used to confirm and end a command sequence.' },
        { id: 'bo3', text: 'Technical: While using the "Move" command, how do you specify a rotation axis center?', options: ['The origin is always the center', 'Select the "Center Point" button and click the reference geometry', 'Click and drag randomly', 'Type "CENTER"'], correctAnswer: 1, explanation: 'Rotation requires a specific center point selection for accuracy.' },
        { id: 'bo4', text: 'Situational: You entered a wrong value in the Item Entry. What is the correct way to fix it before clicking GO?', options: ['Click GO anyway and undo', 'Backspace to correct the value directly in the Item Entry pane', 'Restart the command', 'Delete the part'], correctAnswer: 1, explanation: 'The Item Entry pane is interactive and allows corrections before confirmation.' },
        { id: 'bo5', text: 'What is the "Select Part" filter used for in the toolbar?', options: ['Choosing colors', 'Ensuring you select a whole solid instead of just a face/edge', 'Deleting files', 'Saving settings'], correctAnswer: 1, explanation: 'Selection filters help target the correct geometric level (Body vs Face).' },
        { id: 'bo6', text: 'Technical: What does a "Negative Value" (e.g., -10) typically do in a linear command?', options: ['Deletes the part', 'Moves or extrudes in the opposite direction of the arrow', 'Changes the color to red', 'Errors out'], correctAnswer: 1, explanation: 'Negative values signify "Reverse Direction" in iCAD linear operations.' },
        { id: 'bo7', text: 'Which UI element displays the live instructions for the next step of a command?', options: ['Title bar', 'Message Pane (Item Entry)', 'Parts List', 'Help Menu'], correctAnswer: 1, explanation: 'The Message Pane provides context-sensitive guidance for every tool.' },
        { id: 'bo8', text: 'Situational: You want to select multiple surfaces. How do you do it in iCAD?', options: ['Click one by one without any keys', 'Hold Ctrl while selecting each surface', 'It is not possible', 'Hold Shift only'], correctAnswer: 1, explanation: 'Standard multiple selection in iCAD uses the Ctrl key.' },
        { id: 'bo9', text: 'Technical: What is the "Preview" function for in modeling?', options: ['Shows a temporary blue/wireframe outline before you click GO', 'Plays a video of the lesson', 'Saves a screenshot', 'Calculates the weight'], correctAnswer: 0, explanation: 'Previews allow you to verify the operation results before applying it permanently.' },
        { id: 'bo10', text: 'Where is the software "GO" button located?', options: ['On the keyboard only', 'Inside the Message Pane / Item Entry area', 'In the File menu', 'On the right-click menu only'], correctAnswer: 1, explanation: 'The software GO button is situated within the Item Entry pane for mouse interaction.' }
      ]
    }
  },
  {
    id: '2d-3d',
    title: '2D > 3D',
    children: Array.from({ length: 3 }, (_, i) => ({ id: `2d-3d-${i + 1}`, title: `2D > 3D (${i + 1})` })),
    quiz: {
      title: '2D to 3D Conversion Workflow',
      description: 'Understanding the KEMCO process of turning orthographic geometry into solids.',
      questions: [
        { id: '2d3d1', text: 'What is the first step in converting 2D drawing lines to a 3D solid?', options: ['Apply color', 'Copy/Project the 2D profile into the 3D workspace', 'Dimension the 2D', 'Print the drawing'], correctAnswer: 1, explanation: 'Conversion starts with using 2D geometry as the base for 3D operations.' },
        { id: '2d3d2', text: 'Technical: In iCAD, what is "Hatching" used for during 2D-3D conversion?', options: ['Decoration', 'Defining the closed regions to be solid material', 'Increasing the weight', 'Showing hidden lines'], correctAnswer: 1, explanation: 'Hatch patterns identify the areas of the drawing to be converted into solids.' },
        { id: '2d3d3', text: 'Technical: What is the "Permanent Deletion" warning in the manual referring to?', options: ['Emptying the recycle bin', 'Deleting 2D sketch geometry can break references in associative models', 'Closing the file', 'Saving over a file'], correctAnswer: 1, explanation: 'Sources like 2D geometry should be managed carefully to avoid breaking the 3D feature link.' },
        { id: '2d3d4', text: 'Technical: What does "Matching Hatch" mean in the context of the lesson?', options: ['The colors must match', 'The sectional hatch on the solid must correspond to the 2D drawing hatch', 'Using the same scale', 'Deleting the hatch'], correctAnswer: 1, explanation: 'Sectional views must maintain accurate geometric correspondence between 2D and 3D.' },
        { id: '2d3d5', text: 'Situational: You have a 2D Front view. Which plane do you project this onto in the iCAD 3D space?', options: ['XY Plane', 'XZ Plane', 'YZ Plane', 'Origin Point'], correctAnswer: 0, explanation: 'In iCAD, the XY plane is specifically for the Front View.' },
        { id: '2d3d6', text: 'What is the purpose of the "Solid" command in the 2D-3D utility?', options: ['To make the part harder', 'To generate the 3D volume from the selected profile', 'To change the color to white', 'To save the file'], correctAnswer: 1, explanation: 'The Solid command completes the conversion from 2D profile to 3D volume.' },
        { id: '2d3d7', text: 'Situational: The 2D drawing shows a circle inside a closed loop. What is created in 3D during extrusion?', options: ['A solid part with a hole', 'Two separate parts', 'A solid part only', 'An error'], correctAnswer: 0, explanation: 'Nested loops are interpreted as voids/holes in the solid body.' },
        { id: '2d3d8', text: 'Technical: Can you create a single-body part from multiple 2D sections?', options: ['No', 'Yes, by combining the sections into one solid using the Add command', 'Only if they are red', 'Only in the Top view'], correctAnswer: 1, explanation: 'Multiple profiles can be used to build or modify a single solid body.' },
        { id: '2d3d9', text: 'Why is it important to use "Neutral Zero" (ACS) when starting 2D-3D conversion?', options: ['To save memory', 'To ensure 2D and 3D origins align perfectly for assembly later', 'To make it look 2D', 'To prevent color changes'], correctAnswer: 1, explanation: 'Uniform origin alignment is critical for assembly accuracy.' },
        { id: '2d3d10', text: 'What does "Projecting" 2D lines actually do?', options: ['Prints the drawing', 'Copies selected 2D geometry into the active 3D part sketch', 'Changes line thickness', 'Deletes the lines'], correctAnswer: 1, explanation: 'Projection brings external 2D drawing data into the 3D part environment.' }
      ]
    }
  },
  {
    id: 'hole-details',
    title: 'Hole Details',
    content: ['Arrange Machine Part', 'drill holes', 'tapping holes', 'counterbores', 'specifications', 'tapped holes', 'green', 'threaded', 'hole details'],
    children: [
      { id: 'hole-details', title: 'Creating Hole Details on Parts', content: ['solid entity', 'cut creation', 'color coding'] },
    ],
    quiz: {
      title: 'Hole Engineering & iCAD Logic',
      description: 'Understanding different types of holes and their representation in iCAD.',
      questions: [
        { id: 'hd1', text: 'How are "Tapped Holes" represented in iCAD based on the lesson?', options: ['They are white by default', 'They should be painted GREEN', 'They are colored RED', 'They have no color'], correctAnswer: 1, explanation: 'iCAD uses color coding (Green) to differentiate tapped holes for visibility.' },
        { id: 'hd2', text: 'Technical: What is the benefit of using the "Hole" command over a simple "Extrude Cut" for holes?', options: ['It is faster to click', 'It applies standardized metadata (e.g., M-size, depth, CB height) automatically', 'It makes the part stronger', 'It deletes the part'], correctAnswer: 1, explanation: 'The Hole command is feature-intelligent and contains industrial standards.' },
        { id: 'hd3', text: 'Technical: In a threaded hole specification like M8 x 1.25, what does "1.25" represent?', options: ['Diameter', 'Pitch (distance between threads)', 'Length', 'Weight'], correctAnswer: 1, explanation: 'Pitch is the linear distance between adjacent thread peaks.' },
        { id: 'hd4', text: 'What defines a "Blind Hole" in iCAD?', options: ['A hole that goes through the whole part', 'A hole with a specific depth that does not exit the other side', 'An invisible hole', 'A hole with no name'], correctAnswer: 1, explanation: 'Blind holes stop at a pre-set depth value.' },
        { id: 'hd5', text: 'Technical: What is the purpose of a "Counterbore" (CB)?', options: ['To make the part lighter', 'To hide a bolt head below the surface', 'To drain oil', 'To thread the screw'], correctAnswer: 1, explanation: 'Counterbores provide a flat-bottomed recess for fitting hardware flush.' },
        { id: 'hd6', text: 'Situational: You need to create a hole for a precisely fitted pin. Which operation is correct?', options: ['Drilling only', 'Reaming (H7)', 'Painting', 'Countersinking'], correctAnswer: 1, explanation: 'Reaming provides high-precision finish for localized fits.' },
        { id: 'hd7', text: 'What does a "Through Hole" signify?', options: ['A decorative hole', 'A hole that passes entirely through the material', 'A hole on the side', 'A square hole'], correctAnswer: 1, explanation: 'Through holes exit the opposite face of the part.' },
        { id: 'hd8', text: 'How do you specify the "CB Height" in the iCAD hole command?', options: ['Draw it manually', 'Enter the value in the dedicated parameter inside the Hole dialog/Item entry', 'Scale the hole', 'It is automatic'], correctAnswer: 1, explanation: 'Feature parameters are defined numerically in the iCAD interface.' },
        { id: 'hd9', text: 'Situational: You want to place a hole exactly at the center of a face. How do you do it precisely?', options: ['Guess the center', 'Select the "Center" snapping tool or use coordinate input', 'Draw a line then delete it', 'Move the model'], correctAnswer: 1, explanation: 'iCAD snap tools ensure precise point selection.' },
        { id: 'hd10', text: 'Technical: What is a "Threaded Hole" also known as in manufacturing?', options: ['Through hole', 'Tapped Hole', 'Clearance hole', 'Blind hole'], correctAnswer: 1, explanation: '"Tapping" is the process of cutting internal threads.' }
      ]
    }
  },
  {
    id: 'boolean',
    title: 'Boolean',
    content: ['Boolean Operations', 'Union', 'Subtract', 'Intersect', 'Separate Entity', 'joining 3D entities', 'cutout', 'intersecting product', 'reverse boolean', 'CSG solid', 'Target entity', 'Tool entity'],
    children: [
      { id: 'boolean-1', title: 'Boolean (1) - Union & Subtract', content: ['merging parts', 'cutting out'] },
      { id: 'boolean-2', title: 'Boolean (2) - Intersect & Separate', content: ['intersection product', 'de-union'] },
    ],
    quiz: {
      title: 'Boolean Operations in iCAD',
      description: 'Understanding the logical addition and subtraction of solids based on the manual.',
      questions: [
        { id: 'bl1', text: 'What happens to the Tool and Target entities after an intersection operation in some iCAD workflows?', options: ['They disappear', 'The intersected entities are retained (not deleted)', 'They turn red', 'They are combined into one'], correctAnswer: 1, explanation: 'Based on the manual, intersecting entities are often retained for further work.' },
        { id: 'bl2', text: 'Technical: What defines the "Target" in a Boolean subtraction?', options: ['The part that is being cut into', 'The part that acts as the cutting tool', 'The 2D drawing', 'The coordinate system'], correctAnswer: 0, explanation: 'The Target is the primary body that will be modified.' },
        { id: 'bl3', text: 'What is the "Union" (Add) Boolean operation used for?', options: ['To cut a hole', 'To merge separate solids into a single body', 'To delete a part', 'To change colors'], correctAnswer: 1, explanation: 'Union combines volumes into one continuous solid.' },
        { id: 'bl4', text: 'Situational: You want to remove a cylindrical volume from a block. Which operation do you use?', options: ['Boolean Union', 'Boolean Subtraction (Cylinder as Tool)', 'Scale', 'Mirror'], correctAnswer: 1, explanation: 'Subtraction removes the "Tool" volume from the "Target".' },
        { id: 'bl5', text: 'Technical: Can you perform a Boolean between components on different layers?', options: ['No', 'Yes, provided they are both visible and active', 'Only if they are white', 'Only in 2D'], correctAnswer: 1, explanation: 'Layer placement does not prevent logical operations between solids.' },
        { id: 'bl6', text: 'Situational: You need to create a custom pocket that matches a complex part. How do you do it?', options: ['Draw it manually', 'Use the complex part as a Boolean Tool to subtract its volume', 'Scale the part', 'Use the Hole wizard'], correctAnswer: 1, explanation: 'Boolean subtraction ensures a perfect fit for matching parts.' },
        { id: 'bl7', text: 'Technical: What does an "Invalid Body" error in Boolean mean?', options: ['The part is too small', 'Geometric errors prevent the calculation (e.g., self-intersecting hulls)', 'The color is wrong', 'The file is saved'], correctAnswer: 1, explanation: 'Booleans require clean manifold geometry to succeed.' },
        { id: 'bl8', text: 'Where is the Boolean Command located?', options: ['Standard Toolbar', 'IronCAD/iCAD Feature Toolbar', 'View Menu', 'Help Menu'], correctAnswer: 1, explanation: 'Boolean tools are part of the core Feature toolset.' },
        { id: 'bl9', text: 'What is the "Intersection" result?', options: ['Both parts are kept separate', 'Only the shared overlapping volume is kept', 'Both parts are deleted', 'Everything is merged'], correctAnswer: 1, explanation: 'Intersection keeps only what is common to both bodies.' },
        { id: 'bl10', text: 'Does iCAD allow for "Non-destructive" Boolean editing in the Tree View?', options: ['No', 'Yes, you can edit the position of the Tool component to update the Target', 'Only if you restart', 'Only for boxes'], correctAnswer: 1, explanation: 'Parametric history allows for updating tool placement to re-calculate the result.' }
      ]
    }
  },
  {
    id: 'component',
    title: 'Component',
    content: ['Move Component', 'Copy Component', 'Mirror Component', 'Rotate Component', 'Repeat Copy', 'Delete Component', 'distance', 'number of copies', 'axis of rotation', 'angle of rotation', 'mirror plane', 'drill holes', 'cutouts'],
    children: [
      { id: 'component-1', title: 'Component (1) - Move, Copy, Mirror, Rotate', content: ['repositioning', 'duplication'] },
      { id: 'component-2', title: 'Component (2) - Repeat Copy, Delete', content: ['bulk removal', 'sequential duplication'] },
    ],
    quiz: {
      title: 'iCAD Component Management',
      description: 'Understanding how to handle multiple independent solids as parts.',
      questions: [
        { id: 'c1', text: 'How do you perform a "Move" operation on a specific component in iCAD?', options: ['Drag it with the left mouse button', 'Select the component and use the "Move" command from the Feature menu', 'Type "MOVE" on the keyboard', 'It moves automatically'], correctAnswer: 1, explanation: 'Manual movement requires the specific Move command within the Feature toolset.' },
        { id: 'c2', text: 'Technical: What is the primary benefit of treating a solid as a "Component"?', options: ['It becomes transparent', 'It can have its own independent name, material, and origin for the BOM', 'It is easier to delete', 'It prevents all edits'], correctAnswer: 1, explanation: 'Components are the level at which metadata and assembly data are stored.' },
        { id: 'c3', text: 'Situational: You have several parts that need to be grouped together. What is this called?', options: ['A pile', 'An Assembly / Multi-body structure', 'A layer', 'A 2D drawing'], correctAnswer: 1, explanation: 'Assemblies organize multiple components into a single project file.' },
        { id: 'c4', text: 'Technical: While moving a component, how do you ensure it only moves along one axis?', options: ['Close your eyes', 'The move handle or coordinate input restricts movement to X, Y, or Z', 'Hold Shift only', 'Move the monitor'], correctAnswer: 1, explanation: 'Precise movement is restricted by selecting specific axes or numerical inputs.' },
        { id: 'c5', text: 'What does "Active Component" mean in iCAD?', options: ['A part that is moving', 'The part currently being edited; others may appear dimmed or transparent', 'A part that is red', 'A part with no name'], correctAnswer: 1, explanation: 'Setting an active component focuses all modeling operations on that specific solid.' },
        { id: 'c6', text: 'Situational: You want to hide a component without deleting it. What do you do?', options: ['Change its color to black', 'Right-click and select "Hide" or toggle its visibility in the Parts List', 'Move it off-screen', 'Scale it to zero'], correctAnswer: 1, explanation: 'Visibility toggles (Eyes icon) allow for workspace management.' },
        { id: 'c7', text: 'Technical: Can you create a copy of a component that remains identical to the original?', options: ['No', 'Yes, through "Linked" or "Instanced" copying', 'Only if you draw it again', 'Only in 2D'], correctAnswer: 1, explanation: 'Linking ensures that modifications to the master part update all copies.' },
        { id: 'c8', text: 'Where can you find the list of all components in the current project?', options: ['Toolbar', 'Parts List / History Tree / Scene Browser', 'File menu', 'Help Menu'], correctAnswer: 1, explanation: 'The Parts List hierarchical view shows every component and its status.' },
        { id: 'c9', text: 'Situational: Two parts overlap in the assembly. What should you check?', options: ['Interference Check', 'Color settings', 'File size', 'Mouse speed'], correctAnswer: 0, explanation: 'Interference checks identify physical clashes between components.' },
        { id: 'c10', text: 'Technical: How do you "Rename" a component in iCAD?', options: ['Double-click its name in the Parts List or right-click properties', 'Write on the screen', 'It cannot be renamed', 'Save a new file'], correctAnswer: 0, explanation: 'Renaming is accessible via the hierarchical tree or properties dialog.' }
      ]
    }
  },
  {
    id: 'fairing',
    title: 'Fairing',
    content: ['Chamfer', 'Fillet', 'Shell', 'rounding corners', 'hollowing', 'wall thickness', 'chamfer length', 'fillet radius', 'edge selection'],
    children: [
      { id: 'fairing-1', title: 'Chamfer, Fillet, Shell', content: ['beveled edges', 'rounded edges', 'hollow solid'] }
    ],
    quiz: {
      title: 'Fairing & Advanced Shaping',
      description: 'Mastering smooth transitions and hollow bodies based on the iCAD manual.',
      questions: [
        { id: 'f1', text: 'What is the "Shell" operation primarily used for in iCAD?', options: ['Painting the part', 'Hollowing out a solid to create a specific wall thickness', 'Deleting edges', 'Adding labels'], correctAnswer: 1, explanation: 'Shelling creates a thin-walled cavity inside a solid.' },
        { id: 'f2', text: 'Technical: What is the unique finalization step for the "Shell" command according to the manual?', options: ['Press Escape', 'Perform a "Double GO" (Click GO twice)', 'Save and Close', 'Restart the PC'], correctAnswer: 1, explanation: 'The manual specifies a "Double GO" sequence for certain hollow modeling finalizations.' },
        { id: 'f3', text: 'Situational: You want to make a box hollow but leave the top open. How do you do this with the Shell tool?', options: ['Delete the top face later', 'Select the top face as the "Open Surface" during the Shell command', 'Draw it with thin walls manually', 'It is not possible'], correctAnswer: 1, explanation: 'Selecting an open face removes that surface from the hull during shelling.' },
        { id: 'f4', text: 'Technical: What does "G1 Continuity" (Tangent) refer to in Fairing?', options: ['A sharp corner', 'A smooth transition where the slope/tangency matches at the join', 'A broken curve', 'No transition'], correctAnswer: 1, explanation: 'Tangent continuity ensures a smooth visual flow between surfaces.' },
        { id: 'f5', text: 'Technical: What does "G2 Continuity" (Curvature) refer to?', options: ['Tangency only', 'A transition where both slope AND curvature rate match, making the join invisible', 'A 2D line', 'A circle only'], correctAnswer: 1, explanation: 'Curvature continuity is the highest level for aesthetic surface blending.' },
        { id: 'f6', text: 'Which tool is used to "round" off a sharp edge in the fairing process?', options: ['Fillet', 'Chamfer', 'Scale', 'Mirror'], correctAnswer: 0, explanation: 'Fillets create curved blends on sharp edges.' },
        { id: 'f7', text: 'What is a "Variable Radius Fillet"?', options: ['A fillet that is broken', 'A fillet that changes size along the length of an edge', 'A fixed-size fillet', 'A 2D circle'], correctAnswer: 1, explanation: 'Variable fillets allow for ergonomic and aesthetic transitions.' },
        { id: 'f8', text: 'Situational: After applying a fillet, the geometry looks corrupted. What is a likely cause?', options: ['The radius is too large for the available face space', 'The screen resolution', 'The color of the part', 'The mouse speed'], correctAnswer: 0, explanation: 'Fillets cannot exceed the boundaries of the local geometric edges.' },
        { id: 'f9', text: 'Technical: What is "Fairing" used for in automotive design?', options: ['Weight reduction', 'Ensuring aerodynamic and high-quality light reflection on surfaces', 'Painting', 'Measuring'], correctAnswer: 1, explanation: 'Fairing ensures smooth, highlight-consistent surfaces.' },
        { id: 'f10', text: 'True or False: In iCAD, Shelling is a parametric feature that can be edited later in the tree.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Shelling is a history-based feature allowing wall thickness updates.' }
      ]
    }
  },
  {
    id: '3d-part',
    title: '3D Part',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `3d-part-${i + 1}`, title: `3D Part (${i + 1})` })),
    quiz: {
      title: '3D Part Management',
      description: 'Test your understanding of naming and structure rules in iCAD.',
      questions: [
        { id: '3dp1', text: 'How do you change the "3D Part Name" of an existing solid in iCAD?', options: ['Type it on the keyboard directly', 'Right-click on an empty area in the 3D space and select "Change 3D Part Name"', 'Rename the file in Windows Explorer', 'Delete and redraw'], correctAnswer: 1, explanation: 'Naming is managed through the 3D workspace right-click menu.' },
        { id: '3dp2', text: 'Technical: When the software asks "Update 3D Part Name?" after a change, what is being synced?', options: ['The color', 'The metadata/properties and the Bill of Materials (BOM)', 'The file size', 'The login user'], correctAnswer: 1, explanation: 'Updating ensures naming consistency across the technical documentation.' },
        { id: '3dp3', text: 'Technical: What does "Draft" angle refer to in part design?', options: ['A hand drawing', 'Tapered surfaces to allow a part to exit a mold/die', 'The speed of modeling', 'The weight'], correctAnswer: 1, explanation: 'Draft angles are critical for manufacturing feasibility.' },
        { id: '3dp4', text: 'Situational: You want to copy a feature. Which tool is most automated?', options: ['Manual redraw', 'Feature Pattern (Circular or Linear)', 'Copy/Paste coordinates', 'Snapshot'], correctAnswer: 1, explanation: 'Patterning automates the duplication of features like holes or ribs.' },
        { id: '3dp5', text: 'Technical: What is a "Mirror" operation?', options: ['Rotating a part 180 degrees', 'Reflecting geometry across a symmetry plane', 'Making the part shiny', 'Deleting the part'], correctAnswer: 1, explanation: 'Mirroring creates a symmetric copy based on a reference plane.' },
        { id: '3dp6', text: 'What is "Propagating" a name change?', options: ['Deleting the part', 'Automatically updating the name across the assembly tree and BOM', 'Printing the part', 'Saving as PDF'], correctAnswer: 1, explanation: 'Propagation ensures data integrity throughout the project structure.' },
        { id: '3dp7', text: 'Situational: You have multiple bodies in one part. What is the benefit?', options: ['It is colorful', 'You can perform complex Boolean operations before merging into one solid', 'It saves memory', 'None'], correctAnswer: 1, explanation: 'Multi-body design allows for modular construction of complex solids.' },
        { id: '3dp8', text: 'Technical: What is the "Rollback" function in iCAD?', options: ['Deleting all work', 'Moving the "design time" marker back in the history tree to insert or edit earlier steps', 'Rotating the view', 'Printing'], correctAnswer: 1, explanation: 'Rollback allows for non-destructive history-based editing.' },
        { id: '3dp9', text: 'Where can you confirm the final 3D Part Name before submittal?', options: ['Message Pane', 'Parts List / Scene Browser / Property Sheet', 'Toolbar', 'Help Docs'], correctAnswer: 1, explanation: 'The Scene Browser/Parts List is the central location for part identification.' },
        { id: '3dp10', text: 'True or False: A 3D Part Name and the Windows File Name are always identical.', options: ['True', 'False'], correctAnswer: 1, explanation: 'One iCAD file can contain many parts with individual names.' }
      ]
    }
  },
  {
    id: 'material',
    title: 'Material Setting',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `material-${i + 1}`, title: `Material Setting (${i + 1})` })),
    quiz: {
      title: 'iCAD Material & Weight Logic',
      description: 'Understanding physical properties in the KEMCO iCAD workflow.',
      questions: [
        { id: 'm1', text: 'How do you assign a physical material (e.g., S35C) to a part in iCAD?', options: ['Type it in a note', 'Select "Set Material" from the Property Toolbar and choose from the Library', 'Paint it gray', 'Save the file'], correctAnswer: 1, explanation: 'Material settings are managed through a dedicated tool and library for physical data.' },
        { id: 'm2', text: 'Technical: What should you do if the specified material "S35C" is missing from the list?', options: ['Select nothing', 'Use S45C (same Specific Gravity)', 'Use Aluminum', 'Stop modeling'], correctAnswer: 1, explanation: 'The manual suggests using S45C as a substitute for mass calculation consistency if S35C is unavailable.' },
        { id: 'm3', text: 'What property does "SG" stand for in the material library?', options: ['Super Glass', 'Specific Gravity (Density relative to water)', 'Side Guard', 'Speed Grade'], correctAnswer: 1, explanation: 'Specific Gravity drives the weight calculation in the software.' },
        { id: 'm4', text: 'Situational: Your model is finished. How do you calculate its weight for the BOM?', options: ['Use a kitchen scale', 'Click "Calculated Weight" in the part property sheet', 'Guess based on size', 'Print it out'], correctAnswer: 1, explanation: 'Weight calculation is a digital function based on volume and density.' },
        { id: 'm5', text: 'Technical: What unit is used for weight in the KEMCO system?', options: ['Lbs', 'Kg', 'Grams', 'Newtons'], correctAnswer: 1, explanation: 'Metric kilograms (Kg) is the industrial standard in the manual.' },
        { id: 'm6', text: 'Situational: A part needs to be made of "Al" (Aluminum). Why is this important?', options: ['It is cheaper', 'It significantly changes the calculated weight compared to Steel', 'It looks better', 'It is easier to draw'], correctAnswer: 1, explanation: 'Correct density ensures accurate engineering analysis and logistics planning.' },
        { id: 'm7', text: 'What happens to the part weight if you double its size without changing material?', options: ['Stays the same', 'Increases based on the volume change', 'Decreases', 'Changes color'], correctAnswer: 1, explanation: 'Weight is directly proportional to volume.' },
        { id: 'm8', text: 'Technical: Does "Material Setting" affect the 2D drawing hatching?', options: ['No', 'Yes, in advanced settings it can drive the pattern type', 'Only if you paint it', 'Only in the Isometric view'], correctAnswer: 1, explanation: 'Smart CAD systems link material data to drafting symbols.' },
        { id: 'm9', text: 'How do you confirm the current material of a part?', options: ['Guess by color', 'Check the Property Sheet or Parts List entry', 'Ask the manager', 'Print the drawing'], correctAnswer: 1, explanation: 'The Property Sheet is the source of truth for metadata.' },
        { id: 'm10', text: 'True or False: You should always set the material before finalizing the Bill of Materials.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Accurate procurement requires correct physical data.' }
      ]
    }
  },
  {
    id: 'properties',
    title: 'Properties',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `properties-${i + 1}`, title: `Properties (${i + 1})` })),
    quiz: {
      title: 'Part Properties & UI Logic',
      description: 'Understanding the property sheet and visual settings in iCAD.',
      questions: [
        { id: 'pr1', text: 'What does a "Color Code" (e.g., 100) do when entered in the part property sheet?', options: ['Deletes the part', 'Changes the part color to the corresponding library value', 'Changes the weight only', 'Does nothing'], correctAnswer: 1, explanation: 'iCAD uses numerical codes to quickly assign standard industrial colors.' },
        { id: 'pr2', text: 'Technical: While setting properties, what happens if the "Color Name" or code is left blank?', options: ['The part turns black', 'The color defaults to WHITE', 'The part disappears', 'The software crashes'], correctAnswer: 1, explanation: 'White is the default state for unassigned color properties in iCAD.' },
        { id: 'pr3', text: 'How do you save property changes to the part?', options: ['Close the window', 'Click "OK" or "Apply" in the property sheet', 'Press Escape', 'Restart the computer'], correctAnswer: 1, explanation: 'Changes must be explicitly confirmed to update the model database.' },
        { id: 'pr4', text: 'Technical: Where can you edit the "Part Note" (e.g., Part A) that appears in the BOM?', options: ['Inside the Property Sheet / Scene Browser', 'On the desktop', 'In a separate text file', 'In the help menu'], correctAnswer: 0, explanation: 'BOM metadata is part of the integrated property sheet.' },
        { id: 'pr5', text: 'Situational: You want to check the volume of a part. Where is this property displayed?', options: ['On the toolbar', 'In the Property Sheet / Physical Properties tab', 'In the file name', 'It is not calculated'], correctAnswer: 1, explanation: 'Physical properties provide volume, area, and center of gravity data.' },
        { id: 'pr6', text: 'What is the "Revision" property used for in mechanical design?', options: ['For colors', 'To track the design version (e.g., A, B, C)', 'To delete the part', 'To print it'], correctAnswer: 1, explanation: 'Revision tracking ensures the correct design iteration is manufactured.' },
        { id: 'pr7', text: 'Technical: Can you set different "Transparency" levels for different parts in an assembly?', options: ['No', 'Yes, through the Visibility/Transparency property of each component', 'Only if they are white', 'Only for boxes'], correctAnswer: 1, explanation: 'Transparency allows viewing internal components while maintaining assembly context.' },
        { id: 'pr8', text: 'Situational: You need to add a "Vendor Name" to a purchase part. Where does it go?', options: ['In the Part Note', 'In a "Custom Property" field or dedicated Vendor field in the property sheet', 'On the part surface', 'In the login screen'], correctAnswer: 1, explanation: 'Custom properties allow for flexible metadata management.' },
        { id: 'pr9', text: 'How does iCAD notify you of unsaved property changes?', options: ['A red light', 'Usually a prompt on exit or an asterisk/indicator in the tree', 'It doesn\'t', 'It deletes the file'], correctAnswer: 1, explanation: 'Visual indicators help prevent data loss.' },
        { id: 'pr10', text: 'True or False: Part properties like "Name" and "Material" are automatically extracted when generating a 2D drawing title block.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Integrated data management reduces manual drafting errors.' }
      ]
    }
  },
  {
    id: 'annotation',
    title: 'Annotation',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `annotation-${i + 1}`, title: `Annotation (${i + 1})` })),
    quiz: {
      title: '3D Annotation & iCAD Labels',
      description: 'Understanding how to add technical notes and dimensions in the 3D workspace.',
      questions: [
        { id: 'an1', text: 'Where is the "3D Annotation" tool found in iCAD?', options: ['In the File menu', 'On the 3D Annotation Toolbar', 'In the Color settings', 'Inside the Hole command'], correctAnswer: 1, explanation: 'iCAD provides a dedicated toolbar for 3D drafting and labeling.' },
        { id: 'an2', text: 'Technical: What is the purpose of "3D Dimensions" in the model?', options: ['To make the part look busy', 'To document size and tolerance data directly on the 3D geometry', 'To change the part size', 'To save memory'], correctAnswer: 1, explanation: '3D annotations provide engineering data without needing a 2D drawing.' },
        { id: 'an3', text: 'Situational: You want to add a note that stays attached to a specific face. Which tool do you use?', options: ['Text Box', 'Leader Note / 3D Label', 'Drawing a line', 'Changing the part name'], correctAnswer: 1, explanation: 'Leaders connect text notes to specific geometric features.' },
        { id: 'an4', text: 'Technical: While adding a 3D dimension, how do you define the text orientation?', options: ['It follows the mouse randomly', 'By selecting an Annotation Plane (e.g., XY, XZ, or YZ)', 'It is always flat', 'By rotating the monitor'], correctAnswer: 1, explanation: 'Annotations are placed on specific planes to ensure readability from standard views.' },
        { id: 'an5', text: 'What is "Propagating" 3D annotations?', options: ['Deleting them', 'Showing 3D dimensions in the 2D drawing automatically', 'Printing them', 'Changing their color'], correctAnswer: 1, explanation: 'PMI (Product Manufacturing Information) can be reused in 2D drafting.' },
        { id: 'an6', text: 'Situational: An annotation is hidden behind the part. How do you fix its visibility?', options: ['Delete the part', 'Change the annotation offset or move it to a visible layer/plane', 'Print it', 'Guess the value'], correctAnswer: 1, explanation: 'Annotations must be managed on planes that don\'t intersect the solid hull obscurely.' },
        { id: 'an7', text: 'Which tool allows you to measure the distance between two parallel faces in 3D?', options: ['Hole tool', '3D Dimension / Measure tool', 'Paint tool', 'Scale tool'], correctAnswer: 1, explanation: 'Measurement tools provide direct feedback on geometric distances.' },
        { id: 'an8', text: 'Technical: Can you include "Tolerances" in 3D annotations?', options: ['No', 'Yes, by editing the dimension properties and adding Upper/Lower limits', 'Only in 2D', 'Only for holes'], correctAnswer: 1, explanation: 'Modern 3D annotation supports full GD&T and linear tolerances.' },
        { id: 'an9', text: 'Situational: You need to label a group of identical parts. What is the most effective way?', options: ['Label each one manually', 'Use a single leader note indicating the quantity (e.g., 4x)', 'Don\'t label them', 'Use different colors'], correctAnswer: 1, explanation: 'Standard engineering practice uses "Nx" notes to simplify drawings.' },
        { id: 'an10', text: 'True or False: 3D Annotations are strictly for decoration and cannot be used for manufacturing.', options: ['True', 'False'], correctAnswer: 1, explanation: '3D PMI is a legal manufacturing requirement in many modern Model-Based Definition (MBD) workflows.' }
      ]
    }
  },
  {
    id: 'interference', title: 'Interference Check', quiz: {
      title: 'iCAD Clash Detection',
      description: 'Ensuring parts fit together correctly without physical overlap.',
      questions: [
        { id: 'ic1', text: 'What is an "Interference" in iCAD?', options: ['A missing file', 'Physical overlap where two parts occupy the same space', 'A wrong color', 'Low internet speed'], correctAnswer: 1, explanation: 'Interference occurs when parts collide in the 3D model.' },
        { id: 'ic2', text: 'Technical: How can you visually confirm an internal interference that is not visible from the outside?', options: ['Delete the outer part', 'Use a Section View to cut through the model', 'Turn the monitor off', 'Print it'], correctAnswer: 1, explanation: 'Sectioning reveals internal clashes clearly.' },
        { id: 'ic3', text: 'Situational: After running a check, the report shows "0 Interferences". What does this mean?', options: ['The parts are missing', 'The assembly is physically feasible without overlaps', 'The software is broken', 'The model is transparent'], correctAnswer: 1, explanation: 'Zero interference is the goal for a functional assembly.' },
        { id: 'ic4', text: 'Technical: When checking for interference between a bolt and a hole, why might a small clash be "ignored"?', options: ['Bolts are always wrong', 'Threads are often modeled as a simple overlap for performance', 'The bolt is blue', 'The hole is missing'], correctAnswer: 1, explanation: 'Nominal thread modeling often results in minor intentional overlaps in CAD.' },
        { id: 'ic5', text: 'Where is the Interference Check tool located?', options: ['In the File menu', 'On the Analysis / Standard Toolbar', 'Inside the Hole command', 'In the Color palette'], correctAnswer: 1, explanation: 'Analysis tools are grouped for project verification.' },
        { id: 'ic6', text: 'Situational: You found a large interference. What is the standard iCAD fix?', options: ['Ignore it', 'Adjust the part position or modify the geometry to create clearance', 'Make the part red', 'Delete the whole assembly'], correctAnswer: 1, explanation: 'Clashes must be resolved through design modification.' },
        { id: 'ic7', text: 'What is "Clearance" in terms of assembly check?', options: ['The same as interference', 'A minimum required gap between two parts', 'The price of the part', 'A file format'], correctAnswer: 1, explanation: 'Clearance ensures parts have room for assembly and operation.' },
        { id: 'ic8', text: 'Technical: Can you perform an interference check on an entire assembly at once?', options: ['No, only two parts at a time', 'Yes, Global Interference Check analyzes the whole project', 'Only if they are white', 'Only for boxes'], correctAnswer: 1, explanation: 'Global checks are automated to find all conflicts in the scene.' }
      ]
    },
  },
  {
    id: 'purchase-parts',
    title: '3D Purchase Parts',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `purchase-parts-${i + 1}`, title: `3D Purchase Parts (${i + 1})` })),
    quiz: {
      title: '3D Purchase Parts & iCAD Loading',
      description: 'Understanding how to handle vendor models and external data.',
      questions: [
        { id: 'pp1', text: 'What is the primary neutral 3D format for importing purchase parts into iCAD?', options: ['.txt', '.STEP / .STP', '.pdf', '.docx'], correctAnswer: 1, explanation: 'STEP is the global standard for industrial 3D data exchange.' },
        { id: 'pp2', text: 'Technical: What is a "Dumb Solid" in the context of an imported part?', options: ['A part that doesn\'t work', 'An imported solid that has no editable feature history', 'A small part', 'A file error'], correctAnswer: 1, explanation: 'Imported parts retain geometry but lose the "how it was made" tree.' },
        { id: 'pp3', text: 'Situational: You imported a vendor motor and the assembly is now very slow. What should you do?', options: ['Delete the motor', 'Use a "Simplified Representation" or remove unnecessary internal details', 'Change the part color to red', 'Restart the computer'], correctAnswer: 1, explanation: 'Simplifying complex vendor geometry improves CAD performance.' },
        { id: 'pp4', text: 'Technical: Can you assign a 3D Part Name to an imported STEP file?', options: ['No', 'Yes, through the standard "Change 3D Part Name" process', 'Only if it is white', 'Only in 2D'], correctAnswer: 1, explanation: 'All solids in iCAD can be named for BOM identification.' },
        { id: 'pp5', text: 'True or False: You should always check the origin of an imported purchase part before assembly.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Vendor parts often have random origins that need to be aligned.' },
        { id: 'pp6', text: 'Where is the "Import" command typically located?', options: ['Inside the Hole tool', 'File > Import / Open', 'In the Color menu', 'On the monitor'], correctAnswer: 1, explanation: 'File operations handle data translation.' },
        { id: 'pp7', text: 'What does "Healing" a model refer to during import?', options: ['Painting it', 'Stitching and repairing broken surfaces from the translation process', 'Saving it twice', 'Deleting it'], correctAnswer: 1, explanation: 'Translation between systems can occasionally leave small gaps in surfaces.' },
        { id: 'pp8', text: 'Situational: A vendor provides a .x_t file. Which format is this?', options: ['Excel', 'Parasolid Text', 'Word', 'AutoCAD 2D'], correctAnswer: 1, explanation: 'Parasolid (.x_t) is a high-fidelity 3D modeling kernel format.' },
        { id: 'pp9', text: 'Technical: Why keep "Purchase Parts" on a separate layer?', options: ['To make them look better', 'To easily toggle their visibility and manage assembly complexity', 'To delete them faster', 'To hide errors'], correctAnswer: 1, explanation: 'Layer management is key for large-scale engineering projects.' },
        { id: 'pp10', text: 'True or False: It is standard practice to download 3D models for shafts, bearings, and motors to save time.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Using vendor-supplied data ensures accuracy for off-the-shelf components.' }
      ]
    }
  },
  {
    id: 'parasolid', // cspell:disable-line
    title: 'Loading Parasolid', // cspell:disable-line
    children: Array.from({ length: 2 }, (_, i) => ({ id: `parasolid-${i + 1}`, title: `Loading Parasolid (${i + 1})` })), // cspell:disable-line
    quiz: {
      title: 'Parasolid Kernel Logic',
      description: 'Understanding the geometry engine used in iCAD.',
      questions: [
        { id: 'ps1', text: 'What is "Parasolid"?', options: ['A material type', 'The mathematical 3D modeling kernel behind iCAD', 'A 2D line manager', 'A cloud storage system'], correctAnswer: 1, explanation: 'Parasolid is the industry-standard geometric engine.' },
        { id: 'ps2', text: 'Technical: What is the file extension for a Parasolid Binary file?', options: ['.x_t', '.x_b', '.dwg', '.pdf'], correctAnswer: 1, explanation: '.x_b is binary; .x_t is text-based.' },
        { id: 'ps3', text: 'Technical: What is the primary advantage of .x_t (Parasolid Text)?', options: ['It is colorful', 'It is a human-readable text format for cross-platform data exchange', 'It is a video file', 'It is for 2D only'], correctAnswer: 1, explanation: 'Text-based Parasolid (.x_t) ensures high compatibility.' },
        { id: 'ps4', text: 'Situational: You have an older CAD file that won\'t open. Which neutral format is recommended in the iCAD manual for best recovery?', options: ['.txt', 'Parasolid (.x_t) or STEP', '.jpg', '.exe'], correctAnswer: 1, explanation: 'Parasolid and STEP are robust for data recovery/translation.' },
        { id: 'ps5', text: 'Technical: What happens to the "History Tree" when you export as Parasolid?', options: ['It is saved perfectly', 'It is removed resulting in a "Dumb Solid"', 'It turns red', 'It becomes a 2D line'], correctAnswer: 1, explanation: 'Neutral kernels transfer geometry, not feature history.' },
        { id: 'ps6', text: 'True or False: iCAD can import and export Parasolid files.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Full compatibility with industry formats is standard for iCAD.' },
        { id: 'ps7', text: 'Situational: An imported Parasolid part has "Open Surfaces". What tool should you use?', options: ['Hole tool', 'Sew / Stitch Surfaces', 'Paint tool', 'Delete'], correctAnswer: 1, explanation: 'Sewing converts open sheet surfaces into a closed solid body.' },
        { id: 'ps8', text: 'Technical: Is Parasolid used in 2D Drafting or 3D Modeling?', options: ['2D only', 'Primarily 3D Modeling features', 'Both equally', 'Neither'], correctAnswer: 1, explanation: 'Parasolid is a 3D geometric engine.' },
        { id: 'ps9', text: 'Where is the Parasolid export option located?', options: ['Inside the Color menu', 'File > Export > Parasolid', 'In the help docs', 'On the status bar'], correctAnswer: 1, explanation: 'Export functions are part of the File menu.' },
        { id: 'ps10', text: 'True or False: Maintaining the original Parasolid data ensures the highest mathematical precision.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Parasolid is a high-fidelity b-rep kernel.' }
      ]
    }
  },
  {
    id: 'op-sample',
    title: 'Operation Sample',
    children: Array.from({ length: 5 }, (_, i) => ({ id: `op-sample-${i + 1}`, title: `Operation Sample (${i + 1})` })),
    quiz: {
      title: 'Practical iCAD Operation Samples',
      description: 'Applying manual-based workflows to standardized engineering tasks.',
      questions: [
        { id: 'os1', text: 'According to the Operation Sample manual, what is the first step when starting a new part?', options: ['Apply fancy colors', 'Confirm the origin placement and primary modeling orientation', 'Print the drawing', 'Enter the BOM data'], correctAnswer: 1, explanation: 'Correct origin alignment is the foundation of efficient modeling.' },
        { id: 'os2', text: 'Technical: What does "Modeling Efficiency" mean in the context of the samples?', options: ['Drawing fast with many errors', 'Creating the final solid with the fewest possible features in the history tree', 'Using the most expensive PC', 'Having a large monitor'], correctAnswer: 1, explanation: 'Efficient models are robust and easier to update.' },
        { id: 'os3', text: 'Situational: You are modeling a symmetric bracket. What is the manual-recommended strategy?', options: ['Model every hole and boss manually', 'Model one half and use the Mirror command across the center plane', 'Draw it 10 times', 'Ask the manager'], correctAnswer: 1, explanation: 'Mirroring ensures perfect symmetry and saves 50% of the modeling time.' },
        { id: 'os4', text: 'Technical: Which tool is used to create a tapped hole (e.g., M10) in the sample part?', options: ['Cylinder tool', 'Threaded Hole / Tap command in the Hole menu', 'Extrude tool', 'Fillet'], correctAnswer: 1, explanation: 'Tap tools provide the correct minor diameter for manufacturing.' },
        { id: 'os5', text: 'How do you verify your Sample Part matches the PDF dimensions?', options: ['Compare by eye on the screen', 'Use the "Measure" or "Inquiry" tools to check critical distances', 'Print and use a ruler on the monitor', 'Guess the size'], correctAnswer: 1, explanation: 'Inquiry tools provide mathematical confirmation of accuracy.' },
        { id: 'os6', text: 'Situational: The sample requires a "M6" through hole. What diameter should the drill be?', options: ['6mm', '6.6mm (Clearance hole standard)', '5mm', '10mm'], correctAnswer: 1, explanation: 'Standard clearance holes for M6 bolts are 6.6mm.' },
        { id: 'os7', text: 'Technical: Why should you rename features in the history tree during a complex sample?', options: ['To make it look pretty', 'To easily identify and edit key steps like "Main Body" or "Mounting Holes"', 'To prevent the computer from crashing', 'To change the file size'], correctAnswer: 1, explanation: 'Clear naming improves the "readability" of the design history.' },
        { id: 'os8', text: 'What is a "Parametric Update" in the sample workflow?', options: ['Deleting the part', 'Changing a sketch dimension and having the 3D model update automatically', 'Saving the file as a new name', 'Restarting the software'], correctAnswer: 1, explanation: 'Parametric modeling allows for rapid design iterations.' },
        { id: 'os9', text: 'Situational: A fillet feature fails during the sample. What is a common cause?', options: ['The mouse is broken', 'The radius size is larger than the available edge geometry', 'The part is too heavy', 'The color is wrong'], correctAnswer: 1, explanation: 'Fillets cannot "eat" adjacent faces entirely without causing topology errors.' },
        { id: 'os10', text: 'True or False: Completing the Operation Sample signifies you can model production parts to iCAD standards.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Samples are designed to bridge the gap between theory and factory work.' }
      ]
    }
  },
  {
    id: 'mirrored',
    title: 'Mirrored Part',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `mirrored-${i + 1}`, title: `Mirrored Part (${i + 1})` })),
    quiz: {
      title: 'Mirroring & Symmetry (LH/RH)',
      description: 'Understanding Left-Hand/Right-Hand logic in iCAD assemblies.',
      questions: [
        { id: 'mp1', text: 'What does "LH/RH" signify in part naming?', options: ['Left Home / Right Home', 'Left Hand / Right Hand symmetric versions', 'Low Heat / Robust Heat', 'Long Hole / Round Hole'], correctAnswer: 1, explanation: 'Mechanical assemblies often require mirrored copies of the same design.' },
        { id: 'mp2', text: 'Technical: Can you create a "Mirrored Part" by just rotating the original 180 degrees?', options: ['Yes, always', 'No, mirrored geometry is a different spatial configuration that requires a Mirror operation', 'Only if it is a box', 'Only in 2D'], correctAnswer: 1, explanation: 'Mirror images (like hands) cannot be overlapped by rotation alone.' },
        { id: 'mp3', text: 'Situational: You have a left door for a machine. What tool do you use to create the right door?', options: ['Copy and rotate', 'Mirror Part command from the assembly or part tools', 'Type "MIRROR" on keyboard', 'Draw it again from scratch'], correctAnswer: 1, explanation: 'The Mirror tool creates the inverted geometry needed for the opposite side.' },
        { id: 'mp4', text: 'What is "Associative Mirroring" in iCAD?', options: ['The part is blue', 'Any change made to the Original part automatically updates its Mirrored counterpart', 'The part is deleted', 'The part is locked'], correctAnswer: 1, explanation: 'Associativity prevents design drift between symmetric parts.' },
        { id: 'mp5', text: 'Where is the "Mirror Plane" typically placed for a symmetrical machine?', options: ['At the bottom of the floor', 'On the central axis of symmetry (e.g., the center of the machine)', 'On the monitor screen', 'In the file menu'], correctAnswer: 1, explanation: 'Symmetry requires a reference plane exactly in the middle of the two versions.' },
        { id: 'mp6', text: 'Technical: In iCAD, can you mirror a group of parts (an assembly) at once?', options: ['No', 'Yes, selecting multiple components and mirroring across a plane', 'Only if they are white', 'Only if they have holes'], correctAnswer: 1, explanation: 'Group mirroring saves time during large-scale layout tasks.' },
        { id: 'mp7', text: 'True or False: A mirrored part usually shares the same physical Part Number but has a -LH or -RH suffix.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Industrial standards use suffixes to distinguish symmetric versions in procurement.' },
        { id: 'mp8', text: 'Situational: You mirrored a part but it ended up in the wrong position. How do you fix this?', options: ['Delete it', 'Change the Mirror plane location or distance', 'Rotate it manually', 'Paint it red'], correctAnswer: 1, explanation: 'The position of the mirrored copy is relative to the mirror plane.' },
        { id: 'mp9', text: 'Technical: What is required to use the "Mirror Feature" command?', options: ['A center point', 'A Mirror Plane or Flat Face to reflect across', 'A circle', 'A text note'], correctAnswer: 1, explanation: 'Planar reflection is the core of mirroring logic.' },
        { id: 'mp10', text: 'True or False: Standard parts like bolts should be mirrored internally.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Standard hardware is identical for both sides; only their placement is mirrored.' }
      ]
    }
  },
  {
    id: 'standard',
    title: 'Standard',
    children: Array.from({ length: 8 }, (_, i) => ({ id: `standard-${i + 1}`, title: `Standard (${i + 1})` })),
    quiz: {
      title: 'iCAD Standard Library & Hardware',
      description: 'Mastering the use of industrial-standard components in the iCAD ecosystem.',
      questions: [
        { id: 'st1', text: 'Why is it mandatory to use the "Standard Library" for bolts and nuts?', options: ['To save memory', 'To ensure consistent industrial standards (JIS/ISO) and automatic BOM data', 'To make the parts yellow', 'To print faster'], correctAnswer: 1, explanation: 'Library parts come with correct dimensions and technical metadata.' },
        { id: 'st2', text: 'Technical: What does "M6x1.0" signify in a bolt description?', options: ['Measure 6 by 1', '6mm Diameter with a 1.0mm Pitch', '6 Meters long', 'Manual number 6'], correctAnswer: 1, explanation: 'Metric thread notation defines diameter and thread pitch.' },
        { id: 'st3', text: 'Situational: You need a bolt that sits flush with the surface. Which do you select?', options: ['Hex Bolt', 'Hexagon Socket Countersunk Head Bolt', 'Large Nut', 'Spring Washer'], correctAnswer: 1, explanation: 'Countersunk bolts are designed to hide inside tapered holes.' },
        { id: 'st4', text: 'Technical: What is the purpose of a "Spring Washer"?', options: ['To make the part look expensive', 'To provide tension and prevent bolt loosening due to vibration', 'To change the color', 'To add weight'], correctAnswer: 1, explanation: 'Spring washers are anti-loosening hardware.' },
        { id: 'st5', text: 'Where do you find the "Standard Library" in iCAD?', options: ['Inside the Hole command only', 'On the Standard / Library Toolbar or Menu', 'In the file explorer', 'Under the help docs'], correctAnswer: 1, explanation: 'Libraries are integrated into the main command toolsets.' },
        { id: 'st6', text: 'Situational: You need to specify a "Fine Thread" bolt. Where is this changed?', options: ['By drawing smaller lines', 'In the size selection properties of the Standard Library tool', 'On the keyboard', 'It cannot be changed'], correctAnswer: 1, explanation: 'Properties allow toggling between Coarse and Fine thread standards.' },
        { id: 'st7', text: 'Technical: What does "SSS" stand for in hardware selection?', options: ['Simple Silver Screw', 'Stainless Steel (SUS)', 'Super Strong Screw', 'Solid State Screw'], correctAnswer: 1, explanation: 'SUS/Stainless is a common material code for hardware.' },
        { id: 'st8', text: 'How do you insert a "Bearing" from the library?', options: ['Draw two circles', 'Select the "Bearing" class in the library and choose the correct series (e.g., 6000)', 'Rename a box', 'Import a STEP file every time'], correctAnswer: 1, explanation: 'Standard bearings are pre-built parametric models in the library.' },
        { id: 'st9', text: 'Situational: The BOM shows the wrong quantity for bolts. What is the likely cause?', options: ['The printer is broken', 'Bolts were copied manually without registering them in the system', 'The color is wrong', 'The file is too large'], correctAnswer: 1, explanation: 'Using the library ensures automatic and accurate quantity tracking.' },
        { id: 'st10', text: 'True or False: Library parts are strictly 3D and have no 2D representation.', options: ['True', 'False'], correctAnswer: 1, explanation: 'iCAD library parts include both 3D models and standardized 2D views.' }
      ]
    }
  }
];

export const ICAD_2D_LESSONS: Lesson[] = [
  {
    id: '2d-orthographic',
    title: 'Orthographic View',
    content: ['Projection', 'Third Angle', 'First Angle', 'Glass Box', 'Top View', 'Front View', 'Side View', 'principal views', 'engineering views', 'orthographic projection'],
    children: [
      { id: '2d-orthographic-1', title: 'Orthographic View (1)', content: ['third angle standards'] },
      { id: '2d-orthographic-2', title: 'Orthographic View (2)', content: ['front view definition'] },
      { id: '2d-orthographic-3', title: 'Orthographic View (3)', content: ['view alignment'] },
    ],
    quiz: {
      title: 'iCAD Orthographic Projection',
      description: 'Mastering the standards of engineering views in the iCAD manual.',
      questions: [
        { id: '2do1', text: 'Which projection method is the standard for JIS (Japanese Industrial Standards) used in iCAD?', options: ['First Angle Projection', 'Third Angle Projection', 'Isometric only', 'Perspective'], correctAnswer: 1, explanation: 'Third Angle Projection is the industrial standard in Japan.' },
        { id: '2do2', text: 'Technical: What is the primary role of the "Front View"?', options: ['It is the least important view', 'It is the most descriptive view showing the parts main characteristic', 'It is always the bottom', 'It shows the back of the part'], correctAnswer: 1, explanation: 'The Front View defines the orientation for all other projected views.' },
        { id: '2do3', text: 'Situational: In Third Angle Projection, where is the "Top View" placed relative to the Front View?', options: ['Below the Front View', 'Directly above the Front View', 'To the right', 'On a different page'], correctAnswer: 1, explanation: 'Third angle logic places the top view above the front view.' },
        { id: '2do4', text: 'Technical: What do "Hidden Lines" represent in a 2D drawing?', options: ['Center of a hole', 'Edges or surfaces that are obscured from the current viewing angle', 'Cutting planes', 'Boundary lines'], correctAnswer: 1, explanation: 'Hidden lines (dashed) show internal or back-side geometry.' },
        { id: '2do5', text: 'What is the "Right Side View" placement in Third Angle Projection?', options: ['To the left of the Front View', 'To the right of the Front View', 'Above the Top View', 'Below the Front View'], correctAnswer: 1, explanation: 'The view from the right is placed on the right side of the front view.' },
        { id: '2do6', text: 'Situational: A part has a complex internal cavity. Which view type is best to explain this?', options: ['Isometric View', 'Section View', 'Top View', 'Hidden View'], correctAnswer: 1, explanation: 'Section views "cut" the part to reveal internal details clearly.' },
        { id: '2do7', text: 'Technical: How many standard orthographic views can a "Glass Box" projection produce?', options: ['3', '6', '1', '12'], correctAnswer: 1, explanation: 'The six principal views are Front, Top, Bottom, Right, Left, and Rear.' },
        { id: '2do8', text: 'Where do you find the projection symbol (truncated cone) on a standard drawing?', options: ['In the middle of the part', 'In the Title Block / Notes area', 'On the toolbar', 'It is not used'], correctAnswer: 1, explanation: 'The symbol identifies the projection method (1st vs 3rd angle) used for the sheet.' },
        { id: '2do9', text: 'Situational: The drawing looks too small to see details. What should you adjust?', options: ['The part size in 3D', 'The Drawing Scale (e.g., change 1:2 to 1:1 or 2:1)', 'The monitor brightness', 'Delete the views'], correctAnswer: 1, explanation: 'Scales determine the relationship between the real part size and the paper size.' },
        { id: '2do10', text: 'True or False: Orthographic views must be perfectly aligned vertically and horizontally with the Front View.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Alignment is critical for the mathematical "reading" of the part geometry.' }
      ]
    }
  },
  {
    id: '2d-command-menu',
    title: 'Command Menu',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-command-menu-${i + 1}`, title: `Command Menu (${i + 1})` })),
    quiz: {
      title: 'iCAD 2D Command Mastery',
      description: 'Understanding the 2D drafting interface and tool logic.',
      questions: [
        { id: '2dm1', text: 'What is the primary function of the "Trim" command in iCAD 2D?', options: ['To delete the entire part', 'To cut segments of lines at their intersection points', 'To change line color', 'To save the file'], correctAnswer: 1, explanation: 'Trim is used to clean up over-extended and overlapping geometry.' },
        { id: '2dm2', text: 'Technical: How do you cancel an active 2D command and return to the main menu?', options: ['Click Save', 'Press the "Esc" (Escape) key', 'Restart iCAD', 'Double-click the mouse'], correctAnswer: 1, explanation: 'Escape is the universal "Cancel" key in most CAD interfaces.' },
        { id: '2dm3', text: 'Situational: You need to select a group of 50 lines at once. Which method is most efficient?', options: ['Click each line individually', 'Use a Window Selection (dragging a box over the items)', 'Type the name of each line', 'Print the file'], correctAnswer: 1, explanation: 'Window selection allows for bulk entity management.' },
        { id: '2dm4', text: 'Technical: What does the "Offset" command do in 2D?', options: ['Deletes a line', 'Creates an identical parallel copy of a line or circle at a specific distance', 'Rotates geometry', 'Changes lineweight'], correctAnswer: 1, explanation: 'Offset is the primary tool for creating parallel outlines.' },
        { id: '2dm5', text: 'Where are the 2D drafting tools located?', options: ['In the 3D Feature menu only', 'In the Drawing / 2D Command Menu (context-sensitive)', 'On the windows taskbar', 'Inside the Help menu'], correctAnswer: 1, explanation: 'The interface changes based on whether you are in 3D or 2D mode.' },
        { id: '2dm6', text: 'Situational: You want to draw a line 100mm long exactly horizontally. How do you ensure accuracy?', options: ['Guess with the mouse', 'Use Coordinate Input or Ortho/Snap mode to restrict movement', 'Measure the screen with a ruler', 'Draw it 2D only'], correctAnswer: 1, explanation: 'Snaps and numerical input ensure mathematical precision.' },
        { id: '2dm7', text: 'Technical: What is "Undo" (Ctrl+Z) used for in the command menu?', options: ['To save a copy', 'To revert the last drafting action', 'To delete the file', 'To exit iCAD'], correctAnswer: 1, explanation: 'Undo allows for quick correction of drafting mistakes.' },
        { id: '2dm8', text: 'Technical: What is the purpose of the "Layers" manager?', options: ['To make the file heavy', 'To organize geometry by category (e.g., Outline, Center, Dimension) and control visibility', 'To change the language', 'To print in 3D'], correctAnswer: 1, explanation: 'Layers provide structural organization to complex drawings.' },
        { id: '2dm9', text: 'Situational: You accidentally deleted a dimension. What is the fastest recovery?', options: ['Redraw it', 'Ctrl+Z (Undo)', 'Close without saving', 'Ask the IT'], correctAnswer: 1, explanation: 'Undo is the standard recovery path for accidental edits.' },
        { id: '2dm10', text: 'True or False: Every 2D command provides feedback or instructions in the Message/Status Pane.', options: ['True', 'False'], correctAnswer: 0, explanation: 'iCAD guides the user through the steps of each command via the status area.' }
      ]
    }
  },
  {
    id: '2d-line-props',
    title: 'Line Properties',
    content: ['Line Specifications', 'uniform specs', 'line types', 'line weights', 'Changing Colors', 'hidden lines', 'color green', 'Splines', 'partial sections', 'wave', 'curve distance', 'Center Lines', 'manual center line', 'offset value', 'Piping Center Line', 'OF Piping Assembly', 'Hierarchical Representation', 'assembly context', 'attributes', 'Layer'],
    children: [
      { id: '2d-line-props-1', title: 'Line Properties (1)', content: ['line specifications', 'standard requirements'] },
      { id: '2d-line-props-2', title: 'Line Properties (2)', content: ['color dialog', 'part selection', 'spline waves'] },
      { id: '2d-line-props-3', title: 'Line Properties (3)', content: ['center line offset', 'piping assembly'] },
      { id: '2d-line-props-4', title: 'Line Properties (4)', content: ['hierarchical representation', 'part detailling'] },
    ],
    quiz: {
      title: 'Alphabet of Lines in iCAD',
      description: 'Understanding the standard line types and physical properties in engineering.',
      questions: [
        { id: '2lp1', text: 'What is the standard lineweight for an "Object Line" (Visible edge)?', options: ['Thin dashed', 'Thick continuous', 'Thin dotted', 'Green wavy line'], correctAnswer: 1, explanation: 'Visible edges use the thickest continuous strokes to stand out.' },
        { id: '2lp2', text: 'Technical: Which line type is used to represent the "Center" of a hole or shaft?', options: ['Dashed Line', 'Chain-Dashed Line (Long dash, short dash)', 'Solid Thick Line', 'Dotted Line'], correctAnswer: 1, explanation: 'Centerlines are standardized as chain-dashed lines.' },
        { id: '2lp3', text: 'What does a "Phantom Line" (Long-short-short) represent?', options: ['A ghost feature', 'Alternative positions, adjacent parts, or future work', 'A cut line', 'A broken part'], correctAnswer: 1, explanation: 'Phantom lines show context or movement limits.' },
        { id: '2lp4', text: 'Technical: Which color is typically assigned to "Dimensions" in the iCAD layer standard?', options: ['White/Black', 'Yellow (or thin-weighted color)', 'Red', 'Blue'], correctAnswer: 1, explanation: 'Annotations often use thinner, contrasting colors for clarity.' },
        { id: '2lp5', text: 'Situational: A line on the drawing is too faint. How do you fix its readability?', options: ['Change its Lineweight or Color property in the Layer/Prop manager', 'Change the monitor', 'Print on black paper', 'Zoom in 500%'], correctAnswer: 0, explanation: 'Properties like weight and color drive final drawing accessibility.' },
        { id: '2lp6', text: 'What is a "Cutting Plane Line" used for?', options: ['To hide edges', 'To indicate the path of a sectional cut', 'To show the part boundary', 'To write notes'], correctAnswer: 1, explanation: 'Cutting planes (thick dashed with arrows) define section paths.' },
        { id: '2lp7', text: 'Technical: What is the purpose of "Hidden Lines"?', options: ['To save ink', 'To represent edges that are behind other surfaces', 'To show the origin', 'To highlight errors'], correctAnswer: 1, explanation: 'Hidden lines (dashed) allow visualization of internal or rear geometry.' },
        { id: '2lp8', text: 'True or False: Using the correct line types (JIS standard) is a mandatory requirement for quality assurance.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Standardization prevents catastrophic misinterpretations in the workshop.' },
        { id: '2lp9', text: 'Situational: You want to hide all centerlines without deleting them. What is the best method?', options: ['Delete them', 'Turn off the visibility of the "Centerline" layer', 'Change their color to match the background', 'Move them off the paper'], correctAnswer: 1, explanation: 'Layer visibility toggles enable rapid workspace cleanup.' },
        { id: '2lp10', text: 'Technical: What is a "Leader Line"?', options: ['The main line of the part', 'A thin line with an arrow pointing to a note or annotation', 'A 2D axis', 'A boundary'], correctAnswer: 1, explanation: 'Leaders connect technical notes to specific geometric features.' }
      ]
    }
  },
  {
    id: '2d-dimensioning',
    title: 'Dimensioning',
    children: Array.from({ length: 5 }, (_, i) => ({ id: `2d-dimensioning-${i + 1}`, title: `Dimensioning (${i + 1})` })),
    quiz: {
      title: 'Precision 2D Dimensioning',
      description: 'Rules for accurate manufacturing communication in iCAD.',
      questions: [
        { id: '2di1', text: 'What does the "Ø" symbol represent in a dimension?', options: ['Radius', 'Diameter', 'Volume', 'Depth'], correctAnswer: 1, explanation: 'The circle-stroke symbol is the universal indicator for Diameter.' },
        { id: '2di2', text: 'Technical: What is "Baseline Dimensioning"?', options: ['Dimensioning all features from a single common datum edge', 'Connecting dimensions end-to-end', 'Writing text at the bottom', 'Using large arrows'], correctAnswer: 0, explanation: 'Baselines prevent "tolerance stack-up" and ensure accuracy from a primary reference.' },
        { id: '2di3', text: 'What does "R" signify in iCAD 2D?', options: ['Rear', 'Radius', 'Roughness', 'Ready'], correctAnswer: 1, explanation: 'R is for Radius (half of diameter).' },
        { id: '2di4', text: 'Situational: A dimension is too small to read on the printed paper. How do you fix it?', options: ['Make the part bigger', 'Adjust the "Dimension Scale" factor in the style settings', 'Print on larger paper only', 'Guess the value'], correctAnswer: 1, explanation: 'Dimension styles allow scaling of text and arrows for different sheet sizes.' },
        { id: '2di5', text: 'Technical: What is an "Extension Line" in dimensioning?', options: ['A line that grows', 'The lines that extend from the geometry to meet the dimension arrows', 'A center line', 'A hidden line'], correctAnswer: 1, explanation: 'Extension lines link the measurement to the physical part faces.' },
        { id: '2di6', text: 'What is the "Golden Rule" of dimensioning according to the manual?', options: ['Add as many as possible', 'Dimension every feature exactly once—clearly and without duplication', 'Don\'t add any', 'Use different colors for every dimension'], correctAnswer: 1, explanation: 'Redundant dimensioning leads to manufacturing confusion and errors.' },
        { id: '2di7', text: 'Situational: You are dimensioning a hole. Where should the arrows be placed?', options: ['Outside the part', 'Pointing to the center or touching the edge of the hole', 'On the title block', 'In the isometric view only'], correctAnswer: 1, explanation: 'Specific rules govern the placement of radial and diametric arrows.' },
        { id: '2di8', text: 'Technical: What is "Tolerance" in a 2D dimension?', options: ['The patience of the machinist', 'The allowed variation from the nominal size (e.g., ±0.1)', 'A bug in the software', 'A file format'], correctAnswer: 1, explanation: 'Tolerances define the limits of acceptable manufacturing error.' },
        { id: '2di9', text: 'Situational: A part is 2000mm long but the paper is A3 (420mm). How do you show the length correctly?', options: ['Shrink the part', 'Use a Scale (e.g., 1:10) and use real-world dimension values', 'Draw it 2D only', 'Cut the paper'], correctAnswer: 1, explanation: 'CAD handles the scaling; dimensions always reflect the "Full Size" of the part.' },
        { id: '2di10', text: 'True or False: It is best practice to avoid dimensioning to "Hidden Lines" whenever possible.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Dimensioning to hidden context is prone to error; use a section view instead.' }
      ]
    }
  },
  {
    id: '2d-standard-part',
    title: 'Standard Part',
    children: Array.from({ length: 7 }, (_, i) => ({ id: `2d-standard-part-${i + 1}`, title: `Standard Part (${i + 1})` })),
    quiz: {
      title: 'iCAD 2D Standard Components',
      description: 'Understanding how to place and represent hardware in 2D layouts.',
      questions: [
        { id: '2sp1', text: 'When inserting a bolt from the iCAD 2D library, what are the two common viewing orientations?', options: ['Big and small', 'Side View (Shank) and Head (Top) View', 'Inside and Outside', 'Perspective and Isometric'], correctAnswer: 1, explanation: 'Drawings typically show either the threaded side or the drive head of the hardware.' },
        { id: '2sp2', text: 'Technical: How are "Threads" represented in a simplified 2D drawing according to JIS/iCAD?', options: ['By drawing every individual spiral', 'Using a thin continuous line to represent the root diameter and a thick line for the major diameter', 'Using a red line', 'Deleting the lines'], correctAnswer: 1, explanation: 'Drafting standards use symbolic lines to represent threading for clarity.' },
        { id: '2sp3', text: 'Situational: You need to insert 50 identical screws into a 2D layout. What is the fastest method?', options: ['Draw each one manually', 'Use the 2D Standard Library Tool to select and place the hardware automatically', 'Copy/Paste an image from the web', 'Write "50 Screws" only'], correctAnswer: 1, explanation: 'Libraries automate the creation of standard hardware views with correct dimensions.' },
        { id: '2sp4', text: 'Technical: What is the primary standard authority for industrial hardware used in KMTI iCAD?', options: ['NASA', 'JIS (Japanese Industrial Standards)', 'FBI', 'IEEE'], correctAnswer: 1, explanation: 'JIS governs the dimensions and tolerances for Japanese industrial components.' },
        { id: '2sp5', text: 'Situational: You are placing a bolt in a "Blind Hole". How far should the thread normally extend?', options: ['To the bottom of the hole', 'A specific depth ensuring enough engagement (usually 1.5x to 2x diameter)', '1mm', 'Halfway only'], correctAnswer: 1, explanation: 'Engineering rules-of-thumb drive the safe placement of threaded fasteners.' },
        { id: '2sp6', text: 'What is a "Nut" representation in 2D Side View?', options: ['A circle', 'A rectangle with internal simplified thread lines', 'A triangle', 'A wavy line'], correctAnswer: 1, explanation: 'Nuts are represented by their profile with indicated threading.' },
        { id: '2sp7', text: 'Technical: Can you automatically generate a "Hole" for a standard bolt using the library?', options: ['No', 'Yes, many iCAD tools allow simultaneous insertion of hardware and its corresponding hole', 'Only if it is red', 'Only in 3D'], correctAnswer: 1, explanation: 'Integrated tools ensure alignment between fasteners and their mounting holes.' },
        { id: '2sp8', text: 'Situational: You need a washer to distribute the load of a bolt. Which type is used?', options: ['Hex Nut', 'Plain / Flat Washer', 'Spring Washer', 'Bearing'], correctAnswer: 1, explanation: 'Flat washers increase the contact surface area to prevent damage.' },
        { id: '2sp9', text: 'Where can you edit the properties of a standard part already placed in 2D?', options: ['Inside the File menu', 'Selecting the part and using the "Change Properties" or "Edit Standard Part" tool', 'By deleting and redrawing only', 'On the status bar'], correctAnswer: 1, explanation: 'Library parts remain editable through dedicated property managers.' },
        { id: '2sp10', text: 'True or False: Using the 2D Standard Library ensures the Bill of Materials (BOM) is automatically populated with the correct part name.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Library items carry integrated metadata for procurement.' }
      ]
    }
  },
  {
    id: '2d-surface-app',
    title: 'Application of Surface',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-surface-app-${i + 1}`, title: `Application of Surface(${i + 1})` })),
    quiz: {
      title: 'iCAD Surface Symbols & Sectioning',
      description: 'Understanding hatching and surface representation in 2D.',
      questions: [
        { id: '2sa1', text: 'What does a "Hatch" pattern indicate in a 2D drawing?', options: ['The color of the part', 'The cross-section of a cut solid material', 'An empty space', 'A hidden feature'], correctAnswer: 1, explanation: 'Hatching symbolizes the area where the material has been sliced by a section plane.' },
        { id: '2sa2', text: 'Technical: What is the standard angle for general-purpose hatching lines in iCAD?', options: ['0 degrees', '45 degrees', '90 degrees', '30 degrees'], correctAnswer: 1, explanation: '45-degree angled lines are the industrial standard for sectioning.' },
        { id: '2sa3', text: 'Situational: You have two separate parts touching in a section view. How do you distinguish them?', options: ['Use different colors', 'Reverse the hatch direction (e.g., 45 degrees vs 135 degrees)', 'Use different lineweights', 'Delete the lines'], correctAnswer: 1, explanation: 'Opposing hatch directions clarify the boundary between adjacent components.' },
        { id: '2sa4', text: 'Technical: What does "SSS" (Stainless Steel) hatching typically look like?', options: ['Solid black', 'Groups of two parallel lines followed by a gap', 'Single dotted lines', 'Wavy lines'], correctAnswer: 1, explanation: 'Standard hatch patterns vary by material type for technical clarity.' },
        { id: '2sa5', text: 'Situational: A part is very thin (like a 1mm gasket). How should it be represented in a section?', options: ['With many tiny hatch lines', 'Solid Fill (Blackened area)', 'As a hidden line only', 'Don\'t show it'], correctAnswer: 1, explanation: 'Very thin parts are often filled solid to avoid visual clutter.' },
        { id: '2sa6', text: 'Technical: What is "Associative Hatching"?', options: ['A hatch that updates automatically if the boundary/shape changes', 'Hatching shared with 3D', 'Red hatching', 'Hidden hatching'], correctAnswer: 0, explanation: 'Associativity ensures the hatch area matches the geometry through edits.' },
        { id: '2sa7', text: 'Situational: The hatching is too dense and looks like a solid block. What property do you change?', options: ['Delete it', 'Hatch Scale / Spacing', 'Color', 'Keyboard language'], correctAnswer: 1, explanation: 'Scaling ensures the pattern is visible and appropriate for the view zoom.' },
        { id: '2sa8', text: 'What is "Gradient Filling" primarily used for in 2D?', options: ['To save ink', 'To provide a 3D-like visual depth or shading', 'To hide mistakes', 'It is not allowed'], correctAnswer: 1, explanation: 'Gradients help visualize curved surfaces in 2D layouts.' },
        { id: '2sa9', text: 'Where is the Hatch tool located?', options: ['Inside the Dimension tool', 'Under the Drawing / Modify Menu (Hatch / Fill command)', 'In the file menu', 'On the monitor taskbar'], correctAnswer: 1, explanation: 'Surface applications are part of the core drafting toolset.' },
        { id: '2sa10', text: 'True or False: Hatching should always be "broken" behind dimension text to ensure readability.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Technical notes must always take priority over background patterns.' }
      ]
    }
  },
  {
    id: '2d-keyway',
    title: 'Keyway',
    quiz: {
      title: 'iCAD Keyway Engineering',
      description: 'Understanding torque transmission geometry in 2D layouts.',
      questions: [
        { id: '2kw1', text: 'What is the purpose of a "Keyway" in a shaft or hub?', options: ['To let air in', 'To lock the rotational motion between a shaft and a component using a "Key"', 'To reduce weight', 'To hide the origin'], correctAnswer: 1, explanation: 'Keyways transmit torque between shafts and pulleys/gears.' },
        { id: '2kw2', text: 'Technical: What are the two primary dimensions required to specify a 2D Keyway?', options: ['Color and Name', 'Width and Depth (or Height)', 'Radius and Angle', 'Weight and Speed'], correctAnswer: 1, explanation: 'The cross-section (Width x Depth) defines the key fit.' },
        { id: '2kw3', text: 'Situational: You are dimensioning a keyway in a 2D end view. Where is the depth measured from?', options: ['The center of the shaft', 'The bottom of the part', 'From the shaft edge to the bottom of the slot', 'From the screen top'], correctAnswer: 2, explanation: 'Keyway depth is the specific "cut" distance into the diameter.' },
        { id: '2kw4', text: 'Technical: In a hub (hole) keyway, what is the standard method for measuring the "total distance"?', options: ['Hole Diameter + Keyway Depth', 'Length of the part', 'Circumference', 'Weight of the key'], correctAnswer: 0, explanation: 'Machinists often use the total distance across the bore for measurement.' },
        { id: '2kw5', text: 'Which tool is most efficient for creating keyways in iCAD 2D?', options: ['Circle and Trim', 'Standard Keyway Library Tool', 'Offset', 'Line tool'], correctAnswer: 1, explanation: 'iCAD macros provide standardized JIS keyway geometry instantly.' },
        { id: '2kw6', text: 'Technical: What is the "Standard Width" for a keyway on a 20mm diameter shaft according to JIS?', options: ['2mm', '6mm', '20mm', '1mm'], correctAnswer: 1, explanation: 'Keyway sizes are strictly linked to shaft diameters by national standards.' },
        { id: '2kw7', text: 'Situational: The keyway in your drawing has no dimensions. What must you add?', options: ['Color', 'Width and Depth with appropriate tolerances', 'Part name', '3D view'], correctAnswer: 1, explanation: 'Technical drawings require precise values for manufacturing.' },
        { id: '2kw8', text: 'What happens if a keyway is too shallow?', options: ['The part is blue', 'The key won\'t fit or may fail under torque load', 'The software crashes', 'The part gets heavier'], correctAnswer: 1, explanation: 'Incorrect depth leads to structural failure or assembly issues.' },
        { id: '2kw9', text: 'Technical: What is a "Square Key" versus a "Flat Key"?', options: ['One is 3D, one is 2D', 'The ratio of width to height in the cross-section', 'Different colors', 'Different file formats'], correctAnswer: 1, explanation: 'Standards define both square-profile and rectangular-profile keys.' },
        { id: '2kw10', text: 'True or False: A keyway is always placed 180 degrees from a setscrew in a hub.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Placement depends on design requirements, often at 90 or 120 degrees.' }
      ]
    }
  },
  {
    id: '2d-retaining-ring',
    title: 'Retaining Ring',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-retaining-ring-${i + 1}`, title: `Retaining Ring (${i + 1})` })),
    quiz: {
      title: 'iCAD Retaining Rings & Grooves',
      description: 'Understanding axial retention in 2D layouts.',
      questions: [
        { id: '2rr1', text: 'What is the purpose of a "Retaining Ring" (Circlip)?', options: ['To tighten a bolt', 'To prevent axial (sliding) movement of parts on a shaft or in a hole', 'To seal for water', 'To change color'], correctAnswer: 1, explanation: 'Retaining rings "retain" parts at a specific location along an axis.' },
        { id: '2rr2', text: 'Technical: What is the difference between "External" and "Internal" retaining rings?', options: ['Color only', 'External is for shafts; Internal is for bores/holes', 'External is bigger', 'They are identical'], correctAnswer: 1, explanation: 'Selection depends on the mounting surface (Outer vs Inner diameter).' },
        { id: '2rr3', text: 'Situational: You are drawing a shaft groove for a retaining ring. What is a critical dimension?', options: ['The weight of the ring', 'The groove width and depth (diameter)', 'The color of the steel', 'The designer name'], correctAnswer: 1, explanation: 'The groove must precisely match the standard dimensions for the ring to seat correctly.' },
        { id: '2rr4', text: 'What tool is required to install or remove a standard retaining ring?', options: ['Hammer', 'Retaining Ring Pliers (Circlip Pliers)', 'Screwdriver', 'Tape'], correctAnswer: 1, explanation: 'The loops/holes in the ring are designed for specialized plier tips.' },
        { id: '2rr5', text: 'Technical: What is an "E-Ring"?', options: ['An electronic ring', 'A specific type of external ring shaped like an E, installed radially', 'A red ring', 'A broken ring'], correctAnswer: 1, explanation: 'E-rings are commonly used for small shafts and simple assemblies.' },
        { id: '2rr6', text: 'Where do you find retaining ring dimensions in iCAD?', options: ['Inside the File menu', 'Selecting the "Retaining Ring" category in the Standard Library', 'On the monitor', 'In a text file'], correctAnswer: 1, explanation: 'Libraries contain all industrial standard hardware dimensions.' },
        { id: '2rr7', text: 'How is a retaining ring typically drawn in a 2D side view?', options: ['A big circle', 'A thin rectangle sitting inside a groove', 'A wavy line', 'A 2D arrow'], correctAnswer: 1, explanation: 'The side profile reveals the cross-section of the ring in its groove.' },
        { id: '2rr8', text: 'Situational: You need to specify a groove for a 10mm shaft. What do you do?', options: ['Guess the size as 1mm', 'Select the "10mm Shaft" size in the iCAD Library to generate the correct groove', 'Delete the shaft', 'Ask the IT'], correctAnswer: 1, explanation: 'Library tools automate the creation of standardized grooves.' },
        { id: '2rr9', text: 'Technical: Can you use an "Internal" ring on a 20mm shaft?', options: ['Yes', 'No, internal rings are for holes/bores; they expand outward', 'Only if you paint it', 'Only in 3D'], correctAnswer: 1, explanation: 'Internal and external rings have opposite tension directions.' },
        { id: '2rr10', text: 'True or False: Retaining rings include Bill of Material (BOM) information automatically when used from the library.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Integrated metadata is a key feature of the standard library.' }
      ]
    }
  },
  {
    id: '2d-geometric-tol',
    title: 'Geometric Tolerance',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-geometric-tol-${i + 1}`, title: `Geometric Tolerance (${i + 1})` })),
    quiz: {
      title: 'iCAD GD&T (Geometric Tolerance)',
      description: 'Understanding geometric control and datums in 2D drafting.',
      questions: [
        { id: '2gt1', text: 'What is a "Datum" in GD&T?', options: ['The current date', 'A theoretical exact reference point, line, or plane (e.g., Datum A)', 'A file format', 'A color setting'], correctAnswer: 1, explanation: 'Datums provide the starting point for all geometric measurements.' },
        { id: '2gt2', text: 'Technical: What does the "Parallelism" symbol look like?', options: ['A circle', 'Two slanted parallel lines (//)', 'An L shape', 'A triangle'], correctAnswer: 1, explanation: 'The slanted lines symbol indicates a parallelism requirement between two features.' },
        { id: '2gt3', text: 'Situational: You need to ensure a face is perfectly flat within 0.02mm. Which symbol do you use?', options: ['Perpendicularity', 'Flatness (Parallelogram symbol)', 'Diameter', 'Radius'], correctAnswer: 1, explanation: 'Flatness controls the form of a single surface without a datum reference.' },
        { id: '2gt4', text: 'Technical: What is a "Feature Control Frame"?', options: ['A picture frame', 'The rectangular box containing the GD&T symbol, tolerance value, and datums', 'A layer name', 'A 3D part name'], correctAnswer: 1, explanation: 'The frame communicates all geometric requirements in a standardized block.' },
        { id: '2gt5', text: 'What does "Perpendicularity" (⊥) control?', options: ['The length of a line', 'The 90-degree relationship between a feature and a datum', 'The color of a hole', 'The weight of a part'], correctAnswer: 1, explanation: 'Perpendicularity ensures features are square to their references.' },
        { id: '2gt6', text: 'Situational: You see "0.1 A" in a frame. What does "A" signify?', options: ['Grade A quality', 'The primary Datum Reference (Datum A)', 'Apple material', 'Always 0.1'], correctAnswer: 1, explanation: 'The letter identifies which datum the tolerance is measured from.' },
        { id: '2gt7', text: 'Technical: What is "Position" tolerance used for?', options: ['To move the part', 'To control the exact center location of a hole or feature', 'To change the view', 'To save the file'], correctAnswer: 1, explanation: 'Position is the most common GD&T tolerance for bolt patterns and holes.' },
        { id: '2gt8', text: 'Where is the GD&T tool found in iCAD 2D?', options: ['Inside the Line tool', 'Inside the Dimension / Annotation Menu', 'In the file menu', 'On the monitor'], correctAnswer: 1, explanation: 'Geometric tolerances are advanced annotations.' },
        { id: '2gt9', text: 'Situational: Two holes must be aligned exactly. Which tolerance is best?', options: ['Color tolerance', 'Concentricity or Position', 'Weight tolerance', 'No tolerance'], correctAnswer: 1, explanation: 'Concentricity/Position ensures axes are aligned.' },
        { id: '2gt10', text: 'True or False: Geometric tolerances are only used for high-precision parts where standard linear dimensions are not enough.', options: ['True', 'False'], correctAnswer: 0, explanation: 'GD&T is reserved for critical fits and functional requirements.' }
      ]
    }
  },
  {
    id: '2d-part-note',
    title: 'Part Note',
    quiz: {
      title: 'iCAD Technical Notes & Requirements',
      description: 'Communicating general manufacturing instructions in the 2D drawing.',
      questions: [
        { id: '2pn1', text: 'Where are "General Notes" typically placed on an iCAD drawing?', options: ['In the middle of the part', 'Above or near the Title Block in the lower-right corner', 'On the top of the monitor', 'In a separate file'], correctAnswer: 1, explanation: 'Standard practice places general requirements in a dedicated notes area for easy reading.' },
        { id: '2pn2', text: 'Technical: What does the common note "CHAMFER ALL EDGES C0.5 UNLESS OTHERWISE SPECIFIED" mean?', options: ['Make the part colorful', 'Apply a 0.5mm 45-degree cut to every sharp edge by default', 'Delete the edges', 'Measure the edges'], correctAnswer: 1, explanation: 'Global notes save time by applying a standard finish to all unspecified edges.' },
        { id: '2pn3', text: 'Situational: The design requires a specific material like "S45C". Where is this documented?', options: ['In the part color', 'In the Title Block under the "Material" section', 'On every line of the drawing', 'Inside the hole'], correctAnswer: 1, explanation: 'The Title Block is the primary resource for material and administrative data.' },
        { id: '2pn4', text: 'Technical: What does "HARDEN TO HRC 50-55" indicate in a note?', options: ['The weight of the part', 'The required Rockwell hardness achieved via heat treatment', 'The price of the steel', 'The number of parts to make'], correctAnswer: 1, explanation: 'Hardness notes specify the structural properties of the finished component.' },
        { id: '2pn5', text: 'Which tool is used to write technical notes in iCAD 2D?', options: ['Line tool', 'Text Tool (Annotation)', 'Hatch tool', 'Trim tool'], correctAnswer: 1, explanation: 'Text tools allow for both single-line and multi-line technical instructions.' },
        { id: '2pn6', text: 'Situational: You need to specify that a surface must be "Grounded" or "Polished". How is this shown?', options: ['Using Surface Finish symbols (triangles) and associated notes', 'By drawing messy lines', 'By coloring it blue', 'By skipping it'], correctAnswer: 0, explanation: 'Surface symbols dictate the machining process required for a face.' },
        { id: '2pn7', text: 'Technical: What is the "Quantity" (QTY) field in the Title Block for?', options: ['The part number', 'The number of identical parts required for one assembly', 'The current time', 'The designer\'s ID'], correctAnswer: 1, explanation: 'QTY helps procurement and manufacturing plan the batch size.' },
        { id: '2pn8', text: 'What does "REMOVE ALL BURRS" mean in industrial terms?', options: ['Add more metal', 'Smooth out sharp, jagged edges caused by machining/cutting', 'Make the part dirty', 'Change the file name'], correctAnswer: 1, explanation: 'Deburring is a critical safety and fitment step in manufacturing.' },
        { id: '2pn9', text: 'Situational: You made a mistake in the notes. How do you edit them?', options: ['Redraw the whole sheet', 'Double-click the text or use the Text Edit command', 'Write over it with a pen', 'Save as a new file'], correctAnswer: 1, explanation: 'Digital text remains fully editable within the 2D environment.' },
        { id: '2pn10', text: 'True or False: Part Notes are legally binding instructions for the factory floor.', options: ['True', 'False'], correctAnswer: 0, explanation: 'The 2D drawing and its notes constitute the contract between design and production.' }
      ]
    }
  },
  {
    id: '2d-machining-symbol',
    title: 'Machining Symbol',
    quiz: {
      title: 'Surface Finish & Machining Symbols',
      description: 'Understanding surface quality requirements.',
      questions: [
        { id: '2ms1', text: 'What does the basic "Checkmark" symbol represent in 2D drafting?', options: ['Done', 'Surface Texture/Machining requirement', 'Correct dimension', 'A hole'], correctAnswer: 1, explanation: 'The checkmark is the base for surface finish symbols.' },
        { id: '2ms2', text: 'Technical: What does "Ra" stand for in a surface finish symbol?', options: ['Radius', 'Roughness Average (micrometers)', 'Ready Angle', 'Red Area'], correctAnswer: 1, explanation: 'Ra is the most common parameter for surface smoothness.' },
        { id: '2ms3', text: 'Situational: A face needs to be perfectly smooth for a seal. Which Ra value is better?', options: ['Ra 12.5', 'Ra 0.8', 'Ra 6.3', 'Ra 50'], correctAnswer: 1, explanation: 'Lower Ra values signify smoother surfaces.' },
        { id: '2ms4', text: 'What does a circle inside the machining symbol indicate?', options: ['Machining is mandatory', 'Material removal is Not Allowed (keep original surface)', 'A hole is here', 'A color setting'], correctAnswer: 1, explanation: 'The circle signifies "No Removal", often for cast or forged faces.' },
        { id: '2ms5', text: 'Technical: What is the unit of measurement for surface roughness in iCAD (Metric)?', options: ['Millimeters', 'Micrometers (µm)', 'Meters', 'Inches'], correctAnswer: 1, explanation: 'Roughness is measured at the microscopic level.' },
        { id: '2ms6', text: 'Situational: A part is "Ground" to finish. Which symbol variation is used?', options: ['Basic with a bar on top', 'Basic without any marks', 'A circle', 'A cross'], correctAnswer: 0, explanation: 'The top bar allows specifying the process (e.g., Grinding).' },
        { id: '2ms7', text: 'Where is the surface finish symbol placed on a drawing?', options: ['In the middle of the part', 'On the extension line or the surface edge directly', 'Outside the paper', 'In the BOM'], correctAnswer: 1, explanation: 'Placement ensures the machinist knows exactly which face is affected.' },
        { id: '2ms8', text: 'Technical: What does "Lay" represent?', options: ['The weight of the part', 'The direction of the primary surface pattern (e.g., Parallel, Circular)', 'The time to machine', 'The price'], correctAnswer: 1, explanation: 'Lay direction affects friction and wear.' },
        { id: '2ms9', text: 'Situational: No specific symbol is added to a face. What finish applies?', options: ['It can be rough', 'The "General Finish" specified in the Title Block or Notes', 'It must be polished', 'It depends on the mood'], correctAnswer: 1, explanation: 'Standard drawings have a global default for unspecified faces.' },
        { id: '2ms10', text: 'True or False: Higher surface finish quality (lower Ra) increases the cost of the part.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Precision polishing/grinding requires more time and expensive tooling.' }
      ]
    }
  },
  {
    id: '2d-welding-symbol',
    title: 'Welding Symbol',
    quiz: {
      title: 'Welding Design & Communication',
      description: 'Understanding how to specify weld joints in 2D.',
      questions: [
        { id: '2ws1', text: 'What is the "Reference Line" in a welding symbol?', options: ['A line that shows where to cut', 'The horizontal line where all welding information is placed', 'A 3D axis', 'A layer name'], correctAnswer: 1, explanation: 'The reference line is the backbone of the welding symbol.' },
        { id: '2ws2', text: 'Technical: What does an "Arrow Side" weld vs "Other Side" weld mean?', options: ['Difference in color', 'Weld placement relative to the arrow point (Below line = Arrow side)', 'Weld length', 'Weld type'], correctAnswer: 1, explanation: 'Symbols below the line mean weld here; above means weld the other side.' },
        { id: '2ws3', text: 'Situational: You need to join two plates at 90 degrees with a triangular weld. Which symbol do you use?', options: ['Groove Weld', 'Fillet Weld (Triangle symbol)', 'Plug Weld', 'Spot Weld'], correctAnswer: 1, explanation: 'Fillet welds are the most common joint for T-intersections.' },
        { id: '2ws4', text: 'What does a flag symbol at the junction of the arrow and reference line mean?', options: ['Weld in the shop', 'Field Weld (Weld at the installation site)', 'Country of origin', 'Danger'], correctAnswer: 1, explanation: 'The "flag" tells the welder to do the work on-site, not in the factory.' },
        { id: '2ws5', text: 'Technical: Where is the weld "Size" (e.g., 6mm) placed on the symbol?', options: ['In the tail', 'To the left of the weld symbol', 'To the right of the weld symbol', 'On top of the arrow'], correctAnswer: 1, explanation: 'Size goes to the left; length goes to the right.' },
        { id: '2ws6', text: 'Situational: A weld must go all the way around a pipe. Which special mark is added?', options: ['A small circle at the arrow junction (Weld-All-Around)', 'A red line', 'A dashed line', 'Write "ALL"'], correctAnswer: 0, explanation: 'The Weld-all-around circle eliminates the need for multiple symbols.' },
        { id: '2ws7', text: 'What is the "Tail" of the welding symbol used for?', options: ['Decoration', 'Providing specific process instructions (e.g., TIG, MIG)', 'Showing the weight', 'Saving the file'], correctAnswer: 1, explanation: 'The tail contains supplementary info like welding methods.' },
        { id: '2ws8', text: 'Technical: What does the "V-Groove" symbol represent?', options: ['A V-shaped weld joint requiring edge preparation', 'A very big weld', 'A victory weld', 'A hole'], correctAnswer: 0, explanation: 'Groove welds require cutting the plate edges before welding.' },
        { id: '2ws9', text: 'Situational: You want to specify a 50mm weld every 100mm. How is this written?', options: ['50-100', '100x50', 'Weld 5 times', 'None'], correctAnswer: 0, explanation: 'Length-Pitch notation defines intermittent welds.' },
        { id: '2ws10', text: 'True or False: Incorrect welding symbols can lead to structural failure if the weld is too small.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Weld symbols carry critical structural engineering data.' }
      ]
    }
  },
  {
    id: '2d-heat-treatment',
    title: 'Heat Treatment',
    children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-heat-treatment-${i + 1}`, title: `Heat Treatment (${i + 1})` })),
    quiz: {
      title: 'Heat Treatment & Hardness',
      description: 'Understanding metallurgical instructions in CAD.',
      questions: [
        { id: '2ht1', text: 'What is the purpose of "Heat Treatment" for a steel part?', options: ['To make it red', 'To change its physical properties like Hardness, Strength, or Toughness', 'To clean it', 'To melt it'], correctAnswer: 1, explanation: 'Heat treatment modifies the crystal structure of the metal.' },
        { id: '2ht2', text: 'Technical: What does "HRC" stand for in a drawing note?', options: ['Hardness Rockwell C-Scale', 'Heat Resistance Code', 'High Roll Case', 'None'], correctAnswer: 0, explanation: 'Rockwell C is the standard scale for hardened industrial steel.' },
        { id: '2ht3', text: 'Situational: A gear needs to be very hard on its teeth but tough in the center. Which process is used?', options: ['Full Hardening', 'Case Hardening / Induction Hardening', 'Annealing', 'Painting'], correctAnswer: 1, explanation: 'Case hardening hardens only the outer "skin" of the part.' },
        { id: '2ht4', text: 'What is "Annealing"?', options: ['Hardening the part', 'Softening the part to improve machinability and remove stress', 'Adding color', 'Scaling'], correctAnswer: 1, explanation: 'Annealing is the opposite of hardening.' },
        { id: '2ht5', text: 'Technical: What is "Quenching"?', options: ['Drinking water', 'Rapid cooling of a heated part in oil or water to harden it', 'Slow cooling', 'Heating'], correctAnswer: 1, explanation: 'Fast cooling locks in the hard crystalline structure.' },
        { id: '2ht6', text: 'Situational: The drawing note says "HRC 58-62". What does this mean?', options: ['The part costs $58', 'The allowed hardness range after treatment', 'The temperature', 'The weight'], correctAnswer: 1, explanation: 'Hardness is often specified as a range for quality control.' },
        { id: '2ht7', text: 'Which property is typically SACRIFICED when a part becomes extremely hard?', options: ['Weight', 'Toughness (it becomes more brittle and prone to cracking)', 'Volume', 'Color'], correctAnswer: 1, explanation: 'Hardness and toughness are usually an engineering trade-off.' },
        { id: '2ht8', text: 'Technical: What is "Tempering"?', options: ['Making someone angry', 'Reheating a hardened part to reduce brittleness while keeping hardness', 'Freezing the part', 'Painting'], correctAnswer: 1, explanation: 'Tempering balances the scale between hardness and brittleness.' },
        { id: '2ht9', text: 'Situational: You need to specify heat treatment only for a small localized area. How do you show this?', options: ['Write a global note', 'Use a "Treatment Area" indicated by a thick chain line and a local note', 'Color the whole part', 'It is not possible'], correctAnswer: 1, explanation: 'Point-of-use symbols define localized treatment zones.' },
        { id: '2ht10', text: 'True or False: Incorrect heat treatment can cause a part to warp or change size slightly.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Thermal stress during treatment often requires a final machining step.' }
      ]
    }
  },
  {
    id: '2d-surface-coating',
    title: 'Surface Coating',
    quiz: {
      title: 'Surface Coating & Plating',
      description: 'Understanding protective and aesthetic finishes in 2D.',
      questions: [
        { id: '2sc1', text: 'What is the primary reason for "Zinc Plating" a steel part?', options: ['To make it look like gold', 'Corrosion resistance (preventing rust)', 'To increase hardness', 'To make it lighter'], correctAnswer: 1, explanation: 'Zinc acts as a sacrificial layer to protect steel from oxidation.' },
        { id: '2sc2', text: 'Technical: What does "Chrome Plating" provide?', options: ['High wear resistance and a shiny, hard surface', 'Softness', 'Red color', 'Low cost'], correctAnswer: 0, explanation: 'Industrial chrome is used for friction reduction and durability.' },
        { id: '2sc3', text: 'Situational: A part is used in a food processing plant. Which coating is most likely specified?', options: ['Black Oxide', 'Electroless Nickel or Stainless Steel (No coating)', 'Spray Paint', 'Zinc'], correctAnswer: 1, explanation: 'Food-grade environments require non-toxic, non-chipping finishes.' },
        { id: '2sc4', text: 'What is "Black Oxide"?', options: ['A thick paint', 'A chemical conversion coating that turns steel black', 'A 2D line', 'A type of plastic'], correctAnswer: 1, explanation: 'Black oxide provides mild corrosion resistance without changing part dimensions.' },
        { id: '2sc5', text: 'Technical: Does a "Powder Coating" increase the physical dimensions of a part?', options: ['No', 'Yes, typically by 0.05mm to 0.15mm', 'Only if it\'s red', 'Only in 3D'], correctAnswer: 1, explanation: 'Powder coating is a thick "skin" that must be accounted for in tight fits.' },
        { id: '2sc6', text: 'Situational: You need to specify a finish for an Aluminum part to make it hard and colorful. Which process is correct?', options: ['Anodizing', 'Galvanizing', 'Tempering', 'Welding'], correctAnswer: 0, explanation: 'Anodizing is specific to aluminum and provides both protection and color.' },
        { id: '2sc7', text: 'Where is the coating specification written on a 2D drawing?', options: ['On every line', 'In the "Finish" section of the Title Block or a Note', 'On the back', 'In the bill'], correctAnswer: 1, explanation: 'Finish is a global property of the part.' },
        { id: '2sc8', text: 'Technical: What is "Galvanizing"?', options: ['Coating with Zinc (usually hot-dipped)', 'Painting with oil', 'Melted steel', 'Plastic coating'], correctAnswer: 0, explanation: 'Hot-dip galvanizing is a highly durable industrial zinc coating.' },
        { id: '2sc9', text: 'Situational: A precision hole must NOT be coated. How do you indicate this?', options: ['Don\'t draw the hole', 'Add a note: "MASK THIS AREA DURING PLATING"', 'Color it white', 'Delete the dimension'], correctAnswer: 1, explanation: 'Masking ensures critical tolerances are preserved during coating.' },
        { id: '2sc10', text: 'True or False: Most plating types are specified by their thickness (e.g., 5-8 microns).', options: ['True', 'False'], correctAnswer: 0, explanation: 'Thickness control is essential for assembly compatibility.' }
      ]
    }
  },
  {
    id: '2d-weight-computation',
    title: 'Weight Computation',
    quiz: {
      title: 'Mass & Weight Calculation',
      description: 'Understanding how CAD calculates physical properties.',
      questions: [
        { id: '2wc1', text: 'How does iCAD calculate the "Weight" of a 3D part?', options: ['By measuring the area', 'By multiplying Volume by the Material Density', 'By counting the lines', 'By asking the user'], correctAnswer: 1, explanation: 'Mass = Volume x Density.' },
        { id: '2wc2', text: 'Technical: What is the approximate density of "Steel"?', options: ['1.0 g/cm³', '7.85 g/cm³', '2.7 g/cm³', '13.6 g/cm³'], correctAnswer: 1, explanation: '7.85 is the standard density for common carbon steels.' },
        { id: '2wc3', text: 'Situational: You changed the material from Steel to Aluminum. What happens to the weight?', options: ['It stays the same', 'It decreases (Aluminum is ~1/3 the density of Steel)', 'It increases', 'The part disappears'], correctAnswer: 1, explanation: 'Aluminum density is approx 2.7 g/cm³.' },
        { id: '2wc4', text: 'Why is accurate weight calculation important for large machinery?', options: ['To choose the right paint', 'To calculate shipping costs, crane capacity, and structural loads', 'To make the file look good', 'To save ink'], correctAnswer: 1, explanation: 'Weight drives logistics and safety engineering.' },
        { id: '2wc5', text: 'Technical: What unit is typically used for "Density" in metric CAD settings?', options: ['kg/mm²', 'g/cm³ or kg/m³', 'm/s', 'Degrees'], correctAnswer: 1, explanation: 'Mass per unit volume is the definition of density.' },
        { id: '2wc6', text: 'Situational: The calculated weight is 0.00kg but the part clearly exists. What is wrong?', options: ['The part is too small', 'The material density is set to zero or not assigned', 'The monitor is off', 'The mouse is broken'], correctAnswer: 1, explanation: 'CAD needs a non-zero density value to calculate mass.' },
        { id: '2wc7', text: 'Does "Weight" in iCAD automatically include the weight of standard bolts in an assembly?', options: ['No', 'Yes, if the library parts have assigned material properties', 'Only if they are red', 'Only in 2D'], correctAnswer: 1, explanation: 'Assemblies aggregate the mass of all child components.' },
        { id: '2wc8', text: 'Technical: What is "Center of Gravity" (CG)?', options: ['The middle of the screen', 'The average location of the mass of an object', 'The heaviest point only', 'The bottom face'], correctAnswer: 1, explanation: 'CG is critical for balance and lifting stability.' },
        { id: '2wc9', text: 'Situational: You need to specify the mass on the 2D drawing. Where does it go?', options: ['Randomly', 'In the "Weight" or "Mass" field of the Title Block', 'In a hidden layer', 'On the arrow'], correctAnswer: 1, explanation: 'The title block is the standard location for part metadata like weight.' },
        { id: '2wc10', text: 'True or False: Using "Casting" symbols can affect the calculated weight if the draft angles are not modeled.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Any change in geometric volume directly impacts calculated weight.' }
      ]
    }
  },
  {
    id: '2d-bom',
    title: 'BOM',
    children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-bom-${i + 1}`, title: `BOM (${i + 1})` })),
    quiz: {
      title: 'Bill of Materials Management',
      description: 'Mastering assembly parts lists and procurement data.',
      questions: [
        { id: '2bm1', text: 'What does "BOM" stand for?', options: ['Basic Object Model', 'Bill of Materials', 'Build of machinery', 'Board of management'], correctAnswer: 1, explanation: 'BOM is the master list of all components in an assembly.' },
        { id: '2bm2', text: 'Technical: What minimal information should a BOM contain?', options: ['Color only', 'Item No., Part Name, Qty, Material, and Remarks', 'The designer\'s address', 'File size'], correctAnswer: 1, explanation: 'BOM columns must provide enough info for purchasing and assembly.' },
        { id: '2bm3', text: 'Situational: You added a new bolt to the 3D assembly. How do you update the 2D BOM?', options: ['Type it in manually', 'Use the "Update BOM" or "Refresh from 3D" command', 'Restart the computer', 'Print a new page'], correctAnswer: 1, explanation: 'Modern CAD links 3D assembly structure to the 2D BOM table.' },
        { id: '2bm4', text: 'What is a "Purchased Part" in a BOM?', options: ['A part you make yourself', 'A standard component bought from a vendor (e.g., Motors, Bearings)', 'A free part', 'A 2D line'], correctAnswer: 1, explanation: 'Purchased parts are identified for procurement, not manufacturing.' },
        { id: '2bm5', text: 'Technical: What are "Remarks" used for in a BOM?', options: ['Jokes', 'Vendor names, Part numbers, or special assembly notes', 'Signatures', 'Dates'], correctAnswer: 1, explanation: 'Remarks provide "extra" context like "McMaster-Carr P/N 12345".' },
        { id: '2bm6', text: 'Situational: The BOM says Qty 2, but there are 3 in the 3D model. What is the risk?', options: ['The part will be blue', 'Under-ordering parts, causing production delays', 'The file will be heavy', 'None'], correctAnswer: 1, explanation: 'BOM accuracy is critical for supply chain management.' },
        { id: '2bm7', text: 'Which direction does a standard assembly BOM typically grow?', options: ['Top to Bottom (with headers at top)', 'Bottom to Top (starting from the Title Block)', 'Left to Right', 'Both'], correctAnswer: 1, explanation: 'Standard drafting practice often places headers at the bottom, growing upwards.' },
        { id: '2bm8', text: 'Technical: What is a "Sub-Assembly" in the context of a BOM?', options: ['A single screw', 'A group of parts that form a smaller unit within the main assembly', 'A 2D drawing', 'A broken part'], correctAnswer: 1, explanation: 'BOMs can be hierarchical (indented) to show assembly levels.' },
        { id: '2bm9', text: 'Situational: You need to specify the "Material" for a custom plate in the BOM. Which is correct?', options: ['Hard Steel', 'SS400 or S45C (Standard codes)', 'Metal', 'Strong'], correctAnswer: 1, explanation: 'Specific industrial material codes prevent material errors.' },
        { id: '2bm10', text: 'True or False: The BOM and the Balloons on a drawing must always have matching Item Numbers.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Cross-referencing between the table and the visual layout is mandatory.' }
      ]
    }
  },
  {
    id: '2d-balloon',
    title: 'Balloon',
    quiz: {
      title: 'Assembly Balloons & Identification',
      description: 'Understanding how to label assembly components in 2D.',
      questions: [
        { id: '2bl1', text: 'What is a "Balloon" in an assembly drawing?', options: ['A toy for parties', 'A circular symbol containing an item number that points to a specific part', 'A 3D sphere', 'A note about weight'], correctAnswer: 1, explanation: 'Balloons link the visual part to its entry in the BOM.' },
        { id: '2bl2', text: 'Technical: What is a "Leader" in relation to a balloon?', options: ['The boss of the drawing', 'The line with an arrow that connects the balloon to the part', 'A thick border', 'A hidden line'], correctAnswer: 1, explanation: 'Leaders provide the physical link to the geometry.' },
        { id: '2bl3', text: 'Situational: You have 10 identical screws. Do you need a balloon for every single one?', options: ['Yes', 'No, one balloon pointing to one screw with the quantity clarified in the BOM is standard', 'Only if they are red', 'Delete them all'], correctAnswer: 1, explanation: 'Clutter reduction is key in assembly drawings.' },
        { id: '2bl4', text: 'What is "Balloon Alignment"?', options: ['Making them colorful', 'Arranging balloons in neat horizontal or vertical rows for readability', 'Closing the file', 'Printing'], correctAnswer: 1, explanation: 'Aligned balloons make a drawing look professional and easy to scan.' },
        { id: '2bl5', text: 'Technical: What happens to a balloon if you change the Item Number in the BOM?', options: ['Nothing', 'It should automatically update to match (if using associative balloons)', 'It disappears', 'It turns red'], correctAnswer: 1, explanation: 'Associativity prevents numbering mismatches.' },
        { id: '2bl6', text: 'Situational: A part is so small it is hard to point to. What is the best strategy?', options: ['Use a massive arrow', 'Use a Detail View to show the part clearly, then add the balloon', 'Guess the location', 'Ignore the part'], correctAnswer: 1, explanation: 'Detail views provide the space needed for clear annotation.' },
        { id: '2bl7', text: 'Can balloons be used in Section Views?', options: ['No', 'Yes, and they are often clearer there for internal parts', 'Only on Sundays', 'Only in 3D'], correctAnswer: 1, explanation: 'Section views are excellent for labeling internal assembly details.' },
        { id: '2bl8', text: 'Technical: What is a "Stacked Balloon"?', options: ['A pile of papers', 'Multiple balloons sharing a single leader (for parts grouped together like a bolt, nut, and washer)', 'A 3D balloon', 'A broken balloon'], correctAnswer: 1, explanation: 'Stacking saves space and shows related hardware groups.' },
        { id: '2bl9', text: 'Situational: One balloon is pointing to the wrong part. How do you fix it?', options: ['Delete and redraw', 'Drag the leader "Anchor Point" to the correct geometry', 'Change the BOM', 'Restart iCAD'], correctAnswer: 1, explanation: 'Interactive editing is a core CAD feature.' },
        { id: '2bl10', text: 'True or False: Balloons should be placed on top of the geometry whenever possible.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Balloons should be placed in "white space" outside the part to keep the view clean.' }
      ]
    }
  },
  {
    id: '2d-titleblock',
    title: 'Titleblock',
    content: ['Title block', 'metadata', 'Drawing Number', 'Scale', 'Unit', 'Revision Level', 'Projection Symbol', '3rd angle', 'Material field', 'AL6061', 'S35C', 'S45C', 'Tolerance Block', 'Drawn By', 'accountability', 'administrative info', 'company standards'],
    quiz: {
      title: 'Drawing Title Block & Metadata',
      description: 'Mastering the administrative requirements of engineering drawings.',
      questions: [
        { id: '2tb1', text: 'What is the "Title Block"?', options: ['A block used for titles', 'A standardized table at the corner of a drawing containing administrative info', 'A 3D cube', 'A hidden area'], correctAnswer: 1, explanation: 'The title block is the "identity card" of the drawing.' },
        { id: '2tb2', text: 'Technical: Which information is MANDATORY in a Title Block?', options: ['Designer\'s favorite color', 'Part Name, Drawing Number, Scale, and Unit', 'Price of the part', 'Computer model'], correctAnswer: 1, explanation: 'Administrative tracking requires these core fields.' },
        { id: '2tb3', text: 'Situational: You are starting a new revision. Where is the "Revision Level" (e.g., Rev A) recorded?', options: ['On the part face', 'In the Revision Table/Title Block', 'In a separate text file', 'Nowhere'], correctAnswer: 1, explanation: 'Version control is tracked visually on the drawing.' },
        { id: '2tb4', text: 'What does "Scale 1:2" mean in the title block?', options: ['The drawing is twice as big as the part', 'The drawing is half the size of the real part', 'The part is 1.2mm long', 'Scale is a secret'], correctAnswer: 1, explanation: 'Scale ratios communicate the relationship between paper and reality.' },
        { id: '2tb5', text: 'Technical: What is the "Projection Symbol" in the title block?', options: ['A logo', 'The symbol indicating 1st or 3rd angle projection method', 'A weather icon', 'A 2D line'], correctAnswer: 1, explanation: 'Determines how to "read" the views.' },
        { id: '2tb6', text: 'Situational: The company changed its name. Do you have to edit every drawing?', options: ['Yes, by updating the Title Block template or global properties', 'No, ignore it', 'Only on new parts', 'Draw over it with a pen'], correctAnswer: 0, explanation: 'Drawing templates allow for global administrative updates.' },
        { id: '2tb7', text: 'What is the "Material" field in the title block for?', options: ['The paper type', 'The raw material the part is manufactured from (e.g., AL6061)', 'The designer\'s name', 'A color'], correctAnswer: 1, explanation: 'Manufacturing starts with the correct raw material specification.' },
        { id: '2tb8', text: 'Technical: What is the "Tolerance Block"?', options: ['A list of people who are late', 'A section defining general tolerances for the whole sheet', 'A 3D part', 'A hidden layer'], correctAnswer: 1, explanation: 'Defines the default precision for "loose" dimensions.' },
        { id: '2tb9', text: 'Situational: You forgot to sign/initial the "Drawn By" field. Is the drawing complete?', options: ['Yes', 'No, accountability is a requirement in industrial quality systems', 'Only if it\'s printed', 'Maybe'], correctAnswer: 1, explanation: 'Signatures track responsibility and workflow stages.' },
        { id: '2tb10', text: 'True or False: The Title Block is usually located in the Bottom-Right corner of the sheet.', options: ['True', 'False'], correctAnswer: 0, explanation: 'This location is a global standard (ISO/ANSI/JIS) for easy retrieval in folders.' }
      ]
    }
  },
  {
    id: '2d-additional-view',
    title: 'Additional View',
    content: ['Auxiliary View', 'Partial View', 'True Shape', 'inclined face', 'Broken-out Section', 'View Break', 'Detail View', 'Section View', 'magnified area', 'Removed Section', 'cutting plane', 'localized details', 'view enlargement'],
    children: [
      { id: '2d-additional-view-1', title: 'Additional View (1) - Auxiliary & Partial', content: ['inclined surfaces', 'true shape projection'] },
      { id: '2d-additional-view-2', title: 'Additional View (2) - Break & Section', content: ['broken-out cutouts', 'view shortening'] },
      { id: '2d-additional-view-3', title: 'Additional View (3) - Detail & Removed', content: ['magnification', 'offset sections'] },
      { id: '2d-additional-view-4', title: 'Additional View (4) - Trim View', content: ['view trimming', 'detail view restrictions'] },
    ],
    quiz: {
      title: 'Auxiliary & Additional Views',
      description: 'Understanding complex viewing methods for non-standard geometry.',
      questions: [
        { id: '2av1', text: 'What is an "Auxiliary View"?', options: ['A view of a hidden part', 'A view projected onto a plane that is not one of the six principal planes', 'A 3D perspective', 'A random sketch'], correctAnswer: 1, explanation: 'Auxiliary views show the true shape of inclined surfaces.' },
        { id: '2av2', text: 'Technical: When is a "Partial View" used?', options: ['When you are lazy', 'When only a specific portion of a large or complex part needs to be shown for clarity', 'To save ink', 'By accident'], correctAnswer: 1, explanation: 'Partial views reduce drawing clutter by omitting redundant info.' },
        { id: '2av3', text: 'Situational: You have an inclined face that looks distorted in North/South/East/West views. How do you show its true holes?', options: ['Dimension the distortion', 'Create an Auxiliary View perpendicular to the inclined face', 'Rotate the whole part', 'Delete the holes'], correctAnswer: 1, explanation: 'Only a perpendicular view shows the "True Shape".' },
        { id: '2av4', text: 'What is a "Broken-out Section"?', options: ['A broken part', 'A small area of a view "broken" away to reveal internal detail without a full section', 'A faulty drawing', 'A 2D line'], correctAnswer: 1, explanation: 'Broken-out sections are localized and efficient.' },
        { id: '2av5', text: 'Technical: What type of line is used to bound a "Broken-out Section"?', options: ['Thick straight line', 'Thin irregular "Short Break" line', 'Dashed line', 'Red line'], correctAnswer: 1, explanation: 'Jagged break lines signify a manual "tear" into the material.' },
        { id: '2av6', text: 'Situational: You need to show a long pipe. How do you fit it on a small sheet?', options: ['Shrink it to 1:100', 'Use a "View Break" (Zig-zag) to remove the middle section', 'Fold the paper', 'Draw on two sheets'], correctAnswer: 1, explanation: 'View breaks remove non-descript length from long components.' },
        { id: '2av7', text: 'Which view is used to show a magnified area of a drawing?', options: ['Auxiliary', 'Detail View', 'Section View', 'Top View'], correctAnswer: 1, explanation: 'Detail views use a larger scale (e.g., 5:1).' },
        { id: '2av8', text: 'Technical: What is a "Removed Section"?', options: ['A section that is deleted', 'A section view placed somewhere other than directly aligned with the cutting plane', 'A mistake', 'A 3D section'], correctAnswer: 1, explanation: 'Removed sections provide layout flexibility.' },
        { id: '2av9', text: 'Situational: A part has features at a 45-degree angle. Which view reveals the true dimensions?', options: ['Front View', 'Auxiliary View', 'Side View', 'Top View'], correctAnswer: 1, explanation: 'Auxiliary planes are aligned to the feature\'s angle.' },
        { id: '2av10', text: 'True or False: Additional views should only be added if the principal views cannot clearly communicate the geometry.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Minimalism and clarity are the goals of efficient drafting.' }
      ]
    }
  },
  {
    id: '2d-operal-view',
    title: 'Operal View',
    content: ['Operal View', 'Operation Drawing', 'manufacturing steps', 'setup dimensions', 'stock outline', 'in-process inspection', 'machining datums', 'process sequence', 'factory station guidance'],
    children: [
      { id: '2d-operal-view-1', title: 'Operal View (1)', content: ['setup dimensions', 'stock visualization'] },
      { id: '2d-operal-view-2', title: 'Operal View (2)', content: ['process sequences', 'quality control'] },
    ],
    quiz: {
      title: 'Manufacturing Operation Views',
      description: 'Understanding process-specific drawing layouts.',
      questions: [
        { id: '2ov1', text: 'What is an "Operation Drawing" (Operal View)?', options: ['A drawing for surgery', 'A drawing that shows the part state at a specific manufacturing step (e.g., after turning)', 'A final assembly', 'A 3D model'], correctAnswer: 1, explanation: 'Operation drawings guide individual factory stations.' },
        { id: '2ov2', text: 'Technical: What are "Setup Dimensions"?', options: ['Final sizes', 'Dimensions required specifically for setting up the machine tool for an operation', 'Color codes', 'File paths'], correctAnswer: 1, explanation: 'Setup dimensions help the machinist position the raw stock.' },
        { id: '2ov3', text: 'Situational: A part needs to be Heat Treated then Ground. How many operation states are there?', options: ['1', '2 (Pre-heat treat and Post-heat treat/grind)', '0', '10'], correctAnswer: 1, explanation: 'Each significant process state may require its own view/control.' },
        { id: '2ov4', text: 'What does a "Stock Outline" represent in an operation view?', options: ['The final part', 'The original raw material shape (e.g., bar stock) using phantom lines', 'A box', 'A hole'], correctAnswer: 1, explanation: 'Visualizing the stock helps identify material removal zones.' },
        { id: '2ov5', text: 'Technical: What is "In-process Inspection"?', options: ['Checking the part after it is shipped', 'Measuring critical dimensions DURING the manufacturing sequence', 'Checking the computer', 'None'], correctAnswer: 1, explanation: 'Saves cost by catching errors before finishing.' },
        { id: '2ov6', text: 'Situational: An operation requires a specific specialized jig. Is it shown in the Operal View?', options: ['Never', 'Often yes, as a light/phantom reference to show how the part is held', 'Always in 3D', 'In the notes only'], correctAnswer: 1, explanation: 'Tooling references clarify the manufacturing setup.' },
        { id: '2ov7', text: 'Which information is prioritized in an Operal View?', options: ['Administrative data', 'The dimensions being created in THIS specific operation', 'Hidden lines', 'BOM'], correctAnswer: 1, explanation: 'Operator focus should be on their immediate task.' },
        { id: '2ov8', text: 'Technical: What is a "Datum for Machining"?', options: ['The same as the design datum', 'Specific surfaces used to locate the part in a fixture', 'A date', 'A name'], correctAnswer: 1, explanation: 'Machining datums must be physically accessible during the cut.' },
        { id: '2ov9', text: 'Situational: You need to specify a turning speed for an operation. Where does it go?', options: ['In the Title Block', 'In the Operation Note or CNC instruction header', 'On the dimension', 'Nowhere'], correctAnswer: 1, explanation: 'Process parameters are operation-specific data.' },
        { id: '2ov10', text: 'True or False: Operation Drawings are often simplified versions of the final engineering drawing.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Simplification reduces cognitive load for the factory floor.' }
      ]
    }
  },
  {
    id: '2d-normal-mirror',
    title: 'Normal/Mirror Parts',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-normal-mirror-${i + 1}`, title: `Normal/Mirror Parts (${i + 1})` })),
    quiz: {
      title: 'Symmetry in 2D Layouts',
      description: 'Managing LH/RH parts in documentation.',
      questions: [
        { id: '2nm1', text: 'How do you commonly document a "Mirror Item" in a 2D drawing set?', options: ['Drawing it completely from scratch', 'Using one drawing and adding a note: "ITEM 2 IS MIRROR OF ITEM 1"', 'Printing the file backwards', 'Taking a photo'], correctAnswer: 1, explanation: 'Standard notation: "SHOWN: LH, MIRROR: RH".' },
        { id: '2nm2', text: 'Technical: What does "LH" and "RH" stand for?', options: ['Large/Round', 'Left-Hand and Right-Hand', 'Low/High', 'Light/Heavy'], correctAnswer: 1, explanation: 'Indicates the symmetry handedness.' },
        { id: '2nm3', text: 'Situational: You have a Left hand part drawn. Can you use its dimensions for the Right hand part?', options: ['Yes, absolute values are the same, but geometry is flipped', 'No, they are different', 'Only if the part is red', 'Only for holes'], correctAnswer: 0, explanation: 'Dimensions typically mirror identically in magnitude.' },
        { id: '2nm4', text: 'Which view is most critical to check for "Mirror Errors"?', options: ['Top View', 'The view showing the primary asymmetry/flipping', 'Front View', 'Isometric View'], correctAnswer: 1, explanation: 'Identify where the "handedness" is most obvious.' },
        { id: '2nm5', text: 'Technical: In a 2D assembly layout, how do you indicate that a mirrored part is used?', options: ['Different color', 'Matching Balloon/BOM item with a "MIRROR" remark', 'A big X', 'Dashed lines only'], correctAnswer: 1, explanation: 'BOM and Balloon linkage provides the legal documentation of symmetry.' },
        { id: '2nm6', text: 'Situational: A part has text engraved. When mirrored in 2D, what happens to the text?', options: ['It stays readable', 'It becomes backwards (Mirror image), requiring a separate "Normal Text" note', 'It disappears', 'It turns blue'], correctAnswer: 1, explanation: 'Informational features (text/logos) often don\'t follow geometric mirror rules.' },
        { id: '2nm7', text: 'How do you handle "Non-Mirrored" features on a mirrored part (e.g., a hole only on one side)?', options: ['Ignore it', 'Clarify with a note: "MOUNTING HOLE ON RH PART ONLY"', 'Delete the drawing', 'Start a new file'], correctAnswer: 1, explanation: 'Exceptions must be explicitly noted to prevent scrap.' },
        { id: '2nm8', text: 'Technical: Is "Mirroring" the same as "Rotating 180 degrees"?', options: ['Yes', 'No, mirroring requires a flip (Reflection), rotation does not', 'Only for circles', 'Only in 3D'], correctAnswer: 1, explanation: 'They are fundamentally different mathematical operations.' },
        { id: '2nm9', text: 'Situational: You need to specify a mirror part. Which part number is standard?', options: ['-01 and -02 (Suffixes for LH/RH pairs)', 'A random name', 'The same number', 'None'], correctAnswer: 0, explanation: 'Industrial PDM systems use suffixes to link mirrored pairs.' },
        { id: '2nm10', text: 'True or False: Using mirror documentation reduces the total number of drawings to manage.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Efficiency in documentation is a key goal of "Symmetry management".' }
      ]
    }
  },
  {
    id: '2d-revision-code',
    title: 'Revision Code',
    quiz: {
      title: 'Revision Control & ECOs',
      description: 'Understanding how to track changes on a 2D drawing.',
      questions: [
        { id: '2rc1', text: 'What is a "Revision"?', options: ['A new drawing', 'An authorized change made to an existing drawing', 'A 3D part', 'A color setting'], correctAnswer: 1, explanation: 'Revisions track the lifecycle and evolution of a design.' },
        { id: '2rc2', text: 'Technical: What is a "Revision Cloud"?', options: ['A cloud in the sky', 'An irregular "bumpy" line drawn around a changed feature in 2D', 'A background image', 'A layer name'], correctAnswer: 1, explanation: 'Clouds highlight what changed since the last version.' },
        { id: '2rc3', text: 'Situational: You changed a hole from 5mm to 6mm. How do you document this?', options: ['Save over the file and say nothing', 'Update the revision table with a new code (e.g., Rev B) and describe the change', 'Delete the hole', 'Repaint the part'], correctAnswer: 1, explanation: 'History tracking is mandatory for industrial accountability.' },
        { id: '2rc4', text: 'What is a "Delta" (Triangle) symbol with a number (e.g., 1)?', options: ['A math error', 'A revision pointer placed near the specific change on the drawing', 'A warning', 'A hole'], correctAnswer: 1, explanation: 'Deltas link specific geometric changes to the revision table entries.' },
        { id: '2rc5', text: 'Technical: What does "ECO" or "ECN" stand for?', options: ['Engineering Change Order / Notice', 'Electric Circuit Operator', 'Easy Color Option', 'None'], correctAnswer: 0, explanation: 'ECOs are the legal documents authorizing drawing changes.' },
        { id: '2rc6', text: 'Situational: The drawing was changed 10 times. Should all revision clouds remain?', options: ['Yes', 'No, typically only the LATEST revision clouds are shown to prevent clutter', 'Delete them all', 'Make them blue'], correctAnswer: 1, explanation: 'Clouds are usually cleared after a few revisions to maintain drawing clarity.' },
        { id: '2rc7', text: 'Where is the Revision Table located?', options: ['On a separate sheet', 'In the Title Block area (usually Top-Right or near bottom)', 'Inside the part', 'On the desktop'], correctAnswer: 1, explanation: 'The table summarizes the "WHO, WHAT, WHEN" of changes.' },
        { id: '2rc8', text: 'Technical: What is a "Block" revision vs a "Sequential" revision?', options: ['Difference in color', 'Letters vs Numbers (e.g., A, B vs 1, 2)', '3D vs 2D', 'None'], correctAnswer: 1, explanation: 'Different companies use different nomenclatures.' },
        { id: '2rc9', text: 'Situational: You found an error but haven\'t released the drawing. Do you need a revision?', options: ['Yes', 'No, pre-release changes (Rev 0 / Dash) are usually not tracked officially', 'Maybe', 'Ask the manager'], correctAnswer: 1, explanation: 'Formal revisions begin after the first official release.' },
        { id: '2rc10', text: 'True or False: Using the correct revision ensures that the factory doesn\'t build the "Old" version of the part.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Revision control prevents extremely costly manufacturing errors.' }
      ]
    }
  },
  {
    id: '2d-standard-library',
    title: 'Standard Part Library',
    quiz: {
      title: 'Standard Library Competency',
      description: 'Test your understanding of standardized part insertion and management.',
      questions: [
        { id: 'sl1', text: 'What is the primary benefit of using the Standard Part Library?', options: ['It makes the file smaller', 'Faster insertion of common bolts/screws', 'It changes the screen color', 'It translates the labels'], correctAnswer: 1, explanation: 'The library stores pre-drawn standard hardware to save time.' },
        { id: 'sl2', text: 'Technical: Which standard is primarily used for KMTI projects in the library?', options: ['ANSI', 'JIS (Japanese Industrial Standards)', 'ISO', 'DIN'], correctAnswer: 1, explanation: 'iCAD often utilizes JIS as the primary standard for industrial parts.' },
        { id: 'sl3', text: 'Situational: You need a M6 bolt with a length of 20mm. Where do you specify this?', options: ['On a piece of paper', 'In the Standard Part Selection Dialog', 'By drawing it manually', 'In the Help menu'], correctAnswer: 1, explanation: 'Parameters like size and length are selected within the library dialog.' },
        { id: 'sl4', text: 'How do you search for a specific component class, like "Ball Bearings"?', options: ['Browse the Category Tree', 'Type "Bearings" in Windows Search', 'Ask a colleague', 'Use the "Measure" tool'], correctAnswer: 0, explanation: 'The library uses a hierarchical tree to categorize parts.' },
        { id: 'sl5', text: 'Technical: What does "Parametric Insertion" mean in the library context?', options: ['The part is a simple image', 'The part geometry respects input numerical values', 'The part is always the same size', 'The part is deleted after use'], correctAnswer: 1, explanation: 'Parametric parts adjust their geometry based on user input.' },
        { id: 'sl6', text: 'Situational: The library does not contain a specific specialized vendor part. What is the best approach?', options: ['Give up', 'Model it manually or import a vendor STEP file', 'Use a random bolt instead', 'Restart the computer'], correctAnswer: 1, explanation: 'If not in the library, manual modeling or importing is required.' },
        { id: 'sl7', text: 'Where is the "Mounting Point" typically located for a screw in the library?', options: ['At the head tip', 'At the start of the thread (under head)', 'In the center of the bolt', 'At the bottom tip'], correctAnswer: 1, explanation: 'Screws are usually placed from the underside of the head.' },
        { id: 'sl8', text: 'Technical: What happens to the "Bill of Materials (BOM)" when you insert a standard part?', options: ['Nothing', 'It automatically adds the part description and quantity', 'It deletes the BOM', 'It requires manual typing'], correctAnswer: 1, explanation: 'Standard parts carry metadata that populates the BOM.' },
        { id: 'sl9', text: 'Situational: You inserted the wrong size bolt. What is the fastest way to fix it?', options: ['Redraw the entire assembly', 'Use the "Change Standard Part" or "Edit" command on the part', 'Undo 100 times', 'Hide the part'], correctAnswer: 1, explanation: 'Most library parts can be edited/resized without re-inserting.' },
        { id: 'sl10', text: 'What does "JIS B 1176" typically represent in the library?', options: ['A phone number', 'Hexagon Socket Head Cap Screw standard', 'A software version', 'A coordinate point'], correctAnswer: 1, explanation: 'B 1176 is the specific JIS standard for socket head screws.' }
      ]
    }
  }
];
