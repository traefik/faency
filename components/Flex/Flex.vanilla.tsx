import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { ElementType } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import type {
  FlexAlignSimplified,
  FlexDirection,
  FlexJustifySimplified,
  Gap,
} from '../../styles/types';
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

    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = flexRecipe({ direction, align, justify, wrap, gap });

    return (
      <Component
        ref={ref}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

FlexVanillaComponent.displayName = 'FlexVanilla';

export const FlexVanilla = FlexVanillaComponent as FlexComponent;
