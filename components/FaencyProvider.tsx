import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import React from 'react';

import { ColorSchemeProvider } from './colorSchemeContext';

interface FaencyProviderProps {
  children?: React.ReactNode;
}

export const FaencyProvider = ({ children }: FaencyProviderProps) => (
  <TooltipProvider>
    <ColorSchemeProvider>{children}</ColorSchemeProvider>
  </TooltipProvider>
);
