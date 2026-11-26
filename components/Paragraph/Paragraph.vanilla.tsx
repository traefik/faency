import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, splitVariants, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { paragraphRecipe } from './Paragraph.vanilla.css';

const paragraphClass = withVariantKeys(paragraphRecipe);

type ParagraphRecipeVariants = RecipeVariantProps<typeof paragraphRecipe>;

interface ParagraphOwnProps extends ParagraphRecipeVariants, CSSProps {}

export type ParagraphVanillaProps<C extends ElementType = 'p'> = PolymorphicComponentProps<
  C,
  ParagraphOwnProps
>;

type ParagraphVanillaComponent = PolymorphicComponent<'p', ParagraphOwnProps>;

const ParagraphVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'p'>(
    { as, className, css, style, ...rest }: ParagraphVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'p';
    const [variants, props] = splitVariants(paragraphRecipe, rest);

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = paragraphClass(variants);

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

ParagraphVanillaComponentImpl.displayName = 'ParagraphVanilla';

export const ParagraphVanilla = ParagraphVanillaComponentImpl as ParagraphVanillaComponent;
