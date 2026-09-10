import { createContext } from 'react';

/** Optional course integration. Standalone/Professional players retain their existing behavior. */
export const FoundationCompletionContext = createContext<{
  complete: () => Promise<void>;
  advance: () => void;
  nextLabel: string;
} | null>(null);
