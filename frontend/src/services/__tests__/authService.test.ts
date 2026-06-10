/**
 * src/services/__tests__/authService.test.ts
 *
 * Unit tests for authService.ts.
 *
 * Uses MSW (already configured globally) to mock all HTTP calls.
 * Tests focus on:
 *  - Correct API call shapes
 *  - sessionStorage state after login/logout
 *  - Helper method logic (isAuthenticated, getStoredUser, etc.)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { authService } from '../authService';
import { TEST_USERS, TEST_TOKEN } from '../../test/mocks/handlers';

// ── Session storage helpers ───────────────────────────────────────

const setToken = (token: string) => sessionStorage.setItem('access_token', token);
const setUser = (user: object) => sessionStorage.setItem('user', JSON.stringify(user));
const clearSession = () => sessionStorage.clear();

beforeEach(() => clearSession());
afterEach(() => clearSession());

// ══════════════════════════════════════════════════════════════════
// login()
// ══════════════════════════════════════════════════════════════════

describe('authService.login()', () => {
  it('stores access_token in sessionStorage on success', async () => {
    await authService.login({ username: 'trainee_test', password: 'Trainee@12345' });
    expect(sessionStorage.getItem('access_token')).toBe(TEST_TOKEN);
  });

  it('stores user object in sessionStorage on success', async () => {
    await authService.login({ username: 'trainee_test', password: 'Trainee@12345' });
    const stored = JSON.parse(sessionStorage.getItem('user') || '{}');
    expect(stored.username).toBe('trainee_test');
    expect(stored.role).toBe('trainee');
  });

  it('returns the full TokenResponse on success', async () => {
    const result = await authService.login({ username: 'trainee_test', password: 'Trainee@12345' });
    expect(result.access_token).toBe(TEST_TOKEN);
    expect(result.token_type).toBe('bearer');
    expect(result.user).toMatchObject({ username: 'trainee_test' });
  });

  it('throws on wrong password (401)', async () => {
    await expect(
      authService.login({ username: 'trainee_test', password: 'WrongPassword' })
    ).rejects.toThrow();
  });

  it('does not store token on failed login', async () => {
    try {
      await authService.login({ username: 'trainee_test', password: 'WrongPassword' });
    } catch {
      // expected
    }
    expect(sessionStorage.getItem('access_token')).toBeNull();
  });
});

// ══════════════════════════════════════════════════════════════════
// logout()
// ══════════════════════════════════════════════════════════════════

describe('authService.logout()', () => {
  it('removes access_token from sessionStorage', () => {
    setToken(TEST_TOKEN);
    // Mock window.location.href (can't actually redirect in jsdom without error)
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: { href: '/' },
      writable: true,
      configurable: true,
    });
    authService.logout();
    expect(sessionStorage.getItem('access_token')).toBeNull();
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
  });

  it('removes user from sessionStorage', () => {
    setToken(TEST_TOKEN);
    setUser(TEST_USERS.trainee);
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', { value: { href: '/' }, writable: true, configurable: true });
    authService.logout();
    expect(sessionStorage.getItem('user')).toBeNull();
    Object.defineProperty(window, 'location', { value: originalLocation, writable: true, configurable: true });
  });

  it('clears kmti_ prefixed localStorage keys', () => {
    localStorage.setItem('kmti_u1_progress', 'somedata');
    localStorage.setItem('unrelated_key', 'keep');
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', { value: { href: '/' }, writable: true, configurable: true });
    authService.logout();
    expect(localStorage.getItem('kmti_u1_progress')).toBeNull();
    expect(localStorage.getItem('unrelated_key')).toBe('keep');
    Object.defineProperty(window, 'location', { value: originalLocation, writable: true, configurable: true });
  });
});

// ══════════════════════════════════════════════════════════════════
// isAuthenticated()
// ══════════════════════════════════════════════════════════════════

describe('authService.isAuthenticated()', () => {
  it('returns false when no token stored', () => {
    expect(authService.isAuthenticated()).toBe(false);
  });

  it('returns true when token is stored', () => {
    setToken(TEST_TOKEN);
    expect(authService.isAuthenticated()).toBe(true);
  });
});

// ══════════════════════════════════════════════════════════════════
// getStoredUser()
// ══════════════════════════════════════════════════════════════════

describe('authService.getStoredUser()', () => {
  it('returns null when no user stored', () => {
    expect(authService.getStoredUser()).toBeNull();
  });

  it('returns parsed user object when stored', () => {
    setUser(TEST_USERS.trainee);
    const user = authService.getStoredUser();
    expect(user).not.toBeNull();
    expect(user?.username).toBe('trainee_test');
    expect(user?.role).toBe('trainee');
  });
});

// ══════════════════════════════════════════════════════════════════
// getToken()
// ══════════════════════════════════════════════════════════════════

describe('authService.getToken()', () => {
  it('returns null when no token stored', () => {
    expect(authService.getToken()).toBeNull();
  });

  it('returns stored token string', () => {
    setToken('my-test-jwt');
    expect(authService.getToken()).toBe('my-test-jwt');
  });
});

// ══════════════════════════════════════════════════════════════════
// getStorageKey()
// ══════════════════════════════════════════════════════════════════

describe('authService.getStorageKey()', () => {
  it('uses guest as prefix when not logged in', () => {
    const key = authService.getStorageKey('progress');
    expect(key).toBe('kmti_uguest_progress');
  });

  it('uses user ID as prefix when logged in', () => {
    setUser(TEST_USERS.trainee); // id: 1
    const key = authService.getStorageKey('progress');
    expect(key).toBe('kmti_u1_progress');
  });
});

// ══════════════════════════════════════════════════════════════════
// getCurrentUser()
// ══════════════════════════════════════════════════════════════════

describe('authService.getCurrentUser()', () => {
  it('returns user from /auth/me and updates sessionStorage', async () => {
    setToken(TEST_TOKEN);
    const user = await authService.getCurrentUser();
    expect(user.username).toBe('trainee_test');
    const stored = JSON.parse(sessionStorage.getItem('user') || '{}');
    expect(stored.username).toBe('trainee_test');
  });
});

// ══════════════════════════════════════════════════════════════════
// submitQuiz()
// ══════════════════════════════════════════════════════════════════

describe('authService.submitQuiz()', () => {
  it('returns passed: true for score >= 80', async () => {
    setToken(TEST_TOKEN);
    const result = await authService.submitQuiz({
      course_id: '2D_Drawing',
      lesson_id: 'keyway-lesson',
      score: 85,
    });
    expect(result.passed).toBe(true);
    expect(result.score).toBe(85);
  });

  it('returns passed: false for score < 80', async () => {
    setToken(TEST_TOKEN);
    const result = await authService.submitQuiz({
      course_id: '2D_Drawing',
      lesson_id: 'keyway-lesson',
      score: 70,
    });
    expect(result.passed).toBe(false);
  });
});
