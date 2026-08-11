import { TorusGeometry } from "three";

export interface MenuItem {
    label: string;
    shortcut?: string;
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

    { label: "Basic Lines" },
    { label: "Parallel and Perpendicular" },
    { label: "Horizontal Lines" },
    { label: "Vertical Lines" },
    { label: "Angle Lines" },
    { label: "Free Curves" },
    { label: "Circles with Center Points" },
    { label: "Circles Through Points" },
    {
        label: "Text Input", hasSubmenu: true,
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
    { label: "Advanced Drawing" },
    { label: "Cut and Join" },
    { label: "Offset" },
    { label: "Roundness" },
    { label: "Chamfer" },
    { label: "Shape Extraction" },
    { label: "Stretch and Shrink" },
    { label: "Advanced Editing" },
    { label: "Variable" },
    {
        label: "Move", hasSubmenu: true,
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
    { label: "Hatching" },
    { label: "Dimension Line Conversion" },
    {
        label: "Automatic Drafting", hasSubmenu: true,
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
        children: [
            { label: "Sequential Placement" },
            { label: "Component Elements" },
            { label: "Hole-Axis Search" },
        ]
    },
    {
        label: "Change Attributes", hasSubmenu: true,
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
        normalPos: row(0, 0, 40, 52),
        fullscreenPos: row(0, 0, 40, 54)
    },
    {
        label: "Drafting",
        menuItems: DRAFTING_ITEMS,
        normalPos: row(1, 0, 40, 52),
        fullscreenPos: row(1, 0, 40, 54)
    },
    {
        label: "File",
        menuItems: FILE_ITEMS,
        normalPos: row(2, 0, 40, 52),
        fullscreenPos: row(2, 0, 40, 54)
    },

    // Row 1 — y: 308
    {
        label: "Subdrawings / Parts / Symbols",
        menuItems: SUBDRAWING_ITEMS,
        normalPos: row(0, 1, 40, 52),
        fullscreenPos: row(0, 1.1, 40, 54)
    },
    {
        label: "Tools",
        menuItems: TOOLS_ITEMS,
        normalPos: row(1, 1, 40, 52),
        fullscreenPos: row(1, 1.1, 40, 54)
    },
    {
        label: "Top-down",
        menuItems: TOPDOWN_ITEMS,
        normalPos: row(2, 1, 40, 52),
        fullscreenPos: row(2, 1.1, 40, 54)
    },

    // Row 2 — y: 344
    {
        label: "Modeling",
        menuItems: MODELING_ITEMS,
        normalPos: row(0, 2, 40, 52),
        fullscreenPos: row(0, 2.1, 40, 54)
    },
    {
        label: "3D Tools",
        menuItems: THREE_D_TOOLS_ITEMS,
        normalPos: row(1, 2, 40, 52),
        fullscreenPos: row(1, 2.1, 40, 54)
    },
    {
        label: "3D Verification",
        menuItems: THREE_D_VERIFICATION_ITEMS,
        normalPos: row(2, 2, 40, 52),
        fullscreenPos: row(2, 2.1, 40, 54)
    },

    // Row 3 — y: 380
    {
        label: "Manufacturing Information",
        menuItems: MANUFACTURING_INFORMATION_ITEMS,
        normalPos: row(0, 3, 40, 52),
        fullscreenPos: row(0, 3.1, 40, 54)
    },
    {
        label: "Action Design",
        menuItems: ACTION_DESIGN_ITEMS,
        normalPos: row(1, 3, 40, 52),
        fullscreenPos: row(1, 3.1, 40, 54)
    },
    {
        label: "Raster",
        menuItems: RASTER_ITEMS,
        normalPos: row(2, 3, 40, 52),
        fullscreenPos: row(2, 3.1, 40, 54)
    }
];