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

import { bubbleRecipe } from './Bubble.vanilla.css';

type BubbleRecipeVariants = RecipeVariantProps<typeof bubbleRecipe>;

interface BubbleOwnProps extends BubbleRecipeVariants, CSSProps {}

export type BubbleVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  BubbleOwnProps
>;

type BubbleVanillaComponent = PolymorphicComponent<'div', BubbleVanillaProps<ElementType>>;

const BubbleVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, size, variant, noAnimation, ...props }: BubbleVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = bubbleRecipe({ size, variant, noAnimation });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

BubbleVanillaComponentImpl.displayName = 'BubbleVanilla';

export const BubbleVanilla = BubbleVanillaComponentImpl as BubbleVanillaComponent;
