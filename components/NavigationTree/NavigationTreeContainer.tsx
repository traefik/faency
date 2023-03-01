import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';
import { NavigationContainer, NavigationContainerProps } from '../Navigation';
import { CSS } from '../../stitches.config';

export interface TreeViewProps {
  children: React.ReactNode;
  defaultExpandIcon?: React.ReactNode;
  defaultCollapseIcon?: React.ReactNode;
  css?: CSS;
}

const NavigationTreeContainer = ({
  children,
  defaultCollapseIcon = <ChevronDownIcon />,
  defaultExpandIcon = <ChevronRightIcon />,
  ...props
}: TreeViewProps & NavigationContainerProps) => {
  const renderChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child as React.ReactElement, {
      defaultCollapseIcon,
      defaultExpandIcon,
    });
  });
  return <NavigationContainer {...props}>{renderChildren}</NavigationContainer>;
};

export default NavigationTreeContainer;
