import React, { ElementType, forwardRef } from 'react';

import { CSSProps } from './cssProps';
import { cx } from './cx';
import { PolymorphicComponent } from './polymorphic';
import { useInlineStyle } from './useInlineStyle';

type PartImplProps = CSSProps & {
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [prop: string]: unknown;
};

// Radix parts take `as` instead of `asChild`: the `as` element is rendered through `asChild`, so Radix props and handlers land on it.
export function createPolymorphicPart<
  DefaultAs extends ElementType,
  OwnProps extends object = object,
>(Primitive: ElementType, options: { displayName: string; className?: string }) {
  const Part = forwardRef<unknown, PartImplProps>(
    ({ as: Component, className, css, style, children, ...props }, ref) => (
      <Primitive
        ref={ref}
        asChild={Component !== undefined}
        className={cx(options.className, className) || undefined}
        style={useInlineStyle(css, style)}
        {...props}
      >
        {Component !== undefined ? <Component>{children}</Component> : children}
      </Primitive>
    ),
  );

  Part.displayName = options.displayName;

  return Part as unknown as PolymorphicComponent<DefaultAs, OwnProps & CSSProps>;
}
