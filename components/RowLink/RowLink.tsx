import { Slot } from '@radix-ui/react-slot';
import React, { Children, cloneElement, ElementType, isValidElement, ReactNode } from 'react';

import { CSS, styled } from '../../stitches.config';

const ROW_LINK_ATTRIBUTE = 'data-row-link';
const STITCHES_INTERNAL = Symbol.for('sxs.internal');

const rowLinkStyles = {
  color: 'inherit',
  textDecoration: 'none',
  outline: 'none',

  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
  },

  '&:focus-visible::after': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: '$focusOutline',
    outlineOffset: '-2px',
  },
};

const StyledRowLink = styled('a', rowLinkStyles);
const StyledRowLinkSlot = styled(Slot, rowLinkStyles);

/** Styles for a table row that can hold a `RowLink`. */
export const rowLinkRowStyles = {
  [`&:has([${ROW_LINK_ATTRIBUTE}])`]: {
    position: 'relative',
  },
  // :where() keeps this at zero specificity, so a control that sets its own position keeps it.
  [`:where(&:has([${ROW_LINK_ATTRIBUTE}])) :where(a, button, input, select, textarea, [tabindex]):where(:not([${ROW_LINK_ATTRIBUTE}]))`]:
    {
      position: 'relative',
      zIndex: 1,
    },
};

export type RowLinkProps = React.ComponentProps<typeof StyledRowLink> & {
  asChild?: boolean;
  css?: CSS;
};

/**
 * A link that covers its whole table row, so that a click on the row opens it.
 * Other links and buttons in the row stay above it.
 */
export const RowLink = React.forwardRef<HTMLAnchorElement, RowLinkProps>(
  ({ asChild, ...props }, forwardedRef) => {
    const Component = asChild ? StyledRowLinkSlot : StyledRowLink;

    return <Component ref={forwardedRef} {...{ [ROW_LINK_ATTRIBUTE]: '' }} {...props} />;
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
  { href, linkAs: LinkComponent = 'a', linkCell = 0, linkProps }: RowLinkShortcutProps,
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
      <RowLink asChild>
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
