import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { ElementType } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import type { Gap, GridAlign, GridFlow, GridJustify } from '../../styles/types';
import { gridRecipe } from './Grid.vanilla.css';

interface GridOwnProps extends CSSProps {
  align?: GridAlign;
  justify?: GridJustify;
  flow?: GridFlow;
  columns?: number;
  gap?: Gap;
  gapX?: Gap;
  gapY?: Gap;
}

export type GridProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, GridOwnProps>;
type GridComponent = PolymorphicComponent<'div', GridProps<ElementType>>;

export const GridVanillaComponent = React.forwardRef(
  <C extends ElementType = 'div'>(
    {
      as,
      className,
      css,
      style,
      align,
      justify,
      flow,
      columns,
      gap,
      gapX,
      gapY,
      ...props
    }: GridProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';

    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const dynamicStyles: React.CSSProperties = {};

    // To support any value on the columns props
    if (columns !== undefined) {
      dynamicStyles.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    const mergedStyles = {
      ...cssStyles,
      ...dynamicStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = gridRecipe({ align, justify, flow, gap, gapX, gapY });

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

GridVanillaComponent.displayName = 'GridVanilla';

export const GridVanilla = GridVanillaComponent as GridComponent;
