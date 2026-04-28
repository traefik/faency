import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';

import { CSS } from '../../stitches.config';
import { NavigationContainer, NavigationContainerProps } from '../Navigation';
import { NavigationTreeContext } from './NavigationTreeContext';

export interface NavigationTreeProps {
  children: React.ReactNode;
  defaultExpandIcon?: React.ReactNode;
  defaultCollapseIcon?: React.ReactNode;
  css?: CSS;
  fullWidth?: boolean;
}

export const NavigationTreeContainer = ({
  children,
  defaultCollapseIcon = <ChevronDownIcon />,
  defaultExpandIcon = <ChevronRightIcon />,
  fullWidth = false,
  ...props
}: NavigationTreeProps & NavigationContainerProps) => {
  return (
    <NavigationTreeContext.Provider value={{ defaultCollapseIcon, defaultExpandIcon, fullWidth }}>
      <NavigationContainer {...props}>{children}</NavigationContainer>
    </NavigationTreeContext.Provider>
  );
};
