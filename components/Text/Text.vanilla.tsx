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

import { textRecipe } from './Text.vanilla.css';

const textClass = withVariantKeys(textRecipe);

type TextRecipeVariants = RecipeVariantProps<typeof textRecipe>;

interface TextOwnProps extends TextRecipeVariants, CSSProps {}

export type TextVanillaProps<C extends ElementType = 'span'> = PolymorphicComponentProps<
  C,
  TextOwnProps
>;

type TextComponent = PolymorphicComponent<'span', TextOwnProps>;

const TextVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'span'>(
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
    }: TextVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'span';

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = textClass({ size, weight, variant, gradient, transform, noWrap });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

TextVanillaComponentImpl.displayName = 'TextVanilla';

export const TextVanilla = TextVanillaComponentImpl as TextComponent;
