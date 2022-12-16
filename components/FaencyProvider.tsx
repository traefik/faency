import React from 'react';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

interface FaencyProviderProps {
  children: React.ReactNode;
}

export const FaencyProvider = ({ children }: FaencyProviderProps) => (
  <TooltipProvider>{children}</TooltipProvider>
);
