import { Slot } from '@radix-ui/react-slot';
import React, { ReactNode } from 'react';

import { CSS, styled } from '../../stitches.config';
import {
  ROW_LINK_ATTRIBUTE,
  ROW_LINK_CONTROL_Z_INDEX,
  ROW_LINK_CONTROLS,
  ROW_LINK_Z_INDEX,
} from './RowLink.constants';
import { mapRowLink, RowLinkShortcutProps } from './RowLink.utils';

export { ROW_LINK_CONTROL_Z_INDEX };
export type { RowLinkShortcutProps } from './RowLink.utils';
export { handleRowClick, openRowLink } from './RowLink.utils';

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

/** Puts the content of the `cellType` cell at `linkCell` in a `RowLink` to `href`. */
export const withRowLink = (
  children: ReactNode,
  options: RowLinkShortcutProps,
  cellType: React.ElementType,
) => mapRowLink(children, options, cellType, RowLink);
