import React, { ElementType } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { containerRecipe } from './Container.vanilla.css';

interface ContainerOwnProps extends CSSProps {
  size?: '1' | '2' | '3' | '4';
  noGutter?: boolean;
}

export type ContainerProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  ContainerOwnProps
>;
type ContainerComponent = PolymorphicComponent<'div', ContainerProps<ElementType>>;

export const ContainerVanillaComponent = React.forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, size, noGutter, ...props }: ContainerProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = containerRecipe({ size, noGutter });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

ContainerVanillaComponent.displayName = 'ContainerVanilla';

export const ContainerVanilla = ContainerVanillaComponent as ContainerComponent;
