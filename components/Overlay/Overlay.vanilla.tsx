import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { overlay } from './Overlay.vanilla.css';

export type OverlayVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

type OverlayComponent = PolymorphicComponent<'div', OverlayVanillaProps<ElementType>>;

const OverlayVanillaComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...props }: OverlayVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';

    const mergedStyles = useInlineStyle(css, style);

    return (
      <Component ref={ref} className={cx(overlay, className)} style={mergedStyles} {...props} />
    );
  },
);

OverlayVanillaComponent.displayName = 'OverlayVanilla';

export const OverlayVanilla = OverlayVanillaComponent as OverlayComponent;
