import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { ElementType, forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { elevationRecipe } from './Elevation.vanilla.css';

type ElevationRecipeVariants = NonNullable<RecipeVariants<typeof elevationRecipe>>;

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
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };
    const recipeClass = elevationRecipe({ variant });

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

ElevationVanillaComponentImpl.displayName = 'ElevationVanilla';

export const ElevationVanilla = ElevationVanillaComponentImpl as ElevationVanillaComponent;
