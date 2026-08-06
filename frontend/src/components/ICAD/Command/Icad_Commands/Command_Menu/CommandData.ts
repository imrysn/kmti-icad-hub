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
    { label: "Delete", hasSubmenu: true },
];
export const DRAFTING_ITEMS: MenuItem[] = [];
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

// Helpers to convert pixel values to percentages
const toPctX = (px: number) => (px / 1920) * 100;
const toPctY = (px: number) => ((px - 18) / 1042) * 100;

export const SPOTLIGHTS: SpotlightConfig[] = [
    // Row 1 — y: 270, h: 36
    {
        label: "Draw",
        menuItems: DRAW_ITEMS,
        normalPos: { x: toPctX(4), y: toPctY(270), w: toPctX(40), h: toPctY(270 + 36) - toPctY(270) },
        fullscreenPos: { x: toPctX(4), y: toPctY(270), w: toPctX(40), h: toPctY(270 + 36) - toPctY(270) }
    },
    {
        label: "Drafting",
        menuItems: DRAFTING_ITEMS,
        normalPos: { x: toPctX(44), y: toPctY(270), w: toPctX(40), h: toPctY(270 + 36) - toPctY(270) },
        fullscreenPos: { x: toPctX(44), y: toPctY(270), w: toPctX(40), h: toPctY(270 + 36) - toPctY(270) }
    },
    {
        label: "File",
        menuItems: FILE_ITEMS,
        normalPos: { x: toPctX(84), y: toPctY(270), w: toPctX(40), h: toPctY(270 + 36) - toPctY(270) },
        fullscreenPos: { x: toPctX(84), y: toPctY(270), w: toPctX(40), h: toPctY(270 + 36) - toPctY(270) }
    },

    // Row 2 — y: 306, h: 36
    {
        label: "Subdrawings / Parts / Symbols",
        menuItems: SUBDRAWING_ITEMS,
        normalPos: { x: toPctX(4), y: toPctY(306), w: toPctX(40), h: toPctY(306 + 36) - toPctY(306) },
        fullscreenPos: { x: toPctX(4), y: toPctY(306), w: toPctX(40), h: toPctY(306 + 36) - toPctY(306) }
    },
    {
        label: "Tools",
        menuItems: TOOLS_ITEMS,
        normalPos: { x: toPctX(44), y: toPctY(306), w: toPctX(40), h: toPctY(306 + 36) - toPctY(306) },
        fullscreenPos: { x: toPctX(44), y: toPctY(306), w: toPctX(40), h: toPctY(306 + 36) - toPctY(306) }
    },
    {
        label: "Top-down",
        menuItems: TOPDOWN_ITEMS,
        normalPos: { x: toPctX(84), y: toPctY(306), w: toPctX(40), h: toPctY(306 + 36) - toPctY(306) },
        fullscreenPos: { x: toPctX(84), y: toPctY(306), w: toPctX(40), h: toPctY(306 + 36) - toPctY(306) }
    },

    // Row 3 — y: 342, h: 38
    {
        label: "Modeling",
        menuItems: MODELING_ITEMS,
        normalPos: { x: toPctX(4), y: toPctY(342), w: toPctX(40), h: toPctY(342 + 38) - toPctY(342) },
        fullscreenPos: { x: toPctX(4), y: toPctY(342), w: toPctX(40), h: toPctY(342 + 38) - toPctY(342) }
    },
    {
        label: "3D Tools",
        menuItems: THREE_D_TOOLS_ITEMS,
        normalPos: { x: toPctX(44), y: toPctY(342), w: toPctX(40), h: toPctY(342 + 38) - toPctY(342) },
        fullscreenPos: { x: toPctX(44), y: toPctY(342), w: toPctX(40), h: toPctY(342 + 38) - toPctY(342) }
    },
    {
        label: "3D Verification",
        menuItems: THREE_D_VERIFICATION_ITEMS,
        normalPos: { x: toPctX(84), y: toPctY(342), w: toPctX(40), h: toPctY(342 + 38) - toPctY(342) },
        fullscreenPos: { x: toPctX(84), y: toPctY(342), w: toPctX(40), h: toPctY(342 + 38) - toPctY(342) }
    },

    // Row 4 — y: 380, h: 40
    {
        label: "Manufacturing Information",
        menuItems: MANUFACTURING_INFORMATION_ITEMS,
        normalPos: { x: toPctX(4), y: toPctY(380), w: toPctX(40), h: toPctY(380 + 40) - toPctY(380) },
        fullscreenPos: { x: toPctX(4), y: toPctY(380), w: toPctX(40), h: toPctY(380 + 40) - toPctY(380) }
    },
    {
        label: "Action Design",
        menuItems: ACTION_DESIGN_ITEMS,
        normalPos: { x: toPctX(44), y: toPctY(380), w: toPctX(40), h: toPctY(380 + 40) - toPctY(380) },
        fullscreenPos: { x: toPctX(44), y: toPctY(380), w: toPctX(40), h: toPctY(380 + 40) - toPctY(380) }
    },
    {
        label: "Raster",
        menuItems: RASTER_ITEMS,
        normalPos: { x: toPctX(84), y: toPctY(380), w: toPctX(40), h: toPctY(380 + 40) - toPctY(380) },
        fullscreenPos: { x: toPctX(84), y: toPctY(380), w: toPctX(40), h: toPctY(380 + 40) - toPctY(380) }
    }
];