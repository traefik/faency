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
import { labelRecipe } from './Label.vanilla.css';

type LabelRecipeVariants = NonNullable<RecipeVariants<typeof labelRecipe>>;

interface LabelOwnProps extends LabelRecipeVariants, CSSProps {}

export type LabelVanillaProps<C extends ElementType = 'label'> = PolymorphicComponentProps<
  C,
  LabelOwnProps
>;

type LabelVanillaComponent = PolymorphicComponent<'label', LabelVanillaProps<ElementType>>;

const LabelVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'label'>(
    {
      as,
      className,
      css,
      style,
      size,
      weight,
      variant,
      gradient,
      transform,
      noWrap,
      ...props
    }: LabelVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'label';
    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = labelRecipe({ size, weight, variant, gradient, transform, noWrap });

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

LabelVanillaComponentImpl.displayName = 'LabelVanilla';

export const LabelVanilla = LabelVanillaComponentImpl as LabelVanillaComponent;
