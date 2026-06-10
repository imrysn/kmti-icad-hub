/**
 * src/test/mocks/server.ts
 *
 * MSW Node.js server for use in Vitest (jsdom environment).
 * Imported by src/test/setup.ts to manage the server lifecycle globally.
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
