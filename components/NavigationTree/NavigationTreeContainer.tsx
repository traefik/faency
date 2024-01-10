import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';
import { NavigationContainer, NavigationContainerProps } from '../Navigation';
import { CSS } from '../../stitches.config';

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
  const renderChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child as React.ReactElement, {
      defaultCollapseIcon,
      defaultExpandIcon,
      fullWidth,
    });
  });

  return <NavigationContainer {...props}>{renderChildren}</NavigationContainer>;
};
