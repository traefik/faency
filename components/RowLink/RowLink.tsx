import { Slot } from '@radix-ui/react-slot';
import React, { Children, cloneElement, ElementType, isValidElement, ReactNode } from 'react';

import { CSS, styled } from '../../stitches.config';

const ROW_LINK_ATTRIBUTE = 'data-row-link';

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
    boxShadow: 'inset 0 0 0 2px $colors$focusOutline',
  },
};

const StyledRowLink = styled('a', rowLinkStyles);
const StyledRowLinkSlot = styled(Slot, rowLinkStyles);

/** Styles for a table row that can hold a `RowLink`. */
export const rowLinkRowStyles = {
  [`&:has([${ROW_LINK_ATTRIBUTE}])`]: {
    position: 'relative',

    [`& :is(a, button, input, select, textarea, [tabindex]):not([${ROW_LINK_ATTRIBUTE}])`]: {
      position: 'relative',
      zIndex: 1,
    },
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
  linkAs?: ElementType;
  linkCell?: number;
};

/** Puts the content of the cell at `linkCell` in a `RowLink` to `href`. */
export const withRowLink = (
  children: ReactNode,
  { href, linkAs: LinkComponent = 'a', linkCell = 0 }: RowLinkShortcutProps,
) => {
  if (href === undefined) {
    return children;
  }

  let cellIndex = -1;
  // eslint-disable-next-line @eslint-react/no-children-map
  return Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return child;
    }
    cellIndex += 1;
    if (cellIndex !== linkCell) {
      return child;
    }
    // eslint-disable-next-line @eslint-react/no-clone-element
    return cloneElement(
      child,
      undefined,
      <RowLink asChild>
        <LinkComponent href={href}>{child.props.children}</LinkComponent>
      </RowLink>,
    );
  });
};
