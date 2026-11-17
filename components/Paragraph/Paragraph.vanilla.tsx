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

import { paragraphRecipe } from './Paragraph.vanilla.css';

type ParagraphRecipeVariants = RecipeVariantProps<typeof paragraphRecipe>;

interface ParagraphOwnProps extends ParagraphRecipeVariants, CSSProps {}

export type ParagraphVanillaProps<C extends ElementType = 'p'> = PolymorphicComponentProps<
  C,
  ParagraphOwnProps
>;

type ParagraphVanillaComponent = PolymorphicComponent<'p', ParagraphVanillaProps<ElementType>>;

const ParagraphVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'p'>(
    { as, size, className, css, style, ...props }: ParagraphVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'p';

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = paragraphRecipe({ size: toVariantKey(size) });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

ParagraphVanillaComponentImpl.displayName = 'ParagraphVanilla';

export const ParagraphVanilla = ParagraphVanillaComponentImpl as ParagraphVanillaComponent;
