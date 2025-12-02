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
import { textRecipe } from './Text.vanilla.css';

type TextRecipeVariants = RecipeVariants<typeof textRecipe>;

interface TextOwnProps extends Omit<TextRecipeVariants, never>, CSSProps {}

export type TextVanillaProps<C extends ElementType = 'span'> = PolymorphicComponentProps<
  C,
  TextOwnProps
>;

type TextComponent = PolymorphicComponent<'span', TextVanillaProps<ElementType>>;

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

    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = textRecipe({ size, weight, variant, gradient, transform, noWrap });

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

TextVanillaComponentImpl.displayName = 'TextVanilla';

export const TextVanilla = TextVanillaComponentImpl as TextComponent;
