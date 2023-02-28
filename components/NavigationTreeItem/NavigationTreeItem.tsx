import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import React, { useMemo, useState } from 'react';
import { Box } from '../Box';
import { NavigationItem, NavigationItemProps } from '../Navigation';
import NavigationTreeContainer from './NavigationTreeContainer';

export interface NavigationTreeItemProps {
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
  defaultExpandIcon?: React.ReactNode;
  defaultCollapseIcon?: React.ReactNode;
}

const NavigationTreeItem = ({
  label,
  children,
  onClick,
  defaultCollapseIcon,
  defaultExpandIcon,
  ...props
}: NavigationTreeItemProps & NavigationItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandable = useMemo(() => React.Children.count(children) > 0, [children]);

  return (
    <Box>
      <NavigationItem
        onClick={isExpandable ? () => setIsExpanded(!isExpanded) : onClick}
        startAdornment={
          isExpandable ? (isExpanded ? defaultExpandIcon : defaultCollapseIcon) : null
        }
        css={{ width: '100%' }}
        {...props}
      >
        <Box css={{ ml: isExpandable ? 0 : '$4' }}>{label}</Box>
      </NavigationItem>
      {isExpanded && (
        <NavigationTreeContainer css={{ ml: '$4' }}>{children}</NavigationTreeContainer>
      )}
    </Box>
  );
};

export default NavigationTreeItem;
