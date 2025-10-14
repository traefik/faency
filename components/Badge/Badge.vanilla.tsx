import { Slot } from '@radix-ui/react-slot';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React, { useMemo } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { badgeRecipe, interactiveBadgeRecipe } from './Badge.vanilla.css';

export const COLORS = ['gray', 'red', 'blue', 'green', 'neon', 'orange', 'purple'] as const;

type BadgeRecipeVariants = RecipeVariants<typeof badgeRecipe>;

export type BadgeVanillaProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  BadgeRecipeVariants &
  CSSProps & {
    asChild?: boolean;
    interactive?: boolean;
  };

export const BadgeVanilla = React.forwardRef<HTMLElement, BadgeVanillaProps>(
  (
    { interactive, asChild, className, css, style, size, variant, alphaBg, borderless, ...props },
    ref,
  ) => {
    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipe = interactive ? interactiveBadgeRecipe : badgeRecipe;
    const recipeClass = recipe({ size, variant, alphaBg, borderless });

    const Component = useMemo(() => {
      if (interactive) {
        return asChild ? Slot : 'button';
      }
      return asChild ? Slot : 'span';
    }, [interactive, asChild]);

    return (
      <Component
        ref={ref as React.Ref<any>}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

BadgeVanilla.displayName = 'BadgeVanilla';
