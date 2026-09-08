import React, { useMemo } from 'react';

import { CSS } from '../../stitches.config';
import { NavigationDrawer, NavigationDrawerProps } from '../Navigation';
import { NavigationTreeContext, useNavigationTree } from './NavigationTreeContext';

export interface NavigationTreeDrawerProps {
  children: React.ReactNode;
  css?: CSS;
  fullWidth?: boolean;
}

export const NavigationTreeDrawer = ({
  children,
  fullWidth = false,
  ...props
}: NavigationTreeDrawerProps & NavigationDrawerProps) => {
  const parentCtx = useNavigationTree();
  const contextValue = useMemo(
    () => ({ ...parentCtx, fullWidth }),
    [parentCtx, fullWidth],
  );

  return (
    <NavigationTreeContext.Provider value={contextValue}>
      <NavigationDrawer fullWidth={fullWidth} {...props}>
        {children}
      </NavigationDrawer>
    </NavigationTreeContext.Provider>
  );
};
