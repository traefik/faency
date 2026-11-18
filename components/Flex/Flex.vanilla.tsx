import React, { ElementType } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import type {
  FlexAlignSimplified,
  FlexDirection,
  FlexJustifySimplified,
  Gap,
} from '@/styles/types';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { flexRecipe } from './Flex.vanilla.css';

interface FlexOwnProps extends CSSProps {
  direction?: FlexDirection;
  align?: FlexAlignSimplified;
  justify?: FlexJustifySimplified;
  wrap?: 'wrap' | 'noWrap' | 'wrapReverse';
  gap?: Gap;
}

export type FlexProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, FlexOwnProps>;
type FlexComponent = PolymorphicComponent<'div', FlexProps<ElementType>>;

export const FlexVanillaComponent = React.forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, direction, align, justify, wrap, gap, ...props }: FlexProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = flexRecipe({ direction, align, justify, wrap, gap });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

FlexVanillaComponent.displayName = 'FlexVanilla';

export const FlexVanilla = FlexVanillaComponent as FlexComponent;
