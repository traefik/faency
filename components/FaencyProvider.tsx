import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import React from 'react';

interface FaencyProviderProps {
  children?: React.ReactNode;
}

export const FaencyProvider = ({ children }: FaencyProviderProps) => (
  <TooltipProvider>{children}</TooltipProvider>
);
