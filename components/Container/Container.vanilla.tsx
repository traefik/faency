import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { ElementType } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
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

    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = containerRecipe({ size, noGutter });

    return (
      <Component
        ref={ref}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

ContainerVanillaComponent.displayName = 'ContainerVanilla';

export const ContainerVanilla = ContainerVanillaComponent as ContainerComponent;
