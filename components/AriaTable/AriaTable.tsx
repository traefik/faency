import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import merge from 'lodash.merge';
import React, {
  Children,
  cloneElement,
  ComponentProps,
  ElementRef,
  forwardRef,
  isValidElement,
  ReactNode,
  useMemo,
  useState,
} from 'react';

import { styled, VariantProps } from '../../stitches.config';
import { Box } from '../Box';
import type { TableVariants } from '../Table';
import {
  Caption as TableCaption,
  StyledTr as TableTr,
  Table as TableTable,
  Tbody as TableTbody,
  Td as TableTd,
  Tfoot as TableTfoot,
  Th as TableTh,
  Thead as TableThead,
} from '../Table';

export const Caption = styled('div', TableCaption, {
  display: 'table-caption',
});

const StyledTbody = styled('div', TableTbody, {
  display: 'table-row-group',
});
export const Tbody = forwardRef<
  ElementRef<typeof StyledTbody>,
  ComponentProps<typeof StyledTbody> & VariantProps<typeof StyledTbody>
>((props, ref) => <StyledTbody ref={ref} role="rowgroup" {...props} />);

const StyledTfoot = styled('div', TableTfoot, {
  display: 'table-footer-group',
});
export const Tfoot = forwardRef<
  ElementRef<typeof StyledTfoot>,
  ComponentProps<typeof StyledTfoot> & VariantProps<typeof StyledTfoot>
>((props, ref) => <StyledTfoot ref={ref} role="rowgroup" {...props} />);

const StyledTr = styled('div', TableTr, {
  display: 'table-row',
});
const StyledTrSlot = styled(Slot, StyledTr);

const AnimatedContainer = ({ isOpen, children }: { isOpen: boolean; children: ReactNode }) => {
  const appliedStyle = useMemo(
    () =>
      isOpen
        ? {
            transition: 'all 0.2s ease-out',
            paddingBottom: 0,
            paddingTop: 0,
            border: 'none',
          }
        : {
            transition: 'all 0.2s ease-out',
            padding: '0px 16px',
            pointerEvents: 'none',
            border: 'none',
          },
    [isOpen],
  );

  const containerStyle = useMemo(
    () =>
      isOpen
        ? {
            transition: 'all 0.2s ease-out',
            padding: '16px',
            paddingBottom: 0,
          }
        : {
            transition: 'all 0.2s ease-out',
            height: 0,
            overflow: 'hidden',
            padding: '0px 16px',
          },
    [isOpen],
  );

  return (
    <StyledTr
      css={isOpen ? { '&:not(:last-child)': { borderBottom: '1px solid $tableRowBorder' } } : {}}
    >
      <Td css={appliedStyle} fullColSpan>
        <Box css={containerStyle}>{children}</Box>
      </Td>
    </StyledTr>
  );
};

export type AriaTrProps = ComponentProps<typeof StyledTr> &
  VariantProps<typeof StyledTr> & {
    asChild?: boolean;
    collapsedContent?: React.ReactNode;
    emptyFirstColumn?: boolean;
    tableHead?: boolean;
    children?: React.ReactNode;
  };

export const Tr = forwardRef<ElementRef<typeof StyledTr>, AriaTrProps>(
  ({ asChild, children, collapsedContent, emptyFirstColumn, tableHead, css, ...props }, ref) => {
    const Component = asChild ? StyledTrSlot : StyledTr;
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!asChild) {
      const arrayChildren = Children.toArray(children);
      const hasColSpanChildren = arrayChildren.some((child) => {
        if (!isValidElement(child)) {
          return false;
        }
        const { fullColSpan } = child.props as TdProps;
        return !!fullColSpan;
      });
      if (hasColSpanChildren && arrayChildren.length > 1) {
        throw new Error('Using fullColSpan is allowed only for a single full width Td.');
      }
    }

    const TdEl = useMemo(
      () =>
        emptyFirstColumn ? (
          tableHead ? (
            <Th css={{ width: 24 }} />
          ) : (
            <Td key="empty-td" />
          )
        ) : collapsedContent ? (
          <Td key="chevron-td">
            <Box
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <ChevronRightIcon
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-out',
                  transform: isCollapsed ? 'rotate(90deg)' : 'initial',
                }}
              />
            </Box>
          </Td>
        ) : null,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isCollapsed],
    );

    const renderedChildren = useMemo(() => {
      if (asChild) {
        return cloneElement(
          children as any,
          {
            // @ts-ignore: Object is possibly 'null'.
            ...children?.props,
          },
          // @ts-ignore: Object is possibly 'null'.
          [TdEl, ...(children?.props?.children || [])],
        );
      }

      return (
        <>
          {TdEl}
          {children}
        </>
      );
    }, [asChild, TdEl, children]);

    return (
      <>
        <Component
          ref={ref}
          role="row"
          css={
            !!collapsedContent && !isCollapsed
              ? {
                  ...css,
                  [`&:nth-last-child(2) > span`]: {
                    borderBottom: 'none',
                  },
                }
              : { ...css }
          }
          {...props}
        >
          {renderedChildren}
        </Component>
        {!!collapsedContent && (
          <AnimatedContainer isOpen={isCollapsed}>{collapsedContent}</AnimatedContainer>
        )}
      </>
    );
  },
);

const StyledTh = styled('span', TableTh, {
  display: 'table-cell',
});
export interface ThProps extends ComponentProps<typeof StyledTh>, VariantProps<typeof StyledTh> {}
export const Th = forwardRef<ElementRef<typeof StyledTh>, ThProps>((props, ref) => (
  <StyledTh ref={ref} role="columnheader" {...props} />
));

const StyledTd = styled('span', TableTd, {
  display: 'table-cell',
});

const FillerTd = styled(StyledTd, {
  visibility: 'hidden',
});
export type TdProps = ComponentProps<typeof StyledTd> &
  VariantProps<typeof StyledTd> &
  VariantProps<typeof TableTd> & {
    fullColSpan?: boolean;
  };

export const Td = forwardRef<ElementRef<typeof StyledTd>, TdProps>(
  ({ fullColSpan, css, ...props }, ref) => {
    const fullColSpanCss = useMemo(
      () =>
        fullColSpan
          ? {
              position: 'absolute',
              left: 0,
              width: '100%',
              height: '100%',
            }
          : {},
      [fullColSpan],
    );
    if (fullColSpan) {
      return (
        <>
          <FillerTd css={css} {...props} />
          <StyledTd ref={ref} role="cell" css={merge(fullColSpanCss, css)} {...props} />
        </>
      );
    }
    return <StyledTd ref={ref} role="cell" css={css} {...props} />;
  },
);

const StyledThead = styled('div', TableThead, {
  display: 'table-header-group',
});
export const Thead = forwardRef<
  ElementRef<typeof StyledThead>,
  ComponentProps<typeof StyledThead> & VariantProps<typeof StyledThead> & NonNullable<unknown>
>((props, ref) => <StyledThead ref={ref} role="rowgroup" {...props} />);

const StyledTable = styled('div', TableTable, {
  display: 'table',
});
export const Table = forwardRef<
  ElementRef<typeof StyledTable>,
  ComponentProps<typeof StyledTable> &
    VariantProps<typeof StyledTable> & { hasCollapsibleChildren?: boolean }
>(({ hasCollapsibleChildren, css, ...props }, ref) => (
  <StyledTable
    ref={ref}
    role="table"
    css={hasCollapsibleChildren ? { borderCollapse: 'collapse', ...css } : css}
    {...props}
  />
));

export type AriaTableVariants = VariantProps<typeof Table>;
export type AriaTableProps = TableVariants & NonNullable<unknown>;
