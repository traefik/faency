import * as LabelPrimitive from '@radix-ui/react-label';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { labelRecipe } from './Label.vanilla.css';

type LabelRecipeVariants = RecipeVariants<typeof labelRecipe>;

interface LabelOwnProps extends Omit<LabelRecipeVariants, never>, CSSProps {}

export type LabelVanillaProps = LabelPrimitive.LabelProps & LabelOwnProps;

export const LabelVanilla = forwardRef<HTMLLabelElement, LabelVanillaProps>(
  (
    { className, css, style, size, weight, variant, gradient, transform, noWrap, ...props },
    ref,
  ) => {
    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = labelRecipe({ size, weight, variant, gradient, transform, noWrap });

    return (
      <LabelPrimitive.Root
        ref={ref}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

LabelVanilla.displayName = 'LabelVanilla';
