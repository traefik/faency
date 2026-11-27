import React, { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { linkRecipe } from './Link.vanilla.css';

const linkClass = withVariantKeys(linkRecipe);

interface LinkOwnProps extends RecipeVariantProps<typeof linkRecipe>, CSSProps {}

export type LinkVanillaProps<C extends ElementType = 'a'> = PolymorphicComponentProps<
  C,
  LinkOwnProps
>;

type LinkVanillaComponent = PolymorphicComponent<'a', LinkOwnProps>;

const LinkVanillaImpl = forwardRef(
  <C extends ElementType = 'a'>(
    { as, variant, className, css, style, ...props }: LinkVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'a';

    return (
      <Component
        ref={ref}
        className={cx(linkClass({ variant }), className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    );
  },
);

LinkVanillaImpl.displayName = 'LinkVanilla';

export const LinkVanilla = LinkVanillaImpl as LinkVanillaComponent;
