import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { type RecipeVariantProps, splitVariants } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { buttonRecipe } from './Button.vanilla.css';

type ButtonRecipeVariants = RecipeVariantProps<typeof buttonRecipe>;

interface ButtonOwnProps extends ButtonRecipeVariants, CSSProps {}

export type ButtonVanillaProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  ButtonOwnProps
>;

type ButtonVanillaComponent = PolymorphicComponent<'button', ButtonOwnProps>;

const ButtonVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'button'>(
    { as, className, css, style, ...rest }: ButtonVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'button';
    const [variants, props] = splitVariants(buttonRecipe, rest);

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = buttonRecipe(variants);

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

ButtonVanillaComponentImpl.displayName = 'ButtonVanilla';

export const ButtonVanilla = ButtonVanillaComponentImpl as ButtonVanillaComponent;
