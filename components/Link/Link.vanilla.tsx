import React, { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, splitVariants } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { linkRecipe } from './Link.vanilla.css';

interface LinkOwnProps extends RecipeVariantProps<typeof linkRecipe>, CSSProps {}

export type LinkVanillaProps<C extends ElementType = 'a'> = PolymorphicComponentProps<
  C,
  LinkOwnProps
>;

type LinkVanillaComponent = PolymorphicComponent<'a', LinkOwnProps>;

const LinkVanillaImpl = forwardRef(
  <C extends ElementType = 'a'>(
    { as, className, css, style, ...rest }: LinkVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'a';
    const [variants, props] = splitVariants(linkRecipe, rest);

    return (
      <Component
        ref={ref}
        className={cx(linkRecipe(variants), className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    );
  },
);

LinkVanillaImpl.displayName = 'LinkVanilla';

export const LinkVanilla = LinkVanillaImpl as LinkVanillaComponent;
