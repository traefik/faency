import { useEffect, useLayoutEffect } from 'react';

// React 18 warns when useLayoutEffect runs during server rendering, where it does nothing anyway.
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
