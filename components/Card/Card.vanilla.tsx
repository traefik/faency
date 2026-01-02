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
import { cardRecipe, interactiveCardRecipe } from './Card.vanilla.css';

type CardRecipeVariants = NonNullable<RecipeVariants<typeof cardRecipe>>;

interface CardOwnProps extends CSSProps {
  elevation?: CardRecipeVariants['elevation'];
  variant?: CardRecipeVariants['variant'];
  active?: CardRecipeVariants['active'];
  interactive?: boolean;
}

export type CardVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  CardOwnProps
>;

type CardVanillaComponent = PolymorphicComponent<'div', CardVanillaProps<ElementType>>;

const CardVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    {
      as,
      className,
      css,
      style,
      elevation,
      variant,
      active,
      interactive,
      ...props
    }: CardVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || (interactive ? 'button' : 'div');
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };

    const recipe = interactive ? interactiveCardRecipe : cardRecipe;
    const recipeClass = recipe({ elevation, variant, active });

    const additionalProps = interactive && !as ? { tabIndex: 0 } : {};

    return (
      <Component
        ref={ref}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...additionalProps}
        {...props}
      />
    );
  },
);

CardVanillaComponentImpl.displayName = 'CardVanilla';

export const CardVanilla = CardVanillaComponentImpl as CardVanillaComponent;
