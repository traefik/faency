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
import { badgeRecipe, interactiveBadgeRecipe } from './Badge.vanilla.css';

export const COLORS = ['gray', 'red', 'blue', 'green', 'neon', 'orange', 'purple'] as const;

type BadgeRecipeVariants = RecipeVariants<typeof badgeRecipe>;

interface BadgeOwnProps extends Omit<BadgeRecipeVariants, 'color'>, CSSProps {
  interactive?: boolean;
}

export type BadgeVanillaProps<C extends ElementType = 'span'> = PolymorphicComponentProps<
  C,
  BadgeOwnProps
>;

type BadgeVanillaComponent = PolymorphicComponent<'span', BadgeVanillaProps<ElementType>>;

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

    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipe = interactive ? interactiveBadgeRecipe : badgeRecipe;
    const recipeClass = recipe({ size, variant, alphaBg, borderless });

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

BadgeVanillaComponentImpl.displayName = 'BadgeVanilla';

export const BadgeVanilla = BadgeVanillaComponentImpl as BadgeVanillaComponent;
