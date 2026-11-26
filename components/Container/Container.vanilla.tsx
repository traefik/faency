import React, { ElementType } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, splitVariants } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { containerRecipe } from './Container.vanilla.css';

interface ContainerOwnProps extends RecipeVariantProps<typeof containerRecipe>, CSSProps {}

export type ContainerVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  ContainerOwnProps
>;
type ContainerComponent = PolymorphicComponent<'div', ContainerOwnProps>;

export const ContainerVanillaComponent = React.forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...rest }: ContainerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    const [variants, props] = splitVariants(containerRecipe, rest);

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = containerRecipe(variants);

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

ContainerVanillaComponent.displayName = 'ContainerVanilla';

export const ContainerVanilla = ContainerVanillaComponent as ContainerComponent;
