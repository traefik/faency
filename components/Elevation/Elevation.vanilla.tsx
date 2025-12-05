import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { elevationRecipe } from './Elevation.vanilla.css';

type ElevationRecipeVariants = NonNullable<RecipeVariants<typeof elevationRecipe>>;

interface ElevationOwnProps extends CSSProps {
  variant?: ElevationRecipeVariants['variant'];
}

export type ElevationVanillaProps = React.ComponentProps<'div'> & ElevationOwnProps;

export const ElevationVanilla = forwardRef<HTMLDivElement, ElevationVanillaProps>(
  ({ className, css, style, variant, ...props }, ref) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };
    const recipeClass = elevationRecipe({ variant });

    return (
      <div
        ref={ref}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

ElevationVanilla.displayName = 'ElevationVanilla';
