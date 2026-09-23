import { createContext, useContext } from 'react';
/** Scope migrated Foundations presentation changes without changing Professional. */
export const FoundationVisualContext = createContext(false);
export const useFoundationVisuals = () => useContext(FoundationVisualContext);
