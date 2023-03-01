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
  customExpandIcon?: React.ReactNode;
  customCollapseIcon?: React.ReactNode;
}

const NavigationTreeItem = ({
  label,
  children,
  onClick,
  defaultCollapseIcon,
  defaultExpandIcon,
  customCollapseIcon,
  customExpandIcon,
  ...props
}: NavigationTreeItemProps & NavigationItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasStartAdornment = useMemo(() => !!props?.startAdornment, [props]);
  const isExpandable = useMemo(() => React.Children.count(children) > 0, [children]);

  return (
    <Box>
      <NavigationItem
        onClick={isExpandable ? () => setIsExpanded(!isExpanded) : onClick}
        startAdornment={
          isExpandable
            ? isExpanded
              ? customCollapseIcon || defaultCollapseIcon
              : customExpandIcon || defaultExpandIcon
            : null
        }
        css={{ width: '100%' }}
        {...props}
      >
        <Box css={{ ml: isExpandable || hasStartAdornment ? 0 : '$4' }}>{label}</Box>
      </NavigationItem>
      {isExpanded && (
        <NavigationTreeContainer
          defaultCollapseIcon={defaultCollapseIcon}
          defaultExpandIcon={defaultExpandIcon}
          css={{ ml: '$4' }}
        >
          {children}
        </NavigationTreeContainer>
      )}
    </Box>
  );
};

export default NavigationTreeItem;
