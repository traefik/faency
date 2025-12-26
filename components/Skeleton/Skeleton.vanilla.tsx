import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React, { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { skeletonRecipe } from './Skeleton.vanilla.css';

type SkeletonRecipeVariants = NonNullable<RecipeVariants<typeof skeletonRecipe>>;

export interface SkeletonVanillaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SkeletonRecipeVariants,
    CSSProps {}

export const SkeletonVanilla = forwardRef<HTMLDivElement, SkeletonVanillaProps>(
  ({ className, css, style, variant, ...props }, ref) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = skeletonRecipe({ variant });

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

SkeletonVanilla.displayName = 'SkeletonVanilla';
