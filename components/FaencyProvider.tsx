import React from 'react';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';

export const FaencyProvider: React.FC = ({ children }) => (
  <TooltipProvider>{children}</TooltipProvider>
);
