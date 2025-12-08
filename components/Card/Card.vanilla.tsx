import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { cardRecipe, interactiveCardRecipe } from './Card.vanilla.css';

type CardRecipeVariants = NonNullable<RecipeVariants<typeof cardRecipe>>;

interface BaseCardProps extends CSSProps {
  elevation?: CardRecipeVariants['elevation'];
  variant?: CardRecipeVariants['variant'];
  active?: CardRecipeVariants['active'];
}

interface CardOwnProps extends BaseCardProps, React.ComponentProps<'div'> {
  interactive?: false;
}

export type CardVanillaProps = CardOwnProps;

interface InteractiveCardProps
  extends BaseCardProps,
    Omit<React.ComponentProps<'button'>, 'color'> {
  interactive: true;
}

export type CardVanillaAllProps = CardVanillaProps | InteractiveCardProps;

export const CardVanilla = forwardRef<HTMLDivElement | HTMLButtonElement, CardVanillaAllProps>(
  ({ className, css, style, elevation, variant, active, interactive, ...props }, ref) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };

    if (interactive) {
      const recipeClass = interactiveCardRecipe({ elevation, variant, active });
      return (
        <button
          ref={ref as React.RefObject<HTMLButtonElement>}
          className={`${recipeClass} ${className || ''}`.trim()}
          style={mergedStyles}
          tabIndex={0}
          {...(props as React.ComponentProps<'button'>)}
        />
      );
    }

    const recipeClass = cardRecipe({ elevation, variant, active });
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...(props as React.ComponentProps<'div'>)}
      />
    );
  },
);

CardVanilla.displayName = 'CardVanilla';
