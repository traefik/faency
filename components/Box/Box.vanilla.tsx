import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ElementType, forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { box } from './Box.vanilla.css';

export type BoxProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, CSSProps>;

type BoxComponent = PolymorphicComponent<'div', BoxProps<ElementType>>;

const BoxVanillaComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...props }: BoxProps<C>,
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

    return (
      <Component
        ref={ref}
        className={`${box} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

BoxVanillaComponent.displayName = 'BoxVanilla';

export const BoxVanilla = BoxVanillaComponent as BoxComponent;
