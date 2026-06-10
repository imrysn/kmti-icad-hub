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

// Start mock service worker before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers added during a test (for test isolation)
afterEach(() => server.resetHandlers());

// Clean up after the test suite is done
afterAll(() => server.close());
