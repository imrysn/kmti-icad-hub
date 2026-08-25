import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockNavigate = vi.fn();
const mockGetPlans = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../../services/registrationService', () => ({
  registrationService: { getPlans: (...args: unknown[]) => mockGetPlans(...args) },
}));

import { LandingView } from './LandingView';

const plans = [
  { id: 1, code: 'icad-foundations', name: 'iCAD Foundations', price_minor_units: 2900, currency_code: 'USD', billing_interval: 'month', display_order: 1 },
  { id: 2, code: 'icad-professional', name: 'iCAD Professional', price_minor_units: 9900, currency_code: 'USD', billing_interval: 'month', display_order: 2 },
  { id: 3, code: 'icad-complete', name: 'iCAD Complete', price_minor_units: 19900, currency_code: 'USD', billing_interval: 'month', display_order: 3 },
];

const renderLanding = () => render(<MemoryRouter><LandingView /></MemoryRouter>);

beforeEach(() => {
  vi.clearAllMocks();
  mockGetPlans.mockResolvedValue(plans);
});

describe('LandingView public plan flow', () => {
  it('renders public API plan names and formatted prices', async () => {
    renderLanding();
    expect(await screen.findByText('$29')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('$199')).toBeInTheDocument();
    expect(screen.getAllByText('/user/month')).toHaveLength(3);
  });

  it('opens registration with the selected plan code', async () => {
    const user = userEvent.setup();
    renderLanding();
    const button = await screen.findByRole('button', { name: 'Apply for iCAD Professional' });
    await user.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/register?plan=icad-professional');
  });

  it('shows an error and retries plan loading', async () => {
    const user = userEvent.setup();
    mockGetPlans.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(plans);
    renderLanding();
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText(/temporarily unavailable/i)).toBeInTheDocument();
    await user.click(within(alert).getByRole('button', { name: /try again/i }));
    await waitFor(() => expect(screen.getByText('$29')).toBeInTheDocument());
    expect(mockGetPlans).toHaveBeenCalledTimes(2);
  });

  it('provides public policy and skip navigation controls', async () => {
    renderLanding();
    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute('href', '#landing-main');
    expect(await screen.findByRole('button', { name: 'Terms' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Privacy' })).toBeInTheDocument();
  });

  it('opens and closes the accessible mobile navigation menu', async () => {
    const user = userEvent.setup();
    renderLanding();
    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('link', { name: 'Features' }));
    expect(screen.getByRole('button', { name: /open navigation menu/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders an accessible plan comparison from the public plans', async () => {
    renderLanding();
    const comparison = await screen.findByRole('heading', { name: /what each training level includes/i });
    const section = comparison.closest('section');
    expect(section).not.toBeNull();
    expect(within(section as HTMLElement).getAllByRole('button', { name: 'Choose plan' })).toHaveLength(3);
    expect(within(section as HTMLElement).getAllByText('Completion certification')).toHaveLength(3);
  });

  it('publishes structured course and offer metadata after plans load', async () => {
    renderLanding();
    await screen.findByText('$29');
    await waitFor(() => expect(document.getElementById('kmti-course-structured-data')).not.toBeNull());
    const data = JSON.parse(document.getElementById('kmti-course-structured-data')?.textContent || '{}');
    expect(data['@type']).toBe('ItemList');
    expect(data.itemListElement).toHaveLength(3);
    expect(data.itemListElement[1].item.offers.price).toBe('99.00');
  });
});
