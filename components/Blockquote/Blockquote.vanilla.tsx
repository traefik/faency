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

import { blockquoteRecipe } from './Blockquote.vanilla.css';

const blockquoteClass = withVariantKeys(blockquoteRecipe);

type BlockquoteRecipeVariants = RecipeVariantProps<typeof blockquoteRecipe>;

interface BlockquoteOwnProps extends BlockquoteRecipeVariants, CSSProps {}

export type BlockquoteVanillaProps<C extends ElementType = 'blockquote'> =
  PolymorphicComponentProps<C, BlockquoteOwnProps>;

type BlockquoteComponent = PolymorphicComponent<'blockquote', BlockquoteOwnProps>;

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

    const recipeClass = blockquoteClass({ size, weight, variant, gradient, transform, noWrap });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

BlockquoteVanillaComponentImpl.displayName = 'BlockquoteVanilla';

export const BlockquoteVanilla = BlockquoteVanillaComponentImpl as BlockquoteComponent;
