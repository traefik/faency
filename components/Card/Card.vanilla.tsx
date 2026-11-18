import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { cardRecipe, interactiveCardRecipe } from './Card.vanilla.css';

const cardClass = withVariantKeys(cardRecipe);
const interactiveCardClass = withVariantKeys(interactiveCardRecipe);

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
    const mergedStyles = useInlineStyle(css, style);

    const recipe = interactive ? interactiveCardClass : cardClass;
    const recipeClass = recipe({ elevation, variant, active });

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
