interface ToolsropdownItems {
    label: string;
    startTime: number;
    endTime: number;
}

interface SpotlightConfig {
    label: string;
    startTime: number;
    endTime: number;
    pxX: number;
    pxY: number;
    pxW: number;
    pxH: number;
    children?: ToolsropdownItems[];
    dropdownImage?: string;
}

export type { ToolsropdownItems, SpotlightConfig }