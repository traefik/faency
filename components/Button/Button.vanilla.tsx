import { RecipeVariants } from '@vanilla-extract/recipes';
import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { buttonRecipe } from './Button.vanilla.css';

type ButtonRecipeVariants = RecipeVariants<typeof buttonRecipe>;

interface ButtonOwnProps extends Omit<ButtonRecipeVariants, never>, CSSProps {}

export type ButtonVanillaProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  ButtonOwnProps
>;

type ButtonVanillaComponent = PolymorphicComponent<'button', ButtonVanillaProps<ElementType>>;

const ButtonVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'button'>(
    {
      as,
      className,
      css,
      style,
      size,
      variant,
      state,
      ghost,
      rounded,
      ...props
    }: ButtonVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'button';

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = buttonRecipe({ size, variant, state, ghost, rounded });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

ButtonVanillaComponentImpl.displayName = 'ButtonVanilla';

export const ButtonVanilla = ButtonVanillaComponentImpl as ButtonVanillaComponent;
