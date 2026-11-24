import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { box } from './Box.vanilla.css';

export type BoxVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, CSSProps>;

type BoxComponent = PolymorphicComponent<'div', CSSProps>;

const BoxVanillaComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...props }: BoxVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';

    const mergedStyles = useInlineStyle(css, style);

    return <Component ref={ref} className={cx(box, className)} style={mergedStyles} {...props} />;
  },
);

BoxVanillaComponent.displayName = 'BoxVanilla';

export const BoxVanilla = BoxVanillaComponent as BoxComponent;
