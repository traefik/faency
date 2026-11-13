import { RecipeVariants } from '@vanilla-extract/recipes';
import React, {
  Children,
  forwardRef,
  isValidElement,
  ReactNode,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';

import { CSSProps } from '../../styles/cssProps';
import { useIsomorphicLayoutEffect } from '../../utils/useIsomorphicLayoutEffect';
import {
  handleRowClick,
  mapRowLink,
  openRowLink,
  RowLinkShortcutProps,
} from '../RowLink/RowLink.utils';
import { RowLinkVanilla } from '../RowLink/RowLink.vanilla';
import { rowLinkRow, rowLinkTable } from '../RowLink/RowLink.vanilla.css';
import { ExpandToggleVanilla, stopEvent } from '../Table/ExpandToggle.vanilla';
import { ARIA_SORT, SortButtonVanilla } from '../Table/SortButton.vanilla';
import { cx, useInlineStyle } from '../Table/Table.utils';
import {
  captionRecipe,
  emptyHeaderCell,
  tableRecipe,
  tbody,
  tdRecipe,
  tfoot,
  thead,
  thRecipe,
  toggleCell,
  trRecipe,
} from '../Table/Table.vanilla.css';
import { TableSortProps } from '../Table/useTableSort';
import { FULL_COL_SPAN_ATTRIBUTE } from './AriaTable.constants';
import {
  ariaCell,
  ariaTable,
  ariaTbody,
  ariaTfoot,
  ariaThead,
  ariaTr,
  collapsedCell,
  collapsedContent as collapsedContentClass,
  collapsedRow,
  collapsibleTable,
  fillerCell,
  fullColSpanCell,
} from './AriaTable.vanilla.css';

type TableRecipeVariants = NonNullable<RecipeVariants<typeof tableRecipe>>;
type CaptionRecipeVariants = NonNullable<RecipeVariants<typeof captionRecipe>>;
type TrRecipeVariants = NonNullable<RecipeVariants<typeof trRecipe>>;
type ThRecipeVariants = NonNullable<RecipeVariants<typeof thRecipe>>;
type TdRecipeVariants = NonNullable<RecipeVariants<typeof tdRecipe>>;

export type AriaTableVanillaProps = React.HTMLAttributes<HTMLDivElement> &
  CSSProps &
  TableRecipeVariants & {
    /** Collapses the borders, for a table with collapsible rows. */
    hasCollapsibleChildren?: boolean;
  };

export const AriaTableVanilla = forwardRef<HTMLDivElement, AriaTableVanillaProps>(
  ({ elevation, hasCollapsibleChildren = false, className, css, style, ...props }, ref) => (
    <div
      ref={ref}
      role="table"
      className={cx(
        tableRecipe({ elevation }),
        ariaTable,
        hasCollapsibleChildren && collapsibleTable,
        rowLinkTable,
        className,
      )}
      style={useInlineStyle(css, style)}
      {...props}
    />
  ),
);

AriaTableVanilla.displayName = 'AriaTableVanilla';

export type AriaCaptionVanillaProps = React.HTMLAttributes<HTMLDivElement> &
  CSSProps &
  CaptionRecipeVariants;

export const AriaCaptionVanilla = forwardRef<HTMLDivElement, AriaCaptionVanillaProps>(
  (
    { size, weight, variant, gradient, transform, noWrap, className, css, style, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cx(
        captionRecipe({ size, weight, variant, gradient, transform, noWrap }),
        className,
      )}
      style={useInlineStyle(css, style)}
      {...props}
    />
  ),
);

AriaCaptionVanilla.displayName = 'AriaCaptionVanilla';

export type AriaTableSectionVanillaProps = React.HTMLAttributes<HTMLDivElement> & CSSProps;

const section = (sectionClass: string, displayName: string) => {
  const Section = forwardRef<HTMLDivElement, AriaTableSectionVanillaProps>(
    ({ className, css, style, ...props }, ref) => (
      <div
        ref={ref}
        role="rowgroup"
        className={cx(sectionClass, className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    ),
  );
  Section.displayName = displayName;
  return Section;
};

export const AriaTheadVanilla = section(cx(thead, ariaThead), 'AriaTheadVanilla');
export const AriaTbodyVanilla = section(cx(tbody, ariaTbody), 'AriaTbodyVanilla');
export const AriaTfootVanilla = section(cx(tfoot, ariaTfoot), 'AriaTfootVanilla');

export type AriaThVanillaProps = React.HTMLAttributes<HTMLSpanElement> &
  CSSProps &
  ThRecipeVariants &
  TableSortProps;

export const AriaThVanilla = forwardRef<HTMLSpanElement, AriaThVanillaProps>(
  (
    {
      size,
      weight,
      variant,
      gradient,
      transform,
      noWrap,
      align,
      sort,
      onSort,
      className,
      css,
      style,
      children,
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      role="columnheader"
      aria-sort={sort && ARIA_SORT[sort]}
      className={cx(
        thRecipe({ size, weight, variant, gradient, transform, noWrap, align }),
        ariaCell,
        className,
      )}
      style={useInlineStyle(css, style)}
      {...props}
    >
      {onSort ? (
        <SortButtonVanilla sort={sort} onSort={onSort}>
          {children}
        </SortButtonVanilla>
      ) : (
        children
      )}
    </span>
  ),
);

AriaThVanilla.displayName = 'AriaThVanilla';

export type AriaTdVanillaProps = React.HTMLAttributes<HTMLSpanElement> &
  CSSProps &
  TdRecipeVariants & {
    /** Spans the whole row. It must be the only cell of its row. */
    fullColSpan?: boolean;
  };

// The cell is taken out of the row to span it, so an empty filler as tall as the cell holds the row open.
const FullColSpanCell = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, forwardedRef) => {
    const cellRef = useRef<HTMLSpanElement | null>(null);
    const [height, setHeight] = useState(0);

    useIsomorphicLayoutEffect(() => {
      const cell = cellRef.current;
      if (!cell || typeof ResizeObserver === 'undefined') {
        return undefined;
      }
      const update = () => setHeight(cell.offsetHeight);
      update();
      const observer = new ResizeObserver(update);
      observer.observe(cell);
      return () => observer.disconnect();
    }, []);

    const setRefs = useCallback(
      (node: HTMLSpanElement | null) => {
        cellRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    return (
      <>
        <span aria-hidden className={cx(ariaCell, fillerCell)} style={{ height }} />
        <span
          ref={setRefs}
          role="cell"
          {...{ [FULL_COL_SPAN_ATTRIBUTE]: '' }}
          className={cx(className, fullColSpanCell)}
          {...props}
        />
      </>
    );
  },
);

FullColSpanCell.displayName = 'FullColSpanCell';

export const AriaTdVanilla = forwardRef<HTMLSpanElement, AriaTdVanillaProps>(
  ({ fullColSpan = false, subtle, align, className, css, style, ...props }, ref) => {
    const Cell = fullColSpan ? FullColSpanCell : 'span';

    return (
      <Cell
        ref={ref}
        role="cell"
        className={cx(tdRecipe({ subtle, align }), ariaCell, className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    );
  },
);

AriaTdVanilla.displayName = 'AriaTdVanilla';

const assertFullColSpanAlone = (children: ReactNode, addedCells: number) => {
  // eslint-disable-next-line @eslint-react/no-children-to-array
  const cells = Children.toArray(children);
  const hasFullColSpan = cells.some(
    (child) => isValidElement<AriaTdVanillaProps>(child) && !!child.props.fullColSpan,
  );
  if (hasFullColSpan && cells.length + addedCells > 1) {
    throw new Error(
      'AriaTrVanilla: a fullColSpan AriaTdVanilla must be the only cell of its row, without emptyFirstColumn or collapsedContent.',
    );
  }
};

export type AriaTrVanillaProps = React.HTMLAttributes<HTMLDivElement> &
  CSSProps &
  TrRecipeVariants &
  RowLinkShortcutProps & {
    /** Content shown in a full-width row below, toggled by a button in a new first cell. */
    collapsedContent?: ReactNode;
    /** Accessible name of the expand button. */
    expandLabel?: string;
    /** Adds an empty first cell, to line up with rows that have an expand button. */
    emptyFirstColumn?: boolean;
    /** Styles the empty first cell as a header, for a row in `AriaTheadVanilla`. */
    tableHead?: boolean;
  };

export const AriaTrVanilla = forwardRef<HTMLDivElement, AriaTrVanillaProps>(
  (
    {
      collapsedContent,
      expandLabel = 'Expand row',
      emptyFirstColumn = false,
      tableHead = false,
      href,
      linkAs,
      linkCell,
      linkProps,
      linkOverlay,
      interactive,
      active,
      className,
      css,
      style,
      children,
      onClick,
      onAuxClick,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentId = useId();
    const inlineStyle = useInlineStyle(css, style);
    const collapsible = !!collapsedContent;

    assertFullColSpanAlone(children, Number(emptyFirstColumn) + Number(collapsible));

    return (
      <>
        <div
          ref={ref}
          role="row"
          className={cx(
            trRecipe({ interactive: interactive ?? (href !== undefined || undefined), active }),
            ariaTr,
            rowLinkRow,
            className,
          )}
          data-collapsed={collapsible && !isOpen ? '' : undefined}
          style={inlineStyle}
          onClick={(event) => handleRowClick(event, onClick)}
          onAuxClick={(event) => {
            onAuxClick?.(event);
            openRowLink(event);
          }}
          {...props}
        >
          {emptyFirstColumn &&
            (tableHead ? (
              <span role="cell" className={cx(thRecipe(), ariaCell, emptyHeaderCell)} />
            ) : (
              <AriaTdVanilla />
            ))}
          {collapsible && (
            <AriaTdVanilla className={toggleCell} onClick={stopEvent}>
              <ExpandToggleVanilla
                label={expandLabel}
                isOpen={isOpen}
                controls={contentId}
                onToggle={() => setIsOpen((open) => !open)}
              />
            </AriaTdVanilla>
          )}
          {mapRowLink(
            children,
            { href, linkAs, linkCell, linkProps, linkOverlay },
            AriaTdVanilla,
            RowLinkVanilla,
            { row: 'AriaTrVanilla', cell: 'AriaTdVanilla' },
          )}
        </div>
        {collapsible && (
          <AriaTrVanilla className={collapsedRow} data-open={isOpen ? '' : undefined}>
            <AriaTdVanilla
              id={contentId}
              fullColSpan
              className={collapsedCell}
              data-closed={isOpen ? undefined : ''}
            >
              <div className={collapsedContentClass}>{collapsedContent}</div>
            </AriaTdVanilla>
          </AriaTrVanilla>
        )}
      </>
    );
  },
);

AriaTrVanilla.displayName = 'AriaTrVanilla';
