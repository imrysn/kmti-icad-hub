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
      description: 'Advanced assessment of UI navigation, coordinate logic, and data structure.',
      questions: [
        { id: 'q1', text: 'Which UI region is dedicated to providing contextual guidance and accepting values for the "Value > GO" input sequence?', options: ['The Parts List Pane', 'The Item Entry (Message Pane)', 'The Status Bar', 'The View Menu'], correctAnswer: 1, explanation: 'The Item Entry box is the interactive command center for numerical inputs and step-by-step guidance.' },
        { id: 'q2', text: 'In the iCAD workspace hierarchy, what is the primary role of the "Parts List / Tree View"?', options: ['To manage layer colors', 'To display and manage the feature history and component parent-child relationships', 'To calculate the total weight of the model', 'To edit the 2D Drawing template'], correctAnswer: 1, explanation: 'The Tree view tracks every solid operation (holes, fillets, etc.) and assembly component.' },
        { id: 'q3', text: 'What does "RCS" stand for, and how does it function in a modeling context?', options: ['Radial Control System; used for circular arrays', 'Relative Coordinate System; provides a localized 0,0,0 point for flexible modeling', 'Root Command Server; handles network file saves', 'Repeat Command Set; stores common macros'], correctAnswer: 1, explanation: 'Relative Coordinate Systems (RCS) are essential for precisely positioning features relative to specific geometry.' },
        { id: 'q4', text: 'Which color-axis mapping is standard for the default iCAD orientation compass?', options: ['Red=Y, Green=X, Blue=Z', 'Red=Z, Green=Y, Blue=X', 'Red=X, Green=Y, Blue=Z', 'Red=X, Green=Z, Blue=Y'], correctAnswer: 2, explanation: 'iCAD follows the RGB-XYZ convention: Red for X, Green for Y, and Blue for Z.' },
        { id: 'q5', text: 'Where is the "Status Bar" typically located, and what critical real-time data does it provide?', options: ['At the top; showing the active command name', 'Bottom-right; showing live X-Y-Z cursor coordinates and system units', 'Left-side; displaying the material library', 'In the middle; showing rendering progress'], correctAnswer: 1, explanation: 'The Status Bar provides instant feedback on cursor positioning relative to the origin.' },
        { id: 'q6', text: 'According to the module, what is the "ACS" in iCAD modeling?', options: ['Absolute Center Selection', 'Absolute Coordinate System (Fixed Global Zero)', 'Active Command Selector', 'Automated Construction Set'], correctAnswer: 1, explanation: 'ACS is the immutable absolute origin of the iCAD workspace.' },
        { id: 'q7', text: 'Which functional area allows you to toggle the visibility of specific parts or features using "Eye" icons?', options: ['The Toolbar', 'The Parts List / Tree View', 'The File Menu', 'The Command Prompt'], correctAnswer: 1, explanation: 'The Parts List contains visibility toggles for each node in the model hierarchy.' },
        { id: 'q8', text: 'How do you identify which specific step of a command (e.g., "Select Plane") is currently required?', options: ['The mouse cursor turns red', 'Look at the prompt in the Item Entry (Message Pane)', 'Check the Help menu', 'Wait for a pop-up window'], correctAnswer: 1, explanation: 'The prompt text in the Item Entry box tells you exactly what input the software expects next.' },
        { id: 'q9', text: 'What is the significance of the "Command Menu" (Hierarchy Tree) on the left side?', options: ['It is only for 2D drafting', 'It allows for non-destructive editing of previous modeling steps (Rollback)', 'It is a decorative UI element', 'It lists system error logs'], correctAnswer: 1, explanation: 'iCAD is history-based; you can edit any feature in the tree to update the 3D model.' },
        { id: 'q10', text: 'Technical: If the iCAD interface is missing the "Standard Toolbar," where is the secondary path to access "File" and "Edit" commands?', options: ['The Status Bar', 'The Right-Click Menu', 'The Top-level Menu Bar', 'The View Cube'], correctAnswer: 2, explanation: 'The Menu Bar across the top provides a comprehensive textual path to all system commands.' }
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
      description: 'Advanced assessment of command grouping, icon symbology, and toolbar interaction.',
      questions: [
        { id: 't1', text: 'Which specific toolbar group contains industrial primitives and features like "Hole," "Revolve," and "Boolean"?', options: ['The Standard Toolbar', 'The IronCAD/iCAD Feature Toolbar', 'The View Management Toolbar', 'The Inquiry/Analysis Toolbar'], correctAnswer: 1, explanation: 'The Feature Toolbar is the primary source for solid modeling operations.' },
        { id: 't2', text: 'What visual indicator on an iCAD icon signifies a "Fly-out" menu containing hidden related commands?', options: ['A red outline', 'A small black triangle at the bottom-right of the icon', 'The icon appears shaded', 'A blue star icon'], correctAnswer: 1, explanation: 'Black triangles denote sub-menus containing additional specialized tools.' },
        { id: 't3', text: 'To verify the precise distance between two theoretical points in a model, which icon group should be accessed?', options: ['The 2D Drafting Palette', 'The Inquiry / Analysis Toolbar', 'The Material Settings Menu', 'The Layer Control Palette'], correctAnswer: 1, explanation: 'Inquiry tools provide spatial data such as distance, angle, and coordinates.' },
        { id: 't4', text: 'What is the primary role of the "Standard Toolbar" in the KEMCO iCAD workflow?', options: ['It is exclusively for saving files', 'It contains buttons for switching between 3D Modeling and 2D Drawing modes', 'It is only used for changing line colors', 'It controls the mouse sensitivity'], correctAnswer: 1, explanation: 'The Standard Toolbar facilitates environment switching and basic file operations.' },
        { id: 't5', text: 'Where is the specific "Set Material" icon (used for mass calculation) located?', options: ['In the Viewport settings', 'On the Property management / Material Toolbar', 'Inside the Help Menu', 'On the Boolean Toolbar'], correctAnswer: 1, explanation: 'Property-related icons are grouped to manage physical data like material and density.' },
        { id: 't6', text: 'Which icon group allows for the management of visibility using "Sheets" or "Stacked Planes" as a metaphor?', options: ['The Trash Bin', 'The Layer / Level Control Toolbar', 'The Zoom Toolbar', 'The Print Setup Palette'], correctAnswer: 1, explanation: 'The stacked sheets icon represents layer management for clutter control.' },
        { id: 't7', text: 'How can you identify the name and function of a button before committing to a click?', options: ['Right-click to see properties', 'Hover the cursor over the icon to trigger a "Tooltip"', 'Wait for the user manual to load', 'Double-click to activate the help pane'], correctAnswer: 1, explanation: 'Tooltips provide instant feedback on icon functionality.' },
        { id: 't8', text: 'Which toolbar is essential for manipulating the visual state (Wireframe vs. Shaded) of the 3D model?', options: ['The Feature Toolbar', 'The View / Rendering Toolbar', 'The Inquiry Toolbar', 'The Coordinate Entry Bar'], correctAnswer: 1, explanation: 'Visual style toggles determine how solids are rendered on screen.' },
        { id: 't9', text: 'According to the toolbar explorer, where are "Undo" and "Redo" standardly positioned?', options: ['On the Standard Toolbar', 'On the Part Management Toolbar', 'Inside the Material Library', 'On the 2D Annotation Bar'], correctAnswer: 0, explanation: 'Undo/Redo are core system functions located on the standard interface bar.' },
        { id: 't10', text: 'What does the "Eye" symbol within an icon typically represent in iCAD navigation?', options: ['Delete item', 'Visibility / Display Toggles', 'Search function', 'User profile settings'], correctAnswer: 1, explanation: 'The eye icon is universal for toggling the visibility of elements like workplanes or origins.' }
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
      description: 'Understanding orientation logic, plane mapping, and standard axis coloring.',
      questions: [
        { id: 'o1', text: 'According to the iCAD standard mapping, which 2D projection corresponds to the XY Plane (where Z = 0)?', options: ['Top View', 'Front View', 'Side View', 'Isometric View'], correctAnswer: 1, explanation: 'The Front View is standardly mapped to the XY plane in KEMCO iCAD logic.' },
        { id: 'o2', text: 'Technical: Which physical orientation is represented by the XZ Plane (Horizontal plane)?', options: ['Front View', 'Left Side View', 'Top View', 'Bottom View'], correctAnswer: 2, explanation: 'The XZ plane represents the ground/top orientation (Top View).' },
        { id: 'o3', text: 'In the coordinate entry and status bars, what define the numerical state of the "Absolute Origin"?', options: ['(1,1,1)', '(0,0,0)', '(100,100,100)', 'Variable based on the mouse position'], correctAnswer: 1, explanation: 'The Absolute Origin (ACS) is the immutable mathematical zero point.' },
        { id: 'o4', text: 'What is the primary technical advantage of using a "Relative Coordinate System" (RCS)?', options: ['It makes the part smaller', 'It allows for the creation of a temporary zero point for precise local feature placement', 'It changes the color of the Z-axis', 'It deletes the absolute origin'], correctAnswer: 1, explanation: 'RCS is the key to precisely positioning holes and features relative to part faces.' },
        { id: 'o5', text: 'Which color-axis pair represents the vertical vector used for "Side View" orientation (YZ Plane)?', options: ['Red / X-Axis', 'Green / Y-Axis', 'Blue / Z-Axis', 'Cyan / W-Axis'], correctAnswer: 1, explanation: 'The Y-axis (Green) is core to defining the Side View depth in this projection.' },
        { id: 'o6', text: 'When modeling a feature on an angled surface, what is the recommended procedure for ensuring alignment?', options: ['Move the model manually until it looks correct', 'Define an RCS at the required angle and position on the target face', 'Move the Absolute Origin (ACS)', 'Save the file and restart'], correctAnswer: 1, explanation: 'Always preserve the ACS; use RCS for all face-based and angled operations.' },
        { id: 'o7', text: 'In the coordinate toolbar, what does the "Offset Origin" command facilitate?', options: ['Rotating the entire workspace', 'Creating a new reference point at a specific X, Y, Z distance from an existing origin', 'Deleting the part origin', 'Switching to 2D mode'], correctAnswer: 1, explanation: 'Offsetting allows for precise positioning away from a reference edge or point.' },
        { id: 'o8', text: 'Which axis in the iCAD orientation triad is represented by the BLUE line?', options: ['X-Axis', 'Y-Axis', 'Z-Axis', 'Normal Axis'], correctAnswer: 2, explanation: 'The Z-axis is color-coded Blue in the default 3D compass.' },
        { id: 'o9', text: 'Technical: In a symmetrical design, why is placing the origin at the "Center of Symmetry" considered best practice?', options: ['It uses less computer memory', 'It simplifies mirroring operations and assembly alignment', 'It hides the coordinate triad', 'It makes the lines thicker'], correctAnswer: 1, explanation: 'Centering the origin enables easy math for symmetrical features.' },
        { id: 'o10', text: 'What happens to the Absolute Coordinate System (ACS) if you move the 3D part?', options: ['The ACS moves with the part', 'The ACS remains fixed at (0,0,0) global space', 'The ACS is deleted', 'The ACS turns red'], correctAnswer: 1, explanation: 'The ACS is the immutable global zero of the workspace; only components move relative to it.' }
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
      description: 'Understanding command sequencing, input logic, and modification tools.',
      questions: [
        { id: 'bo1', text: 'What is the precise command sequence required to execute a "Linear Primitive" (like a Box) in iCAD?', options: ['Click GO > Select Part', 'Select Coordinate System > Enter Numerical Values in Item Entry > Click GO', 'Enter Value > Click GO', 'Mirror Part > Scale'], correctAnswer: 1, explanation: 'The standard iCAD workflow transition is: Tool Induction -> Target/Point Selection -> Parameter Entry -> GO.' },
        { id: 'bo2', text: 'How do you finalize a multi-stage command sequence or "exit" an active tool loop?', options: ['Press Escape once', 'Right-click the workspace and select "OK/End" or press Enter', 'Close the software', 'Select the Tree View'], correctAnswer: 1, explanation: 'A Right-click or Enter keypress is necessary to confirm the final "GO" state.' },
        { id: 'bo3', text: 'In the "Move" or "Extrude" commands, what is the effect of entering a negative value (e.g., -15mm) into the Item Entry?', options: ['The part is deleted', 'The operation proceeds in the opposite direction of the orientation arrow', 'The color changes to red', 'The system generates an error'], correctAnswer: 1, explanation: 'Negative values signify "Reverse Direction" relative to the active axis.' },
        { id: 'bo4', text: 'What is the primary purpose of the "Entity Selection" filters located on the main toolbar?', options: ['To choose the part color', 'To restrict selection to specific levels (e.g., Face, Edge, or Whole Solid) for precision', 'To delete hidden lines', 'To save keyboard shortcuts'], correctAnswer: 1, explanation: 'Selection filters prevent accidental targeting of unwanted geometric elements.' },
        { id: 'bo5', text: 'Which key must be held to enable the "Multiple Selection" of distinct part faces or components?', options: ['Alt key', 'Ctrl key', 'Shift key', 'Space bar'], correctAnswer: 1, explanation: 'Holding Ctrl allows for the cumulative selection of multiple entities.' },
        { id: 'bo6', text: 'Where are the live, step-by-step instructions (e.g., "Select Center Point") displayed during a command?', options: ['In the Title Bar', 'In the Message Pane (Item Entry area)', 'In the Parts List', 'On the View Cube'], correctAnswer: 1, explanation: 'The lower-left Message Pane is the "flight manual" for every active tool.' },
        { id: 'bo7', text: 'While using the "Rotate" command, what is the technical requirement for defining the rotation path?', options: ['An angle only', 'A specific "Center Point" and a "Rotation Axis"', 'A red part', 'A 2D drawing'], correctAnswer: 1, explanation: 'Precision rotation requires a pivot point and a vector/axis definition.' },
        { id: 'bo8', text: 'What is the "Preview" state signified by in the 3D viewport before clicking GO?', options: ['A finalized solid part', 'A temporary wireframe or shaded outline showing the proposed change', 'A list of coordinates', 'A video tutorial'], correctAnswer: 1, explanation: 'Previews allow you to verify spatial accuracy before permanent application.' },
        { id: 'bo9', text: 'Situational: You inadvertently entered a wrong value in the Item Entry. What is the correct protocol to fix it?', options: ['Undo the finalized command', 'Backspace to correct the value directly in the entry field before clicking GO', 'Redraw the whole part', 'Print the screen'], correctAnswer: 1, explanation: 'Item Entry fields are editable until the GO button or Enter is pressed.' },
        { id: 'bo10', text: 'The "GO" button is physically located in which UI container?', options: ['The Standard Toolbar', 'The Item Entry / Message Pane area', 'The right-click menu only', 'The Help menu'], correctAnswer: 1, explanation: 'The software GO button is integrated with the parameter input field for efficiency.' }
      ]
    }
  },
  {
    id: '2d-3d',
    title: '2D > 3D',
    children: Array.from({ length: 3 }, (_, i) => ({ id: `2d-3d-${i + 1}`, title: `2D > 3D (${i + 1})` })),
    quiz: {
      title: '2D to 3D Conversion Workflow',
      description: 'Understanding the KEMCO methodology for solid generation from orthographic geometry.',
      questions: [
        { id: '2d3d1', text: 'What is the critical first step when transforming 2D drawing lines into a 3D solid?', options: ['Apply color to the 2D view', 'Copy or Project the 2D profile geometry into the active 3D part environment', 'Dimension the 2D drawing', 'Print the drawing to PDF'], correctAnswer: 1, explanation: '3D solids in this workflow are generated directly from projected 2D profiles.' },
        { id: '2d3d2', text: 'In iCAD, what is the role of "Hatching" during the 2D to 3D conversion process?', options: ['It is a decorative aesthetic feature', 'It defines the "Enclosed Regions" that will be transformed into solid material', 'It increases the part weight', 'It displays the center lines'], correctAnswer: 1, explanation: 'Hatch patterns identify the volume boundaries for the solid generation command.' },
        { id: '2d3d3', text: 'Why is it mandatory to use "Neutral Zero" (ACS) when initiating the projection of 2D geometry?', options: ['To save computer memory', 'To ensure perfect origin alignment between the 2D source and 3D result for assembly', 'To make the part appear flat', 'To prevent line weight changes'], correctAnswer: 1, explanation: 'Common origin alignment is vital for assembly integrity and feature tracking.' },
        { id: '2d3d4', text: 'What does "Matching Hatch" signify in the context of advanced 2D-3D modeling?', options: ['The line colors must be identical', 'The sectional hatch on the solid body must correspond to the original 2D drafting hatch', 'Using the same scale for all views', 'Deleting the lines after conversion'], correctAnswer: 1, explanation: 'This ensures that hidden features and cross-sections are documented accurately.' },
        { id: '2d3d5', text: 'Situational: You have a standard 2D Front view. According to iCAD mapping, which plane should this be projected onto?', options: ['The XY Plane', 'The XZ Plane', 'The YZ Plane', 'The Origin Node'], correctAnswer: 0, explanation: 'The Front view is algebraically linked to the XY plane (Forward projection).' },
        { id: '2d3d6', text: 'What is the function of the "Solid" command within the 2D-3D Utility toolkit?', options: ['To verify the material density', 'To generate the 3D volume from the selected profile and hatch regions', 'To change line properties to solid', 'To save the 2D template'], correctAnswer: 1, explanation: 'The Solid command is the final step that calculates and extrudes the 3D volume.' },
        { id: '2d3d7', text: 'Situational: A 2D drawing contains a circle nested inside a closed outer loop. How does iCAD interpret this during extrusion?', options: ['As a solid cylinder only', 'As a solid part with a hollow void (hole) matching the circle', 'As two overlapping solids', 'As a system error'], correctAnswer: 1, explanation: 'Nested closed loops are automatically interpreted as volumetric voids.' },
        { id: '2d3d8', text: 'Why is it discouraged to delete "Source 2D Geometry" immediately after 3D conversion?', options: ['It changes the part color', '2D sketch geometry often maintains an associative link to the 3D features', 'It increases file size', 'It is not possible to delete it'], correctAnswer: 1, explanation: 'Maintaining source links allows for easier design changes and updates.' },
        { id: '2d3d9', text: 'Technical: What does "Projecting" 2D lines actually execute in the software?', options: ['Sends a file to the printer', 'Copies vectors from the 2D drawing into the 3D part sketch environment', 'Changes continuous lines to center lines', 'Calculates the area of a shape'], correctAnswer: 1, explanation: 'Projection converts drafting lines into modeling vectors.' },
        { id: '2d3d10', text: 'Which projection represents the Side View (YZ Plane) in the standard KEMCO setup?', options: ['Red/Blue Plane', 'Green/Blue Plane', 'Red/Green Plane', 'X-Axis only'], correctAnswer: 1, explanation: 'The YZ plane (Green/Blue axes) is the Side View projection.' }
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
      description: 'Assessment of hole standardization, color coding, and parameter entry.',
      questions: [
        { id: 'hd1', text: 'According to the KEMCO iCAD standard, what specific color code is mandated for "Tapped Holes" to ensure visibility within complex assemblies?', options: ['Cyan (Color 7)', 'Green (Color 3)', 'Red (Color 2)', 'White (Color 1)'], correctAnswer: 1, explanation: 'Tapped holes are standardly colored Green in the KEMCO iCAD workflow for immediate identification.' },
        { id: 'hd2', text: 'What is the primary engineering advantage of using the dedicated "Hole" command over a simple "Extrude Cut" for creating holes?', options: ['It renders faster', 'It applies standardized metadata (M-size, Pitch, depth, CB height) automatically for the BOM', 'It makes the solid part indestructible', 'It deletes the source 2D lines automatically'], correctAnswer: 1, explanation: 'The Hole tool is feature-intelligent and carries critical industrial data into the final documentation.' },
        { id: 'hd3', text: 'In a threaded hole specification like "M10 x 1.5", what does the numerical value "1.5" represent?', options: ['The nominal diameter of the drill', 'The Thread Pitch (linear distance between adjacent peaks)', 'The total depth of the tapping', 'The counterbore clearance'], correctAnswer: 1, explanation: 'Pitch is the axial distance between two consecutive thread crests.' },
        { id: 'hd4', text: 'What defines a "Blind Hole" within the iCAD Hole Dialog settings?', options: ['A hole that exits through the opposite face of the part', 'A hole that stops at a specific depth value within the solid', 'An invisible hole meant for reference only', 'A hole with no diameter property'], correctAnswer: 1, explanation: 'Blind holes stop at a pre-calculated depth before exiting the material.' },
        { id: 'hd5', text: 'When a design requires a flat-bottomed recess to allow a bolt head to sit flush or below the surface, which sub-feature must be configured?', options: ['Countersink (CS)', 'Counterbore (CB)', 'Reamed Finish', 'Tapered Thread'], correctAnswer: 1, explanation: 'Counterbores (CB) provide the necessary cylindrical recess for socket-head cap screws.' },
        { id: 'hd6', text: 'To achieve a precisely fitted hole for a dowel pin (e.g., H7 tolerance), which finishing operation is required?', options: ['Standard Drilling', 'Reaming', 'Surface Painting', 'Chamfering'], correctAnswer: 1, explanation: 'Reaming provides the high-precision dimensional accuracy required for fits and pivots.' },
        { id: 'hd7', text: 'Which parameter in the Hole command determines the depth of the cylindrical shoulder before the drill point angle is calculated?', options: ['Total Depth', 'Nominal Hole Depth', 'Tip Angle', 'CB Depth'], correctAnswer: 1, explanation: 'The Nominal Depth dictates the usable cylindrical length of the hole.' },
        { id: 'hd8', text: 'Technical: How do you identify the "Open Side" of a hole feature during the placement step?', options: ['By the position of the orientation arrow in the viewport', 'By the color of the part', 'By checking the layer list', 'It is always the Top View'], correctAnswer: 0, explanation: 'The orientation arrow indicates the face and direction from which the hole enters the solid.' },
        { id: 'hd9', text: 'Situational: You want to place a hole exactly at the center of a circular face. Which snap tool is most appropriate?', options: ['End Point', 'Center/Arc Center', 'Grid Snap', 'Random Click'], correctAnswer: 1, explanation: 'Center snapping ensures absolute concentricity with existing circular geometry.' },
        { id: 'hd10', text: 'What is "Tapping" as referred to in the context of Hole Details?', options: ['Painting a part', 'The machining process of cutting internal threads', 'Deleting a hole', 'Calculating the weight'], correctAnswer: 1, explanation: 'Tapping (Threaded Holes) is the creation of helical grooves for screw engagement.' }
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
      description: 'Understanding logical solid addition, subtraction, and intersection.',
      questions: [
        { id: 'bl1', text: 'In a Boolean subtraction operation, how is the "Target" entity distinguished from the "Tool" entity?', options: ['The Target is the cutting geometry', 'The Target is the primary body being modified/cut into', 'The Target is always red', 'The Target is the 2D drawing'], correctAnswer: 1, explanation: 'The Target is the destination solid; the Tool is the geometry that defines the cut.' },
        { id: 'bl2', text: 'What is the resulting geometry of an "Intersection" operation between two overlapping solids?', options: ['Only the unique parts are kept', 'Only the shared, common volume of both entities is retained', 'Both entities are merged into a single body', 'All entities are deleted'], correctAnswer: 1, explanation: 'Intersection calculates the logical AND of two volumes.' },
        { id: 'bl3', text: 'According to the manual, what is the role of the "Subtract" command in mold/die design?', options: ['To increase the part weight', 'To create a matching cavity in one solid using another solid as the master "Tool"', 'To change line properties', 'To print the BOM'], correctAnswer: 1, explanation: 'Subtraction is the standard method for creating perfectly matching pockets and cavities.' },
        { id: 'bl4', text: 'Which toolbar contains the primary Union, Subtract, and Intersect commands for solid manipulation?', options: ['The View Management Toolbar', 'The IronCAD/iCAD Feature Toolbar', 'The Standard Toolbar', 'The Status Bar'], correctAnswer: 1, explanation: 'Boolean tools are fundamental solid features located on the feature bar.' },
        { id: 'bl5', text: 'What is the likely cause of an "Invalid Body" error during a Boolean operation?', options: ['The part is too small', 'Geometric errors prevent calculation (e.g., self-intersecting hulls or non-manifold edges)', 'The layer is locked', 'The color is not set'], correctAnswer: 1, explanation: 'Complex logical math requires clean, watertight geometry to produce a result.' },
        { id: 'bl6', text: 'Technical: What happens to the entities in some intersection workflows if the "Keep Source" option is checked?', options: ['They are permanently deleted', 'The original Tool and Target entities are retained for further use', 'They turn transparent', 'They are saved as a separate file'], correctAnswer: 1, explanation: 'Retaining sources allows for the iterative construction of complex parts.' },
        { id: 'bl7', text: 'What defines the "Union" (Add) Boolean operation?', options: ['Merging two independent volumes into a single continuous solid body', 'Deleting the intersection', 'Rotating two parts', 'Dividing a part in half'], correctAnswer: 0, explanation: 'Union combines multiple bodies into a unified geometric entity.' },
        { id: 'bl8', text: 'Situational: You have two overlapping boxes. After a "Union," how many objects exist in the Parts List?', options: ['Two', 'One (merged solid)', 'Three', 'Zero'], correctAnswer: 1, explanation: 'The Union operation consolidates independent nodes into a single feature.' },
        { id: 'bl9', text: 'Technical: Can you perform a Boolean operation between components on different layers?', options: ['No, layers prevent logical operations', 'Yes, layer placement does not affect geometric logic', 'Only if the layer color is white', 'Only in 2D mode'], correctAnswer: 1, explanation: 'Layers are for organizational visibility; Booleans operate on the 3D geometry regardless of layer.' },
        { id: 'bl10', text: 'What is a "Reverse Boolean" (Subtract with Tool Retention) useful for?', options: ['Deleting mistakes', 'Maintaining the master die while creating a pocket in a part', 'Changing the coordinate system', 'Increasing the scale'], correctAnswer: 1, explanation: 'This allows for the master geometry to survive the logical cut operation.' }
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
      description: 'Understanding hierarchical structures, metadata association, and assembly logic.',
      questions: [
        { id: 'c1', text: 'What is the primary operational difference between a generic "Solid Body" and a defined "Component" in the iCAD hierarchy?', options: ['Bodies are 3D, Components are 2D', 'Components can possess unique independent metadata (Name, Material, BOM Role) and their own local origins', 'Components are always red', 'There is no difference'], correctAnswer: 1, explanation: 'Components are the fundamental unit for Bill of Materials (BOM) management and assembly organization.' },
        { id: 'c2', text: 'In the iCAD workspace, what does the "Active Component" state signify?', options: ['A part that is moving', 'The specific node currently targeted for edits; other geometry may appear dimmed or transparent for context', 'A part that has been deleted', 'A part that is saved to the cloud'], correctAnswer: 1, explanation: 'Setting an active component focuses the modeling engine on a specific solid in the tree.' },
        { id: 'c3', text: 'Which tool is utilized to identify physical clashes or volume overlaps between distinct components in an assembly?', options: ['Inquiry Distance', 'Interference Check', 'Material Setting', 'Layer Control'], correctAnswer: 1, explanation: 'Interference checks are critical for verifying the physical assembly feasibility of parts.' },
        { id: 'c4', text: 'How do you rename a component to ensure the update propagates correctly to the technical Bill of Materials?', options: ['Type on the 3D viewport', 'Modify the "Part Name" property in the Parts List / Scene Browser / Property Sheet', 'Rename the Windows filename', 'Print the drawing'], correctAnswer: 1, explanation: 'Metadata management is integrated into the hierarchical tree and property dialogs.' },
        { id: 'c5', text: 'Technical: While moving a component, how can you restrict the transformation to a single cardinal axis?', options: ['By closing the tree view', 'By selecting the specific axis handle (Red, Green, or Blue) or entering a single coordinate value', 'By holding the space bar', 'It cannot be restricted'], correctAnswer: 1, explanation: 'Precise movement requires locking the DOF (Degree of Freedom) via input or handles.' },
        { id: 'c6', text: 'What is the function of the "Eye" icons located next to component names in the Parts List?', options: ['To delete the part', 'To toggle the Visibility (Show/Hide) of the component in the 3D viewport', 'To change the color', 'To assign hardware'], correctAnswer: 1, explanation: 'Visibility toggles allow for effective workspace management in dense assemblies.' },
        { id: 'c7', text: 'Situational: Two components are currently perfectly aligned. What iCAD feature allows them to be treated as a single sub-assembly?', options: ['Painting them the same color', 'Nesting them under a "Parent" assembly node in the hierarchical tree', 'Deleting one part', 'Locking the layer'], correctAnswer: 1, explanation: 'Parent-child hierarchy defines the logical structure of mechanical assemblies.' },
        { id: 'c8', text: 'Where can a trainee find the cumulative list of all solids and their feature histories?', options: ['The Status Bar', 'The Parts List / Tree View / Scene Browser', 'The Standard Toolbar', 'The Help Menu'], correctAnswer: 1, explanation: 'The hierarchical tree is the source of truth for the model architecture.' },
        { id: 'c9', text: 'Technical: What is an "Instanced" or "Linked" copy of a component?', options: ['A 2D projection', 'A copy that maintains a live link; changes to the master update all instances', 'A dead copy that cannot be edited', 'A copy with no weight'], correctAnswer: 1, explanation: 'Linking streamlines the management of repeated hardware across an assembly.' },
        { id: 'c10', text: 'How is the "Center of Gravity" (CG) of an assembly primarily calculated in iCAD?', options: ['By visual estimation', 'Aggregated from the physical properties of all individual components and their materials', 'It is not calculated', 'By the size of the box'], correctAnswer: 1, explanation: 'iCAD uses volumetric and density data for precise mass property analysis.' }
      ]
    }
  },
  {
    id: 'fairing',
    title: 'Fairing',
    content: ['Chamfer', 'Fillet', 'Shell', 'rounding corners', 'hollowing', 'wall thickness', 'chamfer length', 'fillet radius', 'edge selection'],
    children: [
      { id: 'fairing', title: 'Chamfer, Fillet, Shell', content: ['beveled edges', 'rounded edges', 'hollow solid'] }
    ],
    quiz: {
      title: 'Fairing & Advanced Shaping',
      description: 'Mastering smooth transitions, curvature continuity, and hollow solids.',
      questions: [
        { id: 'f1', text: 'What is the primary function of the "Shell" operation in iCAD modeling?', options: ['Painting the part color', 'Hollowing out a solid body while maintaining a specific wall thickness', 'Deleting sharp edges', 'Scaling the model'], correctAnswer: 1, explanation: 'Shelling creates a volumetric cavity inside an existing solid.' },
        { id: 'f2', text: 'According to the iCAD manual, what is the specific interaction sequence required to finalize the "Shell" command?', options: ['Press Escape twice', 'Perform a "Double GO" (Click the GO button or Enter two times)', 'Save and restart the software', 'Select the Tree View'], correctAnswer: 1, explanation: 'Some complex modeling finalizations (like Shell) require a confirmed double-execution state.' },
        { id: 'f3', text: 'To create a hollow box with one side missing (open), which user action is required during the Shell command?', options: ['Delete the face using the Subtract tool', 'Select the desired face to be the "Open Surface" within the Shell dialog/prompt', 'Draw thin walls manually in 2D', 'It is not possible in iCAD'], correctAnswer: 1, explanation: 'Selecting an "Open Face" instructs the engine to remove that specific surface from the hull.' },
        { id: 'f4', text: 'In the context of Fairing, what distinguishes "G2 Continuity" (Curvature) from standard "G1" (Tangency)?', options: ['G2 matches color, G1 matches shape', 'G2 ensures that both the slope AND the rate of curvature change match at the join for invisible transitions', 'G2 is for 2D lines only', 'G1 is smoother than G2'], correctAnswer: 1, explanation: 'G2 represents the highest aesthetic surface quality for transition smoothing.' },
        { id: 'f5', text: 'Which tool is utilized to "break" a sharp 90-degree corner with a CURVED blend?', options: ['Chamfer', 'Fillet', 'Rib', 'Shell'], correctAnswer: 1, explanation: 'Fillets produce rounded transitions on sharp geometric edges.' },
        { id: 'f6', text: 'What happens if the radius value of a Fillet exceeds the space available on the target face?', options: ['The part gets bigger', 'Calculation fails or produces a geometric error (Self-intersection)', 'The color turns white', 'The fillet is ignored'], correctAnswer: 1, explanation: 'Geometric blends must have sufficient "footprint" on the adjacent faces to resolve.' },
        { id: 'f7', text: 'Technical: What is a "Variable Radius Fillet" used for?', options: ['A fillet that is broken', 'Creating a transition where the radius size changes dynamically along the length of an edge', 'A fixed-size corner', 'A 2D circle'], correctAnswer: 1, explanation: 'Variable fillets allow for ergonomic and aesthetic design transitions.' },
        { id: 'f8', text: 'What is a "Chamfer" operation?', options: ['A rounded edge', 'A flat, beveled cut on a sharp edge defined by length and/or angle', 'A hollow hole', 'A name change'], correctAnswer: 1, explanation: 'Chamfers provide flat transitions, often for assembly lead-ins or safety.' },
        { id: 'f9', text: 'Technical: Why is "Fairing" especially critical in automotive surface design?', options: ['To reduce the file size', 'To ensure smooth highlight reflection (Zeebra stripes) and aerodynamic flow', 'To make parts heavier', 'To measure length'], correctAnswer: 1, explanation: 'Surface quality determines the final visual appearance of manufactured parts.' },
        { id: 'f10', text: 'True or False: In iCAD, Shelling is a history-based feature that can be edited later to update wall thickness.', options: ['True', 'False'], correctAnswer: 0, explanation: 'iCAD is parametric; feature properties remain editable in the tree.' }
      ]
    }
  },
  {
    id: '3d-part',
    title: '3D Part',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `3d-part-${i + 1}`, title: `3D Part (${i + 1})` })),
    quiz: {
      title: '3D Part Management',
      description: 'Understanding naming protocols, synchronization, and modification history.',
      questions: [
        { id: '3dp1', text: 'Through which specific UI path is the "3D Part Name" of an existing component standardly modified?', options: ['Keyboard shortcut Ctrl+N', 'Right-click on the component in the viewport and select "Change 3D Part Name"', 'Typing on the Status Bar', 'Deleting the file and saving as a new name'], correctAnswer: 1, explanation: 'Naming protocols are accessible via the contextual modeling menu.' },
        { id: '3dp2', text: 'When the software prompts "Update 3D Part Name?" after a modification, which system component is primarily being synchronized?', options: ['The part color scheme', 'The Bill of Materials (BOM) and technical documentation properties', 'The Windows XP system date', 'The software login credentials'], correctAnswer: 1, explanation: 'Consistency between the 3D model name and the BOM metadata is critical for procurement.' },
        { id: '3dp3', text: 'In mechanical part design, what does a "Draft Angle" facilitate?', options: ['A hand-drawn sketch', 'Tapered surfaces that allow a manufactured part to exit a mold or die cavity', 'The speed of the 3D rotation', 'The resolution of the screen'], correctAnswer: 1, explanation: 'Draft is a manufacturing-readiness feature for cast or molded parts.' },
        { id: '3dp4', text: 'Which method is most efficient for creating 12 identical hole features arranged around a central axis?', options: ['Drawing each circle one by one', 'Utilizing a "Circular Feature Pattern" (Array)', 'Copying and pasting coordinates manually', 'Mirroring the whole part twice'], correctAnswer: 1, explanation: 'Patterning automates the duplication of features based on mathematical rules.' },
        { id: '3dp5', text: 'What is the "Rollback" function used for in history-based (Parametric) modeling?', options: ['Deleting all work performed today', 'Moving the "design time" marker back in the history tree to insert or edit earlier features', 'Rotating the view to the back of the part', 'Saving the file as a PDF'], correctAnswer: 1, explanation: 'Rollback allows for non-destructive edits to the middle of the design history.' },
        { id: '3dp6', text: 'What is "Propagating" a name change in the context of an assembly?', options: ['Deleting the component', 'Automatically updating the name across the Parts List and BOM tree to ensure data integrity', 'Printing the assembly list', 'Changing the color to white'], correctAnswer: 1, explanation: 'Propagation ensures that all references to the part remain synchronized.' },
        { id: '3dp7', text: 'Situational: A design requires 10 variations of the same base part. What is the most efficient iCAD approach?', options: ['Making 10 separate files from scratch', 'Using "Configurations" or managing the part history to generate variations', 'Printing 10 copies', 'Painting them different colors'], correctAnswer: 1, explanation: 'Parametric modeling allows for variants built from one master logic.' },
        { id: '3dp8', text: 'Technical: Does a 3D Part Name in the hierarchy always have to be the same as the Windows file name?', options: ['Yes, always', 'No, a single file can contain multiple parts with distinct individual names', 'Only for red parts', 'Only in 2D mode'], correctAnswer: 1, explanation: 'iCAD supports a multi-part environment within a single project file.' },
        { id: '3dp9', text: 'Where can a trainee confirm the finalized 3D Part Name before submitting their work?', options: ['The File menu alone', 'The Parts List / Scene Browser / Property Sheet', 'The message pane instructions', 'On the printed paper'], correctAnswer: 1, explanation: 'The Scene Browser is the definitive source for component identification.' },
        { id: '3dp10', text: 'What is a "Mirror" operation used for?', options: ['To make the part look shiny', 'Reflecting selected geometry across a symmetry plane to create a duplicate side', 'Rotating the part 360 degrees', 'Increasing the volume of the part'], correctAnswer: 1, explanation: 'Mirroring ensures perfect symmetry between left/right or top/bottom components.' }
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
      title: 'Structural Properties & BOM Metadata',
      description: 'Mastering color coding, naming conventions, and documentation properties.',
      questions: [
        { id: 'pr1', text: 'In the KEMCO iCAD standard, what does a numerical code like "3" signify when entered in the "Color" property field?', options: ['Material Level 3', 'Green (Color 3)', 'White (Color 1)', 'Layer 3'], correctAnswer: 1, explanation: 'iCAD uses indexed color codes; 1=White, 2=Red, 3=Green, etc.' },
        { id: 'pr2', text: 'What is the resulting part color if the "Color Code" field is left completely blank in the property sheet?', options: ['Transparent', 'White (Default Color 1)', 'Black', 'Rainbow'], correctAnswer: 1, explanation: 'The system defaults to Color 1 (White) if no override is specified.' },
        { id: 'pr3', text: 'Which specific field in the Property Sheet dictates the text that appears in the "Note" column of the final Bill of Materials?', options: ['Part Description', 'Part Note / BOM Note', 'Revision Field', 'Filename'], correctAnswer: 1, explanation: 'The Note field is reserved for specific technical instructions in the BOM.' },
        { id: 'pr4', text: 'How is the "Revision" property (e.g., A, B, C) standardly managed in the iCAD parts list?', options: ['By deleting the part and redrawing', 'Entering the value in the dedicated "Revision" field of the Part Property dialog', 'Changing the layer color', 'It cannot be tracked'], correctAnswer: 1, explanation: 'Version control of individual parts is handled via integrated metadata fields.' },
        { id: 'pr5', text: 'Technical: Does the Part Property layout allow for unique "Transparency" or "Opacity" settings for individual solids?', options: ['No, all parts are solid', 'Yes, adjustable via the visual tab in properties (0-100%)', 'Only for glass materials', 'Only in 2D mode'], correctAnswer: 1, explanation: 'Visual attributes like transparency are part of the component property definition.' },
        { id: 'pr6', text: 'Where can a trainee "Batch Update" the properties of multiple components simultaneously?', options: ['The Parts List multi-selection / Attribute Manager', 'Inside the Hole command', 'The Status bar', 'The Windows Registry'], correctAnswer: 0, explanation: 'Bulk editing is most efficient through the hierarchical tree view.' },
        { id: 'pr7', text: 'Situational: The BOM is showing "???" for a part material. What property is missing?', options: ['Part Name', 'Material Name from the standard library', 'Revision code', 'Drawing scale'], correctAnswer: 1, explanation: 'The BOM extracts data from the "Material" property field.' },
        { id: 'pr8', text: 'Technical: Is the "Specific Gravity" (SG) editable directly within the Part Property sheet?', options: ['No, it must be set in 2D', 'Yes, if the material is set to "User Defined" or directly overridden', 'Only for steel', 'Only for holes'], correctAnswer: 1, explanation: 'Physical data can be manually tuned for non-standard vendor parts.' },
        { id: 'pr9', text: 'How does iCAD notify you of unsaved property changes in the property dialog?', options: ['A red light', 'Usually a prompt on exit or visual highlights on modified fields', 'It doesn\'t', 'It deletes the file'], correctAnswer: 1, explanation: 'iCAD tracks the "dirty" state of attribute fields.' },
        { id: 'pr10', text: 'True or False: Part properties like "Part Name" and "Material" are automatically extracted when generating a 2D drawing Title Block.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Bi-directional data linking ensures consistency between the 3D model and 2D documentation.' }
      ]
    }
  },
  {
    id: 'annotation',
    title: 'Annotation',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `annotation-${i + 1}`, title: `Annotation (${i + 1})` })),
    quiz: {
      title: '3D Annotation & MBD Principles',
      description: 'Understanding technical labeling and Product Manufacturing Information (PMI).',
      questions: [
        { id: 'an1', text: 'What is the primary engineering purpose of "3D Annotations" in iCAD modeling?', options: ['To hide errors', 'To document size, tolerances, and technical notes directly on the 3D geometry (PMI)', 'To change the part size', 'To make the desktop look cluttered'], correctAnswer: 1, explanation: '3D annotations facilitate Model-Based Definition, reducing reliance on 2D paper drawings.' },
        { id: 'an2', text: 'How does a trainee ensure that 3D text remains legible and properly oriented regardless of model rotation?', options: ['By rotating the monitor', 'By placing the annotation on a defined "Annotation Plane" (e.g., XY, XZ, or YZ)', 'By zooming in very close', 'Text is always 3D'], correctAnswer: 1, explanation: 'Defining a reference plane ensures annotations face the user from standard viewpoints.' },
        { id: 'an3', text: 'Which tool is appropriate for adding a technical note specifically linked to a distinct face or edge?', options: ['Paint tool', 'Leader Note / 3D Label', 'Drawing a line', 'Scale tool'], correctAnswer: 1, explanation: 'Leaders connect alphanumeric data to physical geometric features.' },
        { id: 'an4', text: 'Situational: You need to specify a +/- 0.1mm tolerance on a 3D dimension. Where is this configured?', options: ['Typing it on a post-it note', 'Editing the Dimension Property and defining Upper/Lower Limits', 'Calculating it in Excel', 'It cannot be done in 3D'], correctAnswer: 1, explanation: 'iCAD annotations support full tolerance metadata for manufacturing.' },
        { id: 'an5', text: 'What is the standard color for "Part Labels" in the KEMCO 3D environment based on the lessons?', options: ['White (1)', 'Yellow (4)', 'Red (2)', 'Blue (5)'], correctAnswer: 1, explanation: 'Yellow is the standard contrasting color for technical labels in the iCAD workspace.' },
        { id: 'an6', text: 'Which command is utilized to "hide" all 3D annotations to declutter the workspace for modeling?', options: ['Delete key', 'Annotation Visibility Toggle (Eye icon in the Tree/Annotation Manager)', 'Print Part', 'Save As'], correctAnswer: 1, explanation: 'Visibility management allows for focused design work without permanent deletion.' },
        { id: 'an7', text: 'Technical: What is "Propagating" 3D annotations in the 2D drawing workflow?', options: ['Deleting the 3D data', 'Automatically importing the 3D label/dimension into the 2D orthographic view', 'Printing in red', 'Scaling the labels'], correctAnswer: 1, explanation: 'PMI reuse ensures that technical notes defined in 3D are consistent in 2D sheets.' },
        { id: 'an8', text: 'Can a 3D annotation be dynamically linked to display the "Part Weight" or "Material Name"?', options: ['No, text must be manual', 'Yes, through the use of mapped property attributes in the labeling tool', 'Only for holes', 'Only in 2D'], correctAnswer: 1, explanation: 'Dynamic linking ensures the label updates if the part properties change.' },
        { id: 'an9', text: 'When measuring a distance in 3D for annotation, which snap tool is most reliable for face-to-face distance?', options: ['Grid Snap', 'Vertical / Distance Snap (Measuring the normal between two parallel surfaces)', 'Random click', 'Center of mass'], correctAnswer: 1, explanation: 'Planar measurements require snapping to surface normals for accuracy.' },
        { id: 'an10', text: 'True or False: Modern 3D PMI (Product Manufacturing Information) is a valid legal manufacturing requirement in MBD workflows.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Industry is shifting toward 3D models as the primary source of truth for manufacturing.' }
      ]
    }
  },
  {
    id: 'interference', title: 'Interference Check', quiz: {
      title: 'Advanced Clash Detection & Logic',
      description: 'Ensuring physical assembly feasibility through volumetric analysis.',
      questions: [
        { id: 'ic1', text: 'What is the primary function of the "Interference Check" tool in an iCAD assembly?', options: ['To measure the file size', 'To identify physical volume overlaps where two parts occupy the same space', 'To change part colors', 'To rotate the view'], correctAnswer: 1, explanation: 'Clash detection prevents manufacturing errors by finding contact/overlap issues before production.' },
        { id: 'ic2', text: 'After running an interference check, how does iCAD visually differentiate the clashing region?', options: ['It deletes the parts', 'It highlights the overlapping volume in a distinct color (usually Red)', 'It turns the monitor off', 'It saves a PDF'], correctAnswer: 1, explanation: 'Visual highlighting allows the designer to locate the geometric conflict immediately.' },
        { id: 'ic3', text: 'Why is it critical to perform an interference check before finalizing a mold or die design?', options: ['To reduce the material cost', 'To ensure that components (like ejector pins or cooling lines) do not physically collide', 'To make the drawing look better', 'To speed up the PC'], correctAnswer: 1, explanation: 'Internal clashes in complex tooling can lead to catastrophic hardware damage if not rectified.' },
        { id: 'ic4', text: 'Technical: What "Zero Clearance" or "Contact" mean in the result list?', options: ['The parts are 1 meter apart', 'The parts are perfectly touching at their faces with 0.000mm overlap', 'The part was never drawn', 'The file is empty'], correctAnswer: 1, explanation: 'Face-to-face contact is often acceptable, while volumetric overlap (clash) is an error.' },
        { id: 'ic5', text: 'Situational: The report shows "No Interference." What does this mathematically confirm?', options: ['The part is missing', 'Every component in the check occupies its own unique, non-overlapping spatial volume', 'The software is not working', 'The color is correct'], correctAnswer: 1, explanation: 'Clearance verification is the final gate for assembly validation.' },
        { id: 'ic6', text: 'How do you identify a "hidden" clash inside a large assembly that is not visible from the viewport?', options: ['Guess the location', 'Utilize "Section View" or "Clipping Plane" along with the interference report', 'Print the drawing', 'Delete the outer part'], correctAnswer: 1, explanation: 'Sectioning tools reveal internal clashing geometry without damaging the assembly.' },
        { id: 'ic7', text: 'Technical: Can you perform a "Global" interference check on the entire assembly tree?', options: ['No, search is limited to two parts', 'Yes, Global check analyzes every component in the scene against all others', 'Only if they are white', 'Only for holes'], correctAnswer: 1, explanation: 'Automated global checks are the most efficient way to scrub an entire layout for errors.' },
        { id: 'ic8', text: 'Situational: A small interference is detected between a "Bolt" and a "Nut." Why is this often ignored or filtered?', options: ['Bolts are always wrong', 'Threads are often modeled symbolically; nominal overlap is expected for hardware in CAD', 'The color is red', 'The weight is too high'], correctAnswer: 1, explanation: 'High-performance CAD often simplifies threads, resulting in false-positive clashes.' }
      ]
    },
  },
  {
    id: 'purchase-parts',
    title: '3D Purchase Parts',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `purchase-parts-${i + 1}`, title: `3D Purchase Parts (${i + 1})` })),
    quiz: {
      title: '3D Purchase Parts & STEP Handling',
      description: 'Understanding manual-based workflows for vendor data and external solids.',
      questions: [
        { id: 'pp1', text: 'Which industry-standard neutral 3D format is primary for importing Purchase Parts into iCAD?', options: ['.txt', '.STEP / .STP', '.pdf', '.docx'], correctAnswer: 1, explanation: 'STEP is the universal standard for CAD-to-CAD geometric exchange.' },
        { id: 'pp2', text: 'What is defined as a "Dumb Solid" in the context of an imported component?', options: ['A part that is broken', 'An imported solid possessing geometry but no editable feature history from the source CAD', 'A very small part', 'A file error'], correctAnswer: 1, explanation: 'Imported parts are "frozen" geometry that can be used for assembly but not parametric redesign.' },
        { id: 'pp3', text: 'Situational: You have imported a complex vendor motor and the assembly rotation is now sluggish. What is the most effective iCAD remedy?', options: ['Delete the motor', 'Create a "Simplified Representation" or remove non-critical internal details', 'Paint the part red', 'Restart the PC'], correctAnswer: 1, explanation: 'Reducing geometric density (polygons/faces) optimizes the modeling environment.' },
        { id: 'pp4', text: 'Can a trainee assign a local "3D Part Name" and "Material" to an imported STEP file?', options: ['No, it is locked', 'Yes, imported solids should be named according to KEMCO standards for the BOM', 'Only if the original vendor allow it', 'Only in 2D'], correctAnswer: 1, explanation: 'Every object in the iCAD scene browser requires valid metadata for procurement.' },
        { id: 'pp5', text: 'Technical: What is the risk of using external vendor data without verifying its "Origin" first?', options: ['The file size increases', 'The part may be positioned at a random, inconvenient location far from the assembly center', 'The color turns white', 'The part might disappear'], correctAnswer: 1, explanation: 'Vendor CAD often uses proprietary origins that don\'t match the local project datum.' },
        { id: 'pp6', text: 'Technical: What does "Healing" or "Stitching" refer to during the import of a Parasolid or STEP file?', options: ['Painting the part', 'Repairing broken or missing surface faces resulting from translation errors', 'Saving it twice', 'Deleting it'], correctAnswer: 1, explanation: 'Geometric kernels sometimes disagree on surface continuity; stitching creates a watertight solid.' },
        { id: 'pp7', text: 'Why is it standard practice to put all Purchase Parts on a dedicated "Hardware" or "Purchase" layer?', options: ['To make them look pretty', 'To efficiently toggle visibility and manage assembly complexity in the 2D drawing', 'To delete them faster', 'To hide mistakes'], correctAnswer: 1, explanation: 'Layer-based isolation is critical for technical drawing clarity.' },
        { id: 'pp8', text: 'True or False: Using the KEMCO purchase part library is mandatory to ensure the correct BOM data is captured automatically.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Standardization prevents manual entry errors in the supply chain.' },
        { id: 'pp9', text: 'Situational: An imported solid comes in at the wrong scale (e.g., 25.4x too large). Which tool corrects this?', options: ['Hole tool', 'Property Scale / Resize Tool', 'Move tool', 'Mirror'], correctAnswer: 1, explanation: 'Scaling corrections are often needed when transitioning between Imperial and Metric data.' },
        { id: 'pp10', text: 'Technical: What is a ".x_t" file extension?', options: ['Excel Text', 'Parasolid Text Kernel file', 'Word Document', '2D Line Data'], correctAnswer: 1, explanation: 'Parasolid (.x_t) is one of the highest-fidelity 3D kernels compatible with iCAD.' }
      ]
    }
  },
  {
    id: 'parasolid', // cspell:disable-line
    title: 'Loading Parasolid', // cspell:disable-line
    children: Array.from({ length: 2 }, (_, i) => ({ id: `parasolid-${i + 1}`, title: `Loading Parasolid (${i + 1})` })), // cspell:disable-line
    quiz: {
      title: 'Parasolid Kernel Logic',
      description: 'Understanding the mathematical engine driving the iCAD workspace.',
      questions: [
        { id: 'ps1', text: 'What is the nature of "Parasolid" in the CAD industry?', options: ['A material type', 'The core mathematical 3D modeling kernel used by iCAD to calculate geometry', 'A 2D line manager', 'A cloud storage system'], correctAnswer: 1, explanation: 'Parasolid is the geometric engine driving leading industrial CAD systems.' },
        { id: 'ps2', text: 'Technical: In the iCAD file system, what is the file extension for a Parasolid "Binary" file?', options: ['.x_t (Text)', '.x_b (Binary)', '.dwg', '.pdf'], correctAnswer: 1, explanation: '.x_b is the compact binary representation of Parasolid data.' },
        { id: 'ps3', text: 'What is the primary advantage of the ".x_t" (Parasolid Text) format?', options: ['It is colorful', 'It is a human-readable text format ensuring maximum cross-platform compatibility', 'It is a video file', 'It is for 2D line work only'], correctAnswer: 1, explanation: 'Text-based kernels are robust for inter-system data transfer.' },
        { id: 'ps4', text: 'Technical: When you export a part as Parasolid, what happens to the "Feature History" (Tree)?', options: ['It is saved perfectly for the customer', 'It is stripped away, leaving only the "B-Rep" solid geometry (Dumb Solid)', 'It turns red', 'It becomes a 2D drawing'], correctAnswer: 1, explanation: 'Kernels transfer current geometric states, not the recipes/features used to create them.' },
        { id: 'ps5', text: 'Situational: An imported Parasolid body appears with "Stray Surfaces" or gaps. Which operation restores it to a solid?', options: ['Measure tool', 'Sew / Stitch / Heal Surface', 'Painting it green', 'Deleting it'], correctAnswer: 1, explanation: 'Sewing joins individual faces into a watertight volumetric solid.' },
        { id: 'ps6', text: 'True or False: iCAD can both Import and Export Parasolid data to facilitate collaborative engineering.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Full industry-standard protocol support is a KEMCO requirement.' },
        { id: 'ps7', text: 'Technical: Is Parasolid more frequently utilized in 2D Drafting or 3D Solid Modeling?', options: ['2D only', 'Primarily 3D Solid Modeling', 'Both exactly equally', 'Neither'], correctAnswer: 1, explanation: 'Parasolid is a volumetric 3D b-rep kernel.' },
        { id: 'ps8', text: 'Where is the Parasolid Export/Import utility standardly located?', options: ['Inside the Color menu', 'File > Open/Import and File > Save As/Export', 'In the Help menu', 'On the status bar'], correctAnswer: 1, explanation: 'Data translation is managed through the main file I/O operations.' },
        { id: 'ps9', text: 'What does "B-Rep" stand for in the context of Parasolid data?', options: ['Broken Representation', 'Boundary Representation (defining solids by their surface limits)', 'Big Repository', 'Binary Repeat'], correctAnswer: 1, explanation: 'Parasolid uses surface boundaries to define enclosed volumes.' },
        { id: 'ps10', text: 'True or False: Maintaining the original Parasolid kernel data ensures the highest mathematical precision when moving between iCAD and IronCAD.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Using the same kernel eliminates translation approximation errors.' }
      ]
    }
  },
  {
    id: 'op-sample',
    title: 'Operation Sample',
    children: Array.from({ length: 5 }, (_, i) => ({ id: `op-sample-${i + 1}`, title: `Operation Sample (${i + 1})` })),
    quiz: {
      title: 'Full Workflow Integration Sample',
      description: 'Applying manual-based workflows to finished industrial assemblies.',
      questions: [
        { id: 'os1', text: 'According to the Operation Sample manual, what is the critical first step when starting a new machine component?', options: ['Choose a pretty color', 'Confirm the Global Origin (0,0,0) placement and the primary modeling plane', 'Print the drawing', 'Save the file as a PDF'], correctAnswer: 1, explanation: 'Incorrect origin alignment renders the component useless in a larger assembly context.' },
        { id: 'os2', text: 'What does "Modeling Efficiency" signify in the KEMCO training environment?', options: ['Drawing fast with many errors', 'Achieving the final geometry with the simplest possible feature tree to improve update speed', 'Using the most expensive computer possible', 'Having many layers'], correctAnswer: 1, explanation: 'Efficient models are parametric, robust, and stable for downstream changes.' },
        { id: 'os3', text: 'Situational: You are modeling a perfectly symmetric machine base. What is the manual-recommended strategy?', options: ['Model every individual hole and edge manually', 'Model exactly one half and use the "Mirror Part/Feature" command across the symmetry plane', 'Draw it 10 times', 'Ask the teammate'], correctAnswer: 1, explanation: 'Mirroring ensures accuracy and reduces modeling effort by 50%.' },
        { id: 'os4', text: 'Technical: When is the optimal time to apply "Fillets" and "Chamfers" in a complex part history?', options: ['At the very beginning', 'At the end of the feature tree, after all major Booleans and primary geometry are finalized', 'Whenever you feel like it', 'After printing'], correctAnswer: 1, explanation: 'Blends (Fillets) are highly sensitive to geometry changes; applying them last prevents tree crashes.' },
        { id: 'os5', text: 'How do you mathematically verify that your finished "Operation Sample" part matches the source PDF blueprint?', options: ['Visual estimation on the screen', 'Using "Inquiry / Measure" tools to check critical dimensions, mass, and center of gravity', 'Printing and using a physical ruler on the monitor', 'Guessing'], correctAnswer: 1, explanation: 'Physical measurement tools are the only way to ensure mechanical precision.' },
        { id: 'os6', text: 'Situational: The design blueprint specifies an M8 through-hole. What drill diameter should be used in the iCAD Hole Tool?', options: ['8.0mm', '9.0mm (Standard Clearance for M8)', '7.0mm', '15.0mm'], correctAnswer: 1, explanation: 'Standard metric clearance holes allow room for fastener insertion and alignment.' },
        { id: 'os7', text: 'Technical: Why should features like "Main Body" or "Mounting Holes" be renamed in the History Tree?', options: ['To look pretty', 'To allow other designers to quickly identify and edit key design intent nodes', 'To prevent computer crashes', 'To change colors'], correctAnswer: 1, explanation: 'Collaborative engineering requires readable feature histories.' },
        { id: 'os8', text: 'What defines a "Parametric Update" in the sample workflow?', options: ['Deleting the part', 'Modifying a single sketch dimension and having the entire 3D solid update automatically', 'Saving as a new file', 'Restarting iCAD'], correctAnswer: 1, explanation: 'Parametric links are the core strength of modern CAD modeling.' },
        { id: 'os9', text: 'Which tool is utilized to finalize the "3D Part Name" to match the official KEMCO parts list?', options: ['The 2D text tool', 'Right-click on the component and select "Change 3D Part Name"', 'Typing on the Status Bar', 'Windows File Explorer'], correctAnswer: 1, explanation: 'Part names are internal metadata, distinct from the filename on disk.' },
        { id: 'os10', text: 'True or False: Completing the Operation Sample signifies and verifies the ability to produce production-grade parts to KEMCO standards.', options: ['True', 'False'], correctAnswer: 0, explanation: 'The samples are a direct mimicry of real-world factory tasks.' }
      ]
    }
  },
  {
    id: 'mirrored',
    title: 'Mirrored Part',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `mirrored-${i + 1}`, title: `Mirrored Part (${i + 1})` })),
    quiz: {
      title: 'Mirror Symmetry & LH/RH Logic',
      description: 'Understanding Chiral geometry and associative symmetry in iCAD.',
      questions: [
        { id: 'mp1', text: 'What does the technical suffix "LH/RH" signify in a part naming standard?', options: ['Low Height / Robust Height', 'Left Hand / Right Hand symmetric variants', 'Left Home / Right Home', 'Long Hole / Round Hole'], correctAnswer: 1, explanation: 'Mechanical assemblies often require mirrored copies that are not identical by rotation.' },
        { id: 'mp2', text: 'Can a "Mirrored Part" be created simply by rotating the original component 180 degrees?', options: ['Yes, always', 'No, mirrored geometry is spatially inverted (Chiral) and requires a mathematical reflect operation', 'Only if it is a cube', 'Only in 2D Drafting'], correctAnswer: 1, explanation: 'A right-hand part cannot be rotated into a left-hand part; they are reflections.' },
        { id: 'mp3', text: 'Situational: You are designing a machine door. To create the symmetric opposite door, which tool is most efficient?', options: ['Copy and Drag', 'The "Mirror Component" tool using the machine\'s center plane', 'Drawing it again from scratch', 'Using the Scale command'], correctAnswer: 1, explanation: 'Mirror Component creates the inverse geometry instantly based on a reference plane.' },
        { id: 'mp4', text: 'What is the primary benefit of "Associative Mirroring" in an assembly?', options: ['The part is blue', 'Any subsequent design change to the "Master" part automatically updates the "Mirrored" part', 'The part is deleted', 'It reduces the file size'], correctAnswer: 1, explanation: 'Associativity eliminates double-work and ensures both sides of a machine remain synchronized.' },
        { id: 'mp5', text: 'Technical: What is the mandatory reference requirement for any Mirror operation?', options: ['A center point', 'A planar surface or "Symmetry Plane" to act as the reflection axis', 'A 2D line', 'A specific color'], correctAnswer: 1, explanation: 'Mirroring reflects geometry through a flat 2D plane.' },
        { id: 'mp6', text: 'How do you handle a "Standard Hardware" (e.g., a Bolt) when mirroring a larger assembly?', options: ['Mirror the internal geometry of the bolt', 'The bolt itself is NOT mirrored; only its placement/position is reflected since it is a standard part', 'Delete the bolt', 'Draw a NEW bolt'], correctAnswer: 1, explanation: 'Standard parts are identical for both sides; only their coordinate transformed.' },
        { id: 'mp7', text: 'Technical: In iCAD, can you mirror a complete "Sub-Assembly" containing 20+ parts in one step?', options: ['No, one by one only', 'Yes, by selecting the assembly node and mirroring it across the datum plane', 'Only if it is white', 'Only for holes'], correctAnswer: 1, explanation: 'Top-level mirroring allows for rapid creation of left/right machine frames.' },
        { id: 'mp8', text: 'True or False: A mirrored part usually carries a unique Part Number (e.g., -LH vs -RH) in the Bill of Materials.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Symmetric parts are distinct physical objects and must be tracked separately for manufacturing.' },
        { id: 'mp9', text: 'Situational: The mirrored part is "floating" too far from the original. How do you correct this?', options: ['Move it manually with the mouse', 'Adjust the position or offset of the Mirror Plane', 'Change the part color', 'Delete it'], correctAnswer: 1, explanation: 'The distance of the mirrored copy is always double the distance of the original to the plane.' },
        { id: 'mp10', text: 'What characterizes a "Non-Associative" Mirror?', options: ['It is a "Dead Copy" that does not update when the original changes', 'It is transparent', 'It is 2D', 'It is red'], correctAnswer: 0, explanation: 'Non-associative mirrors are independent solids after creation.' }
      ]
    }
  },
  {
    id: 'standard',
    title: 'Standard',
    children: Array.from({ length: 8 }, (_, i) => ({ id: `standard-${i + 1}`, title: `Standard (${i + 1})` })),
    quiz: {
      title: 'iCAD Standard Library & JIS Compliance',
      description: 'Mastering the usage of standardized industrial hardware and components.',
      questions: [
        { id: 'st1', text: 'Why is it strictly mandatory to use the "iCAD Standard Library" for bolts, nuts, and bearings?', options: ['To save disk space', 'To ensure dimensional accuracy to JIS/ISO standards and automatic BOM generation', 'To make parts yellow', 'To speed up printing'], correctAnswer: 1, explanation: 'Library parts contain the correct geometric tolerances and technical metadata for manufacturing.' },
        { id: 'st2', text: 'Technical: What does the notation "M8 x 1.25" specifically represent in a standard bolt description?', options: ['Measure 8 by 1.25', '8mm Nominal Diameter with a 1.25mm Thread Pitch', '8 Meters long', 'Manual number 8'], correctAnswer: 1, explanation: 'Metric naming conventions define the primary size and threading interval.' },
        { id: 'st3', text: 'Situational: You need to specify a bolt that sits "flush" or below the surface to prevent catching on moving parts. Which do you select?', options: ['Hex Head Bolt', 'Hexagon Socket Countersunk (CS) Head Bolt', 'Large Nut', 'Spring Washer'], correctAnswer: 1, explanation: 'Countersunk hardware is designed to hide within tapered mounting holes.' },
        { id: 'st4', text: 'Technical: What is the engineering purpose of a "Spring Washer" in a hardware assembly?', options: ['To look expensive', 'To provide pre-load tension and prevent bolt loosening due to machine vibration', 'To change the color', 'To increase weight'], correctAnswer: 1, explanation: 'Spring washers are a critical anti-loosening structural element.' },
        { id: 'st5', text: 'True or False: iCAD Standard Library components (like MISUMI parts) are typically "Locked" to prevent trainees from accidentally modifying their standardized dimensions.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Standard parts represent off-the-shelf items that cannot be custom machined.' },
        { id: 'st6', text: 'Situational: You need a hardware component that allows for rotational motion on a shaft. Which library category do you access?', options: ['Fasteners', 'Bearings (e.g., 6000 Series)', 'Cylinders', 'Gaskets'], correctAnswer: 1, explanation: 'Bearings are standardized components for minimizing friction in rotating assemblies.' },
        { id: 'st7', text: 'Technical: What does "SSS" (or SUS) stand for in material selection for hardware?', options: ['Simple Silver Screw', 'Stainless Steel (Standard)', 'Super Strong Screw', 'Solid State'], correctAnswer: 1, explanation: 'SUS refers to corrosion-resistant stainless steel alloys.' },
        { id: 'st8', text: 'Where is the central "Standard Library" interface located in the iCAD workspace?', options: ['Inside the Hole tool only', 'The Standard Parts / Library Toolbar and Menu system', 'Windows Explorer', 'Help Files'], correctAnswer: 1, explanation: 'Integrated toolbars provide rapid access to thousands of industrial components.' },
        { id: 'st9', text: 'Situational: The final BOM shows the wrong quantity for M6 screws. What is the most likely error?', options: ['Software bug', 'Screw copies were made manually (Move/Copy) without "Registering" them properly in the BOM list', 'Printer is out of ink', 'Wrong color'], correctAnswer: 1, explanation: 'Proper library workflow ensures every instance is counted for procurement.' },
        { id: 'st10', text: 'True or False: iCAD library parts include BOTH the 3D solid model and a standardized 2D representation for drafting.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Integrated multi-view data ensures consistency between the 3D model and 2D drawing.' }
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
      { id: '2d-orthographic-1', title: 'Drawing Template, Orthographic View, & Scale', content: ['third angle standards'] },
      { id: '2d-orthographic-2', title: 'Hidden Line and Tangent Line', content: ['front view definition'] },
      { id: '2d-orthographic-3', title: 'High Precision', content: ['view alignment'] },
    ],
    quiz: {
      title: 'iCAD Orthographic Projection Standards',
      description: 'Mastering the standards of engineering views according to JIS and KEMCO manuals.',
      questions: [
        { id: '2do1', text: 'Which projection method is strictly mandated by the Japanese Industrial Standard (JIS) for all KEMCO 2D drawings?', options: ['First Angle Projection', 'Third Angle Projection', 'Axonometric Projection', 'Perspective Projection'], correctAnswer: 1, explanation: 'Third Angle Projection is the industrial standard in Japan and KEMCO operations.' },
        { id: '2do2', text: 'What is the primary engineering criteria for selecting the "Front View" of a component in a 2D layout?', options: ['It is the easiest view to draw', 'The view that reveals the most characteristic geometric features and functional orientation', 'The view with the fewest hidden lines', 'The bottom-most face of the part'], correctAnswer: 1, explanation: 'The Front View serves as the "Principal View" from which all other projections are derived.' },
        { id: '2do3', text: 'In Third Angle Projection, if a part is viewed from above, where is that "Top View" placed relative to the "Front View"?', options: ['Directly below the Front View', 'Directly above the Front View', 'To the right of the Front View', 'On a separate layout sheet'], correctAnswer: 1, explanation: '3rd Angle logic mirrors the physical placement (Top is Top).' },
        { id: '2do4', text: 'When projectively expanding from a Front View to a Right Side View, what geometric information must remain perfectly aligned?', options: ['The depth and width', 'The height and vertical feature positions', 'The color and line weight', 'The scale and paper size'], correctAnswer: 1, explanation: 'Alignment ensures that a single point in 3D is correctly mapped across multiple 2D views.' },
        { id: '2do5', text: 'What do dashed lines in an orthographic view standardly represent?', options: ['Center of a hole', 'Edges or surfaces that are obscured/hidden from the current viewing angle', 'Cutting planes', 'Theoretical boundaries only'], correctAnswer: 1, explanation: 'Hidden lines allow for the visualization of internal geometry in a non-cut view.' },
        { id: '2do6', text: 'Situational: A part has a complex internal cavity that cannot be clearly seen with hidden lines. Which view type is standardly required?', options: ['Isometric View', 'Section View', 'Auxiliary View', 'Partial View'], correctAnswer: 1, explanation: 'Sectioning "cuts" the part to expose internal architecture clearly.' },
        { id: '2do7', text: 'Technical: How many "Principal Views" can be generated using a standard Glass Box projection?', options: ['3 views', '6 views (Top, Bottom, Front, Rear, Left, Right)', '1 view', 'Infinite views'], correctAnswer: 1, explanation: 'The Glass Box provides the six cardinal directions of viewing.' },
        { id: '2do8', text: 'Where is the Projection Symbol (representing a truncated cone) standardly located on a drawing sheet?', options: ['Inside the largest hole', 'Within the Title Block or Notes area to identify 1st/3rd angle logic', 'On the toolbar in the software only', 'It is not required for standard drawings'], correctAnswer: 1, explanation: 'The symbol is a legal requirement to signal how to interpret the view layout.' },
        { id: '2do9', text: 'Situational: A large assembly drawing appears cluttered. What is the recommended strategy to clarify a small, detailed area?', options: ['Increase the view scale for the whole sheet', 'Utilize a "Detail View" at a larger scale (e.g., 5:1)', 'Delete the dimensions', 'Print on multiple pages'], correctAnswer: 1, explanation: 'Detail views allow for isolated magnification of complex features.' },
        { id: '2do10', text: 'True or False: In a 3rd Angle Projection sheet, the "Left Side View" is placed to the LEFT of the Front View.', options: ['True', 'False'], correctAnswer: 0, explanation: '3rd Angle places the view relative to where the observer is standing.' }
      ]
    }
  },
  {
    id: '2d-command-menu',
    title: 'Command Menu',
    children: [
      { id: '2d-command-menu-1', title: 'Line Properties', content: ['third angle standards'] },
      { id: '2d-command-menu-2', title: 'Active View', content: ['front view definition'] },
    ],
    quiz: {
      title: 'iCAD 2D Command Menu Logic',
      description: 'Understanding the 2D drafting interface and core geometric toolsets.',
      questions: [
        { id: '2dm1', text: 'What is the specific iCAD command used to "divide" a continuous line into two separate entities at a point of intersection?', options: ['Scale', 'Trim / Break', 'Move', 'Hatch'], correctAnswer: 1, explanation: 'Trim and Break tools manage the length and continuity of 2D entities.' },
        { id: '2dm2', text: 'To create a concentric circle exactly 5mm larger than an existing one, which manual-recommended command should be utilized?', options: ['Copy and Move', 'Offset', 'Scale', 'Mirror'], correctAnswer: 1, explanation: 'Offset creates perfectly parallel or concentric copies at a defined gap.' },
        { id: '2dm3', text: 'While in an active drawing command, which keyboard key instantly resets the cursor and cancels the operation?', options: ['Enter', 'Esc (Escape)', 'Space bar', 'Shift'], correctAnswer: 1, explanation: 'Escape is the universal cancel key in the iCAD CAD engine.' },
        { id: '2dm4', text: 'Technical: What is the functional difference between a "Window" selection and a "Crossing" selection in the 2D workspace?', options: ['Color only', 'Window only selects items FULLY contained in the box; Crossing selects everything the box touches', 'There is no difference', 'One is for 3D only'], correctAnswer: 1, explanation: 'Selection modes govern the efficiency of bulk geometric manipulation.' },
        { id: '2dm5', text: 'Through which interface area are the "Drafting Snaps" (End point, Mid point, Center) standardly toggled?', options: ['File Properties', 'Snap / Grid Toolbar or Status Bar', 'Windows Taskbar', 'Help menu'], correctAnswer: 1, explanation: 'Snaps ensure that new geometry is mathematically linked to existing points.' },
        { id: '2dm6', text: 'How do you ensure a line is drawn "Strictly Horizontal" or "Strictly Vertical"?', options: ['By visual estimation', 'Using "Ortho Mode" or holding the specific constraint key', 'Measuring with a physical ruler on the screen', 'It is not possible in 2D'], correctAnswer: 1, explanation: 'Axis constraints are fundamental for accurate orthographic drafting.' },
        { id: '2dm7', text: 'Technical: What does "Undo" (Ctrl+Z) revert in the iCAD command history?', options: ['Deletes the file', 'Reverts the most recent geometric or property modification', 'Clears the screen', 'Restarts the software'], correctAnswer: 1, explanation: 'Non-destructive drafting relies on a robust multi-level undo stack.' },
        { id: '2dm8', text: 'What is the purpose of "Layering" geometry (e.g., separating Center Lines from Dimensions)?', options: ['To make the file bigger', 'Project organization and selective visibility/plotting control', 'To change the language', 'To increase the license cost'], correctAnswer: 1, explanation: 'Layers provide the structural hierarchy needed for complex technical sheets.' },
        { id: '2dm9', text: 'Situational: A line was accidentally deleted 3 steps ago. What is the most efficient recovery?', options: ['Draw it again manually', 'Use "Undo" (Ctrl+Z) three times', 'Restart without saving', 'Paint the screen'], correctAnswer: 1, explanation: 'History-based drafting tracking allows for easy error correction.' },
        { id: '2dm10', text: 'Where can a trainee find the "Command Prompts" or instructions for the current active tool?', options: ['In a PDF book', 'The Message/Status Pane (usually at the bottom or top of the viewport)', 'Inside the property sheet', 'On the printed paper'], correctAnswer: 1, explanation: 'The status pane guides the user through the required input sequence for every tool.' }
      ]
    }
  },
  {
    id: '2d-line-props',
    title: 'Line Properties',
    content: ['Line Specifications', 'uniform specs', 'line types', 'line weights', 'Changing Colors', 'hidden lines', 'color green', 'Splines', 'partial sections', 'wave', 'curve distance', 'Center Lines', 'manual center line', 'offset value', 'Piping Center Line', 'OF Piping Assembly', 'Hierarchical Representation', 'assembly context', 'attributes', 'Layer'],
    children: [
      { id: '2d-line-props-1', title: 'Line Properties', content: ['line specifications', 'standard requirements'] },
      { id: '2d-line-props-2', title: 'Changing Line Properties & Additional Lines', content: ['color dialog', 'part selection', 'spline waves'] },
      { id: '2d-line-props-3', title: 'Center Line', content: ['center line offset', 'piping assembly'] },
      { id: '2d-line-props-4', title: ' Representation of Parts Hierarchically', content: ['hierarchical representation', 'part detailling'] },
    ],
    quiz: {
      title: 'The Alphabet of Lines (JIS Standards)',
      description: 'Understanding the standard line types and physical properties in KEMCO engineering.',
      questions: [
        { id: '2lp1', text: 'What is the standardized lineweight for a "Center Line" according to the KEMCO training module?', options: ['Thick / 0.5mm', 'Thin / 0.13mm - 0.18mm (Color 1/White/Yellow)', 'Dashed Red', 'Double Thick'], correctAnswer: 1, explanation: 'Centerlines are thin symbolic lines, never thick like object edges.' },
        { id: '2lp2', text: 'What visual pattern identifies a "Phantom Line" and what does it represent in an assembly drawing?', options: ['Single Dashed; Hidden parts', 'Long-Short-Short-Long; Alternate positions or adjacent boundary parts', 'Solid continuous; Visible edges', 'Wavy line; Broken surface'], correctAnswer: 1, explanation: 'Phantom lines provide context for moving parts or surrounding assemblies.' },
        { id: '2lp3', text: 'When representing a "Section Cut" (Hatching), which configuration is standardly applied?', options: ['Thick red lines', 'Thin continuous lines at a 45-degree inclination', 'Blue dotted lines', 'Cross-hatched squares'], correctAnswer: 1, explanation: 'Standard hatching uses 45-degree thin lines for general materials.' },
        { id: '2lp4', text: 'Which color is standardly assigned to "Object Lines" (Visible edges) in the iCAD 2D environment?', options: ['Red (Color 2)', 'White (Color 1)', 'Green (Color 3)', 'Cyan (Color 7)'], correctAnswer: 1, explanation: 'Visible edges use the high-contrast White (Color 1) by default.' },
        { id: '2lp5', text: 'To represent a partial section or a "broken-out" view, which specific line type must be used for the boundary?', options: ['Dashed Hidden Line', 'Spline / Wavy Continuous line', 'Phantom Line', 'Chain line'], correctAnswer: 1, explanation: 'Wavy lines represent an irregular mechanical "break" in the material.' },
        { id: '2lp6', text: 'What is the primary role of "Hidden Lines" in a complex orthographic view?', options: ['To hide drafting errors', 'To denote geometry that exists but is obscured by foreground material', 'To show the axis of rotation', 'To indicate the center of gravity'], correctAnswer: 1, explanation: 'Hidden dashed lines provide a full geometric picture without sectioning.' },
        { id: '2lp7', text: 'Technical: What is the lineweight ratio between "Object Lines" and "Dimension Lines" according to JIS?', options: ['Dimension lines are thicker', 'Object lines are significantly thicker (usually 2:1 or 3:1 ratio)', 'They are exactly the same', 'Dimension lines are invisible'], correctAnswer: 1, explanation: 'Weight contrast is vital for distinguishing the part from its annotations.' },
        { id: '2lp8', text: 'Which line type is used for a "Cutting Plane" to show where a section begins?', options: ['Thin Solid', 'Thick long-dashed line with arrows at the ends', 'Thin wavy line', 'Dotted line'], correctAnswer: 1, explanation: 'Cutting planes are heavy indicators for sectional projection.' },
        { id: '2lp9', text: 'Situational: You want to hide all Center Lines for a printing test. What is the most professional method?', options: ['Delete them all then Undo later', 'Turn off the visibility of the "Centerline" layer', 'Change their color to black', 'Move them to the back'], correctAnswer: 1, explanation: 'Layer visibility is the core organizational tool for layout management.' },
        { id: '2lp10', text: 'True or False: Using non-standard lineweights (e.g., thick center lines) is a fail condition for quality assurance.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Drafting clarity depends on strict adherence to the "Alphabet of Lines".' }
      ]
    }
  },
  {
    id: '2d-dimensioning',
    title: 'Dimensioning',
    children: [
      { id: '2d-dimensioning-1', title: 'Adding Dimensions', content: ['dimensioning', 'adding dimensions', 'standard dimensioning', 'series dimesnion'] },
      { id: '2d-dimensioning-2', title: 'Editing Dimensions', content: ['editing dimension', 'edit dimension characters', 'tolerance', 'chamfer', 'radius'] },
      { id: '2d-dimensioning-3', title: 'Part Note', content: ['polished material', 'part note', 'S45C-D', 'S45C-CG', 'SS400-D'] },
      { id: '2d-dimensioning-4', title: ' Change Position', content: ['change position', 'align dimensions', 'change dimension position', 'alignment of dimensions'] },
    ],
    quiz: {
      title: 'Precision 2D Dimensioning Logic',
      description: 'Rules for accurate manufacturing communication and JIS compliance.',
      questions: [
        { id: '2di1', text: 'What is the "Golden Rule" of dimensioning stated in the iCAD training manual to prevent manufacturing confusion?', options: ['Add as many dimensions as possible', 'Dimension every feature exactly once—clearly and without redundancy', 'Write dimensions by hand', 'Use different colors for every dimension'], correctAnswer: 1, explanation: 'Double-dimensioning creates conflict; missing dimensions stop production.' },
        { id: '2di2', text: 'What does the technical symbol "C" (e.g., C5) represent when placed before a numerical dimension?', options: ['Circular', 'Chamfer (45-degree bevel)', 'Center', 'Copper'], correctAnswer: 1, explanation: 'C-notation is the standard shorthand for bevel dimensions.' },
        { id: '2di3', text: 'In a vertical dimension line, where should the numerical value standardly be placed for proper legibility?', options: ['Inside the line', 'To the Left of the line (readable from the right)', 'At the bottom', 'In the title block'], correctAnswer: 1, explanation: 'Drawing standards mandate consistent placement for rapid readout.' },
        { id: '2di4', text: 'What determines the "Extension Line Offset" (the small gap between the part edge and the dimensioning)?', options: ['It is a random distance', 'Drafting standards (usually 1-2mm) to prevent the extension from being confused with the part edge', 'The mouse speed', 'The color of the part'], correctAnswer: 1, explanation: 'The "gap" is critical for visual separation in technical drafting.' },
        { id: '2di5', text: 'What does the "Ø" symbol represent in an iCAD 2D dimension?', options: ['Radius', 'Diameter', 'Circumference', 'Empty hole'], correctAnswer: 1, explanation: 'The circle-stroke symbol is the universal indicator for Diameter.' },
        { id: '2di6', text: 'Situational: A part is 2000mm long but is plotted on an A3 sheet. How is the dimension value handled?', options: ['The value is divided by 10', 'The dimension MUST reflect the "Full Size" (2000) regardless of the paper scale', 'The dimension is hidden', 'The value is renamed to "Long"'], correctAnswer: 1, explanation: 'Dimensions always represent physical reality, never the paper-space distance.' },
        { id: '2di7', text: 'Technical: What is "Baseline Dimensioning" primarily used to prevent?', options: ['Using too much ink', 'Tolerance Stack-up (accumulation of errors from chain dimensioning)', 'Red lines', 'Saving slow'], correctAnswer: 1, explanation: 'Baselines ensure all features are accurate relative to a single common datum.' },
        { id: '2di8', text: 'How do you indicate a "Not to Scale" (NTS) dimension in a standard drawing?', options: ['Underlining the dimension value', 'Making it red', 'Drawing it by hand', 'Deleting it'], correctAnswer: 0, explanation: 'Underlining warns the machinist that the geometry is shifted for illustrative purposes.' },
        { id: '2di9', text: 'True or False: Dimensioning to "Hidden lines" should be avoided; use a section or detail view instead.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Hidden lines are ambiguous for precision measurement placement.' },
        { id: '2di10', text: 'What does "2-M8" signify in a hole dimension?', options: ['A hole 2mm deep', 'Two identical M8 (Metric 8mm) threaded holes', 'M8 minus 2', 'A square hole'], correctAnswer: 1, explanation: 'Quantity suffixes/prefixes identify patterns in the drawing.' }
      ]
    }
  },
  {
    id: '2d-standard-part',
    title: 'Standard Part',
    children: [
      { id: '2d-standard-part-1', title: 'PCD, Thread, & Standard Parts', content: ['PCD', 'tapered thread(RC)', 'standard parts'] },
      { id: '2d-standard-part-2', title: 'Oil Groove', content: ['oil groove', 'for flat surface', 'for circular portion', 'oil groove for flat surface', 'oil groove for circular portion'] },
      { id: '2d-standard-part-3', title: 'Shaft and Key Plate', content: ['shaft and key plate', 'dimesnion of shaft and key plate'] },
      { id: '2d-standard-part-4', title: 'Collar', content: ['collar', 'tolerance for collar', 'machining tolerance to be used in collar'] },
      { id: '2d-standard-part-5', title: 'Collar - 2', content: ['collar', 'tolerance for collar', 'machining tolerance to be used in collar'] },
      { id: '2d-standard-part-6', title: 'Scale & Relief Process', content: ['scale', 'relief process', 'standard scale',] },
      { id: '2d-standard-part-7', title: 'Relief Process', content: ['relief process', 'four steps to show the detail on the template', 'subdrawing/library', 'load part', 'standard part', 'required template for relief process detail'] },
    ],
    quiz: {
      title: '2D Standard Parts & Libraries',
      description: 'Understanding symbolic representation and placement of industrial hardware.',
      questions: [
        { id: '2sp1', text: 'When inserting a Hex Bolt from the 2D library, what is the primary reason for adding a Center Line to its Shank View?', options: ['To make it colorful', 'To indicate the axis of symmetry and professional alignment of the threaded shank', 'To delete the thread', 'To hide the washer'], correctAnswer: 1, explanation: 'Technical drawings use axial symbology for all symmetric hardware.' },
        { id: '2sp2', text: 'How are "Internal Threads" (Holes) standardly represented in a 2D section view?', options: ['By drawing the individual thread peaks', 'Thick inner line for the drill diameter; Thin outer line for the thread depth', 'Solid red block', 'They are not shown'], correctAnswer: 1, explanation: 'Threaded holes are represented by concentric continuous and thin lines.' },
        { id: '2sp3', text: 'In the 2D library, what does the "Nominal Size" of a fastener (e.g., M8) refer to?', options: ['The length of the bolt', 'The major/outer diameter of the thread (8mm)', 'The size of the head', 'The weight'], correctAnswer: 1, explanation: 'Metric naming is standardized to the outer diameter.' },
        { id: '2sp4', text: 'Situational: You are designing a bolted assembly for high-vibration environment. Which hardware must be included in the 2D stack-up?', options: ['Paper gasket', 'Spring Washer', 'Flat Washer only', 'Rubber band'], correctAnswer: 1, explanation: 'Spring washers provide the mechanical tension needed to prevent loosening.' },
        { id: '2sp5', text: 'Technical: What is the primary standard authority governing iCAD standard part dimensions?', options: ['NASA', 'JIS (Japanese Industrial Standards)', 'FDA', 'IEEE'], correctAnswer: 1, explanation: 'KEMCO/iCAD strictly follows JIS for component sizes.' },
        { id: '2sp6', text: 'True or False: 2D library components carry integrated metadata ("Attributes") that automatically populate the Bill of Materials.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Intelligent library parts bridge the gap between drafting and procurement.' },
        { id: '2sp7', text: 'When viewing a Bolt from the Head (Top), how is the "Hexagon" standardly oriented in a side view projection?', options: ['Randomly', 'Aligned to show either two or three faces clearly', 'As a circle', 'As a square'], correctAnswer: 1, explanation: 'Projection standards dictate consistent orientation for hexagonal hardware.' },
        { id: '2sp8', text: 'Situational: You need a bolt for a flush surface. Which type describes the correct drive head?', options: ['Hex Head Bolt', 'Countersunk (CS) Head Bolt', 'Flange Bolt', 'Wing Nut'], correctAnswer: 1, explanation: 'CS bolts sit within the material to maintain surface flatness.' },
        { id: '2sp9', text: 'What is the purpose of a "Plain/Flat Washer" in the library callout?', options: ['To look good', 'To distribute the fastener load and protect the surface of the part', 'To add color', 'To stop rotation'], correctAnswer: 1, explanation: 'Washers prevent "crushing" or marring of the primary material.' },
        { id: '2sp10', text: 'Where can a trainee "Reverse" the side view of a bolt (e.g., flip it 180 degrees) easily?', options: ['By deleting and redrawing', 'Using the "Mirror" or the orientation toggle within the Standard Part tool', 'Painting it black', 'It cannot be flipped'], correctAnswer: 1, explanation: 'Library tools support rapid orientation adjustments.' }
      ]
    }
  },
  {
    id: '2d-surface-app',
    title: 'Application of Surface',
    children: [
      { id: '2d-surface-app-1', title: 'Shotblasting', content: ['shotblasting', 'shotblasting for flat surface', 'shotblasting for circular portion'] },
      { id: '2d-surface-app-2', title: 'Machining', content: ['machining', 'machining for flat surface', 'machining for circular portion'] },
    ],
    quiz: {
      title: 'Hatching & Surface Logic',
      description: 'Understanding materials representation and sectional views.',
      questions: [
        { id: '2sa1', text: 'What is the primary purpose of "Hatching" (Patterns) in an orthographic projection?', options: ['Decoration', 'To identify where solid material has been intersected by a cutting plane', 'To show the weight', 'To hide hidden lines'], correctAnswer: 1, explanation: 'Hatching symbolizes the physical surface exposed by a cross-sectional cut.' },
        { id: '2sa2', text: 'Technical: When two different parts are touching in a sectional view, how should the hatching be applied to distinguish them?', options: ['Use different colors', 'Reverse the hatching angle (e.g., 45 degrees for Part A, 135 degrees for Part B)', 'One part has no hatching', 'Use thick red lines'], correctAnswer: 1, explanation: 'Angle inversion is the professional standard for identifying assembly boundaries.' },
        { id: '2sa3', text: 'Which material type is standardly represented by a "Double-Line" hatch pattern in the KEMCO system?', options: ['Cast Iron', 'Stainless Steel (SUS)', 'Plastic', 'Water'], correctAnswer: 1, explanation: 'Standard hatch libraries map specific patterns to industrial materials.' },
        { id: '2sa4', text: 'Technical: What does a "Broken-out Section" (indicated by a wavy spline line) achieve?', options: ['Deletes the part', 'Reveals internal features in a specific localized area without sectioning the entire part', 'Changes the color', 'Increases the scale'], correctAnswer: 1, explanation: 'Local sectioning provides clarity while maintaining the integrity of the overall view.' },
        { id: '2sa5', text: 'Situational: In a sectional view, why are rotating items like "Shafts," "Bolts," and "Pins" typically NOT hatched?', options: ['They are too small', 'Standard practice excludes solid cylindrical items from longitudinal sectioning to preserve clarity', 'They are invisible', 'They are always white'], correctAnswer: 1, explanation: 'Industrial standards (JIS/ISO) avoid sectioning fasteners and shafts.' },
        { id: '2sa6', text: 'What does the "Hatch Scale" parameter control in the iCAD Pattern tool?', options: ['The size of the part', 'The physical spacing/density of the pattern lines', 'The weight of the paper', 'The coordinate system'], correctAnswer: 1, explanation: 'Scale must be adjusted to match the view zoom level for legibility.' },
        { id: '2sa7', text: 'True or False: Hatching should always be "broken" or cleared behind dimension text for readability.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Technical data must never be obscured by background patterns.' },
        { id: '2sa8', text: 'Situational: A part is extremely thin (e.g., 0.5mm sheet). How is its section standardly shown?', options: ['Large hatch lines', 'Solid Black Fill', 'Invisible', 'A single red line'], correctAnswer: 1, explanation: 'Thin sections are filled solid when the gap is too small for patterns.' },
        { id: '2sa9', text: 'What is the standard inclination angle for general-purpose hatching?', options: ['90 degrees', '45 degrees', '180 degrees', '0 degrees'], correctAnswer: 1, explanation: '45 degrees is the universal drafting standard.' },
        { id: '2sa10', text: 'Technical: What characterizes "Associative Hatching"?', options: ['It is blue', 'The pattern updates automatically if the boundary geometry is modified', 'It is random', 'It cannot be deleted'], correctAnswer: 1, explanation: 'Associativity ensures design changes propagate to the sectional detail.' }
      ]
    }
  },
  {
    id: '2d-keyway',
    title: 'Keyway',
    quiz: {
      title: 'Keyway Engineering & Standards',
      description: 'Understanding torque transmission geometry and JIS B 1301 compliance.',
      questions: [
        { id: '2kw1', text: 'What is the physical purpose of a "Keyway" in a shaft and hub assembly?', options: ['To allow airflow', 'To lock rotational motion and transmit torque via a physical Key', 'To hide metadata', 'To reduce part weight'], correctAnswer: 1, explanation: 'Keyways are the primary mechanical interface for driving pulleys and gears.' },
        { id: '2kw2', text: 'Which JIS standard strictly governs the dimensions for Parallel Keys and Keyways used in iCAD?', options: ['JIS B 1301', 'JIS G 3101', 'ISO 9001', 'NASA Standard 7'], correctAnswer: 0, explanation: 'Adherence to JIS B 1301 ensures that keys from any vendor will fit correctly.' },
        { id: '2kw3', text: 'Why is the "Tolerance" (e.g., P9 or Js9) on a keyway width critical for design?', options: ['To make the drawing colorful', 'To define the fit (tight or loose) between the key and the slot', 'To change the file size', 'To speed up rotation'], correctAnswer: 1, explanation: 'Fits determine if a key is permanent or removable.' },
        { id: '2kw4', text: 'Situational: You are dimensioning a Hub (Internal) keyway. How is the "total distance" (t2) measurement standardly taken?', options: ['Length of the key', 'From the top edge of the hole to the bottom of the slot', 'The circumference of the circle', 'Weight of the hub'], correctAnswer: 1, explanation: 'Internal measurements must be accessible to machinists.' },
        { id: '2kw5', text: 'Technical: For 20mm diameter shaft, what is the standardized Width of the keyway?', options: ['2mm', '6mm', '20mm', '10mm'], correctAnswer: 1, explanation: 'JIS B 1301 dictates key sizes based on localized shaft diameters.' },
        { id: '2kw6', text: 'What is the role of the "Radius" (Fillet) at the bottom corners of a keyway?', options: ['To look pretty', 'To reduce stress concentration and prevent cracking under high torque', 'To increase friction', 'To hide the center point'], correctAnswer: 1, explanation: 'Fillets are critical structural fatigue-prevention features.' },
        { id: '2kw7', text: 'Which tool is most efficient for generating standardized keyways in iCAD 2D?', options: ['Circle and Line only', 'iCAD Keyway Standard Library Macro', 'Scale tool', 'Paint tool'], correctAnswer: 1, explanation: 'Macros provide guaranteed-to-standard geometry instantly.' },
        { id: '2kw8', text: 'How do you indicate a "Tapered Keyway" different from a Parallel one?', options: ['Coloring it blue', 'A specific slope notation (e.g., 1:100 Gradient)', 'Writing "Taper" only', 'It is not Shown'], correctAnswer: 1, explanation: 'Tapered keys require gradient callouts for precision machining.' },
        { id: '2kw9', text: 'Where should Keyway dimensions typically be placed for clarity?', options: ['In the side view only', 'On the end-view (End face) showing the cross-section', 'In the title block', 'In the revision list'], correctAnswer: 1, explanation: 'Cross-sectional views provide the clearest view of slot depth and width.' },
        { id: '2kw10', text: 'True or False: Using the iCAD macro ensures the "Part Note" automatically includes the Keyway size for the BOM.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Automated tools streamline both drafting and documentation.' }
      ]
    }
  },
  {
    id: '2d-retaining-ring',
    title: 'Retaining Ring',
    children: [
      { id: '2d-retaining-ring-1', title: 'Retaining Rings-C - External', content: ['dimensioning', 'adding dimensions', 'standard dimensioning', 'series dimesnion'] },
      { id: '2d-retaining-ring-2', title: 'Retaining Rings-C - Internal', content: ['editing dimension', 'edit dimension characters', 'tolerance', 'chamfer', 'radius'] }
    ],
    quiz: {
      title: 'Retaining Rings & Groove Standards',
      description: 'Understanding axial retention logic and JIS B 2804/2805 standards.',
      questions: [
        { id: '2rr1', text: 'What is the primary mechanical function of a "Retaining Ring" (Circlip) in a shaft assembly?', options: ['To tighten a bolt', 'To prevent axial (sliding) movement of parts on a shaft or inside a bore', 'To seal against fluid leaks', 'To increase rotational speed'], correctAnswer: 1, explanation: 'Retaining rings provide a physical shoulder to lock components in a fixed axial position.' },
        { id: '2rr2', text: 'Technical: What is the primary difference between a JIS B 2804 (External) and a JIS B 2805 (Internal) ring?', options: ['Color coding', 'The External ring grips the outer diameter of a shaft; the Internal ring expands into a housing bore', 'External rings are always larger', 'There is no difference in application'], correctAnswer: 1, explanation: 'Selection depends strictly on the mounting surface (Hole vs Shaft).' },
        { id: '2rr3', text: 'Situational: You are designing a groove for a 20mm shaft retaining ring. Why must the groove width (m) be slightly wider than the ring thickness (t)?', options: ['To save weight', 'To allow for thermal expansion and the physical insertion clearance of the ring', 'To make the drawing easier', 'It shouldn\'t; they must be identical'], correctAnswer: 1, explanation: 'Standard grooves include a clearance tolerance to prevent the ring from binding during installation.' },
        { id: '2rr4', text: 'Which tool is mandatory for the safe installation of a "C-type" retaining ring?', options: ['Hammer and Chisel', 'Retaining Ring Pliers with specialized tips', 'Flathead screwdriver', 'Adjustable wrench'], correctAnswer: 1, explanation: 'Standard rings have "eyelets" designed specifically for retaining ring pliers.' },
        { id: '2rr5', text: 'Technical: What is an "E-Ring" (JIS B 2805) primarily used for?', options: ['Heavy engine blocks', 'Small diameter shafts where axial installation is blocked, allowing radial insertion', 'High-pressure hydraulics', 'Aesthetic decoration'], correctAnswer: 1, explanation: 'E-rings "snap" on from the side, making them ideal for tight accessible spaces.' },
        { id: '2rr6', text: 'In iCAD, where do you retrieve the exact standardized "Groove Diameter" for a specific shaft size?', options: ['By guessing', 'Selecting the standardized shaft diameter from the Retaining Ring Library tool', 'Measuring the 3D part manually', 'Searching on the internet'], correctAnswer: 1, explanation: 'iCAD libraries contain the JIS-compliant groove data linked to the shaft diameter.' },
        { id: '2rr7', text: 'What characterizes a "Permanent Set" failure in a retaining ring?', options: ['The ring remains blue', 'The ring is over-expanded during install and loses its spring tension/grip', 'The ring is painted', 'The ring is too shiny'], correctAnswer: 1, explanation: 'Over-spreading the ring beyond its elastic limit destroys its holding power.' },
        { id: '2rr8', text: 'How is a "Shaft Groove" standardly represented in a 2D section view?', options: ['As a hidden line only', 'A precisely dimensioned recessed channel with its own diameter callout', 'A red line', 'It is not shown'], correctAnswer: 1, explanation: 'Groove geometry is critical and must be explicitly documented for the machinist.' },
        { id: '2rr9', text: 'True or False: Retaining rings can be installed on threads.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Retaining rings require a smooth cylindrical groove; threads would prevent proper seating.' },
        { id: '2rr10', text: 'When using the "Standard Library" to place a retaining ring, which BOM data is automatically captured?', options: ['Part Weight only', 'Standard Name (e.g., JIS B 2804), Size, and Material', 'Only the color', 'The designer\'s name'], correctAnswer: 1, explanation: 'Library parts bridge the gap between drafting and procurement data.' }
      ]
    }
  },
  {
    id: '2d-geometric-tol',
    title: 'Geometric Tolerance',
    children: [
      { id: '2d-geometric-tol-1', title: 'Geometric Tolerance', content: ['geometric tolerance', 'datum', 'tolerance value', 'tolerance symbol',] },
      { id: '2d-geometric-tol-2', title: 'Datum', content: ['datum', 'datum feature', 'datum reference frame', 'datum shift'] }
    ],
    quiz: {
      title: 'iCAD GD&T (Geometric Dimensioning & Tolerancing)',
      description: 'Understanding geometric control beyond linear dimensions according to ISO 1101.',
      questions: [
        { id: '2gt1', text: 'In the context of GD&T, what is a "Datum" (e.g., Datum A)?', options: ['The date the drawing was made', 'A theoretically exact reference point, line, or plane used as a basis for measurement', 'A type of hole', 'The scale of the view'], correctAnswer: 1, explanation: 'Datums provide the starting frame of reference for geometric checks.' },
        { id: '2gt2', text: 'Technical: Which symbol represents "Parallelism" in a Feature Control Frame?', options: ['Two horizontal lines (=)', 'Two slanted lines (//)', 'A circle with a crosshair', 'A perpendicular inverted T'], correctAnswer: 1, explanation: 'Parallelism ensures a surface remains within a tolerance zone relative to a datum plane.' },
        { id: '2gt3', text: 'Situational: You need to ensure a mounting face is perfectly "Square" to a shaft axis. Which tolerance type is correct?', options: ['Flatness', 'Perpendicularity (⊥)', 'Position', 'Straightness'], correctAnswer: 1, explanation: 'Perpendicularity controls the 90-degree relationship between two entities.' },
        { id: '2gt4', text: 'What is the "Feature Control Frame" primarily used for?', options: ['To hold a picture of the part', 'To specify the geometric characteristic, tolerance value, and datum references in one block', 'To name the part', 'To change colors'], correctAnswer: 1, explanation: 'The control frame is the "sentence" of the GD&T language.' },
        { id: '2gt5', text: 'Technical: What does a "Position" tolerance (Circle with crosshair) control?', options: ['How fast the part moves', 'The exact location of a feature (like a hole center) relative to datums', 'The physical weight', 'The drawing size'], correctAnswer: 1, explanation: 'Position is the most powerful tool for ensuring hole patterns align for assembly.' },
        { id: '2gt6', text: 'Situational: A part has a "Flatness" tolerance of 0.05. Does it require a Datum Reference?', options: ['Yes, always', 'No, Flatness is a "Form" tolerance and is measured only against itself', 'Only if it is red', 'Only for assembly'], correctAnswer: 1, explanation: 'Form tolerances (Flatness, Roundness) are independent of other parts.' },
        { id: '2gt7', text: 'What does "Concentricity" signify in a technical drawing?', options: ['Two circles having different centers', 'Two or more features (like a shaft and a hole) sharing the same common axis', 'A heavy part', 'A blue part'], correctAnswer: 1, explanation: 'Concentricity ensures axial alignment, critical for high-speed rotation.' },
        { id: '2gt8', text: 'Where is the GD&T/Feature Control Frame tool standardly located in iCAD 2D?', options: ['Inside the Line tool', 'Inside the Dimension / Annotation menu block', 'In the file menu', 'Under Help'], correctAnswer: 1, explanation: 'Geometric tolerances are categorized under advanced annotations.' },
        { id: '2gt9', text: 'Technical: What does an "M" in a circle (Modifiers) represent next to a tolerance?', options: ['Maximum Material Condition (MMC)', 'Manual Mode', 'Move part', 'Mass'], correctAnswer: 0, explanation: 'MMC allows for tolerance "bonus" as features deviate from their largest/smallest state.' },
        { id: '2gt10', text: 'True or False: Geometric Tolerancing improves parts interchangeability while potentially lowering manufacturing costs by defining functional limits.', options: ['True', 'False'], correctAnswer: 0, explanation: 'GD&T focuses on "Function" more than just "Size".' }
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
      title: 'Surface Finish & Roughness (JIS B 0031)',
      description: 'Understanding how to specify the texture and quality of machined faces.',
      questions: [
        { id: '2ms1', text: 'What does the standard "Checkmark" (Tick) symbol represent in a 2D engineering drawing?', options: ['The part was inspected', 'Surface Texture / Machining symbol', 'Correct dimension', 'A hole location'], correctAnswer: 1, explanation: 'The checkmark is the industrial shorthand for specifying surface finish.' },
        { id: '2ms2', text: 'Technical: What does "Ra" specifically stand for in a finish callout?', options: ['Radius', 'Roughness Average (expressed in micrometers/µm)', 'Rotation Angle', 'Rate of Attrition'], correctAnswer: 1, explanation: 'Ra is the arithmetic average of the profile peak-to-valley heights.' },
        { id: '2ms3', text: 'Situational: A hydraulic cylinder bore requires an extremely smooth surface. Which Ra value is more appropriate?', options: ['Ra 25.0', 'Ra 12.5', 'Ra 0.8', 'Ra 100'], correctAnswer: 2, explanation: 'Lower Ra values indicate smoother, more high-precision surfaces.' },
        { id: '2ms4', text: 'What is indicated by a "Circle" inside the triangle of a machining symbol?', options: ['Machining is mandatory', 'Material removal is NOT allowed (Leave the original/cast surface)', 'A through-hole exists', 'Apply oil here'], correctAnswer: 1, explanation: 'A circle denotes "No Material Removal", common for keeping raw cast or forged states.' },
        { id: '2ms5', text: 'Technical: What is the purpose of the top "Bar" on a machining symbol?', options: ['To make it visible', 'To specify a mandatory machining method (e.g., Grinding, Milling)', 'To indicate the scale', 'To cross out the symbol'], correctAnswer: 1, explanation: 'The bar allows engineers to dictate the exact production process for that face.' },
        { id: '2ms6', text: 'What does a "General Finish Symbol" in the Title Block (or near it) signify?', options: ['The part is finished', 'The default surface quality for all faces not specifically labeled with a symbol', 'A special color', 'The designer\'s signature'], correctAnswer: 1, explanation: 'Global symbols clarify the baseline quality of the whole component.' },
        { id: '2ms7', text: 'Technical: What is the "Sampling Length" in a roughness measurement?', options: ['The length of the part', 'The specific evaluation length for the stylus measurement', 'The file size', 'The distance between holes'], correctAnswer: 1, explanation: 'Evaluation must be over a sufficient length to be statistically valid (ISO 4288).' },
        { id: '2ms8', text: 'Why is a high-quality finish (e.g., Ra 0.4) more expensive to manufacture than a rough one (Ra 6.3)?', options: ['It uses more electricity', 'It requires multiple secondary operations like grinding or polishing and more time', 'The ink is more expensive', 'It is not more expensive'], correctAnswer: 1, explanation: 'Higher precision requires higher machine time and tighter quality control.' },
        { id: '2ms9', text: 'Situational: A symbol shows a checkmark with "G" on the bar. What does the "G" represent?', options: ['Green color', 'Grinding operation', 'Gold material', 'Go'], correctAnswer: 1, explanation: 'Letter codes designate specific finishing processes like Grinding.' },
        { id: '2ms10', text: 'True or False: Surface finish symbols should be placed on the visible edge of the surface being specified or on its extension line.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Direct visual association is mandatory for clear communication.' }
      ]
    }
  },
  {
    id: '2d-welding-symbol',
    title: 'Welding Symbol',
    quiz: {
      title: 'Welding Design & JIS Z 3021',
      description: 'Understanding structural joinery communication and standard symbols.',
      questions: [
        { id: '2ws1', text: 'What is the "Reference Line" in a standardized welding symbol?', options: ['A line for cutting the plate', 'The central horizontal line where all welding information and symbols are attached', 'The axis of the shaft', 'The page border'], correctAnswer: 1, explanation: 'The reference line is the structural foundation of the annotation.' },
        { id: '2ws2', text: 'Technical: What is the difference between a symbol placed "Below" the reference line versus "Above" it?', options: ['Below is for red weld; Above is for blue', 'Below means "Arrow Side" (this side); Above means "Other Side" (opposite side)', 'Below is for 2D; Above is for 3D', 'There is no difference'], correctAnswer: 1, explanation: 'Placement dictates which side of the joint receives the weld deposit.' },
        { id: '2ws3', text: 'Situational: You need to specify a triangular weld to join two perpendicular plates. Which symbol is correct?', options: ['Groove Weld', 'Fillet Weld (Triangle symbol)', 'Spot Weld', 'Plug Weld'], correctAnswer: 1, explanation: 'Fillet welds are the dominant industrial join for T and Lap joints.' },
        { id: '2ws4', text: 'What does a "Flag" symbol at the junction of the arrow and reference line indicate?', options: ['The part is from USA', 'Field Weld (The weld must be performed at the final installation site, not the shop)', 'Weld finished', 'Danger'], correctAnswer: 1, explanation: 'The flag distinguishes between factory-assembly and on-site construction.' },
        { id: '2ws5', text: 'Technical: Where is the "Weld Size" (e.g., 6mm) standardly written on the symbol?', options: ['In the tail', 'To the Left of the weld symbol', 'Inside the triangle', 'On top of the arrow'], correctAnswer: 1, explanation: 'Size (Leg/Throat) always precedes the symbol to the left.' },
        { id: '2ws6', text: 'Situational: A weld must be applied continuously around the entire circumference of a cylinder. What sign is used?', options: ['A small circle at the arrow/reference junction (All-around symbol)', 'A red circle', 'Writing "ROUND" in the tail', 'A dashed circle'], correctAnswer: 0, explanation: 'The all-around circle simplifies documentation of continuous perimeter welds.' },
        { id: '2ws7', text: 'What is the function of the "Tail" (Fork) at the end of the reference line?', options: ['To make the symbol look like an arrow', 'To specify the welding process (e.g., TIG, MIG) or a reference note', 'To show the part weight', 'To save the file'], correctAnswer: 1, explanation: 'The tail holds auxiliary technical requirements or process codes.' },
        { id: '2ws8', text: 'Technical: What does an "Open V" symbol (Groove) represent?', options: ['No weld needed', 'A V-groove requiring intentional edge preparation (grinding/bevelling) before welding', 'A victory', 'A hole'], correctAnswer: 1, explanation: 'Grooves are necessary for full-penetration structural welds.' },
        { id: '2ws9', text: 'Situational: A weld is specified as "5(100)-200". What does the "200" represent?', options: ['The weld size', 'The Pitch (Center-to-center distance between intermittent welds)', 'The temperature', 'The weight'], correctAnswer: 1, explanation: 'Intermittent weld notation defines size, length, and distance spacing.' },
        { id: '2ws10', text: 'True or False: Using the correct welding symbol is a safety requirement to ensure the machine structural integrity.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Incorrect welds lead to structural failure and liability issues.' }
      ]
    }
  },
  {
    id: '2d-heat-treatment',
    title: 'Heat Treatment',
    children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-heat-treatment-${i + 1}`, title: `Heat Treatment (${i + 1})` })),
    quiz: {
      title: 'Heat Treatment, Coating & Final Finish',
      description: 'Understanding metallurgical and surface preservation instructions.',
      questions: [
        { id: '2ht1', text: 'What is the primary industrial objective of "Heat Treatment" (e.g., Induction Hardening)?', options: ['To change the color of the steel', 'To modify the crystal structure of the metal to increase Hardness or Strength', 'To clean the part faces', 'To melt the part into a new shape'], correctAnswer: 1, explanation: 'Heat treatment alters physical properties for mechanical durability.' },
        { id: '2ht2', text: 'Technical: What does the notation "HRC 50-55" specifically describe in a drawing note?', options: ['The temperature in Celsius', 'The Rockwell C-Scale hardness range required after treatment', 'A coordinate location', 'The part number'], correctAnswer: 1, explanation: 'Rockwell C is the standard scale for measuring the hardness of structural steels.' },
        { id: '2ht3', text: 'Situational: A part requires high corrosion resistance in a wet environment. Which surface treatment is standardly applied?', options: ['Oil spray', 'Zinc Plating (Uni-chrome) or Anodizing (for Aluminum)', 'Painting with a brush', 'No treatment needed'], correctAnswer: 1, explanation: 'Zinc plating and Anodizing provide a sacrificial or protective oxide layer.' },
        { id: '2ht4', text: 'What characterizes "Black Oxide" (Fe3O4) finish on steel?', options: ['A thick plastic layer', 'A chemical conversion coating that provides mild corrosion resistance without changing dimensions', 'A heavy paint', 'A 3D modeling feature'], correctAnswer: 1, explanation: 'Black oxide is ideal for precision parts where plating thickness would interfere with tolerances.' },
        { id: '2ht5', text: 'Technical: Why should a design specify "Masking" for a precision hole during a thick plating process?', options: ['To hide the hole', 'To prevent the plating buildup from changing the hole diameter and ruining the fit', 'To save money on chemicals', 'To make the hole blue'], correctAnswer: 1, explanation: 'Plating has physical volume; masking preserves the machined tolerance.' },
        { id: '2ht6', text: 'In iCAD 2D, which symbol is used to indicate a "Localized" treatment area (e.g., only a specific surface)?', options: ['A red arrow', 'A thick Chain Line (long-short-long) offset from the primary geometry', 'A dashed green line', 'A circle'], correctAnswer: 1, explanation: 'Chain lines are the standard indicator for localized surface requirements (ISO/JIS).' },
        { id: '2ht7', text: 'Technical: What property is typically sacrificed when a steel part is hardened to its maximum level?', options: ['Weight', 'Ductility/Toughness (the part becomes brittle and may crack)', 'Transparency', 'File size'], correctAnswer: 1, explanation: 'Hardness and Brittleness increase together; engineers must balance the two.' },
        { id: '2ht8', text: 'What is the "Finish" column in a KEMCO Bill of Materials used for?', options: ['To write "Done"', 'To list the surface treatment (e.g., Zn-Plating, Black Oxide) for procurement', 'To show the designer name', 'To indicate weight'], correctAnswer: 1, explanation: 'The finish column ensures the correct secondary processes are ordered.' },
        { id: '2ht9', text: 'Situational: A part is made of Aluminum (A6061). Which coating is chemically compatible?', options: ['Anodizing', 'Carburizing', 'Induction Hardening', 'Zinc Plating'], correctAnswer: 0, explanation: 'Anodizing is an electrolytic process specific to aluminum protection.' },
        { id: '2ht10', text: 'True or False: Every Heat Treatment or Coating instruction must be clearly noted to prevent factory scrap.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Missing finish data is a critical drafting error.' }
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
      title: 'Weight Computation & Logistics',
      description: 'Understanding the physical reality of digital assembly drafting.',
      questions: [
        { id: '2dw1', text: 'How does iCAD 2D calculate the "Part Weight" standardly displayed in the Title Block?', options: ['By measuring the area of the view', 'By retrieving the calculated mass from the 3D Part\'s Physical Properties', 'By weighing the paper', 'Manual input only'], correctAnswer: 1, explanation: 'Calculated data in 3D is automatically mapped to the 2D documentation.' },
        { id: '2dw2', text: 'Technical: What core formula is used by the software to determine weight?', options: ['Volume x Width', 'Volume [mm³] x Specific Gravity [g/cm³] / 1,000,000 = Weight [kg]', 'Width + Height', 'Price x 2'], correctAnswer: 1, explanation: 'Weight is the mathematical product of geometry and density.' },
        { id: '2dw3', text: 'Situational: The weight in the 2D drawing is showing "0.00kg" for a steel block. What is the most likely error?', options: ['The part is too small', 'The "Specific Gravity" is set to 0.0 or left blank in the 3D model properties', 'The computer is broken', 'The drawing is not printed'], correctAnswer: 1, explanation: 'Zero density results in zero mass regardless of volume.' },
        { id: '2dw4', text: 'True or False: iCAD can automatically sum the weights of all individual parts to provide a total "Assembly Weight" in the BOM.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Total weight is vital for shipping and structural analysis.' },
        { id: '2dw5', text: 'Why is accurate weight computation vital for machine logistical planning?', options: ['To choose the paint color', 'To determine crane lifting capacity, shipping costs, and floor loading on site', 'To increase the part speed', 'For decorative purposes'], correctAnswer: 1, explanation: 'Physical mass is a primary constraint for transport and installation.' },
        { id: '2dw6', text: 'Technical: In which unit is Weight standardly reported in the KEMCO drafting template?', options: ['Grams (g)', 'Kilograms (kg)', 'Tons (t)', 'Pounds (lb)'], correctAnswer: 1, explanation: 'Kg is the industrial metric standard for individual machine parts.' },
        { id: '2dw7', text: 'How does a "Section View" or "Hole" update affect the weight on a 2D sheet?', options: ['No effect', 'Automatic update: Removing material in 3D reduces the weight value displayed in 2D', 'It makes the part heavier', 'The view must be deleted'], correctAnswer: 1, explanation: 'Volumetric changes propagate through the system to keep data synchronized.' },
        { id: '2dw8', text: 'Situational: A part is made of Aluminum (SG=2.70). If changed to Steel (SG=7.85), how much heavier does the weight become?', options: ['Approximately 3 times heavier', '10 times heavier', 'Lighter', 'Remains same'], correctAnswer: 0, explanation: 'Material properties drastically change the physical reality of identical designs.' },
        { id: '2dw9', text: 'Where can you manually "Override" a weight if necessary (e.g., for complex vendor parts)?', options: ['On the monitor', 'In the Weight property field of the Part Property sheet', 'In the printer properties', 'In a text file'], correctAnswer: 1, explanation: 'Manual overrides are used when internal volume of vendor parts (motors/valves) is unknown.' },
        { id: '2dw10', text: 'True or False: "Specific Gravity" is the same as "Weight".', options: ['True', 'False'], correctAnswer: 1, explanation: 'SG is density (property); Weight is mass (calculated result).' }
      ]
    }
  },
  {
    id: '2d-bom',
    title: 'BOM',
    children: [
      { id: '2d-bom-1', title: 'Part drawing', content: ['how to create BOM', 'how to create BOM in 2d'] },
      { id: '2d-bom-2', title: 'Assembly drawing', content: ['how to create assembly drawing', 'how to create assembly drawing in 2d'] },
      { id: '2d-bom-3', title: 'Additional Information', content: ['additional information', 'parts information setting'] },
      { id: '2d-bom-4', title: 'Edit Attribute', content: ['edit attribute', 'bill of material after inserting on iCAD data', "how to edit BOM attributes"] }
    ],
    quiz: {
      title: 'Parts List (BOM) & Inventory Management',
      description: 'Understanding the structured list of all components in an assembly.',
      questions: [
        { id: '2pl1', text: 'What is the "Golden Rule" for the Parts List (BOM) location on a professional KEMCO drawing?', options: ['In the center of the part', 'Usually placed at the Top-Right or directly anchored above the Title Block', 'On a separate sticky note', 'Under the Front View'], correctAnswer: 1, explanation: 'Standardized placement ensures the bill of materials is immediately found by procurement.' },
        { id: '2pl2', text: 'Technical: Which mandatory column identifies the "Quantity" of a component needed for the assembly?', options: ['NAME', 'QTY / PCS', 'MAT', 'NOTE'], correctAnswer: 1, explanation: 'Quantity is vital for ordering the correct amount of material.' },
        { id: '2pl3', text: 'What does the abbreviation "SSS" (or SUS) signify in the Material column of the parts list?', options: ['Simple Silver Screw', 'Stainless Steel', 'Soft Synthetic Steel', 'Solid State'], correctAnswer: 1, explanation: 'Material shorthand keeps the BOM concise and readable.' },
        { id: '2pl4', text: 'If a "Standard Bolt" is added to the 3D model, how is its entry standardly generated in the 2D Parts List?', options: ['Manually typed by the trainee', 'Automatically, via the integrated "Update Parts List" command', 'Calculated by the printer', 'It is not listed'], correctAnswer: 1, explanation: 'The 2D list is a direct database report of the 3D assembly contents.' },
        { id: '2pl5', text: 'Situational: A part is purchased from an outside vendor (e.g., MISUMI). What column standardly holds this information?', options: ['Weight', 'Remarks / Note / Maker', 'Revision', 'Color'], correctAnswer: 1, explanation: 'Maker data belongs in the descriptive auxiliary columns.' },
        { id: '2pl6', text: 'How do you handle "Bulk Items" like Glue or Tape in a Parts List?', options: ['Ignore them', 'Listed as "A/R" (As Required) or with a specific volume/length note', 'Drawn in 3D explicitly as a solid', 'They are not technical'], correctAnswer: 1, explanation: 'Non-geometric items still require procurement tracking.' },
        { id: '2pl7', text: 'Technical: What happens to the Parts List if a component is "Deleted" from the 3D model?', options: ['It remains in the list forever', 'It is removed from the Parts List after the next "Update/Sync"', 'A red X appears', 'The computer beeps'], correctAnswer: 1, explanation: 'Synchronized data ensures the BOM never lists ghost parts.' },
        { id: '2pl8', text: 'What defines a "Sub-Assembly" in the context of a Parts List?', options: ['A small part', 'A group of individual parts pre-assembled as a single line item in the main BOM', 'A broken part', 'A red part'], correctAnswer: 1, explanation: 'Hierarchical lists use sub-assemblies to simplify top-level drawings.' },
        { id: '2pl9', text: 'True or False: The Part Number in the BOM must match the Drawing Number in the Title Block for that specific part.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Consistent numbering is the only way to track parts through a factory.' },
        { id: '2pl10', text: 'Where is the "Parts List Style" (Column widths/Fonts) managed?', options: ['On the keyboard', 'In the BOM / Table Style Settings', 'Inside the 3D toolbar', 'At the local library'], correctAnswer: 1, explanation: 'Table styles maintain company-wide document uniformity.' }
      ]
    }
  },
  {
    id: '2d-balloon',
    title: 'Balloon',
    quiz: {
      title: 'Balloons & Item Identification',
      description: 'Mastering the linkage between layout geometry and procurement data.',
      questions: [
        { id: '2db1', text: 'What is the primary engineering purpose of "Balloons" (Item bubbles) in an assembly drawing?', options: ['To clarify part names', 'To link a physical part in the layout to its corresponding row in the Bill of Materials', 'To show the part weight', 'To hide small errors'], correctAnswer: 1, explanation: 'Balloons are the unique identifiers that bridge spatial data to alphanumeric parts lists.' },
        { id: '2db2', text: 'Technical: What is the standard alignment rule for a professional group of balloons?', options: ['They should be placed randomly to fill white space', 'They must be aligned along a common horizontal or vertical line for rapid legibility', 'They must all be the same color', 'They must touch the part'], correctAnswer: 1, explanation: 'Industrial drafting aesthetics require aligned labeling to prevent "visual noise".' },
        { id: '2db3', text: 'Through which command is a Balloon typically "Linked" to the part metadata in iCAD?', options: ['Line Tool', 'Balloon Tool / Attribute Link command', 'Scale', 'Hatch'], correctAnswer: 1, explanation: 'Linking ensures that if the BOM item number changes, the balloon updates automatically.' },
        { id: '2db4', text: 'If a component is re-sequenced (e.g., moved from #5 to #8) in the Parts List, what happens to the Balloon text?', options: ['It becomes blank', 'It updates automatically to "8" to maintain synchronization', 'It must be deleted and redrawn', 'The file crashes'], correctAnswer: 1, explanation: 'Associative balloons ensure data integrity across the entire document.' },
        { id: '2db5', text: 'Situational: Two parts (A and B) are identical and mirrored. Do they share a single balloon number?', options: ['Yes, always', 'No, they are distinct physical objects and require unique item numbers for tracking', 'Only if they are blue', 'Balloons are not used for mirrored parts'], correctAnswer: 1, explanation: 'Every unique physical part in a warehouse must have a unique identifier.' },
        { id: '2db6', text: 'Which visual style identifies a "Standard Part" (like a Bolt) balloon in some KEMCO standards?', options: ['Square balloon', 'Standard circular balloon with specific prefix or specialized note', 'Invisible balloon', 'A star shape'], correctAnswer: 1, explanation: 'Formatting helps identify non-manufactured items at a glance.' },
        { id: '2db7', text: 'Technical: What is a "Leader" in the context of ballooning?', options: ['The person in charge', 'The thin line connecting the balloon circle to the part edge', 'A type of hole', 'A color setting'], correctAnswer: 1, explanation: 'Leaders must terminate on a part edge (arrow) or surface (dot).' },
        { id: '2db8', text: 'True or False: Balloons should ideally be placed INSIDE the part geometry to save space.', options: ['True', 'False'], correctAnswer: 1, explanation: 'Balloons should be placed in clear space outside the part for maximum legibility.' },
        { id: '2db9', text: 'What does a "Stacked Balloon" signify (two bubbles touching vertically)?', options: ['Duplicate parts', 'Multiple components (e.g., a screw, washer, and nut) sharing a single common leader', 'A software error', 'Wait for next view'], correctAnswer: 1, explanation: 'Stacking simplifies drawing clarity for hardware stacks.' },
        { id: '2db10', text: 'Where is the "Balloon Settings" manager located?', options: ['In the Help menu', 'Inside the Dimension / Annotation settings (Style Manager)', 'On the desktop', 'In the login page'], correctAnswer: 1, explanation: 'Style managers govern the size, font, and circle-type of the labeling.' }
      ]
    }
  },
  {
    id: '2d-titleblock',
    title: 'Titleblock',
    content: ['Title block', 'metadata', 'Drawing Number', 'Scale', 'Unit', 'Revision Level', 'Projection Symbol', '3rd angle', 'Material field', 'AL6061', 'S35C', 'S45C', 'Tolerance Block', 'Drawn By', 'accountability', 'administrative info', 'company standards'],
    quiz: {
      title: 'Title Block Ownership & Compliance',
      description: 'Fulfilling the legal and technical requirements of the drawing border.',
      questions: [
        { id: '2dt1', text: 'Which specific information is strictly mandatory in a KEMCO "Title Block"?', options: ['Marketing slogans', 'Part Name, Part Number, Material, Scale, and Designer Name', 'Website URL', 'Weather data'], correctAnswer: 1, explanation: 'Title blocks are the "ID Card" of an engineering document.' },
        { id: '2dt2', text: 'Technical: What does a "Scale 1:2" entry in the Title Block mathematically confirm?', options: ['The part is half its real-world size on paper', 'The part is twice its real size', 'The part is 1.2 meters long', 'The part is deleted'], correctAnswer: 0, explanation: 'Scales define the ratio of physical reality to paper-space.' },
        { id: '2dt3', text: 'Where is the Title Block standardly placed on a professional engineering sheet?', options: ['Top-Left', 'Bottom-Right corner', 'In the center', 'Floating'], correctAnswer: 1, explanation: 'Standardization allows for rapid identification when sheets are folded.' },
        { id: '2dt4', text: 'How are the "Material" and "Weight" fields in the title block standardly populated in iCAD?', options: ['Manually typed every time', 'Automatically extracted from the 3D Part properties', 'Calculated by hand', 'They are not required'], correctAnswer: 1, explanation: 'Integration ensures that physical data in 3D is never mismatched in 2D.' },
        { id: '2dt5', text: 'technical: What is a "Block" in the context of the iCAD Title Block tool?', options: ['A red square', 'A reusable template of lines and attributes stored for multiple uses', 'A computer error', 'A heavy part'], correctAnswer: 1, explanation: 'Templates (Blocks) ensure that every drawing in the company shares the same look.' },
        { id: '2dt6', text: 'Situational: The "Date" in the title block is wrong. Where is the most professional place to edit it?', options: ['Using the Paint tool', 'Editing the Drawing Property attributes or Title Block data-entry dialog', 'Sticking a label on the monitor', 'It doesn\'t matter'], correctAnswer: 1, explanation: 'Attribute editing ensures the underlying database is accurate.' },
        { id: '2dt7', text: 'What does "JIS" signifying in the corner of a title block?', options: ['Just In Space', 'Japanese Industrial Standard (Compliance with national engineering rules)', 'Junior Instructor Sample', 'Joint Iron Solid'], correctAnswer: 1, explanation: 'JIS compliance is a legal requirement for KEMCO customers.' },
        { id: '2dt8', text: 'True or False: Every individual part in an assembly must have its own unique Drawing Number in the Title Block.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Unique numbering prevents the wrong parts from being manufactured.' },
        { id: '2dt9', text: 'Technical: What is the "Tolerance Note" (e.g., General Tol ±0.1) often found near the Title Block?', options: ['A joke', 'The default manufacturing accuracy for any dimension not specifically toleranced', 'The file size', 'The color of the ink'], correctAnswer: 1, explanation: 'General tolerances govern the bulk of the machine\'s manufacturing quality.' },
        { id: '2dt10', text: 'Can a Title Block include a "Company Logo" image?', options: ['No', 'Yes, it is a standard branding requirement in industrial templates', 'Only in 3D', 'Only in color'], correctAnswer: 1, explanation: 'Templates standardly include corporate identifiers.' }
      ]
    }
  },
  {
    id: '2d-additional-view',
    title: 'Additional View',
    content: ['Auxiliary View', 'Partial View', 'True Shape', 'inclined face', 'Broken-out Section', 'View Break', 'Detail View', 'Section View', 'magnified area', 'Removed Section', 'cutting plane', 'localized details', 'view enlargement'],
    children: [
      { id: '2d-additional-view-1', title: 'Cross Section View', content: ['inclined surfaces', 'true shape projection'] },
      { id: '2d-additional-view-2', title: 'Partial Section & Detail Drawing', content: ['broken-out cutouts', 'view shortening'] },
      { id: '2d-additional-view-3', title: 'Isometric View & Cross-sectional depth', content: ['magnification', 'offset sections'] },
      { id: '2d-additional-view-4', title: 'Trim', content: ['view trimming', 'detail view restrictions'] },
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
    title: 'Operate View',
    content: ['Operate View', 'Operation Drawing', 'manufacturing steps', 'setup dimensions', 'stock outline', 'in-process inspection', 'machining datums', 'process sequence', 'factory station guidance'],
    children: [
      { id: '2d-operal-view-1', title: 'Move, Isometric, and Orthographic view', content: ['move', 'isometric view', 'orthographic view'] },
      { id: '2d-operal-view-2', title: 'Delete View', content: ['delete view', 'delete view in 2d'] },
    ],
    quiz: {
      title: 'Manufacturing Operation Views',
      description: 'Understanding process-specific drawing layouts.',
      questions: [
        { id: '2ov1', text: 'What is an "Operation Drawing" (Operate View)?', options: ['A drawing for surgery', 'A drawing that shows the part state at a specific manufacturing step (e.g., after turning)', 'A final assembly', 'A 3D model'], correctAnswer: 1, explanation: 'Operation drawings guide individual factory stations.' },
        { id: '2ov2', text: 'Technical: What are "Setup Dimensions"?', options: ['Final sizes', 'Dimensions required specifically for setting up the machine tool for an operation', 'Color codes', 'File paths'], correctAnswer: 1, explanation: 'Setup dimensions help the machinist position the raw stock.' },
        { id: '2ov3', text: 'Situational: A part needs to be Heat Treated then Ground. How many operation states are there?', options: ['1', '2 (Pre-heat treat and Post-heat treat/grind)', '0', '10'], correctAnswer: 1, explanation: 'Each significant process state may require its own view/control.' },
        { id: '2ov4', text: 'What does a "Stock Outline" represent in an operation view?', options: ['The final part', 'The original raw material shape (e.g., bar stock) using phantom lines', 'A box', 'A hole'], correctAnswer: 1, explanation: 'Visualizing the stock helps identify material removal zones.' },
        { id: '2ov5', text: 'Technical: What is "In-process Inspection"?', options: ['Checking the part after it is shipped', 'Measuring critical dimensions DURING the manufacturing sequence', 'Checking the computer', 'None'], correctAnswer: 1, explanation: 'Saves cost by catching errors before finishing.' },
        { id: '2ov6', text: 'Situational: An operation requires a specific specialized jig. Is it shown in the Operate View?', options: ['Never', 'Often yes, as a light/phantom reference to show how the part is held', 'Always in 3D', 'In the notes only'], correctAnswer: 1, explanation: 'Tooling references clarify the manufacturing setup.' },
        { id: '2ov7', text: 'Which information is prioritized in an Operate View?', options: ['Administrative data', 'The dimensions being created in THIS specific operation', 'Hidden lines', 'BOM'], correctAnswer: 1, explanation: 'Operator focus should be on their immediate task.' },
        { id: '2ov8', text: 'Technical: What is a "Datum for Machining"?', options: ['The same as the design datum', 'Specific surfaces used to locate the part in a fixture', 'A date', 'A name'], correctAnswer: 1, explanation: 'Machining datums must be physically accessible during the cut.' },
        { id: '2ov9', text: 'Situational: You need to specify a turning speed for an operation. Where does it go?', options: ['In the Title Block', 'In the Operation Note or CNC instruction header', 'On the dimension', 'Nowhere'], correctAnswer: 1, explanation: 'Process parameters are operation-specific data.' },
        { id: '2ov10', text: 'True or False: Operation Drawings are often simplified versions of the final engineering drawing.', options: ['True', 'False'], correctAnswer: 0, explanation: 'Simplification reduces cognitive load for the factory floor.' }
      ]
    }
  },
  {
    id: '2d-normal-mirror',
    title: 'Normal/Mirror Parts',
    children: [
      { id: '2d-normal-mirror-1', title: 'Normal & Mirror Parts', content: ['normal parts', 'mirror parts', 'rule on how to detail a mirror parts'] },
      { id: '2d-normal-mirror-2', title: 'Mirror command on detailing', content: ['mirror command', 'mirror parts', 'rule on how to detail a mirror parts'] }
    ],
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
      description: 'Mastering parametric hardware insertion and industrial part catalogs.',
      questions: [
        { id: 'sl1', text: 'How does using the "Standard Part Library" affect project lifecycle efficiency?', options: ['It slows down the computer', 'It eliminates the need to manually model common hardware and ensures BOM consistency', 'It highlights the parts in red', 'It changes the unit from mm to inches'], correctAnswer: 1, explanation: 'Libraries contain pre-verified geometry and metadata for consistent procurement.' },
        { id: 'sl2', text: 'Technical: Which national standard is the default for KEMCO hardware in iCAD?', options: ['ANSI (American)', 'JIS (Japanese Industrial Standards)', 'ISO (International)', 'DIN (German)'], correctAnswer: 1, explanation: 'As a Japanese-centric design house, KEMCO primarily utilizes JIS hardware.' },
        { id: 'sl3', text: 'Situational: You need to insert an M8 x 25 Socket Head Cap Screw. How are the dimensions specified?', options: ['By sketching them 1:1', 'Selecting the M8 Nominal Diameter and 25mm length from the library configuration dialog', 'Scaling a generic bolt', 'Typing "BOLT" in the command line'], correctAnswer: 1, explanation: 'Standard parts are configured via drop-down selection of standard sizes.' },
        { id: 'sl4', text: 'What is the "Category Tree" used for in the Library Manager?', options: ['To organize components by type (e.g., Bearings, Screws, Rings) for rapid navigation', 'To show the computer file structure', 'To delete files', 'To draw trees'], correctAnswer: 0, explanation: 'Hierarchical categorization allows users to find hardware by mechanical class.' },
        { id: 'sl5', text: 'Technical: What is "Parametric Scaling" in a standard library part?', options: ['The part is a non-editable group', 'The part geometry automatically adjusts its 2D/3D profile based on selected numerical parameters (Size/Length)', 'The part is a 2D image only', 'The part cannot be moved'], correctAnswer: 1, explanation: 'Parametric parts use logic to "build" the geometry on the fly from standard tables.' },
        { id: 'sl6', text: 'Situational: A specialized Misumi part is not in the built-in library. What is the professional workflow?', options: ['Draw a approximate box', 'Import a 3D STEP file from the vendor and manually assign it to the Parts List', 'Ignore it until the end', 'Use a different bolt'], correctAnswer: 1, explanation: 'External vendor parts must be imported but still correctly documented in the assembly.' },
        { id: 'sl7', text: 'Where is the "Insertion Point" for a standard fastener typically anchored?', options: ['At the very tip of the thread', 'At the base of the head (the seating surface)', 'Floating in space', 'The center of gravity'], correctAnswer: 1, explanation: 'Base-of-head anchoring allows for precise placement on a mounting face.' },
        { id: 'sl8', text: 'Technical: How does an "Automatic BOM Link" function for library parts?', options: ['It sends an email', 'It populates the Parts List with Name, Standard #, and Size without manual text entry', 'It calculates the price', 'It deletes the part if the BOM is full'], correctAnswer: 1, explanation: 'Library parts carry embedded attributes that the BOM manager reads automatically.' },
        { id: 'sl9', text: 'Situational: You need to change all M6 bolts to M8. What is the fastest method?', options: ['Delete and replace one-by-one', 'Use the "Edit Standard Part" or "Replace Part" command to update the size globally', 'Move the lines manually', 'Restart the drawing'], correctAnswer: 1, explanation: 'iCAD\'s parametric nature allows for rapid hardware revision.' },
        { id: 'sl10', text: 'What does the code "JIS B 1176" typically refer to in the iCAD Library?', options: ['A coordinate point', 'The specific standard for Hexagon Socket Head Cap Screws', 'The designer\'s ID', 'The software version'], correctAnswer: 1, explanation: 'B 1176 is the official Japanese standard for high-strength socket fasteners.' }
      ]
    }
  }
];
