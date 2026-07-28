interface FileDropdownItems {
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
    children?: FileDropdownItems[];
    dropdownImage?: string;
}

export type { FileDropdownItems, SpotlightConfig }