/**
 * Unit Code Color Scheme Utilities
 *
 * A = Assembly  → Amber/Gold
 * P = Parts     → Blue
 * E = Extra     → Teal/Cyan
 */

export type UnitCodeType = 'assembly' | 'parts' | 'extra' | 'unknown';

/**
 * Determine the type of a unit code based on its prefix letter.
 */
export function getUnitCodeType(code: string | null | undefined): UnitCodeType {
    if (!code) return 'unknown';
    const prefix = code.trim().charAt(0).toUpperCase();
    if (prefix === 'A') return 'assembly';
    if (prefix === 'P') return 'parts';
    if (prefix === 'E') return 'extra';
    return 'unknown';
}

/**
 * Returns the CSS modifier class for a task-code-badge element.
 * Usage: `<span className={`task-code-badge ${getUnitCodeBadgeClass(code)}`}>`
 */
export function getUnitCodeBadgeClass(code: string | null | undefined): string {
    const type = getUnitCodeType(code);
    switch (type) {
        case 'assembly': return 'badge-assembly';
        case 'parts':    return 'badge-parts';
        case 'extra':    return 'badge-extra';
        default:         return 'badge-parts'; // fallback to blue
    }
}

/**
 * Returns inline styles for unit code coloring when CSS classes are not available.
 * Useful for inline-styled components like TraineeSetConfiguration.
 */
export function getUnitCodeInlineStyle(code: string | null | undefined): React.CSSProperties {
    const type = getUnitCodeType(code);
    switch (type) {
        case 'assembly':
            return {
                color: 'var(--unit-assembly-color)',
                background: 'var(--unit-assembly-bg)',
                borderColor: 'var(--unit-assembly-border)',
                borderWidth: '1px',
                borderStyle: 'solid',
            };
        case 'extra':
            return {
                color: 'var(--unit-extra-color)',
                background: 'var(--unit-extra-bg)',
                borderColor: 'var(--unit-extra-border)',
                borderWidth: '1px',
                borderStyle: 'solid',
            };
        case 'parts':
        default:
            return {
                color: 'var(--unit-parts-color)',
                background: 'var(--unit-parts-bg)',
                borderColor: 'var(--unit-parts-border)',
                borderWidth: '1px',
                borderStyle: 'solid',
            };
    }
}

// Need React for CSSProperties type
import type React from 'react';
