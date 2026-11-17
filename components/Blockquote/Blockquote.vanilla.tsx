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

import { blockquoteRecipe } from './Blockquote.vanilla.css';

type BlockquoteRecipeVariants = RecipeVariants<typeof blockquoteRecipe>;

interface BlockquoteOwnProps extends Omit<BlockquoteRecipeVariants, never>, CSSProps {}

export type BlockquoteVanillaProps<C extends ElementType = 'blockquote'> =
  PolymorphicComponentProps<C, BlockquoteOwnProps>;

type BlockquoteComponent = PolymorphicComponent<'blockquote', BlockquoteVanillaProps<ElementType>>;

const BlockquoteVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'blockquote'>(
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
    }: BlockquoteVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = (as || 'blockquote') as ElementType;
    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = blockquoteRecipe({ size, weight, variant, gradient, transform, noWrap });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

BlockquoteVanillaComponentImpl.displayName = 'BlockquoteVanilla';

export const BlockquoteVanilla = BlockquoteVanillaComponentImpl as BlockquoteComponent;
