import { Slot } from '@radix-ui/react-slot';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React, { useMemo } from 'react';

import { badgeRecipe, COLORS, interactiveBadgeRecipe } from './Badge.vanilla.css';

export { COLORS };

type BadgeRecipeVariants = RecipeVariants<typeof badgeRecipe>;

export type BadgeVanillaProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  BadgeRecipeVariants & {
    asChild?: boolean;
    interactive?: boolean;
  };

export const BadgeVanilla = React.forwardRef<HTMLElement, BadgeVanillaProps>(
  ({ interactive, asChild, className, size, variant, alphaBg, borderless, ...props }, ref) => {
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
        {...props}
      />
    );
  },
);

BadgeVanilla.displayName = 'BadgeVanilla';
