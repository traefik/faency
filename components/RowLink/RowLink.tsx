import { Slot } from '@radix-ui/react-slot';
import React, { Children, cloneElement, ElementType, isValidElement, ReactNode } from 'react';

import { CSS, styled } from '../../stitches.config';

const ROW_LINK_ATTRIBUTE = 'data-row-link';
const STITCHES_INTERNAL = Symbol.for('sxs.internal');

const ROW_LINK_Z_INDEX = 1;
export const ROW_LINK_CONTROL_Z_INDEX = 2;
const ROW_LINK_CONTROLS = `:where(a, button, input, select, textarea, [tabindex]):where(:not([${ROW_LINK_ATTRIBUTE}]))`;

const rowLinkStyles = {
  color: 'inherit',
  textDecoration: 'none',
  outline: 'none',

  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: ROW_LINK_Z_INDEX,
  },

  '&:focus-visible::after': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: '$focusOutline',
    outlineOffset: '-2px',
  },

  [`&[${ROW_LINK_ATTRIBUTE}="click"]::after`]: {
    content: 'none',
  },

  [`&[${ROW_LINK_ATTRIBUTE}="click"]:focus-visible`]: {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: '$focusOutline',
    outlineOffset: '2px',
  },
};

const StyledRowLink = styled('a', rowLinkStyles);
const StyledRowLinkSlot = styled(Slot, rowLinkStyles);

/** Styles for a table that can hold a `RowLink`. */
export const rowLinkTableStyles = {
  [`&:has([${ROW_LINK_ATTRIBUTE}])`]: {
    isolation: 'isolate',
  },
};

/** Styles for a table row that can hold a `RowLink`. */
export const rowLinkRowStyles = {
  [`&:has([${ROW_LINK_ATTRIBUTE}])`]: {
    position: 'relative',
  },
  // Not at zero specificity, so that it wins over the `all: unset` of controls such as Checkbox.
  [`&:has([${ROW_LINK_ATTRIBUTE}]) ${ROW_LINK_CONTROLS}`]: {
    position: 'relative',
    zIndex: ROW_LINK_CONTROL_Z_INDEX,
  },
};

export type RowLinkProps = React.ComponentProps<typeof StyledRowLink> & {
  asChild?: boolean;
  css?: CSS;
  /**
   * With `false`, the link does not cover the row. The row opens it on a click instead, so the text of the
   * row keeps its hover, for example a tooltip, and can be selected.
   */
  overlay?: boolean;
};

/**
 * A link that covers its whole table row, so that a click on the row opens it.
 * Other links and buttons in the row stay above it.
 */
export const RowLink = React.forwardRef<HTMLAnchorElement, RowLinkProps>(
  ({ asChild, overlay = true, ...props }, forwardedRef) => {
    const Component = asChild ? StyledRowLinkSlot : StyledRowLink;

    return (
      <Component
        ref={forwardedRef}
        {...{ [ROW_LINK_ATTRIBUTE]: overlay ? '' : 'click' }}
        {...props}
      />
    );
  },
);

RowLink.displayName = 'RowLink';

export type RowLinkShortcutProps = {
  href?: string;
  /**
   * The link component, for example a router link. It must pass its props and ref to its `<a>`,
   * and it must be defined outside render, or the link mounts again on each render.
   */
  linkAs?: ElementType;
  /** Other props for the link component, for example `{ returnTo }`. */
  linkProps?: Record<string, unknown>;
  /** The index of the cell that holds the link, among the direct children of the row. */
  linkCell?: number;
  /** With `false`, the link does not cover the row: see `overlay` on `RowLink`. */
  linkOverlay?: boolean;
};

type StitchesType = { className?: string; [STITCHES_INTERNAL]?: { type?: unknown } };

// A Stitches `styled(Td)` keeps the class name of a Stitches Td, or renders a component Td.
// This reads Stitches 1.x internals; the styled Td tests catch a change in them.
const isCellType = (type: unknown, cellType: ElementType) => {
  if (type === cellType) {
    return true;
  }
  if (!type || (typeof type !== 'object' && typeof type !== 'function')) {
    return false;
  }
  const { className, [STITCHES_INTERNAL]: internal } = type as StitchesType;
  const cellClassName = (cellType as StitchesType).className;
  return internal?.type === cellType || (!!cellClassName && className === cellClassName);
};

const warnedMessages = new Set<string>();

/** Clears the warnings that were already logged. For tests only. */
export const resetRowLinkWarnings = () => warnedMessages.clear();

const warnOnce = (message: string) => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
    return;
  }
  if (!warnedMessages.has(message)) {
    warnedMessages.add(message);
    console.warn(message);
  }
};

/** Puts the content of the `cellType` cell at `linkCell` in a `RowLink` to `href`. */
export const withRowLink = (
  children: ReactNode,
  { href, linkAs: LinkComponent = 'a', linkCell = 0, linkProps, linkOverlay }: RowLinkShortcutProps,
  cellType: ElementType,
) => {
  if (href === undefined) {
    return children;
  }

  let cellIndex = -1;
  let linked = false;
  // eslint-disable-next-line @eslint-react/no-children-map
  const mapped = Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return child;
    }
    cellIndex += 1;
    if (cellIndex !== linkCell || !isCellType(child.type, cellType)) {
      return child;
    }
    linked = true;
    // eslint-disable-next-line @eslint-react/no-clone-element
    return cloneElement(
      child,
      undefined,
      <RowLink asChild overlay={linkOverlay}>
        <LinkComponent {...linkProps} href={href}>
          {child.props.children}
        </LinkComponent>
      </RowLink>,
    );
  });

  if (!linked) {
    warnOnce(
      `Tr: the child at linkCell ${linkCell} is not a Td, so the row has no link. Use a Td for that cell, or put a RowLink in it.`,
    );
  }

  return mapped;
};

const ROW_CLICK_CONTROLS =
  'a, button, input, select, textarea, label, summary, [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="menuitem"], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

/** Opens the `RowLink` without overlay of the row on a click or a middle click outside its controls. */
export const openRowLink = <T extends HTMLElement>(event: React.MouseEvent<T>) => {
  const isAuxClick = event.type === 'auxclick';
  if (event.defaultPrevented || (isAuxClick && event.button !== 1)) {
    return;
  }
  const row = event.currentTarget;
  const target = event.target;
  // A portal, such as a row menu, sends its clicks to the row through React, but it is not in the row.
  if (!(target instanceof Element) || !row.contains(target)) {
    return;
  }
  const control = target.closest(ROW_CLICK_CONTROLS);
  if (control && row.contains(control)) {
    return;
  }
  const link = row.querySelector<HTMLAnchorElement>(`[${ROW_LINK_ATTRIBUTE}="click"]`);
  if (!link) {
    return;
  }
  // A drag that selects text in the row is not a click on the row.
  const selection = window.getSelection();
  if (selection && !selection.isCollapsed && row.contains(selection.anchorNode)) {
    return;
  }
  if (isAuxClick || event.metaKey || event.ctrlKey || event.shiftKey) {
    window.open(link.href, '_blank', 'noopener,noreferrer');
    return;
  }
  link.click();
};
