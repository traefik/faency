import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, splitVariants } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { cardRecipe, interactiveCardRecipe } from './Card.vanilla.css';

type CardRecipeVariants = RecipeVariantProps<typeof cardRecipe>;

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

type CardVanillaComponent = PolymorphicComponent<'div', CardOwnProps>;

const CardVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, interactive, ...rest }: CardVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || (interactive ? 'button' : 'div');
    const [variants, props] = splitVariants(cardRecipe, rest);
    const mergedStyles = useInlineStyle(css, style);

    const recipe = interactive ? interactiveCardRecipe : cardRecipe;
    const recipeClass = recipe(variants);

    const additionalProps = interactive && !as ? { tabIndex: 0 } : {};

    return (
      <Component
        ref={ref}
        className={cx(recipeClass, className)}
        style={mergedStyles}
        {...additionalProps}
        {...props}
      />
    );
  },
);

CardVanillaComponentImpl.displayName = 'CardVanilla';

export const CardVanilla = CardVanillaComponentImpl as CardVanillaComponent;
