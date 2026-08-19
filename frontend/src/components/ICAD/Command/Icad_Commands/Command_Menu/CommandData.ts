import { TorusGeometry } from "three";

export interface MenuItem {
    label: string;
    shortcut?: string;
    description?: string;  // What this command does (1–2 sentences for Engineering)
    tip?: string;          // Optional usage tip shown below the description
    hasSubmenu?: boolean;
    isDivider?: boolean;
    children?: MenuItem[];
}

export interface PositionConfig {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
    w: number; // percentage (0-100)
    h: number; // percentage (0-100)
}

export interface SpotlightConfig {
    label: string;
    normalPos: PositionConfig;
    fullscreenPos: PositionConfig; // Independent config for fullscreen
    menuItems: MenuItem[];
    spotlightH?: number; // Optional multiplier for rendered spotlight height (e.g. 0.5 = half height)
}

// --------------------------------------------------------
// Command Menu icon grid — 3 columns x 4 rows (12 icons)
// Sizes here match the original video tutorial's spotlight
// dimensions (pxW: 40, pxH: 36/38/40 per row) converted straight
// to percentages — no square correction, no scaling.
// No dropdown content — spots are highlight-only, so menuItems is [].
// --------------------------------------------------------

export const DRAW_ITEMS: MenuItem[] = [

    {
        label: "Basic Lines",
        description: "Draws a straight line between any two points on the canvas.",
        tip: "The most-used drawing tool. Start here for part outlines, centerlines, and construction geometry.",
    },
    {
        label: "Parallel and Perpendicular",
        description: "Draws a line exactly parallel or perpendicular to an existing line at a specified distance.",
        tip: "Use this instead of Basic Lines when you need precise geometric relationships to existing edges.",
    },
    {
        label: "Horizontal Lines",
        description: "Draws a perfectly horizontal line (locked to 0°) between two points.",
        tip: "Useful for baseline references and horizontal features where the angle must be exact.",
    },
    {
        label: "Vertical Lines",
        description: "Draws a perfectly vertical line (locked to 90°) between two points.",
        tip: "Use for vertical centerlines, wall edges, and any feature that must be exactly plumb.",
    },
    {
        label: "Angle Lines",
        description: "Draws a line at a specified angle. You enter the angle value and the line is locked to it.",
        tip: "Ideal for inclined surfaces, chamfer lead-in lines, and angled reference geometry.",
    },
    {
        label: "Free Curves",
        description: "Draws smooth curved lines by placing a series of points that the curve passes through.",
        tip: "Use for organic shapes, cam profiles, and freeform contours that cannot be expressed as simple arcs.",
    },
    {
        label: "Circles with Center Points",
        description: "Draws a circle by specifying its center point and radius.",
        tip: "The standard method for holes, bosses, and round features. Fastest when you know the center location.",
    },
    {
        label: "Circles Through Points",
        description: "Draws a circle that passes through 2 or 3 specified points, calculating the center automatically.",
        tip: "Use when you know the boundary of the circle but not the center — common for bolt-circle references.",
    },
    {
        label: "Text Input", hasSubmenu: true,
        description: "Adds annotation text or dimension labels to the drawing.",
        tip: "Choose Frame Layout for text inside a defined box, or Point Layout for free-floating text.",
        children: [
            {
                label: "Frame Layout", hasSubmenu: true,
                children: [
                    { label: "Horizontal Writing" },
                    { label: "Vertical Writing" },
                    { label: "Even Horizontal" },
                    { label: "Left-aligned" },
                    { label: "Centered" },
                    { label: "Right-aligned" },
                    { label: "Even Vertical" },
                    { label: "Top-aligned" },
                    { label: "Centered" },
                    { label: "Bottom-aligned" },
                    { label: "Dimension Text" },
                    { label: "Text 1" },
                    { label: "Text 2" },
                    { label: "Text 3" },
                ]
            },
            {
                label: "Point Layout", hasSubmenu: true,
                children: [
                    { label: "Horizontal Text" },
                    { label: "Vertical Text" },
                    { label: "┌ ・ ┐" },
                    { label: "・ Reference ・" },
                    { label: "└ ・ ┘" },
                    { label: "Dimension Text" },
                    { label: "Text 1" },
                    { label: "Text 2" },
                    { label: "Text 3" },
                ]
            },
            {
                label: "Text String Editing", hasSubmenu: true,
                children: [
                    {
                        label: "Alignment Text", hasSubmenu: true,
                        children: [
                            {
                                label: "Vertical Alignment", hasSubmenu: true,
                                children: [
                                    { label: "Text String" },
                                    { label: "String Text" },
                                ]
                            },
                            {
                                label: "Horizontal Alignment", hasSubmenu: true,
                                children: [
                                    { label: "Text String" },
                                    { label: "String Text" },
                                ]
                            },
                            { label: "Line Spacing" },

                        ]
                    },
                    { label: "Modification" },
                    {
                        label: "Frame Modification ", hasSubmenu: true,
                        children: [
                            { label: "Horizontal Justification" },
                            { label: "Left-aligned" },
                            { label: "Centered" },
                            { label: "Right-aligned" },
                            { label: "Vertical Justification" },
                            { label: "Top-aligned" },
                            { label: "Centered" },
                            { label: "Bottom-aligned" },
                        ]
                    },
                    { label: "Merge" },
                    {
                        label: "Size Modification Line", hasSubmenu: true,
                        children: [
                            { label: "Dimension Text" },
                            { label: "Text 1" },
                            { label: "Text 2" },
                            { label: "Text 3" },
                            {
                                label: "Optional", hasSubmenu: true,
                                children: [
                                    { label: "Inherit Text Size" },
                                ]
                            },
                        ]
                    },
                    { label: "Spacing Modification" },

                ]
            },

        ]
    },
    {
        label: "Advanced Drawing",
        description: "Access advanced line and shape drawing tools beyond basic geometry, such as splines and complex curves.",
        tip: "Use when Basic Lines, circles, and angles are not enough to describe complex part geometry.",
    },
    {
        label: "Cut and Join",
        description: "Trims two lines to meet at their intersection point, or joins two separate line segments into one.",
        tip: "Essential for cleaning up intersecting geometry. Use Cut to remove overhanging ends, Join to merge gaps.",
    },
    {
        label: "Offset",
        description: "Creates a new line or curve parallel to and at a fixed distance from an existing element.",
        tip: "Quickly generates wall thickness, slot widths, and tolerance boundaries without recalculating coordinates.",
    },
    {
        label: "Roundness",
        description: "Adds a smooth arc (fillet) between two intersecting lines at a specified radius.",
        tip: "Use on inside corners to reduce stress concentration and on outside corners for machining clearance.",
    },
    {
        label: "Chamfer",
        description: "Replaces a sharp corner with a straight angled cut at a specified distance or angle.",
        tip: "Use for deburring edges on machined parts. Chamfers are preferred over fillets on bolt-entry holes.",
    },
    {
        label: "Shape Extraction",
        description: "Extracts the outline of a closed region as a standalone shape element.",
        tip: "Useful for hatching areas, calculating areas, or isolating a region for further editing.",
    },
    {
        label: "Stretch and Shrink",
        description: "Scales part of a drawing by stretching or compressing it along one axis.",
        tip: "Adjust length dimensions without redrawing. Select a region and drag to resize proportionally.",
    },
    {
        label: "Advanced Editing",
        description: "Access advanced element editing tools such as break, split, and partial deletion.",
        tip: "Use when standard cut/join operations are not precise enough for complex editing tasks.",
    },
    {
        label: "Variable",
        description: "Defines parametric variables that can drive dimensions and geometry across the drawing.",
        tip: "Set up variables for frequently-changed dimensions (e.g. hole size, plate thickness) to enable quick design updates.",
    },
    {
        label: "Move", hasSubmenu: true,
        description: "Moves selected drawing elements to a new location using Translation, Rotation, Mirror, or Scaling.",
        tip: "Use Translation to shift by XY distance, Rotation to spin around a point, Mirror for symmetric features.",
        children: [
            {
                label: "Translation", hasSubmenu: true,
                children: [
                    { label: "Continuous Placement" },
                    { label: "Part Components" },
                    { label: "Hole-Axis Search" },
                ]
            },
            {
                label: "Rotation", hasSubmenu: true,
                children: [
                    { label: "Continuous Placement" },
                    { label: "Part Components" },
                    { label: "Hole-Axis Search" },
                ]
            },
            {
                label: "Mirror", hasSubmenu: true,
                children: [
                    { label: "Parts Components" },
                    { label: "Hole-Shaft Search" },
                ]
            },
            {
                label: "Scaling", hasSubmenu: true,
                children: [
                    { label: "Dimension Value Tracking" },
                    { label: "Text Size Inheritance" },
                    { label: "Part Components" },
                    { label: "Hole-Axis Search" },

                ]
            },

        ]
    },
    {
        label: "Copy", hasSubmenu: true,
        description: "Duplicates selected elements using Parallel, Rotate, Mirror, or Scale Copy methods.",
        tip: "Use Mirror Copy for symmetric parts to save half the drawing effort. Scale Copy for enlarged details.",
        children: [
            {
                label: "Parallel Copy", hasSubmenu: true,
                children: [
                    { label: "Batch Placement" },
                    { label: "Delete Original Drawing" },
                    { label: "Inherit Attributes" },
                    { label: "Inherit Layers" },
                    { label: "Inherit Hierarchy" },
                    { label: "Inherit Groups" },
                    { label: "Part Components" },
                    { label: "Hole Axis Search" },
                ]
            },
            {
                label: "Rotate Copy", hasSubmenu: true,
                children: [
                    { label: "Batch Placement" },
                    { label: "Delete Original Drawing" },
                    { label: "Inherit Attributes" },
                    { label: "Inherit Layers" },
                    { label: "Inherit Hierarchy" },
                    { label: "Inherit Groups" },
                    { label: "Part Components" },
                    { label: "Hole Axis Search" },
                ]
            },
            {
                label: "Mirror Copy", hasSubmenu: true,
                children: [
                    { label: "Delete Original Drawing" },
                    { label: "Inherit Attributes" },
                    { label: "Inherit Layers" },
                    { label: "Inherit Hierarchy" },
                    { label: "Inherit Groups" },
                    { label: "Part Components" },
                    { label: "Hole Axis Search" },
                ]
            },
            {
                label: "Copy Between Windows", hasSubmenu: true,
                children: [
                    { label: "Delete Original Drawing" },
                    { label: "Inherit Attributes" },
                    { label: "Inherit Layers" },
                    { label: "Inherit Groups" },
                    { label: "Part Components" },
                    { label: "Hole Axis Search" },
                ]
            },
            { label: "View Copy" },
            {
                label: "Scale Copy", hasSubmenu: true,
                children: [
                    { label: "Dimension Value Preservation" },
                    { label: "Text Size Preservation" },
                    { label: "Delete Original Drawing" },
                    { label: "Attribute Preservation" },
                    { label: "Layer Preservation" },
                    { label: "Hierarchy Preservation" },
                    { label: "Group Preservation" },
                    { label: "Part Components" },
                    { label: "Hole Axis Search" },
                ]
            },
        ]
    },
    {
        label: "Change Attributes", hasSubmenu: true,
        description: "Modifies properties of existing elements such as line type, line weight, color, and layer.",
        tip: "Use to standardize line styles across the drawing without redrawing. Select by element type for batch changes.",
        children: [
            {
                label: "Arbitrary Elements", hasSubmenu: true,
                children: [
                    { label: "Attribute Reference" },
                    { label: "Part Components" },
                ]
            },
            {
                label: "Drawing Elements", hasSubmenu: true,
                children: [
                    { label: "Specify None" },
                    { label: "Solid Line" },
                    { label: "Dotted Line" },
                    { label: "Dashed Line" },
                    { label: "Long Dashed Line" },
                    { label: "Single-dot Locked Line" },
                    { label: "Double-dot Locked Line" },
                    { label: "Specify None" },
                    { label: "Thick Line" },
                    { label: "Medium Line" },
                    { label: "Thin Line" },
                    { label: "See Properties" },
                    { label: "Part Components" },
                ]
            },
            {
                label: "Dimension Lines", hasSubmenu: true,
                children: [
                    {
                        label: "Dimension Lines", hasSubmenu: true,
                        children: [
                            { label: "Dimension Lines" },
                            { label: "None specified" },
                            { label: "<< >>" },
                            { label: "None specified" },
                            { label: "Thick Line" },
                            { label: "Medium Line" },
                            { label: "Thin Line" },
                            { label: "See Attributes" },
                        ]
                    },
                    {
                        label: "End Markers", hasSubmenu: true,
                        children: [
                            { label: "Dimension Lines" },
                            { label: "End Markers" },
                            { label: "Arrows and Black Circles" },
                            { label: "Arrow Attributes" },
                            { label: "Black Circle Attributes" },
                            { label: "See Attributes" },
                        ]
                    },
                ]
            },
            { label: "Text", hasSubmenu: true },
            { label: "Layer FC Solid", hasSubmenu: true },
            { label: "Transparent Arbitrary Surface", hasSubmenu: true },
            { label: "Not Specified", hasSubmenu: true },
            { label: "<< >>", hasSubmenu: true },
        ]
    },
    {
        label: "Delete", hasSubmenu: true,
        children: [
            {
                label: "Optional", hasSubmenu: true,
                children: [
                    { label: "Part Components" },
                    { label: "Hole-Axis Search" },
                ]
            },
            { label: "Type" },
            { label: "Face Deletion" },
        ]
    },
];
export const DRAFTING_ITEMS: MenuItem[] = [
    {
        label: "Length Dimensions", hasSubmenu: true,
        description: "Adds linear dimension annotations to measure straight distances between two points.",
        tip: "Use Standard for normal dimensions. Use Centerline for center-to-center measurements.",
        children: [
            {
                label: "Standard", hasSubmenu: true,
                children: [
                    {
                        label: "Any Position", hasSubmenu: true,
                        children: [
                            { label: "None" },
                            { label: "φ" },
                            { label: "R" },
                            { label: "□" },
                            { label: "t" },
                            { label: "M" },
                            { label: "Any Symbol" },
                            { label: "Text Position: Any" },
                            { label: "Follow End Symbol" },
                        ]
                    },
                    {
                        label: "Align Entire Column", hasSubmenu: true,
                        children: [
                            { label: "None" },
                            { label: "φ" },
                            { label: "R" },
                            { label: "□" },
                            { label: "t" },
                            { label: "M" },
                            { label: "Any Symbol" },
                        ]
                    },
                    {
                        label: "Space Entire Column", hasSubmenu: true,
                        children: [
                            { label: "None" },
                            { label: "φ" },
                            { label: "R" },
                            { label: "□" },
                            { label: "t" },
                            { label: "M" },
                            { label: "Any Symbol" },
                        ]
                    },
                ]
            },
            {
                label: "Centerline", hasSubmenu: true,
                children: [
                    {
                        label: "Standard", hasSubmenu: true,
                        children: [
                            {
                                label: "Any Position", hasSubmenu: true,
                                children: [
                                    { label: "None" },
                                    { label: "φ" },
                                    { label: "R" },
                                    { label: "□" },
                                    { label: "t" },
                                    { label: "M" },
                                    { label: "Any Symbol" },
                                    { label: "Text Position: Any" },
                                    { label: "Follow End Symbol" },
                                ]
                            },
                            {
                                label: "Align Entire Column", hasSubmenu: true,
                                children: [
                                    { label: "None" },
                                    { label: "φ" },
                                    { label: "R" },
                                    { label: "□" },
                                    { label: "t" },
                                    { label: "M" },
                                    { label: "Any Symbol" },
                                ]
                            },
                            {
                                label: "Space Entire Column", hasSubmenu: true,
                                children: [
                                    { label: "None" },
                                    { label: "φ" },
                                    { label: "R" },
                                    { label: "□" },
                                    { label: "t" },
                                    { label: "M" },
                                    { label: "Any Symbol" },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                label: "In-line", hasSubmenu: true,
                children: [
                    {
                        label: "Create", hasSubmenu: true,
                        children: [
                            { label: "Any Position" },
                            { label: "Full-column Position" },
                            { label: "Full-column Spacing" },
                            { label: " ", isDivider: true },
                            { label: "Feature Orientation" },
                            { label: "Horizontal" },
                            { label: "Vertical" },
                            { label: " ", isDivider: true },
                            { label: "None" },
                            { label: "φ" },
                            { label: "R" },
                            { label: "□" },
                            { label: "t" },
                            { label: "M" },
                            { label: "Any Symbol" },
                            { label: " ", isDivider: true },
                            { label: "1-segment" },
                            { label: "2-segment" },
                            { label: " ", isDivider: true },
                            { label: "Automatic Correction" },
                        ]
                    },
                    { label: "Auto-Correction" },
                    { label: "Add" },
                    { label: "Merge" },
                ]
            },
            {
                label: "Side-by-side", hasSubmenu: true,
                children: [
                    { label: "Any Position" },
                    { label: "Full-column Position" },
                    { label: "Full-column Spacing" },
                    { label: " ", isDivider: true },
                    { label: "Feature Orientation" },
                    { label: "Horizontal" },
                    { label: "Vertical" },
                    { label: " ", isDivider: true },
                    { label: "None" },
                    { label: "φ" },
                    { label: "R" },
                    { label: "□" },
                    { label: "t" },
                    { label: "M" },
                    { label: "Any Symbol" },
                ]
            },
            {
                label: "Progressive", hasSubmenu: true,
                children: [
                    {
                        label: "Create", hasSubmenu: true,
                        children: [
                            { label: "Any Position" },
                            { label: "Align by Position" },
                            { label: "Align by Spacing" },
                            { label: " ", isDivider: true },
                            { label: "Vertical Orientation" },
                            { label: "Horizontal Orientation" },
                            { label: " ", isDivider: true },
                            { label: "None" },
                            { label: "φ" },
                            { label: "R" },
                            { label: "□" },
                            { label: "t" },
                            { label: "M" },
                            { label: "Any Symbol" },
                            { label: " ", isDivider: true },
                            { label: "0 = Show" },
                            { label: "Hide" },
                            { label: " ", isDivider: true },
                            { label: "Auto Layout Adjustment" },
                        ]
                    },
                    {
                        label: "Adjust Layout", hasSubmenu: true,
                        children: [
                            { label: "Apply Correction" },
                            { label: "Cancel Correction" },
                        ]
                    },
                    { label: "Add" },
                    {
                        label: "Delete", hasSubmenu: true,
        description: "Removes selected drafting annotations such as dimensions, notes, or symbols from the drawing.",
        tip: "Check Dimension Value Tracking option to also remove associated values when deleting.",
                        children: [
                            { label: "Delete Some" },
                            { label: "Delete All" },
                        ]
                    },
                    {
                        label: "Guides", hasSubmenu: true,
                        children: [
                            { label: "Add Bend" },
                            { label: "Remove Bend" },
                            { label: "Modify Bend" },
                        ]
                    },
                ]
            },
            {
                label: "Reference", hasSubmenu: true,
                children: [
                    { label: "Any position" },
                    { label: "Entire column of positions" },
                    { label: "Entire column of spacing" },
                    { label: " ", isDivider: true },
                    { label: "None" },
                    { label: "φ" },
                    { label: "R" },
                    { label: "□" },
                    { label: "t" },
                    { label: "M" },
                    { label: "Any symbol" },
                ]
            },
            {
                label: "Mold", hasSubmenu: true,
                children: [
                    {
                        label: "Apply Layout", hasSubmenu: true,
                        children: [
                            { label: "Any Position" },
                            { label: "Align by Position" },
                            { label: "Align by Spacing" },
                            { label: "", isDivider: true },
                            { label: "None" },
                            { label: "φ" },
                            { label: "R" },
                            { label: "□" },
                            { label: "t" },
                            { label: "M" },
                            { label: "Any Symbol" },
                            { label: "", isDivider: true },
                            { label: "0 = Show" },
                            { label: "Do Not Show" },
                            { label: "", isDivider: true },
                            { label: "Auto Layout Correction" },
                        ]
                    },
                    {
                        label: "Correction", hasSubmenu: true,
                        children: [
                            { label: "Apply Correction" },
                            { label: "Cancel Correction" },
                        ]
                    },
                    { label: "Add" },
                    {
                        label: "Delete", hasSubmenu: true,
                        children: [
                            { label: "Delete Some" },
                            { label: "Delete All" },
                        ]
                    },
                    {
                        label: "Guides", hasSubmenu: true,
                        children: [
                            { label: "Add Bend" },
                            { label: "Remove Bend" },
                            { label: "Modify Bend" },
                        ]
                    },
                ]
            },
        ]
    },
    {
        label: "Diameter Dimensions", hasSubmenu: true,
        description: "Annotates the diameter of circles and arcs with a Ø symbol and value.",
        tip: "Use Diameter for full circles, Radius for arcs. Place on the view that best shows the feature.",
        children: [
            {
                label: "Diameter", hasSubmenu: true,
                children: [
                    {
                        label: "Both Sides", hasSubmenu: true,
                        children: [
                            { label: "φ" },
                            { label: "Sphere φ" },
                            { label: "Sφ" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: "Text at Any Position" },
                            { label: "Specified Angle" },
                            { label: "Follow End Symbol" },
                        ]
                    },
                    {
                        label: "One Side", hasSubmenu: true,
                        children: [
                            { label: "φ" },
                            { label: "Sphere φ" },
                            { label: "Sφ" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: "Text at Any Position" },
                            { label: "Specified Angle" },
                        ]
                    },
                    {
                        label: "Lead-out", hasSubmenu: true,
                        children: [
                            { label: "φ" },
                            { label: "Sphere φ" },
                            { label: "Sφ" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: " ", isDivider: true },
                            { label: "Angle specified" },
                        ]
                    },
                    {
                        label: "No Dimension Line", hasSubmenu: true,
                        children: [
                            { label: "φ" },
                            { label: "Sphere φ" },
                            { label: "Sφ" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                        ]
                    },
                    {
                        label: "Between Two Points", hasSubmenu: true,
                        children: [
                            { label: "Any Position" },
                            { label: "Align Entire Column" },
                            { label: "Space Entire Column" },
                            { label: " ", isDivider: true },
                            { label: "Feature Orientation" },
                            { label: "Horizontal" },
                            { label: "Vertical" },
                            { label: " ", isDivider: true },
                            { label: "φ" },
                            { label: "Sphere φ" },
                            { label: "Sφ" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: " ", isDivider: true },
                            { label: "Text Position" },
                            { label: "Follow End Marker" },
                        ]
                    },
                    {
                        label: "Centerline", hasSubmenu: true,
                        children: [
                            { label: "Any position" },
                            { label: "Entire column position" },
                            { label: "Entire column spacing" },
                            { label: " ", isDivider: true },
                            { label: "φ" },
                            { label: "Sphere φ" },
                            { label: "Sφ" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: " ", isDivider: true },
                            { label: "Text in any position" },
                            { label: "Follow terminal symbols" },
                        ]
                    },
                ]
            },
            {
                label: "Radius", hasSubmenu: true,
                children: [
                    {
                        label: "Standard", hasSubmenu: true,
                        children: [
                            { label: "Dimension Values Displayed" },
                            { label: "Dimension Values Hidden" },
                            { label: " ", isDivider: true },
                            { label: "Center Alignment" },
                            { label: " ", isDivider: true },
                            { label: "R" },
                            { label: "Ball R" },
                            { label: "S R" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: " ", isDivider: true },
                            { label: "Text Position: Any" },
                            { label: "Angle Specified" },
                        ]
                    },
                    {
                        label: "Lightning Bolt", hasSubmenu: true,
                        children: [
                            { label: "Dimension Values Displayed" },
                            { label: "Dimension Values Hidden" },
                            { label: " ", isDivider: true },
                            { label: "R" },
                            { label: "Ball R" },
                            { label: "S R" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                        ]
                    },
                    {
                        label: "Leads", hasSubmenu: true,
                        children: [
                            { label: "Dimension Values Displayed" },
                            { label: "Dimension Values Hidden" },
                            { label: " ", isDivider: true },
                            { label: "R" },
                            { label: "Ball R" },
                            { label: "S R" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: " ", isDivider: true },
                            { label: "Angle Specified" },
                        ]
                    },
                    {
                        label: "No dimension lines", hasSubmenu: true,
                        children: [
                            { label: "Dimension Values Displayed" },
                            { label: "Dimension Values Hidden" },
                            { label: " ", isDivider: true },
                            { label: "R" },
                            { label: "Ball R" },
                            { label: "S R" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                        ]
                    },
                    {
                        label: "Minor 1", hasSubmenu: true,
                        children: [
                            { label: "Dimension Values Displayed" },
                            { label: "Dimension Values Hidden" },
                            { label: " ", isDivider: true },
                            { label: "R" },
                            { label: "Ball R" },
                            { label: "S R" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: " ", isDivider: true },
                            { label: "Angle Specified" },
                        ]
                    },
                    {
                        label: "Minor 2", hasSubmenu: true,
                        children: [
                            { label: "Dimension Values Displayed" },
                            { label: "Dimension Values Hidden" },
                            { label: " ", isDivider: true },
                            { label: "R" },
                            { label: "Ball R" },
                            { label: "S R" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: " ", isDivider: true },
                            { label: "Angle Specified" },
                        ]
                    },
                    {
                        label: "Centerline", hasSubmenu: true,
                        children: [
                            { label: "Any Position" },
                            { label: "Align to Column" },
                            { label: "Spacing to Column" },
                            { label: " ", isDivider: true },
                            { label: "Dimension Values Displayed" },
                            { label: "Dimension Values Hidden" },
                            { label: " ", isDivider: true },
                            { label: "R" },
                            { label: "Radius R" },
                            { label: "S R" },
                            { label: "None" },
                            { label: "M" },
                            { label: "Any" },
                            { label: " ", isDivider: true },
                            { label: "Text at Any Position" },
                            { label: "Follow End Marker" },
                        ]
                    },
                ]
            },

        ]
    },
    {
        label: "Angle Dimensions", hasSubmenu: true,
        description: "Annotates the angle between two lines or the sweep of an arc in degrees.",
        tip: "Use Standard for general angles, Horizontal or Vertical when the angle is referenced to a specific axis.",
        children: [
            {
                label: "Standard", hasSubmenu: true,
                children: [
                    { label: "Any position" },
                    { label: "Align to column" },
                    { label: "Space to column" },
                    { label: " ", isDivider: true },
                    { label: "Normal" },
                    { label: "Acute angle" },
                    { label: "Obtuse angle" },
                ]
            },
            {
                label: "Horizontal", hasSubmenu: true,
                children: [
                    { label: "Any position" },
                    { label: "Align to column" },
                    { label: "Space to column" },
                    { label: " ", isDivider: true },
                    { label: "Normal" },
                    { label: "Acute angle" },
                    { label: "Obtuse angle" },
                ]
            },
            {
                label: "Vertical", hasSubmenu: true,
                children: [
                    { label: "Any position" },
                    { label: "Align to column" },
                    { label: "Space to column" },
                    { label: " ", isDivider: true },
                    { label: "Normal" },
                    { label: "Acute angle" },
                    { label: "Obtuse angle" },
                ]
            },
            {
                label: "Centerline", hasSubmenu: true,
                children: [
                    { label: "Any position" },
                    { label: "Align to column" },
                    { label: "Space to column" },
                ]
            },
        ]
    },
    {
        label: "Chamfer Dimensions", hasSubmenu: true,
        description: "Adds a chamfer annotation showing the distance × distance or distance × angle format.",
        tip: "Match the annotation style to the drawing standard (e.g., JIS, ISO) being followed.",
        children: [
            {
                label: "Display Dimensions", hasSubmenu: true,
                children: [
                    { label: "Text at Any Position" },
                ]
            },
            {
                label: "Hide Dimensions", hasSubmenu: true,
                children: [
                    { label: "Text at Any Position" },
                ]
            },
        ]
    },
    {
        label: "Application Dimensions", hasSubmenu: true,
        description: "Provides specialized dimension tools for specific features: sides, corners, holes, ovals, and arcs.",
        tip: "Use these instead of manual dimensions for complex features to ensure consistent formatting.",
        children: [
            {
                label: "Side Dimensions", hasSubmenu: true,
                children: [
                    { label: "Any position" },
                    { label: "Entire column of positions" },
                    { label: "Entire column of spacing" },
                    { label: " ", isDivider: true },
                    { label: "None" },
                    { label: "φ" },
                    { label: "R" },
                    { label: "□" },
                    { label: "t" },
                    { label: "M" },
                    { label: "Any symbol" },
                ]
            },
            {
                label: "Corner Dimensions", hasSubmenu: true,
                children: [
                    { label: "Any Position" },
                    { label: "Specify Angle" },
                ]
            },
            {
                label: "Corner Hole Dimensions", hasSubmenu: true,
                children: [
                    { label: "Any Position" },
                    { label: "Specify Angle" },
                ]
            },
            {
                label: "Oval Dimensions", hasSubmenu: true,
                children: [
                    { label: "Any Position" },
                    { label: "Specify Angle" },
                ]
            },
            {
                label: "Arc Length 1", hasSubmenu: true,
                children: [
                    { label: "Entire Arc" },
                    { label: "Arc Segment" },
                    { label: " ", isDivider: true },
                    { label: "Any Position" },
                    { label: "Align by Position" },
                    { label: "Align by Spacing" },
                    { label: " ", isDivider: true },
                    { label: "Show Arc Symbol" },
                    { label: "Hide Arc Symbol" },
                ]
            },
            {
                label: "Arc Length 2", hasSubmenu: true,
                children: [
                    { label: "Entire Arc" },
                    { label: "Arc Segment" },
                    { label: " ", isDivider: true },
                    { label: "Any Position" },
                    { label: "Align by Position" },
                    { label: "Align by Spacing" },
                    { label: " ", isDivider: true },
                    { label: "Show Arc Symbol" },
                    { label: "Hide Arc Symbol" },
                ]
            },
            {
                label: "Coordinate Dimensions", hasSubmenu: true,
                children: [
                    { label: "Any Position" },
                    { label: "Specify Angle" },
                ]
            },
        ]
    },
    {
        label: "Note Scale", hasSubmenu: true,
        description: "Attaches a scale ratio note to a detail view, indicating how much the view is magnified or reduced.",
        tip: "Always add a Note Scale when a detail view is drawn at a different scale from the main drawing.",
        children: [
            { label: "Error Display" },
            {
                label: "Extract", hasSubmenu: true,
                children: [
                    { label: "Any Element" },
                    { label: "All Elements" },
                ]
            },
            {
                label: "Clear", hasSubmenu: true,
                children: [
                    { label: "Any Element" },
                    { label: "All Elements" },
                ]
            },
        ]
    },
    {
        label: "Drawing Editing", hasSubmenu: true,
        description: "Edits existing dimension annotations — move dimension text, change leader lines, or modify text content.",
        tip: "Use Change Position to relocate dimensions without deleting and redrawing them.",
        children: [
            {
                label: "Change Position", hasSubmenu: true,
                children: [
                    { label: "Configuration Changes" },
                    { label: "", isDivider: true },
                    { label: "Flip Vertically" },
                    { label: "Flip Horizontally" },
                    {
                        label: "Text Angle", hasSubmenu: true,
                        children: [
                            {
                                label: "Length", hasSubmenu: true,
                                children: [
                                    { label: "Along the Dimension Line" },
                                    { label: "Horizontal" },
                                ]
                            },
                            {
                                label: "Angle Dimensions", hasSubmenu: true,
                                children: [
                                    { label: "Along the Dimension Line" },
                                    { label: "Horizontal" },
                                ]
                            }
                        ]
                    },
                    { label: "Auto Position" },
                ]
            },
            {
                label: "Edit Text", hasSubmenu: true,
                children: [
                    { label: "Text Changes" },
                    {
                        label: "Add Text", hasSubmenu: true,
                        children: [
                            {
                                label: "Symbol", hasSubmenu: true,
                                children: [
                                    { label: "φ" },
                                    { label: "R" },
                                    { label: "□" },
                                    { label: "t" },
                                    { label: "S" },
                                    { label: "Sphere" },
                                    { label: "・" },
                                    { label: "M" },
                                    { label: "Arbitrary symbol" },
                                ]
                            },
                            {
                                label: "Decoration", hasSubmenu: true,
                                children: [
                                    { label: "Border" },
                                    { label: "Underline" },
                                    { label: "Correction Line" },
                                ]
                            },
                            {
                                label: "Reference", hasSubmenu: true,
                                children: [
                                    { label: "Dimensional Values" },
                                    { label: "Tolerance Values" },
                                ]
                            },
                            {
                                label: "Tolerance Value", hasSubmenu: true,
                                children: [
                                    { label: "Added parentheses" },
                                ]
                            },
                            {
                                label: "Fit", hasSubmenu: true, children: [
                                    {
                                        label: "Enter Tolerance Values", hasSubmenu: true,
                                        children: [
                                            { label: "Added parentheses" },
                                        ]
                                    },
                                    {
                                        label: "Convert Tolerance Values", hasSubmenu: true,
                                        children: [
                                            { label: "Added parentheses" },
                                        ]
                                    },
                                    {
                                        label: "Add Tolerance Values", hasSubmenu: true,
                                        children: [
                                            { label: "Added parentheses" },
                                        ]
                                    },
                                ]
                            },
                            {
                                label: "Quantity"
                            },
                            {
                                label: "Character", hasSubmenu: true, children: [
                                    { label: "Text Transfer" },
                                ]
                            },
                            {
                                label: "Inch Notation", hasSubmenu: true, children: [
                                    { label: "Feet" },
                                    { label: "Inches" },
                                ]
                            },
                        ]
                    },
                    {
                        label: "Delete Text", hasSubmenu: true,
                        children: [
                            { label: "Symbol" },
                            {
                                label: "Text Formatting", hasSubmenu: true,
                                children: [
                                    { label: "Delete All" },
                                    { label: " ", isDivider: true },
                                    { label: "Box" },
                                    { label: "Underline" },
                                    { label: "Correction Line" },
                                ]
                            },
                            {
                                label: "Reference", hasSubmenu: true,
                                children: [
                                    { label: "Dimensional Values" },
                                    { label: "Tolerance Values" },
                                ]
                            },
                            { label: "Tolerance Value", },
                            { label: "Fit" },
                            { label: "Quantity" },
                            { label: "Text" },
                            { label: "Delete All" },
                        ]
                    },
                    {
                        label: "Text Format", hasSubmenu: true,
                        children: [
                            { label: "Actual Dimensions" },
                            { label: "Display" },
                            {
                                label: "Degrees Minutes Seconds", hasSubmenu: true,
                                children: [
                                    { label: "Degrees" },
                                    { label: "Degrees and Minutes" },
                                    { label: "Degrees, Minutes, Seconds" },
                                ]
                            },
                            {
                                label: "Inch Notation", hasSubmenu: true,
                                children: [
                                    { label: "Feet" },
                                    { label: "Inches" },
                                ]
                            },
                            {
                                label: "Rounding", hasSubmenu: true,
                                children: [
                                    { label: "0 Suppress" },
                                ]
                            },
                            { label: "Scale" },
                            {
                                label: "Decimal Conversion", hasSubmenu: true,
                                children: [
                                    { label: "Full-width" },
                                    { label: "Half-width" },
                                ]
                            },
                        ]
                    },
                ]
            },
            { label: "Change Properties" },
            {
                label: "Leader Lines", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "<" },
                            { label: "●" },
                            { label: "/" },
                            { label: "None" },
                            { label: "Geometric Specification" },
                            { label: "Datum" },
                        ]
                    },
                    { label: "Delete" },
                ]
            },
            {
                label: "Terminal Symbols", hasSubmenu: true,
                children: [
                    { label: "Flip" },
                    {
                        label: "Shape", hasSubmenu: true,
                        children: [
                            { label: "Custom Change" },
                            { label: "Automatic Change" },
                            { label: "<" },
                            { label: "●" },
                            { label: "/" },
                            { label: "None" },
                        ]
                    },
                ]
            },
            {
                label: "Guide Lines", hasSubmenu: true,
                children: [
                    { label: "Tilt" },
                    { label: "Remove Duplicates" },
                    { label: "Display" },
                    { label: "Trim" },
                    { label: "Cut Out" },
                    { label: "Merge" },
                ]
            },
        ]
    },
    {
        label: "Alignment Editing", hasSubmenu: true,
        description: "Aligns multiple dimension annotations to a common reference line for a cleaner, more readable layout.",
        tip: "Run Align by Position after placing a group of dimensions to standardize their spacing.",
        children: [
            {
                label: "Align by Position", hasSubmenu: true,
                children: [
                    { label: "Vertical Alignment" },
                    { label: "Horizontal Alignment" },
                ]
            },
            { label: "Align by Spacing" },
            { label: "Current Scale" },
            {
                label: "Current Properties", hasSubmenu: true,
                children: [
                    { label: "Dimensions Text" },
                    { label: "Text 1" },
                    { label: "Text 2" },
                    { label: "Text 3" },
                ]
            },
        ]
    },
    {
        label: "Text Input", hasSubmenu: true,
        children: [
            {
                label: "Frame Settings", hasSubmenu: true,
                children: [
                    { label: "Horizontal Text" },
                    { label: "Vertical Text" },
                    { label: "Even Horizontal" },
                    { label: "Left-aligned" },
                    { label: "Centered" },
                    { label: "Right-aligned" },
                    { label: "Even Vertical" },
                    { label: "Top-aligned" },
                    { label: "Centered" },
                    { label: "Bottom-aligned" },
                    { label: "Dimension Text" },
                    { label: "Text 1" },
                    { label: "Text 2" },
                    { label: "Text 3" },
                ]
            },
            {
                label: "Point Settings", hasSubmenu: true,
                children: [
                    { label: "Horizontal Text" },
                    { label: "Vertical Text" },
                    { label: "┌ ・ ┐" },
                    { label: "・ Reference ・" },
                    { label: "└ ・ ┘" },
                    { label: "Dimension Text" },
                    { label: "Text 1" },
                    { label: "Text 2" },
                    { label: "Text 3" },
                ]
            },
            {
                label: "Text String Editing", hasSubmenu: true,
                children: [
                    {
                        label: "Alignment", hasSubmenu: true,
                        children: [
                            {
                                label: "Vertical Alignment", hasSubmenu: true,
                                children: [
                                    { label: "Text String" },
                                    { label: "Text" },
                                ]

                            },
                            {
                                label: "Horizontal Alignment", hasSubmenu: true,
                                children: [
                                    { label: "Text String" },
                                    { label: "Text" },
                                ]
                            },
                            { label: "Line Spacing" },
                        ]
                    },
                    { label: "Text Modification" },
                    {
                        label: "Border Modification", hasSubmenu: true,
                        children: [
                            { label: "Horizontal Justification" },
                            { label: "Left-aligned" },
                            { label: "Centered" },
                            { label: "Right-aligned" },
                            { label: " ", isDivider: true },
                            { label: "Vertical Justification" },
                            { label: "Top-aligned" },
                            { label: "Centered" },
                            { label: "Bottom-aligned" },
                        ]
                    },
                    { label: "Merge" },
                    {
                        label: "Size Modification", hasSubmenu: true,
                        children: [
                            { label: "Dimension Text" },
                            { label: "Text 1" },
                            { label: "Text 2" },
                            { label: "Text 3" },
                            {
                                label: "Optional", hasSubmenu: true,
                                children: [
                                    { label: "Inherit Text Size" },
                                ]
                            },
                        ]
                    },
                    { label: "Line Spacing Modification" },
                ]
            },
        ]
    },
    {
        label: "Annotations", hasSubmenu: true,
        description: "Adds balloon or flag notes that reference part numbers or assembly callouts with leader lines.",
        tip: "Use for BOM callouts, operation notes, and revision markers in assembly drawings.",
        children: [
            {
                label: "Created", hasSubmenu: true,
                children: [
                    { label: "Any Position" },
                    { label: "Specify Angle" },
                    { label: "Dimension Text" },
                    { label: "Text 1" },
                    { label: "Text 2" },
                    { label: "Text 3" },
                    { label: "<" },
                    { label: "●" },
                    { label: "/" },
                    { label: "None" },
                    { label: "Part Notes" },
                ]
            },
            {
                label: "Edit Notes", hasSubmenu: true,
                children: [
                    {
                        label: "Alignment", hasSubmenu: true,
                        children: [
                            { label: "Vertical Alignment" },
                            { label: "Horizontal Alignment" },
                        ]
                    },
                    { label: "Font Change" },
                    { label: "Position Change" },
                    {
                        label: "Size Change", hasSubmenu: true,
                        children: [
                            { label: "Any Direction" },
                            { label: "Portrait" },
                            { label: "Landscape" },
                            { label: "Flip Horizontally" },
                            { label: "Flip Vertically" },
                        ]
                    },
                    {
                        label: "Slope Change", hasSubmenu: true,
                        children: [
                            { label: "Dimension Text" },
                            { label: "Text 1" },
                            { label: "Text 2" },
                            { label: "Text 3" },
                            {
                                label: "Optional", hasSubmenu: true,
                                children: [
                                    { label: "Inherit Text Size" },
                                ]
                            },
                        ]
                    },
                    { label: "Device Symbol" },
                ]
            },
            {
                label: "Lead-in", hasSubmenu: true,
                children: [
                    { label: "<" },
                    { label: "●" },
                    { label: "/" },
                    { label: "None" },
                ]
            },
        ]
    },
    {
        label: "Callouts", hasSubmenu: true,
        description: "Creates part number balloons or reference callouts typically used in assembly drawings.",
        tip: "Link callouts to a BOM table so numbers update automatically when items are renumbered.",
        children: [
            {
                label: "Created by", hasSubmenu: true,
                children: [
                    { label: "Any Position" },
                    { label: "Angle Specified" },
                    { label: "<" },
                    { label: "●" },
                    { label: "/" },
                    { label: "None" },
                    { label: "Part Balloon" },
                ]
            },
            {
                label: "Fengchuan Editorial", hasSubmenu: true,
                children: [
                    {
                        label: "Align by Position", hasSubmenu: true,
                        children: [
                            { label: "Vertical Alignment" },
                            { label: "Horizontal Alignment" },
                        ]
                    },
                    {
                        label: "Change Configuration", hasSubmenu: true,
                        children: [
                            { label: "Any Direction" },
                            { label: "Vertical" },
                            { label: "Horizontal" },
                            { label: "Flip Left-Right" },
                            { label: "Flip Up-Down" },
                        ]
                    },
                    { label: "Change Text" },
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "Parts Balloon" },
                        ]
                    },
                    { label: "Delete" },
                    { label: "Change Diameter" },
                    {
                        label: "Terminal Symbol", hasSubmenu: true,
                        children: [
                            { label: "<" },
                            { label: "●" },
                            { label: "/" },
                            { label: "None" },
                        ]
                    },
                ]
            },
            {
                label: "Number of uses", hasSubmenu: true,
                children: [
                    { label: "Add" },
                    { label: "Delete" },
                ]
            },
            {
                label: "Lead-out wires", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "<" },
                            { label: "●" },
                            { label: "/" },
                            { label: "None" },
                        ]
                    },
                    { label: "Delete" },
                    { label: "Change Direction" },
                    { label: "Change Bend" },
                ]
            },
        ]
    },
    {
        label: "Welding Symbols", hasSubmenu: true,
        description: "Places standard welding symbols (fillet, groove, plug, etc.) on joint lines with proper notation.",
        tip: "Follow JIS or AWS symbol conventions. Always specify weld size, length, and pitch where required.",
        children: [
            { label: "With Dimension Lines" },
            { label: "Without Screen Lines" },
            {
                label: "Weld Editing", hasSubmenu: true,
                children: [
                    {
                        label: "Reposition", hasSubmenu: true,
                        children: [
                            { label: "Any Direction" },
                            { label: "Flip Horizontally" },
                        ]
                    },
                    {
                        label: "Resize", hasSubmenu: true,
                        children: [
                            { label: "With guide lines" },
                            { label: "Without guide lines" },
                        ]
                    },
                ]
            },
            {
                label: "Full-Circle Symbol", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "All Weeks" },
                            { label: "Live" },
                            { label: "All Weeks Live" },
                        ]
                    },
                    { label: "Delete" },
                ]
            },
            {
                label: "Number of Welds", hasSubmenu: true,
                children: [
                    { label: "Add" },
                    { label: "Delete" },
                ]
            },
            {
                label: "Groove Depth", hasSubmenu: true,
                children: [
                    { label: "Add" },
                    { label: "Delete" },
                ]
            },
            {
                label: "Weld Notes", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "No panel alignment" },
                            { label: "With panel alignment" }
                        ]
                    },
                    { label: "Delete" },

                ]
            },
            {
                label: "Length and Width", hasSubmenu: true,
                children: [
                    { label: "Add" },
                    { label: "Delete" },
                ]
            },
            {
                label: "Root Spacing", hasSubmenu: true,
                children: [
                    { label: "Add" },
                    { label: "Delete" },
                ]
            },
            {
                label: "Groove Angle", hasSubmenu: true,
                children: [
                    { label: "Add" },
                    { label: "Delete" },
                ]
            },
            {
                label: "Surface Finish", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "None" },
                            { label: "Flat" },
                            { label: "Convex" },
                            { label: "Concave" },
                            { label: "End" },
                            { label: " ", isDivider: true },
                            { label: "None" },
                            { label: "Flat" },
                            { label: "Convex" },
                            { label: "Concave" },
                            { label: "End" },
                        ]
                    },
                    { label: "Delete" },
                ]
            },
            {
                label: "Finishing Method", hasSubmenu: true,
                children: [
                    { label: "Add" },
                    { label: "Delete" },
                ]
            },
            { label: "Advanced Editing" },
            {
                label: "Leader Lines", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "<" },
                            { label: "●" },
                            { label: "/" },
                            { label: "None" },
                        ]
                    },
                    { label: "Delete" },
                    { label: "Change Direction" },
                    { label: "Change Bend" },
                ]
            },
        ]
    },
    {
        label: "Geometric Tolerances", hasSubmenu: true,
        description: "Adds GD&T (Geometric Dimensioning and Tolerancing) feature control frames to the drawing.",
        tip: "Specify the characteristic symbol, tolerance value, and datum references. Use Datums to define reference planes first.",
        children: [
            {
                label: "Tolerances", hasSubmenu: true,
                children: [
                    { label: "Standard" },
                    { label: "Dimensional Specifications" },
                    { label: "True Straightness" },
                    { label: "Flatness" },
                    { label: "True Roundness" },
                    { label: "Cylindricity" },
                    { label: "Line Contour" },
                    { label: "Surface Contour" },
                    { label: "Parallelism" },
                    { label: "Perpendicularity" },
                    { label: "Tilt" },
                    { label: "Position" },
                    { label: "Coaxiality" },
                    { label: "Symmetry" },
                    { label: "Circumferential Runout" },
                    { label: "Total Runout" },
                    { label: "None" },
                    { label: "φ" },
                    { label: "Sφ" },
                    { label: "Sphere φ" },
                    { label: "□" },
                ]
            },
            {
                label: "Geometric Specifications", hasSubmenu: true,
                children: [
                    { label: "Standards" },
                    { label: "Dimensional Specifications" },
                ]
            },
            {
                label: "Datums", hasSubmenu: true,
                children: [
                    { label: "Standards" },
                    { label: "Dimensional Specifications" },
                ]
            },
            {
                label: "Applied Tolerances", hasSubmenu: true,
                children: [
                    { label: "Standards" },
                    { label: "Dimensional Specifications" },
                ]
            },
            {
                label: "Tolerance Editing", hasSubmenu: true,
                children: [
                    { label: "Layout Changes" },
                    {
                        label: "Tolerance Changes", hasSubmenu: true,
                        children: [
                            { label: "True Straightness" },
                            { label: "Flatness" },
                            { label: "True Roundness" },
                            { label: "Cylindricity" },
                            { label: "Line Contour" },
                            { label: "Surface Contour" },
                            { label: "Parallelism" },
                            { label: "Perpendicularity" },
                            { label: "Runout" },
                            { label: "Position" },
                            { label: "Coaxiality" },
                            { label: "Symmetry" },
                            { label: "Circumferential Runout" },
                            { label: "Total Runout" },
                            { label: "None" },
                            { label: "ϕ" },
                            { label: "Sϕ" },
                            { label: "Spherical ϕ" },
                            { label: "□" },
                        ]
                    },
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "True Straightness" },
                            { label: "Flatness" },
                            { label: "True Roundness" },
                            { label: "Cylindricity" },
                            { label: "Line Contour" },
                            { label: "Surface Contour" },
                            { label: "Parallelism" },
                            { label: "Perpendicularity" },
                            { label: "Runout" },
                            { label: "Position" },
                            { label: "Coaxiality" },
                            { label: "Symmetry" },
                            { label: "Circumferential Runout" },
                            { label: "Total Runout" },
                            { label: "None" },
                            { label: "ϕ" },
                            { label: "Sϕ" },
                            { label: "Spherical ϕ" },
                            { label: "□" },
                        ]
                    },
                    { label: "Delete" },
                    { label: "Text Changes" },
                    {
                        label: "Advanced Editing", hasSubmenu: true,
                        children: [
                            { label: "Tolerance Changes" },
                            { label: "Add" },
                            { label: "Delete" },
                        ]
                    },
                ]
            },
            {
                label: "Leader Lines", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            {
                                label: "Standard", hasSubmenu: true,
                                children: [
                                    { label: "Geometric Specification" },
                                    { label: "Datum" },
                                ]
                            },
                            {
                                label: "Dimension Specification", hasSubmenu: true,
                                children: [
                                    { label: "Geometric Specification" },
                                    { label: "Datum" },
                                ]
                            },
                        ]
                    },
                    { label: "Delete" },
                    { label: "Configuration" },
                    { label: "Modify" },


                ]
            },
            {
                label: "Tolerance Notes", hasSubmenu: true,
                children: [
                    { label: "Add" },
                    { label: "Delete" },
                ]
            },
            {
                label: "Symbols", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "P" },
                            { label: "M" },
                            { label: "L" },
                            { label: "E" },
                            { label: "F" },
                            { label: " ", isDivider: true },
                            { label: "Tolerance" },
                            { label: "1st order" },
                            { label: "2nd order" },
                            { label: "3rd order" },
                        ]
                    },
                    {
                        label: "Delete", hasSubmenu: true,
                        children: [
                            { label: "Tolerance" },
                            { label: "1st order" },
                            { label: "2nd order" },
                            { label: "3rd order" },
                        ]
                    },
                ]
            },
        ]
    },
    {
        label: "Surface Roughness", hasSubmenu: true,
        description: "Places surface finish symbols (Ra, Rz) on part surfaces to specify machining requirements.",
        tip: "Use Simplified Symbols for quick placement. Always specify the Ra or Rz value and machining direction if critical.",
        children: [
            {
                label: "Simplified Symbols", hasSubmenu: true,
                children: [
                    { label: "Ignore" },
                    { label: "Require" },
                    { label: "Prohibit" },
                    { label: "Automatic Leads" },
                    { label: "No Leads" },
                    { label: "Leads Present" },
                    { label: "<" },
                    { label: "●" },
                    { label: "/" },
                    { label: "None" },
                ]
            },
            { label: "Detailed Symbols" },
            {
                label: "Roughness Editing", hasSubmenu: true,
                children: [
                    { label: "Configuration Changes" },
                    { label: "Symbol Editing" },
                ]
            },
            {
                label: "Leader Lines", hasSubmenu: true,
                children: [
                    {
                        label: "Add", hasSubmenu: true,
                        children: [
                            { label: "<" },
                            { label: "●" },
                            { label: "/" },
                            { label: "None" },
                        ]
                    },
                    { label: "Delete" },
                ]
            },
        ]
    },
    {
        label: "Applied Drafting", hasSubmenu: true,
        description: "Adds view-specific annotations such as section arrows, cut lines, and view symbols.",
        tip: "Use Cut Line and Arrow tools to define section cuts, then link to the section view automatically.",
        children: [
            {
                label: "Arrow's-eye view", hasSubmenu: true,
                children: [
                    { label: "Created by" },
                    {
                        label: "View Name", hasSubmenu: true,
                        children: [
                            {
                                label: "Configuration Change", hasSubmenu: true,
                                children: [
                                    { label: "Any Position" },
                                    { label: "Automatic Position" },
                                ]
                            },
                            { label: "Text Change" },
                        ]
                    },
                ]
            },
            {
                label: "Cut Line", hasSubmenu: true,
                children: [
                    {
                        label: "Create", hasSubmenu: true,
                        children: [
                            { label: "With Arrow" },
                            { label: "Without Arrow" },
                            {
                                label: "Create Section Line", hasSubmenu: true,
                                children: [
                                    { label: "Between 2 o'clock" },
                                    { label: "Horizontal" },
                                    { label: "Vertical" },
                                ]
                            },
                        ]
                    },
                    {
                        label: "Cut Line Name", hasSubmenu: true,
                        children: [
                            {
                                label: "Configuration Change", hasSubmenu: true,
                                children: [
                                    { label: "Any Position" },
                                    { label: "Automatic Position" },
                                ]
                            },
                            { label: "Text Change" },
                        ]
                    },
                    {
                        label: "Cut Symbol", hasSubmenu: true,
                        children: [
                            { label: "Layout Change" },
                        ]
                    },
                ]
            },
            {
                label: "Symbol", hasSubmenu: true,
                children: [
                    { label: "Created" },
                ]
            },
            {
                label: "Arrow", hasSubmenu: true,
                children: [
                    { label: "Create" },
                    { label: "Configuration Change" },
                ]
            },
            {
                label: "Finishing Symbol", hasSubmenu: true,
                children: [
                    { label: "▽" },
                    { label: "▽▽" },
                    { label: "▽▽▽" },
                    { label: "▽▽▽▽" },
                    { label: "〜" },
                ]
            },
            {
                label: "Delta", hasSubmenu: true,
                children: [
                    { label: "Create" },
                    { label: "Edit Text" },
                ]
            },
        ]
    },
    { label: "Hatching", description: "Fills a closed region with a hatch pattern to indicate cross-sections or material types.", tip: "Select the correct pattern for the material (e.g., diagonal lines for metal, dots for non-metallic)." },
    { label: "Dimension Line Conversion", description: "Converts existing dimension lines between different styles or standards (e.g., JIS to ISO format).", tip: "Use when adapting a drawing from one international standard to another without redrawing dimensions." },
    {
        label: "Automatic Drafting", hasSubmenu: true,
        description: "Automatically generates and arranges balloon callouts across the drawing with consistent spacing.",
        tip: "Run Automatic Balloon Configuration after placing all part references to layout balloons evenly.",
        children: [
            { label: "Automatic Balloon Configuration" },
            {
                label: "Created", hasSubmenu: true,
                children: [
                    { label: "Equal Spacing" },
                    { label: "Same Angle" },
                    { label: "Specified Angle" },
                ]
            },
            { label: "Usage Count" },
            {
                label: "Automatic Change of Target", hasSubmenu: true,
                children: [
                    { label: "<" },
                    { label: "●" },
                    { label: "/" },
                    { label: "None" },
                ]
            },
        ]
    },
    {
        label: "Move", hasSubmenu: true,
        description: "Moves selected drafting annotations (dimensions, notes, symbols) to a new position.",
        tip: "Use Translation for simple repositioning. Use Rotation to reorient dimension lines.",
        children: [
            {
                label: "Translation", hasSubmenu: true,
                children: [
                    { label: "Sequential Placement" },
                    { label: "Component Elements" },
                    { label: "Hole-Axis Search" },
                ]
            },
            { label: "Rotation" },
            { label: "Mirroring" },
            { label: "Scaling" },
        ]
    },
    {
        label: "Copy", hasSubmenu: true,
        description: "Duplicates drafting annotations such as dimensions and symbols to another location.",
        tip: "Useful when the same note or symbol appears in multiple places. Keeps formatting consistent.",
        children: [
            { label: "Sequential Placement" },
            { label: "Component Elements" },
            { label: "Hole-Axis Search" },
        ]
    },
    {
        label: "Change Attributes", hasSubmenu: true,
        description: "Modifies the visual properties of existing drafting elements such as line style and color.",
        tip: "Use to batch-update dimension styles without redrawing individual annotations.",
        children: [
            { label: "Parts Components" },
            { label: "Hole-Shaft Search" },
        ]
    },
    {
        label: "Delete", hasSubmenu: true,
        children: [
            { label: "Dimension Value Tracking" },
            { label: "Text Size Inheritance" },
            { label: "Part Components" },
            { label: "Hole-Axis Search" },
        ]
    },
];
export const FILE_ITEMS: MenuItem[] = [];
export const SUBDRAWING_ITEMS: MenuItem[] = [];
export const TOOLS_ITEMS: MenuItem[] = [];
export const TOPDOWN_ITEMS: MenuItem[] = [];
export const MODELING_ITEMS: MenuItem[] = [];
export const THREE_D_TOOLS_ITEMS: MenuItem[] = [];
export const THREE_D_VERIFICATION_ITEMS: MenuItem[] = [];
export const MANUFACTURING_INFORMATION_ITEMS: MenuItem[] = [];
export const ACTION_DESIGN_ITEMS: MenuItem[] = [];
export const RASTER_ITEMS: MenuItem[] = [];

