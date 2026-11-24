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

import { badgeRecipe, interactiveBadgeRecipe } from './Badge.vanilla.css';

export const COLORS = ['gray', 'red', 'blue', 'green', 'neon', 'orange', 'purple'] as const;

type BadgeRecipeVariants = RecipeVariantProps<typeof badgeRecipe>;

interface BadgeOwnProps extends Omit<BadgeRecipeVariants, 'color'>, CSSProps {
  interactive?: boolean;
}

export type BadgeVanillaProps<C extends ElementType = 'span'> = PolymorphicComponentProps<
  C,
  BadgeOwnProps
>;

type BadgeVanillaComponent = PolymorphicComponent<'span', BadgeOwnProps>;

const BadgeVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'span'>(
    {
      as,
      interactive,
      className,
      css,
      style,
      size,
      variant,
      alphaBg,
      borderless,
      ...props
    }: BadgeVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || (interactive ? 'button' : 'span');

    const mergedStyles = useInlineStyle(css, style);

    const recipe = interactive ? interactiveBadgeRecipe : badgeRecipe;
    const recipeClass = recipe({ size, variant, alphaBg, borderless });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

BadgeVanillaComponentImpl.displayName = 'BadgeVanilla';

export const BadgeVanilla = BadgeVanillaComponentImpl as BadgeVanillaComponent;
