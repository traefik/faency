import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, toVariantKey } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { labelRecipe } from './Label.vanilla.css';

type LabelRecipeVariants = RecipeVariantProps<typeof labelRecipe>;

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
    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = labelRecipe({ size: toVariantKey(size), weight, variant, gradient, transform, noWrap });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

LabelVanillaComponentImpl.displayName = 'LabelVanilla';

export const LabelVanilla = LabelVanillaComponentImpl as LabelVanillaComponent;
