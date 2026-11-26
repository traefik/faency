import React, { ElementType } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { splitVariants, withVariantKeys } from '@/styles/recipeVariants';
import type { Gap, GridAlign, GridFlow, GridJustify } from '@/styles/types';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { gridRecipe } from './Grid.vanilla.css';

const gridClass = withVariantKeys(gridRecipe);

interface GridOwnProps extends CSSProps {
  align?: GridAlign;
  justify?: GridJustify;
  flow?: GridFlow;
  columns?: number;
  gap?: Gap;
  gapX?: Gap;
  gapY?: Gap;
}

export type GridVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  GridOwnProps
>;
type GridComponent = PolymorphicComponent<'div', GridOwnProps>;

export const GridVanillaComponent = React.forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, columns, ...rest }: GridVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    const [variants, props] = splitVariants(gridRecipe, rest);

    const dynamicStyles: React.CSSProperties = {};

    if (columns !== undefined) {
      dynamicStyles.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    const mergedStyles = useInlineStyle(css, { ...dynamicStyles, ...style });

    const recipeClass = gridClass(variants);

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

GridVanillaComponent.displayName = 'GridVanilla';

export const GridVanilla = GridVanillaComponent as GridComponent;