// Helpers to convert pixel values to percentages (out of 1920x1042 canvas)
const toPctX = (px: number) => (px / 1920) * 100;
const toPctY = (px: number) => ((px - 18) / 1042) * 100;

// --------------------------------------------------------
// Grid & Spotlight positioning constants — matching Tree_View_Right.ts lines 188-192
// Adjust any value below to change base position, column width, or row height globally!
// --------------------------------------------------------
const CMD_X_START = 4;        // left edge / starting X of column 0 (px)
const CMD_COL_WIDTH = 40;     // width / column stride of each command icon column (px)
const CMD_Y_START = 272;      // y position of row 0 (px)
const CMD_ROW_HEIGHT = 36;    // height / vertical spacing of each row (px)
const CMD_HEIGHT = 52;        // default spotlight height (px)

// row(col, rowIndex, customW, customH) returns PositionConfig for any icon grid cell
const row = (col: number, rowIndex: number, customW: number = 20, customH: number = CMD_HEIGHT): PositionConfig => ({
    x: toPctX(CMD_X_START + col * CMD_COL_WIDTH),
    y: toPctY(CMD_Y_START + rowIndex * CMD_ROW_HEIGHT),
    w: toPctX(customW),
    h: toPctY(customH)
});

// spotPos helper for direct pixel coordinates (x, y, w, h)
const spotPos = (xPx: number, yPx: number, wPx: number = 20, hPx: number = CMD_HEIGHT): PositionConfig => ({
    x: toPctX(xPx),
    y: toPctY(yPx),
    w: toPctX(wPx),
    h: toPctY(hPx)
});

