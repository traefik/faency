import React, { ReactNode, useMemo, useState } from 'react';

import { CSS } from '../..';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { NavigationItem, NavigationItemProps } from '../Navigation';
import { Text } from '../Text';
import { NavigationTreeContainer } from './NavigationTreeContainer';
import { useNavigationTree } from './NavigationTreeContext';

export interface NavigationTreeItemProps {
  label: string | ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  onClick?: () => void;
  customExpandIcon?: React.ReactNode;
  customCollapseIcon?: React.ReactNode;
  nestedChildrenLevel?: number;
}

export const NavigationTreeItem = ({
  label,
  subtitle,
  children,
  onClick,
  defaultExpanded = false,
  customCollapseIcon,
  customExpandIcon,
  nestedChildrenLevel = 1,
  ...props
}: NavigationTreeItemProps & NavigationItemProps) => {
  const { defaultCollapseIcon, defaultExpandIcon, fullWidth } = useNavigationTree();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isExpandable = useMemo(() => !!children, [children]);
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
    ],
  );

  const childCss = useMemo(() => {
    if (!isExpandable) return null;

    return {
      pl: '$4',
      '> div > *': {
        '&::before, &::after': {
          left: fullWidth ? `calc(${nestedChildrenLevel} * -20px)` : 0,
        },
      },
    };
    // eslint-disable-next-line @eslint-react/exhaustive-deps
  }, [isExpandable, nestedChildrenLevel]);

  const focusStyle = useMemo(() => {
    if (!isExpandable) return {};

    return {
      '&:focus': {
        boxShadow: 'none',

        '&::before': {
          background: 'none',
        },
        '&::after': {
          background: 'none',
        },
      },
    };
  }, [isExpandable]);

  return (
    <Box>
      <NavigationItem
        css={{ width: '100%', ...focusStyle }}
        {...props}
        startAdornment={usedStartAdornment}
        onClick={isExpandable ? () => setIsExpanded(!isExpanded) : onClick}
      >
        <Flex
          direction="column"
          align="start"
          gap={1}
          css={{
            ml: isExpandable || hasStartAdornment ? 0 : '$4',
            color: 'inherit',
            width: '100%',
          }}
        >
          {typeof label === 'string' ? <Text css={{ color: 'inherit' }}>{label}</Text> : label}
          {subtitle && (
            <Text variant="subtle" css={{ fontSize: '$3', opacity: 0.8 }}>
              {subtitle}
            </Text>
          )}
        </Flex>
      </NavigationItem>
      {isExpanded && (
        <NavigationTreeContainer
          defaultCollapseIcon={defaultCollapseIcon}
          defaultExpandIcon={defaultExpandIcon}
          fullWidth={fullWidth}
          css={childCss as CSS}
        >
          {children}
        </NavigationTreeContainer>
      )}
    </Box>
  );
};
