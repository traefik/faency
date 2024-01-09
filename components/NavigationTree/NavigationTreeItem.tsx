import React, { useMemo, useState } from 'react';
import { Box } from '../Box';
import { NavigationItem, NavigationItemProps } from '../Navigation';
import { NavigationTreeContainer } from './NavigationTreeContainer';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { CSS } from '../..';

export interface NavigationTreeItemProps {
  label: string;
  subtitle?: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  onClick?: () => void;
  defaultExpandIcon?: React.ReactNode;
  defaultCollapseIcon?: React.ReactNode;
  customExpandIcon?: React.ReactNode;
  customCollapseIcon?: React.ReactNode;
  nestedLevel?: number;
}

export const NavigationTreeItem = ({
  label,
  subtitle,
  children,
  onClick,
  defaultExpanded = false,
  defaultCollapseIcon,
  defaultExpandIcon,
  customCollapseIcon,
  customExpandIcon,
  nestedLevel = 0,
  ...props
}: NavigationTreeItemProps & NavigationItemProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isExpandable = useMemo(() => React.Children.count(children) > 0, [children]);
  const hasStartAdornment = useMemo(() => !!props.startAdornment, [props.startAdornment]);
  const usedStartAdornment = useMemo(
    () =>
      hasStartAdornment
        ? props.startAdornment
        : isExpandable
        ? isExpanded
          ? customCollapseIcon || defaultCollapseIcon
          : customExpandIcon || defaultExpandIcon
        : null,
    [
      hasStartAdornment,
      isExpandable,
      isExpanded,
      defaultCollapseIcon,
      defaultExpandIcon,
      customCollapseIcon,
      customExpandIcon,
      props.startAdornment,
    ]
  );

  const childCss = useMemo(() => {
    if (!isExpandable) return null;

    return {
      pl: '$4',
      '> div > *': {
        '&::before, &::after': {
          left: `calc(${nestedLevel + 1} * -20px)`,
        },
      },
    };
  }, [isExpandable, nestedLevel]);

  return (
    <Box>
      <NavigationItem
        css={{ width: '100%' }}
        {...props}
        startAdornment={usedStartAdornment}
        onClick={isExpandable ? () => setIsExpanded(!isExpanded) : onClick}
      >
        <Flex
          direction="column"
          align="start"
          gap={1}
          css={{ ml: isExpandable || hasStartAdornment ? 0 : '$4' }}
        >
          <Text>{label}</Text>
          {subtitle && (
            <Text variant="subtle" css={{ fontSize: '$3', opacity: 0.8 }}>
              {subtitle}
            </Text>
          )}
        </Flex>
      </NavigationItem>
      {isExpanded && (
        <NavigationTreeContainer
          key={label}
          defaultCollapseIcon={defaultCollapseIcon}
          defaultExpandIcon={defaultExpandIcon}
          css={childCss as CSS}
        >
          {children}
        </NavigationTreeContainer>
      )}
    </Box>
  );
};
