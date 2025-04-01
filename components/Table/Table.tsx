import { ChevronRightIcon } from '@radix-ui/react-icons';
import React, { ComponentProps, ElementRef, forwardRef, ReactNode, useMemo, useState } from 'react';

import { styled, VariantProps } from '../../stitches.config';
import { Box } from '../Box';
import { elevationVariants } from '../Elevation';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Text } from '../Text';

export const Caption = styled('caption', Text, {
  display: 'table-caption',
  textAlign: 'start',
  fontVariantNumeric: 'proportional-nums',
  fontWeight: '$medium',
  lineHeight: '1.25',
});

export const Tbody = styled('tbody', {
  width: '100%',
  verticalAlign: 'middle',
});

export const Th = styled('th', Label, {
  // override Label
  display: 'table-cell',
  verticalAlign: 'inherit',

  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',

  textAlign: 'start',
  p: '$2 $3',
  borderBottom: '1px solid $tableRowBorder',

  variants: {
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
    transform: {
      capitalize: {
        display: 'table-cell', // revert Label enforced value
      },
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export const Td = styled('td', {
  boxSizing: 'border-box',
  p: '$5 $3',
  borderBottom: '1px solid $tableRowBorder',
  fontSize: '$3',
  lineHeight: '16px',
  verticalAlign: 'inherit',
  variants: {
    subtle: {
      true: {
        fontWeight: '$regular',
        color: '$tableSubtleText',
      },
    },
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

export const StyledTr = styled('tr', {
  verticalAlign: 'inherit',
  '&:hover': {
    color: '$tableHoverText',
  },
  [`&:last-child > ${Td}`]: {
    borderBottom: 'none',
  },

  variants: {
    interactive: {
      true: {
        '&:hover': {
          backgroundColor: '$tableHoverBackground',
          cursor: 'pointer',
        },
      },
    },
    active: {
      true: {
        backgroundColor: '$tableHoverBackground',
        color: '$tableActiveText',
        fontWeight: '$semiBold',
      },
    },
  },
  compoundVariants: [
    {
      interactive: true,
      active: true,
      css: {
        '&:hover': {
          color: '$tableActiveHoverText',
        },
      },
    },
  ],
});

const AnimatedTr = ({
  collapsedContentColSpan,
  isOpen,
  children,
}: {
  collapsedContentColSpan: number;
  isOpen: boolean;
  children: ReactNode;
}) => {
  const appliedStyle = useMemo(
    () =>
      isOpen
        ? { transition: 'padding 0.2s ease-out' }
        : {
            transition: 'padding 0.2s ease-out',
            lineHeight: 0,
            fontSize: 0,
            padding: '0px 16px',
            border: 'none',
          },
    [isOpen],
  );

  const containerStyle = useMemo(
    () =>
      isOpen
        ? { transition: 'all 0.2s ease-out' }
        : {
            transition: 'all 0.2s ease-out',
            height: 0,
            overflow: 'hidden',
          },
    [isOpen],
  );

  return (
    <Tr>
      <Td colSpan={collapsedContentColSpan} css={appliedStyle}>
        <Box css={containerStyle}>{children}</Box>
      </Td>
    </Tr>
  );
};
export type TrProps = ComponentProps<typeof StyledTr> &
  VariantProps<typeof StyledTr> & {
    children: React.ReactNode;
    collapsedContent?: React.ReactNode;
    emptyFirstColumn?: boolean;
    tableHead?: boolean;
    collapsedContentColSpan?: number;
  };

export const Tr = forwardRef<ElementRef<typeof StyledTr>, TrProps>(
  (
    {
      children,
      collapsedContent,
      emptyFirstColumn = false,
      tableHead = false,
      collapsedContentColSpan = 1,
      css,
      ...props
    },
    ref,
  ) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <>
        <StyledTr
          ref={ref}
          css={
            !!collapsedContent && !isCollapsed
              ? {
                  ...css,
                  [`&:nth-last-child(2) > ${Td}`]: {
                    borderBottom: 'none',
                  },
                }
              : { ...css }
          }
          {...props}
        >
          {emptyFirstColumn ? tableHead ? <Th css={{ width: 24 }} /> : <Td /> : null}
          {!!collapsedContent && (
            <Td
              css={{ padding: '0 0 0 $3' }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Flex
                align="center"
                justify="center"
                css={{
                  height: '40px',
                  '&:hover': {
                    color: '$tableActiveText',
                  },
                }}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <ChevronRightIcon
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-out',
                    transform: isCollapsed ? 'rotate(90deg)' : 'initial',
                  }}
                />
              </Flex>
            </Td>
          )}
          {children}
        </StyledTr>
        {!!collapsedContent && (
          <AnimatedTr isOpen={isCollapsed} collapsedContentColSpan={collapsedContentColSpan}>
            {collapsedContent}
          </AnimatedTr>
        )}
      </>
    );
  },
);

export const Tfoot = styled('tfoot', {
  verticalAlign: 'middle',
  position: 'relative',
  borderRadius: 'inherit',

  '&::after': {
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: '$tableFooterLayerBackground',
    borderRadius: 'inherit',
  },

  [`& ${Td}`]: {
    fontSize: '$1',
    color: '$tableHeaderText',
    fontWeight: '$light',
    p: '$2 $3',
  },
});

export const Thead = styled('thead', {
  position: 'relative',
  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',
  verticalAlign: 'middle',

  '&::after': {
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: '$tableHeaderLayerBackground',
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
  },

  [`& ${Th}`]: {
    fontSize: '$1',
    color: '$tableHeaderText',
    fontWeight: '$light',
  },
});

export const Table = styled('table', {
  width: '100%',
  tableLayout: 'fixed',
  boxSizing: 'border-box',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontFamily: '$rubik',
  color: '$tableText',
  borderRadius: '$3',
  overflow: 'hidden',
  [`& ${Tbody}:not(:empty) ~ ${Tfoot}`]: {
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    [`& ${Td}`]: {
      borderTop: '1px solid $tableRowBorder',
    },
  },
  [`& ${Thead}:not(:empty) ~ ${Tfoot}`]: {
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  },

  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 1,
  },
});

export type TableVariants = VariantProps<typeof Table>;
export type TableProps = TableVariants & NonNullable<unknown>;
