interface InformationDropdownItems {
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
    children?: InformationDropdownItems[];
    dropdownImage?: string;
}

export type { InformationDropdownItems, SpotlightConfig }