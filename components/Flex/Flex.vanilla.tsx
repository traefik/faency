import React, { ElementType } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { splitVariants, withVariantKeys } from '@/styles/recipeVariants';
import type {
  FlexAlignSimplified,
  FlexDirection,
  FlexJustifySimplified,
  Gap,
} from '@/styles/types';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { flexRecipe } from './Flex.vanilla.css';

const flexClass = withVariantKeys(flexRecipe);

interface FlexOwnProps extends CSSProps {
  direction?: FlexDirection;
  align?: FlexAlignSimplified;
  justify?: FlexJustifySimplified;
  wrap?: 'wrap' | 'noWrap' | 'wrapReverse';
  gap?: Gap;
}

export type FlexVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  FlexOwnProps
>;
type FlexComponent = PolymorphicComponent<'div', FlexOwnProps>;

export const FlexVanillaComponent = React.forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...rest }: FlexVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    const [variants, props] = splitVariants(flexRecipe, rest);

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = flexClass(variants);

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

FlexVanillaComponent.displayName = 'FlexVanilla';

export const FlexVanilla = FlexVanillaComponent as FlexComponent;
