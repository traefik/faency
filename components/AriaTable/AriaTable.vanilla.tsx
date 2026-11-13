import { RecipeVariants } from '@vanilla-extract/recipes';
import React, { Children, forwardRef, isValidElement, ReactNode, useId, useState } from 'react';

import { CSSProps } from '../../styles/cssProps';
import { mapRowLink, openRowLink, RowLinkShortcutProps } from '../RowLink/RowLink.utils';
import { RowLinkVanilla } from '../RowLink/RowLink.vanilla';
import { rowLinkRow, rowLinkTable } from '../RowLink/RowLink.vanilla.css';
import { ExpandToggleVanilla, stopEvent } from '../Table/ExpandToggle.vanilla';
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
  ThRecipeVariants;

export const AriaThVanilla = forwardRef<HTMLSpanElement, AriaThVanillaProps>(
  (
    { size, weight, variant, gradient, transform, noWrap, align, className, css, style, ...props },
    ref,
  ) => (
    <span
      ref={ref}
      role="columnheader"
      className={cx(
        thRecipe({ size, weight, variant, gradient, transform, noWrap, align }),
        ariaCell,
        className,
      )}
      style={useInlineStyle(css, style)}
      {...props}
    />
  ),
);

AriaThVanilla.displayName = 'AriaThVanilla';

export type AriaTdVanillaProps = React.HTMLAttributes<HTMLSpanElement> &
  CSSProps &
  TdRecipeVariants & {
    /** Spans the whole row. It must be the only cell of its row. */
    fullColSpan?: boolean;
  };

export const AriaTdVanilla = forwardRef<HTMLSpanElement, AriaTdVanillaProps>(
  ({ fullColSpan = false, subtle, align, id, className, css, style, children, ...props }, ref) => {
    const cellClassName = cx(tdRecipe({ subtle, align }), ariaCell, className);
    const inlineStyle = useInlineStyle(css, style);

    if (!fullColSpan) {
      return (
        <span
          ref={ref}
          role="cell"
          id={id}
          className={cellClassName}
          style={inlineStyle}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <>
        <span {...props} aria-hidden className={cx(cellClassName, fillerCell)} style={inlineStyle}>
          {children}
        </span>
        <span
          ref={ref}
          role="cell"
          id={id}
          {...{ [FULL_COL_SPAN_ATTRIBUTE]: '' }}
          className={cx(cellClassName, fullColSpanCell)}
          style={inlineStyle}
          {...props}
        >
          {children}
        </span>
      </>
    );
  },
);

AriaTdVanilla.displayName = 'AriaTdVanilla';

const assertFullColSpanAlone = (children: ReactNode) => {
  // eslint-disable-next-line @eslint-react/no-children-to-array
  const cells = Children.toArray(children);
  const hasFullColSpan = cells.some(
    (child) => isValidElement<AriaTdVanillaProps>(child) && !!child.props.fullColSpan,
  );
  if (hasFullColSpan && cells.length > 1) {
    throw new Error('AriaTrVanilla: a fullColSpan AriaTdVanilla must be the only cell of its row.');
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

    assertFullColSpanAlone(children);

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
          onClick={(event) => {
            onClick?.(event);
            openRowLink(event);
          }}
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
