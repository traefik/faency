import { Slot } from '@radix-ui/react-slot';
import React, { forwardRef } from 'react';

import { ROW_LINK_ATTRIBUTE } from './RowLink.constants';
import { rowLink } from './RowLink.vanilla.css';

type RowLinkVanillaProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean;
  /** With `false`, the link does not cover the row, and the row opens it on a click instead. */
  overlay?: boolean;
};

export const RowLinkVanilla = forwardRef<HTMLAnchorElement, RowLinkVanillaProps>(
  ({ asChild, overlay = true, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'a';

    return (
      <Component
        ref={ref}
        {...{ [ROW_LINK_ATTRIBUTE]: overlay ? '' : 'click' }}
        className={className ? `${rowLink} ${className}` : rowLink}
        {...props}
      />
    );
  },
);

RowLinkVanilla.displayName = 'RowLinkVanilla';