export const SPOTLIGHTS: SpotlightConfig[] = [
    // Row 0 — y: 272
    {
        label: "Draw",
        menuItems: DRAW_ITEMS,
        normalPos: row(0, 0.1, 40, 54),
        fullscreenPos: row(0, 0, 40, 54)
    },
    {
        label: "Drafting",
        menuItems: DRAFTING_ITEMS,
        normalPos: row(1, 0.1, 40, 54),
        fullscreenPos: row(1, 0, 40, 54)
    },
    {
        label: "File",
        menuItems: FILE_ITEMS,
        normalPos: row(2, 0.1, 40, 54),
        fullscreenPos: row(2, 0, 40, 54)
    },

    // Row 1 — y: 308
    {
        label: "Subdrawings / Parts / Symbols",
        menuItems: SUBDRAWING_ITEMS,
        normalPos: row(0, 1.1, 40, 54),
        fullscreenPos: row(0, 1.1, 40, 54)
    },
    {
        label: "Tools",
        menuItems: TOOLS_ITEMS,
        normalPos: row(1, 1.1, 40, 54),
        fullscreenPos: row(1, 1.1, 40, 54)
    },
    {
        label: "Top-down",
        menuItems: TOPDOWN_ITEMS,
        normalPos: row(2, 1.1, 40, 54),
        fullscreenPos: row(2, 1.1, 40, 54)
    },

    // Row 2 — y: 344
    {
        label: "Modeling",
        menuItems: MODELING_ITEMS,
        normalPos: row(0, 2.1, 40, 54),
        fullscreenPos: row(0, 2.1, 40, 54)
    },
    {
        label: "3D Tools",
        menuItems: THREE_D_TOOLS_ITEMS,
        normalPos: row(1, 2.1, 40, 54),
        fullscreenPos: row(1, 2.1, 40, 54)
    },
    {
        label: "3D Verification",
        menuItems: THREE_D_VERIFICATION_ITEMS,
        normalPos: row(2, 2.1, 40, 54),
        fullscreenPos: row(2, 2.1, 40, 54)
    },

    // Row 3 — y: 380
    {
        label: "Manufacturing Information",
        menuItems: MANUFACTURING_INFORMATION_ITEMS,
        normalPos: row(0, 3.1, 40, 54),
        fullscreenPos: row(0, 3.1, 40, 54)
    },
    {
        label: "Action Design",
        menuItems: ACTION_DESIGN_ITEMS,
        normalPos: row(1, 3.1, 40, 54),
        fullscreenPos: row(1, 3.1, 40, 54)
    },
    {
        label: "Raster",
        menuItems: RASTER_ITEMS,
        normalPos: row(2, 3.1, 40, 54),
        fullscreenPos: row(2, 3.1, 40, 54)
    }
];