/**
 * src/test/setup.ts
 *
 * Global test setup file loaded by Vitest before every test file.
 * - Extends Vitest's expect with @testing-library/jest-dom matchers
 *   so we can use .toBeInTheDocument(), .toHaveValue(), etc.
 * - Boots the MSW mock server for HTTP interception.
 */

import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// Ensure window.location is defined correctly in jsdom/Vitest environment
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://127.0.0.1:3001/',
      origin: 'http://127.0.0.1:3001',
      protocol: 'http:',
      host: '127.0.0.1:3001',
      hostname: '127.0.0.1',
      port: '3001',
      pathname: '/',
      search: '',
      hash: '',
      assign: () => {},
      replace: () => {},
      reload: () => {},
    },
    writable: true,
  });
}

// In-memory mock for Storage (localStorage / sessionStorage)
class StorageMock {
  [key: string]: any;

  clear() {
    Object.keys(this).forEach(key => {
      delete this[key];
    });
  }

  getItem(key: string): string | null {
    return this.hasOwnProperty(key) ? String(this[key]) : null;
  }

  setItem(key: string, value: string) {
    this[key] = String(value);
  }

  removeItem(key: string) {
    delete this[key];
  }

  get length() {
    return Object.keys(this).length;
  }

  key(index: number): string | null {
    return Object.keys(this)[index] || null;
  }
}

if (typeof window !== 'undefined') {
  const localStorageMock = new StorageMock();
  const sessionStorageMock = new StorageMock();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
    writable: true,
  });

  // @ts-ignore
  global.localStorage = localStorageMock;
  // @ts-ignore
  global.sessionStorage = sessionStorageMock;
}

// Start mock service worker before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers added during a test (for test isolation)
afterEach(() => {
  server.resetHandlers();
  
  // Ensure window.location is always reset to the default mock URL
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://127.0.0.1:3001/',
        origin: 'http://127.0.0.1:3001',
        protocol: 'http:',
        host: '127.0.0.1:3001',
        hostname: '127.0.0.1',
        port: '3001',
        pathname: '/',
        search: '',
        hash: '',
        assign: () => {},
        replace: () => {},
        reload: () => {},
      },
      writable: true,
      configurable: true,
    });
  }
});

// Clean up after the test suite is done
afterAll(() => server.close());
