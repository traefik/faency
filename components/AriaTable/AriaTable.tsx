import React, {
  cloneElement,
  ComponentProps,
  ElementRef,
  forwardRef,
  useMemo,
  Children,
  isValidElement,
  useState,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { styled, VariantProps, CSS } from '../../stitches.config';
import {
  Caption as TableCaption,
  Tbody as TableTbody,
  Tfoot as TableTfoot,
  StyledTr as TableTr,
  Th as TableTh,
  Td as TableTd,
  Thead as TableThead,
  Table as TableTable,
} from '../Table';
import merge from 'lodash.merge';
import { Box } from '../Box';
import { ChevronRightIcon } from '@radix-ui/react-icons';

export const Caption = styled('div', TableCaption, {
  display: 'table-caption',
});

const StyledTbody = styled('div', TableTbody, {
  display: 'table-row-group',
});
export const Tbody = forwardRef<
  ElementRef<typeof StyledTbody>,
  Omit<ComponentProps<typeof StyledTbody>, 'css'> & VariantProps<typeof StyledTbody> & { css?: CSS }
>((props, ref) => <StyledTbody ref={ref} role="rowgroup" {...props} />);

const StyledTfoot = styled('div', TableTfoot, {
  display: 'table-footer-group',
});
export const Tfoot = forwardRef<
  ElementRef<typeof StyledTfoot>,
  Omit<ComponentProps<typeof StyledTfoot>, 'css'> & VariantProps<typeof StyledTfoot> & { css?: CSS }
>((props, ref) => <StyledTfoot ref={ref} role="rowgroup" {...props} />);

const StyledTr = styled('div', TableTr, {
  display: 'table-row',
});
const StyledTrSlot = styled(Slot, StyledTr);

const RenderedCollapsedContent = ({ isOpen, UsedComponent, children }) => {
  return Children.map(children.props.children, (child) => {
    return (
      <AnimatedTr isOpen={isOpen} UsedComponent={UsedComponent}>
        {child}
      </AnimatedTr>
    );
  });
};

const AnimatedTr = ({ isOpen, UsedComponent, children }) => {
  const appliedStyle = useMemo(
    () =>
      isOpen
        ? { transition: 'padding 0.2s ease-out' }
        : { transition: 'padding 0.2s ease-out', lineHeight: 0, fontSize: 0, padding: '0px 16px' },
    [isOpen]
  );

  const renderedChildren = useMemo(() => {
    return Children.map(children.props.children, (child) =>
      cloneElement(child, {
        style: {
          ...child.props.style,
          ...appliedStyle,
        },
      })
    );
  }, [children, isOpen]);

  return (
    <UsedComponent>
      <Td css={appliedStyle} />
      {renderedChildren}
    </UsedComponent>
  );
};
export interface TrProps
  extends Omit<ComponentProps<typeof StyledTr>, 'css'>,
    VariantProps<typeof StyledTr> {
  asChild?: boolean;
  collapsedContent?: React.ReactNode;
  emptyFirstColumn?: boolean;
  tableHead?: boolean;
  css?: CSS;
}
export const Tr = forwardRef<ElementRef<typeof StyledTr>, TrProps>(
  ({ asChild, children, collapsedContent, emptyFirstColumn, tableHead, ...props }, ref) => {
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

    return (
      <>
        <Component ref={ref} role="row" {...props}>
          {emptyFirstColumn ? tableHead ? <Th css={{ width: 24 }} /> : <Td /> : null}
          {!!collapsedContent && (
            <Td>
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
          )}
          {children}
        </Component>
        {!!collapsedContent && (
          <RenderedCollapsedContent isOpen={isCollapsed} UsedComponent={Component}>
            {collapsedContent}
          </RenderedCollapsedContent>
        )}
      </>
    );
  }
);

const StyledTh = styled('span', TableTh, {
  display: 'table-cell',
});
export interface ThProps
  extends Omit<ComponentProps<typeof StyledTh>, 'css'>,
    VariantProps<typeof StyledTh> {
  css?: CSS;
}
export const Th = forwardRef<ElementRef<typeof StyledTh>, ThProps>((props, ref) => (
  <StyledTh ref={ref} role="columnheader" {...props} />
));

const StyledTd = styled('span', TableTd, {
  display: 'table-cell',
});

const FillerTd = styled(StyledTd, {
  visibility: 'hidden',
});
export interface TdProps
  extends Omit<ComponentProps<typeof StyledTd>, 'css'>,
    VariantProps<typeof StyledTd>,
    VariantProps<typeof TableTd> {
  css?: CSS;
  fullColSpan?: boolean;
}
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
      [fullColSpan]
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
  }
);

const StyledThead = styled('div', TableThead, {
  display: 'table-header-group',
});
export const Thead = forwardRef<
  ElementRef<typeof StyledThead>,
  Omit<ComponentProps<typeof StyledThead>, 'css'> & VariantProps<typeof StyledThead> & { css?: CSS }
>((props, ref) => <StyledThead ref={ref} role="rowgroup" {...props} />);

const StyledTable = styled('div', TableTable, {
  display: 'table',
});
export const Table = forwardRef<
  ElementRef<typeof StyledTable>,
  Omit<ComponentProps<typeof StyledTable>, 'css'> & VariantProps<typeof StyledTable> & { css?: CSS }
>((props, ref) => <StyledTable ref={ref} role="table" {...props} />);

export type TableVariants = VariantProps<typeof Table>;
export type TableProps = TableVariants & {};
