interface SettingsDropdownItems {
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
    children?: SettingsDropdownItems[];
    dropdownImage?: string;
}

export type { SettingsDropdownItems, SpotlightConfig }