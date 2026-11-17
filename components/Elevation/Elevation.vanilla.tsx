import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import type { RecipeVariantProps } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { elevationRecipe } from './Elevation.vanilla.css';

type ElevationRecipeVariants = RecipeVariantProps<typeof elevationRecipe>;

interface ElevationOwnProps extends CSSProps {
  variant?: ElevationRecipeVariants['variant'];
}

export type ElevationVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  ElevationOwnProps
>;

type ElevationVanillaComponent = PolymorphicComponent<'div', ElevationVanillaProps<ElementType>>;

const ElevationVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, variant, ...props }: ElevationVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    const mergedStyles = useInlineStyle(css, style);
    const recipeClass = elevationRecipe({ variant });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

ElevationVanillaComponentImpl.displayName = 'ElevationVanilla';

export const ElevationVanilla = ElevationVanillaComponentImpl as ElevationVanillaComponent;
