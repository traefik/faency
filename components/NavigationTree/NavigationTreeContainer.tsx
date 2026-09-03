import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React, { useMemo } from 'react';

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
  const contextValue = useMemo(
    () => ({ defaultCollapseIcon, defaultExpandIcon, fullWidth }),
    [defaultCollapseIcon, defaultExpandIcon, fullWidth],
  );

  return (
    <NavigationTreeContext.Provider value={contextValue}>
      <NavigationContainer {...props}>{children}</NavigationContainer>
    </NavigationTreeContext.Provider>
  );
};
