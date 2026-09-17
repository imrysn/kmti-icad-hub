import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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
import { FOUNDATION_MODULES, FOUNDATION_TOTAL } from '../../components/iCAD_Foundations/curriculum';
import { PROFESSIONAL_MODULES, PROFESSIONAL_TOTAL } from '../../components/iCAD_Professional/curriculum';

const plans = [
  { id: 1, code: 'icad-foundations', name: 'iCAD Foundations', price_minor_units: 2900, currency_code: 'USD', billing_interval: 'month', display_order: 1 },
  { id: 2, code: 'icad-professional', name: 'iCAD Professional', price_minor_units: 9900, currency_code: 'USD', billing_interval: 'month', display_order: 2 },
  { id: 3, code: 'icad-complete', name: 'iCAD Complete', price_minor_units: 19900, currency_code: 'USD', billing_interval: 'month', display_order: 3 },
];
const plansWithoutPrices = plans.map(plan => ({ ...plan, price_minor_units: null }));

const renderLanding = () => render(<MemoryRouter><LandingView /></MemoryRouter>);
const overview = async () => await screen.findByRole('region', { name: /what each plan covers/i });

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

  it('shows each plan course size from the published curricula', async () => {
    renderLanding();
    const foundations = `${FOUNDATION_MODULES.length} modules · ${FOUNDATION_TOTAL} lessons`;
    const professional = `${PROFESSIONAL_MODULES.length} modules · ${PROFESSIONAL_TOTAL} lessons`;
    expect((await screen.findAllByText(foundations)).length).toBeGreaterThan(0);
    expect(screen.getAllByText(professional).length).toBeGreaterThan(0);
  });

  it('opens one plan at a time in the overview and links each button to its panel', async () => {
    const user = userEvent.setup();
    renderLanding();
    const section = await overview();
    const foundations = within(section).getByRole('button', { name: /iCAD Foundations/ });
    const professional = within(section).getByRole('button', { name: /iCAD Professional/ });

    expect(foundations).toHaveAttribute('aria-expanded', 'true');
    expect(foundations).toHaveAttribute('aria-controls', 'plan-panel-1');
    expect(document.getElementById('plan-panel-1')).toBeVisible();
    expect(document.getElementById('plan-panel-2')).not.toBeVisible();

    await user.click(professional);
    expect(professional).toHaveAttribute('aria-expanded', 'true');
    expect(foundations).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('plan-panel-2')).toBeVisible();
  });

  it('brings each plan to the centre as the page scrolls', async () => {
    renderLanding();
    const section = await overview();
    const atScroll = (top: number) => {
      vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
        top, bottom: top + 2700, height: 2700, width: 1000, left: 0, right: 1000, x: 0, y: top, toJSON: () => ({}),
      } as DOMRect);
      fireEvent.scroll(window);
    };
    const expanded = () => within(section).getAllByRole('button', { expanded: true }).map(button => button.textContent);

    atScroll(0);
    expect(expanded()).toEqual(['iCAD Foundations']);

    atScroll(-1000);
    expect(expanded()).toEqual(['iCAD Professional']);

    atScroll(-1900);
    expect(expanded()).toEqual(['iCAD Complete']);

    // Past the section the last plan stays selected rather than running off the end.
    atScroll(-3200);
    expect(expanded()).toEqual(['iCAD Complete']);
  });

  it('keeps every plan screenshot in the page and shows only the selected one', async () => {
    const user = userEvent.setup();
    renderLanding();
    const section = await overview();
    const media = section.querySelector('.plan-showcase-media')!;
    expect(media.querySelectorAll('img')).toHaveLength(3);
    expect(within(section).getByRole('img')).toHaveAccessibleName(/iCAD Foundations lesson/i);

    await user.click(within(section).getByRole('button', { name: /iCAD Complete/ }));
    expect(within(section).getByRole('img')).toHaveAccessibleName(/2D detailing drawing/i);
  });

  it('requests access from the overview and from the plan card', async () => {
    const user = userEvent.setup();
    renderLanding();
    const section = await overview();
    await user.click(within(section).getByRole('button', { name: /request access/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/register?plan=icad-foundations');

    await user.click(screen.getByRole('button', { name: 'Request access to iCAD Professional' }));
    expect(mockNavigate).toHaveBeenCalledWith('/register?plan=icad-professional');
  });

  it('shows how access is granted instead of promising instant checkout', async () => {
    renderLanding();
    expect(await screen.findByText(/a KMTI administrator reviews your application/i)).toBeInTheDocument();
  });

  it('falls back to a contact line when a plan has no published price', async () => {
    mockGetPlans.mockResolvedValue(plansWithoutPrices);
    renderLanding();
    expect(await screen.findAllByText('Contact us for pricing')).toHaveLength(3);
    expect(screen.queryByText('/user/month')).not.toBeInTheDocument();
    await waitFor(() => expect(document.getElementById('kmti-course-structured-data')).not.toBeNull());
    const data = JSON.parse(document.getElementById('kmti-course-structured-data')?.textContent || '{}');
    expect(data.itemListElement[1].item.offers).toBeUndefined();
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
    await user.click(screen.getByRole('link', { name: 'Plans' }));
    expect(screen.getByRole('button', { name: /open navigation menu/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps one heading level per section', async () => {
    renderLanding();
    await overview();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const sectionTitles = screen.getAllByRole('heading', { level: 2 }).map(heading => heading.textContent);
    expect(sectionTitles).toEqual(['What each plan covers', 'Training plans', 'How it works', 'Frequently asked questions']);
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
