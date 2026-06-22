/**
 * src/views/__tests__/LoginView.test.tsx
 *
 * Integration tests for the LoginView component.
 *
 * Strategy:
 * - Render LoginView inside a MemoryRouter + mock AuthContext so we avoid
 *   real routing and real API calls.
 * - Use MSW to intercept HTTP calls.
 * - Use @testing-library/user-event for realistic user interactions.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/mocks/server';
import { TEST_USERS, TEST_TOKEN } from '../../test/mocks/handlers';

// ── Mock heavy dependencies that don't render in jsdom ────────────

// LightPillar uses canvas/WebGL — mock it as a simple div
vi.mock('../../components/LightPillar', () => ({
  default: () => <div data-testid="light-pillar-mock" />,
}));

// Mock logo import (Vite asset, not available in node)
vi.mock('../../assets/kmti_logo.png', () => ({ default: 'logo.png' }));

// ── Mock AuthContext (useAuth hook) ───────────────────────────────


const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoggingIn: false,
    error: null,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { LoginView } from '../LoginView';

const renderLogin = () =>
  render(
    <MemoryRouter>
      <LoginView />
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
  if (typeof sessionStorage !== 'undefined' && typeof sessionStorage.clear === 'function') {
    sessionStorage.clear();
  }
  if (typeof localStorage !== 'undefined' && typeof localStorage.clear === 'function') {
    localStorage.clear();
  }
});

// ══════════════════════════════════════════════════════════════════
// Rendering
// ══════════════════════════════════════════════════════════════════

describe('LoginView — rendering', () => {
  it('renders username input', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('renders password input', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders SIGN IN button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders KMTI brand text', () => {
    renderLogin();
    expect(screen.getByText('KMTI')).toBeInTheDocument();
  });
});

// ══════════════════════════════════════════════════════════════════
// Validation
// ══════════════════════════════════════════════════════════════════

describe('LoginView — client-side validation', () => {
  it('shows error when username is empty on submit', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByText(/please enter both user name and password/i)).toBeInTheDocument();
  });

  it('shows error when password is empty on submit', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByPlaceholderText('Enter username'), 'trainee_test');
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByText(/please enter both user name and password/i)).toBeInTheDocument();
  });

  it('does not call login when form is empty', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(mockLogin).not.toHaveBeenCalled();
  });
});

// ══════════════════════════════════════════════════════════════════
// Successful login
// ══════════════════════════════════════════════════════════════════

describe('LoginView — successful login', () => {
  it('calls login() with correct credentials', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({ user: TEST_USERS.trainee, access_token: TEST_TOKEN });
    renderLogin();

    await user.type(screen.getByPlaceholderText('Enter username'), 'trainee_test');
    await user.type(screen.getByPlaceholderText('••••••••'), 'Trainee@12345');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({ username: 'trainee_test', password: 'Trainee@12345' })
      );
    });
  });

  it('navigates to / on successful login', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({ user: TEST_USERS.trainee, access_token: TEST_TOKEN });
    renderLogin();

    await user.type(screen.getByPlaceholderText('Enter username'), 'trainee_test');
    await user.type(screen.getByPlaceholderText('••••••••'), 'Trainee@12345');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});

// ══════════════════════════════════════════════════════════════════
// Failed login
// ══════════════════════════════════════════════════════════════════

describe('LoginView — failed login', () => {
  it('shows error message on login failure', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValue({ message: 'Incorrect password. Please try again.' });
    renderLogin();

    await user.type(screen.getByPlaceholderText('Enter username'), 'trainee_test');
    await user.type(screen.getByPlaceholderText('••••••••'), 'WrongPass!');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/incorrect password/i)
      ).toBeInTheDocument();
    });
  });

  it('does not navigate on failed login', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValue({ message: 'Wrong credentials' });
    renderLogin();

    await user.type(screen.getByPlaceholderText('Enter username'), 'bad_user');
    await user.type(screen.getByPlaceholderText('••••••••'), 'bad_pass');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});

// ══════════════════════════════════════════════════════════════════
// Password visibility toggle
// ══════════════════════════════════════════════════════════════════

describe('LoginView — password toggle', () => {
  it('password is hidden by default', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('••••••••')).toHaveAttribute('type', 'password');
  });

  it('clicking toggle reveals password', async () => {
    const user = userEvent.setup();
    renderLogin();
    const toggleBtn = screen.getByRole('button', { name: '' }); // eye icon button
    await user.click(toggleBtn);
    expect(screen.getByPlaceholderText('••••••••')).toHaveAttribute('type', 'text');
  });
});

// ══════════════════════════════════════════════════════════════════
// Remember Me checkbox
// ══════════════════════════════════════════════════════════════════

describe('LoginView — Remember Me checkbox', () => {
  it('toggles remember me state and saves username on successful login', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({ user: TEST_USERS.trainee, access_token: TEST_TOKEN });
    renderLogin();

    const checkbox = screen.getByLabelText(/remember me/i);
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.type(screen.getByPlaceholderText('Enter username'), 'trainee_test');
    await user.type(screen.getByPlaceholderText('••••••••'), 'Trainee@12345');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.getItem('remembered_username')).toBe('trainee_test');
    });
  });

  it('pre-fills username when remembered_username exists in localStorage', () => {
    localStorage.setItem('remembered_username', 'remembered_user');
    renderLogin();
    expect(screen.getByPlaceholderText('Enter username')).toHaveValue('remembered_user');
    expect(screen.getByLabelText(/remember me/i)).toBeChecked();
  });
});

// ══════════════════════════════════════════════════════════════════
// Close button
// ══════════════════════════════════════════════════════════════════

describe('LoginView — Top-Right Control Buttons', () => {
  it('renders close button and calls window.electronAPI.close on click', async () => {
    const mockClose = vi.fn();
    // @ts-ignore
    window.electronAPI = { close: mockClose };

    const user = userEvent.setup();
    renderLogin();

    const closeBtn = screen.getByTitle(/close application/i);
    expect(closeBtn).toBeInTheDocument();

    await user.click(closeBtn);
    expect(mockClose).toHaveBeenCalled();

    // Clean up mock
    // @ts-ignore
    delete window.electronAPI;
  });

  it('renders settings button and opens API Configuration modal on click', async () => {
    const user = userEvent.setup();
    renderLogin();

    const settingsBtn = screen.getByTitle(/api server settings/i);
    expect(settingsBtn).toBeInTheDocument();

    // Modal should be closed initially
    expect(screen.queryByText(/api server configuration/i)).not.toBeInTheDocument();

    await user.click(settingsBtn);

    // Modal should now be open
    expect(screen.getByText(/api server configuration/i)).toBeInTheDocument();
  });
});
