import React from 'react';
import { NavigationDrawer, NavigationDrawerProps } from '../Navigation';
import { CSS } from '../../stitches.config';

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
  const renderChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child as React.ReactElement, {
      fullWidth,
    });
  });

  return (
    <NavigationDrawer fullWidth={fullWidth} {...props}>
      {renderChildren}
    </NavigationDrawer>
  );
};
