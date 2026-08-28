import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ICADCommandView } from '../../ICADCommandView';

vi.mock('../../../../../hooks/useContentAvailability', () => ({
    useContentAvailability: () => ({ byKey: {} }),
}));

vi.mock('../../../../../components/ICAD/Command/Icad_Commands/Icad_Commands', () => ({
    default: () => <div>Commands Lesson</div>,
}));

vi.mock('../../../../../components/ICAD/Command/Icad_Guide/Icad_Guide', () => ({
    default: () => <div>Guide Lesson Open</div>,
}));

vi.mock('../../../../../components/ICAD/Command/Icad_Menu_Setup/menuSetup', () => ({
    default: () => <div>Menu Setup Lesson Open</div>,
}));

describe('ICADCommandView availability fallback', () => {
    it('keeps iCAD Guide open when availability API data is missing', () => {
        const { unmount } = render(<ICADCommandView setSelectedCourse={vi.fn()} />);
        fireEvent.click(screen.getAllByRole('button', { name: /launch module/i })[0]);
        expect(screen.getByText('Guide Lesson Open')).toBeInTheDocument();
        unmount();
    });

    it('keeps iCAD Menu Setup open when availability API data is missing', () => {
        render(<ICADCommandView setSelectedCourse={vi.fn()} />);
        fireEvent.click(screen.getAllByRole('button', { name: /launch module/i })[1]);
        expect(screen.getByText('Menu Setup Lesson Open')).toBeInTheDocument();
    });
});
