import React from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';

interface FaencyProviderProps extends Tooltip.TooltipProviderProps {
  children: React.ReactNode;
}

export const FaencyProvider = ({ children, ...tooltipConfig }: FaencyProviderProps) => (
  <Tooltip.Provider {...tooltipConfig}>{children}</Tooltip.Provider>
);
