import React, { forwardRef, ReactNode, useId, useState } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { RecipeVariantProps, splitVariants } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import {
  handleRowClick,
  mapRowLink,
  openRowLink,
  RowLinkShortcutProps,
} from '@/components/RowLink/RowLink.utils';
import { RowLinkVanilla } from '@/components/RowLink/RowLink.vanilla';
import { rowLinkRow, rowLinkTable } from '@/components/RowLink/RowLink.vanilla.css';

import { ExpandToggleVanilla, stopEvent } from './ExpandToggle.vanilla';
import { ARIA_SORT, SortButtonVanilla } from './SortButton.vanilla';
import {
  captionRecipe,
  collapsedCell,
  collapsedContent as collapsedContentClass,
  emptyHeaderCell,
  tableRecipe,
  tbody,
  tdRecipe,
  tfoot,
  thead,
  thRecipe,
  toggleCell,
  trRecipe,
} from './Table.vanilla.css';
import { TableSortProps } from './useTableSort';

type TableRecipeVariants = RecipeVariantProps<typeof tableRecipe>;
type CaptionRecipeVariants = RecipeVariantProps<typeof captionRecipe>;
type TrRecipeVariants = RecipeVariantProps<typeof trRecipe>;
type ThRecipeVariants = RecipeVariantProps<typeof thRecipe>;
type TdRecipeVariants = RecipeVariantProps<typeof tdRecipe>;

export type TableVanillaProps = React.TableHTMLAttributes<HTMLTableElement> &
  CSSProps &
  TableRecipeVariants;

export const TableVanilla = forwardRef<HTMLTableElement, TableVanillaProps>(
  ({ className, css, style, ...rest }, ref) => {
    const [variants, props] = splitVariants(tableRecipe, rest);

    return (
      <table
        ref={ref}
        className={cx(tableRecipe(variants), rowLinkTable, className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    );
  },
);

TableVanilla.displayName = 'TableVanilla';

export type CaptionVanillaProps = React.HTMLAttributes<HTMLTableCaptionElement> &
  CSSProps &
  CaptionRecipeVariants;

export const CaptionVanilla = forwardRef<HTMLTableCaptionElement, CaptionVanillaProps>(
  ({ className, css, style, ...rest }, ref) => {
    const [variants, props] = splitVariants(captionRecipe, rest);

    return (
      <caption
        ref={ref}
        className={cx(captionRecipe(variants), className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    );
  },
);

CaptionVanilla.displayName = 'CaptionVanilla';

export type TableSectionVanillaProps = React.HTMLAttributes<HTMLTableSectionElement> & CSSProps;

const section = (Tag: 'thead' | 'tbody' | 'tfoot', sectionClass: string, displayName: string) => {
  const Section = forwardRef<HTMLTableSectionElement, TableSectionVanillaProps>(
    ({ className, css, style, ...props }, ref) => (
      <Tag
        ref={ref}
        className={cx(sectionClass, className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    ),
  );
  Section.displayName = displayName;
  return Section;
};

export const TheadVanilla = section('thead', thead, 'TheadVanilla');
export const TbodyVanilla = section('tbody', tbody, 'TbodyVanilla');
export const TfootVanilla = section('tfoot', tfoot, 'TfootVanilla');

export type ThVanillaProps = Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'> &
  CSSProps &
  ThRecipeVariants &
  TableSortProps;

export const ThVanilla = forwardRef<HTMLTableCellElement, ThVanillaProps>(
  ({ sort, onSort, className, css, style, children, ...rest }, ref) => {
    const [variants, props] = splitVariants(thRecipe, rest);

    return (
      <th
        ref={ref}
        aria-sort={sort && ARIA_SORT[sort]}
        className={cx(thRecipe(variants), className)}
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
      </th>
    );
  },
);

ThVanilla.displayName = 'ThVanilla';

export type TdVanillaProps = Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'> &
  CSSProps &
  TdRecipeVariants;

export const TdVanilla = forwardRef<HTMLTableCellElement, TdVanillaProps>(
  ({ className, css, style, ...rest }, ref) => {
    const [variants, props] = splitVariants(tdRecipe, rest);

    return (
      <td
        ref={ref}
        className={cx(tdRecipe(variants), className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    );
  },
);

TdVanilla.displayName = 'TdVanilla';

export type TrVanillaProps = React.HTMLAttributes<HTMLTableRowElement> &
  CSSProps &
  TrRecipeVariants &
  RowLinkShortcutProps & {
    /** Content shown in a full-width row below, toggled by a button in a new first cell. */
    collapsedContent?: ReactNode;
    /** Column span of the collapsed content row; set it to the number of columns. */
    collapsedContentColSpan?: number;
    /** Accessible name of the expand button. */
    expandLabel?: string;
    /** Adds an empty first cell, to line up with rows that have an expand button. */
    emptyFirstColumn?: boolean;
    /** Styles the empty first cell as a header, for a row in `TheadVanilla`. */
    tableHead?: boolean;
  };

export const TrVanilla = forwardRef<HTMLTableRowElement, TrVanillaProps>(
  (
    {
      collapsedContent,
      collapsedContentColSpan = 1,
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

    return (
      <>
        <tr
          ref={ref}
          className={cx(
            trRecipe({ interactive: interactive ?? (href !== undefined || undefined), active }),
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
            (tableHead ? <td className={cx(thRecipe(), emptyHeaderCell)} /> : <TdVanilla />)}
          {collapsible && (
            <TdVanilla className={toggleCell} onClick={stopEvent}>
              <ExpandToggleVanilla
                label={expandLabel}
                isOpen={isOpen}
                controls={contentId}
                onToggle={() => setIsOpen((open) => !open)}
              />
            </TdVanilla>
          )}
          {mapRowLink(
            children,
            { href, linkAs, linkCell, linkProps, linkOverlay },
            TdVanilla,
            RowLinkVanilla,
            { row: 'TrVanilla', cell: 'TdVanilla' },
          )}
        </tr>
        {collapsible && (
          <TrVanilla>
            <TdVanilla
              id={contentId}
              colSpan={collapsedContentColSpan}
              className={collapsedCell}
              data-closed={isOpen ? undefined : ''}
            >
              <div className={collapsedContentClass}>{collapsedContent}</div>
            </TdVanilla>
          </TrVanilla>
        )}
      </>
    );
  },
);

TrVanilla.displayName = 'TrVanilla';
