interface HelpDropdownItems {
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
    children?: HelpDropdownItems[];
    dropdownImage?: string;
}

export type { HelpDropdownItems, SpotlightConfig }