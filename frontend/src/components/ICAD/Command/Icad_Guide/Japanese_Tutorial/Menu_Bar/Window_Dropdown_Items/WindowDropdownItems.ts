interface WindowDropdownItems {
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
    children?: WindowDropdownItems[];
    dropdownImage?: string;
}

export type { WindowDropdownItems, SpotlightConfig }