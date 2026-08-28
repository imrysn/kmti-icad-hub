import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IcadCommandsGrid } from '../IcadCommandsGrid';

const baseProps = { setSelectedCourse: vi.fn(), onLaunchCommands: vi.fn() };

describe('IcadCommandsGrid availability', () => {
    it('launches when available', () => {
        const launch = vi.fn();
        render(<IcadCommandsGrid {...baseProps} onLaunchCommands={launch} availability={{ resource_key: 'icad_commands', display_name: 'iCAD Commands', status: 'available', message: null }} />);
        fireEvent.click(screen.getByRole('button', { name: /launch module/i }));
        expect(launch).toHaveBeenCalledOnce();
    });

    it('shows Coming Soon and blocks launching', () => {
        const launch = vi.fn();
        render(<IcadCommandsGrid {...baseProps} onLaunchCommands={launch} availability={{ resource_key: 'icad_commands', display_name: 'iCAD Commands', status: 'coming_soon', message: 'Still being prepared.' }} />);
        expect(screen.getByText('Still being prepared.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /coming soon/i })).toBeDisabled();
        expect(launch).not.toHaveBeenCalled();
    });

    it('shows Under Maintenance and blocks launching', () => {
        render(<IcadCommandsGrid {...baseProps} availability={{ resource_key: 'icad_commands', display_name: 'iCAD Commands', status: 'maintenance', message: 'Fixing content.' }} />);
        expect(screen.getByRole('button', { name: /under maintenance/i })).toBeDisabled();
    });

    it('does not render a hidden course', () => {
        const { container } = render(<IcadCommandsGrid {...baseProps} availability={{ resource_key: 'icad_commands', display_name: 'iCAD Commands', status: 'hidden', message: null }} />);
        expect(container).toBeEmptyDOMElement();
    });
});
