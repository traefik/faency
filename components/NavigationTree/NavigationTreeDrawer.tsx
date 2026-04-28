import React from 'react';

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

  return (
    <NavigationTreeContext.Provider value={{ ...parentCtx, fullWidth }}>
      <NavigationDrawer fullWidth={fullWidth} {...props}>
        {children}
      </NavigationDrawer>
    </NavigationTreeContext.Provider>
  );
};
